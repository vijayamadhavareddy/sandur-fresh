import { Database } from "bun:sqlite";
import { describe, expect, test } from "bun:test";
import * as schema from "@sf/db/schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import {
  createOtpProvider,
  DevOtpProvider,
  MockOtpProvider,
  TwoFactorOtpProvider,
} from "../src/modules/otp";
import { usersRepo } from "../src/modules/users/users.repo";
import { createUsersService } from "../src/modules/users/users.service";

const createTestDb = () => {
  const sqlite = new Database(":memory:");
  sqlite.run("PRAGMA foreign_keys = ON;");
  sqlite.run(`
    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      phone TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL DEFAULT '',
      email TEXT,
      role TEXT NOT NULL DEFAULT 'customer',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE otp_challenges (
      id TEXT PRIMARY KEY,
      phone TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      consumed_at INTEGER,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE addresses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      line1 TEXT NOT NULL,
      line2 TEXT,
      city TEXT NOT NULL,
      pincode TEXT NOT NULL,
      phone TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
  // biome-ignore lint/suspicious/noExplicitAny: test helper
  return drizzle({ client: sqlite, schema }) as any;
};

describe("TwoFactorOtpProvider", () => {
  test("successfully sends OTP without template", async () => {
    let requestedUrl = "";
    const mockFetch = async (url: string | URL | Request) => {
      requestedUrl = String(url);
      return new Response(
        JSON.stringify({
          Status: "Success",
          Details: "session-123456",
          OTP: "543210",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const provider = new TwoFactorOtpProvider({
      apiKey: "test-api-key",
      fetchFn: mockFetch,
    });

    const result = await provider.sendOtp({
      phone: "+91 98765-43210",
      otp: "543210",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.success).toBe(true);
      expect(result.value.messageId).toBe("session-123456");
    }
    expect(requestedUrl).toBe("https://2factor.in/API/V1/test-api-key/SMS/+919876543210/543210");
  });

  test("successfully sends OTP with template", async () => {
    let requestedUrl = "";
    const mockFetch = async (url: string | URL | Request) => {
      requestedUrl = String(url);
      return new Response(
        JSON.stringify({
          Status: "Success",
          Details: "session-custom-template",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const provider = new TwoFactorOtpProvider({
      apiKey: "test-api-key",
      defaultTemplate: "DEFAULT_DLT",
      fetchFn: mockFetch,
    });

    // Uses custom override template
    const result1 = await provider.sendOtp({
      phone: "9876543210",
      otp: "123456",
      template: "CUSTOM_TEMPLATE",
    });
    expect(result1.ok).toBe(true);
    expect(requestedUrl).toBe(
      "https://2factor.in/API/V1/test-api-key/SMS/9876543210/123456/CUSTOM_TEMPLATE",
    );

    // Uses default template
    const result2 = await provider.sendOtp({
      phone: "+919876543210",
      otp: "123456",
    });
    expect(result2.ok).toBe(true);
    expect(requestedUrl).toBe(
      "https://2factor.in/API/V1/test-api-key/SMS/+919876543210/123456/DEFAULT_DLT",
    );
  });

  test("handles 2factor.in error responses", async () => {
    const mockFetch = async () => {
      return new Response(
        JSON.stringify({
          Status: "Error",
          Details: "Invalid API Key",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const provider = new TwoFactorOtpProvider({
      apiKey: "bad-key",
      fetchFn: mockFetch,
    });

    const result = await provider.sendOtp({
      phone: "+919876543210",
      otp: "123456",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INTERNAL");
      expect(result.error.message).toContain("Invalid API Key");
    }
  });

  test("handles network and fetch exceptions", async () => {
    const mockFetch = async () => {
      throw new Error("Connection timed out");
    };

    const provider = new TwoFactorOtpProvider({
      apiKey: "test-api-key",
      fetchFn: mockFetch,
    });

    const result = await provider.sendOtp({
      phone: "+919876543210",
      otp: "123456",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INTERNAL");
      expect(result.error.message).toContain("Connection timed out");
    }
  });
});

describe("DevOtpProvider & MockOtpProvider", () => {
  test("DevOtpProvider logs and succeeds", async () => {
    const devProvider = new DevOtpProvider();
    expect(devProvider.name).toBe("dev");
    const result = await devProvider.sendOtp({
      phone: "+919876543210",
      otp: "000000",
    });
    expect(result.ok).toBe(true);
  });

  test("MockOtpProvider stores OTPs in memory", async () => {
    const mockProvider = new MockOtpProvider();
    expect(mockProvider.name).toBe("mock");

    await mockProvider.sendOtp({ phone: "+919876543210", otp: "123456" });
    await mockProvider.sendOtp({ phone: "+919876543211", otp: "654321" });

    const sent = mockProvider.getSentOtps();
    expect(sent.length).toBe(2);
    expect(sent[0]?.phone).toBe("+919876543210");
    expect(sent[0]?.otp).toBe("123456");
    expect(sent[1]?.phone).toBe("+919876543211");

    mockProvider.clear();
    expect(mockProvider.getSentOtps().length).toBe(0);
  });

  test("createOtpProvider factory resolution", () => {
    const dev = createOtpProvider({ provider: "dev" });
    expect(dev.name).toBe("dev");

    const mock = createOtpProvider({ provider: "mock" });
    expect(mock.name).toBe("mock");

    const tf = createOtpProvider({ provider: "2factor", apiKey: "dummy-key" });
    expect(tf.name).toBe("2factor");
  });
});

describe("UsersService OTP integration & 120s cooldown", () => {
  test("120-second resend cooldown blocks premature requests", async () => {
    const db = createTestDb();
    const mockOtpProvider = new MockOtpProvider();
    const usersService = createUsersService({
      db,
      usersRepo,
      otpProvider: mockOtpProvider,
    });

    const phone = "+919876543210";

    // 1st request -> should succeed
    const firstReq = await usersService.requestOtp({ phone });
    expect(firstReq.ok).toBe(true);
    expect(mockOtpProvider.getSentOtps().length).toBe(1);

    // Immediate 2nd request -> should be rejected with RATE_LIMITED (429)
    const secondReq = await usersService.requestOtp({ phone });
    expect(secondReq.ok).toBe(false);
    if (!secondReq.ok) {
      expect(secondReq.error.code).toBe("RATE_LIMITED");
      expect(secondReq.error.message).toContain("Please wait");
      expect(secondReq.error.message).toContain("seconds before requesting a new OTP");
    }
    // No new OTP sent
    expect(mockOtpProvider.getSentOtps().length).toBe(1);
  });

  test("verifyOtp validates correctly and logs user in", async () => {
    const db = createTestDb();
    const mockOtpProvider = new MockOtpProvider();
    const usersService = createUsersService({
      db,
      usersRepo,
      otpProvider: mockOtpProvider,
    });

    const phone = "+919876543210";
    await usersService.requestOtp({ phone });

    const sentOtps = mockOtpProvider.getSentOtps();
    const sentCode = sentOtps[0]!.otp;

    // Verify with invalid code
    const badVerify = await usersService.verifyOtp({ phone, code: "999999" });
    expect(badVerify.ok).toBe(false);

    // Verify with valid code
    const goodVerify = await usersService.verifyOtp({ phone, code: sentCode });
    expect(goodVerify.ok).toBe(true);
    if (goodVerify.ok) {
      expect(goodVerify.value.token).toBeTruthy();
      expect(goodVerify.value.user.phone).toBe(phone);
    }
  });
});
