import { Database } from "bun:sqlite";
import { describe, expect, test } from "bun:test";
import * as schema from "@sf/db/schema";
import { users } from "@sf/db/schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { graphql } from "graphql";
import { graphqlSchema } from "../src/graphql/schema";
import { MockOtpProvider } from "../src/modules/otp";
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

describe("GraphQL customer resolvers", () => {
  test("requestOtp and verifyOtp mutations", async () => {
    const db = createTestDb();
    const uService = createUsersService({ db, usersRepo, otpProvider: new MockOtpProvider() });
    const container = { users: uService };

    const reqResult = await graphql({
      schema: graphqlSchema,
      source: `
        mutation RequestOtp($phone: String!) {
          requestOtp(phone: $phone) {
            message
          }
        }
      `,
      variableValues: { phone: "9876543210" },
      contextValue: { services: container, user: null },
    });

    expect(reqResult.errors).toBeUndefined();
    const reqData = reqResult.data?.requestOtp as { message: string } | undefined;
    expect(reqData?.message).toBe("OTP sent");

    const verifyResult = await graphql({
      schema: graphqlSchema,
      source: `
        mutation VerifyOtp($phone: String!, $code: String!) {
          verifyOtp(phone: $phone, code: $code) {
            token
            user {
              id
              phone
              role
            }
          }
        }
      `,
      variableValues: { phone: "9876543210", code: "000000" },
      contextValue: { services: container, user: null },
    });

    expect(verifyResult.errors).toBeUndefined();
    const authData = verifyResult.data?.verifyOtp as
      | {
          token: string;
          user: { id: string; phone: string };
        }
      | undefined;
    expect(authData?.token).toBeTruthy();
    expect(authData?.user.phone).toBe("9876543210");
  });

  test("me and address queries and mutations", async () => {
    const db = createTestDb();
    const uService = createUsersService({ db, usersRepo, otpProvider: new MockOtpProvider() });
    const container = { users: uService };

    const [user] = await db
      .insert(users)
      .values({ phone: "9998887770", name: "Test User", role: "customer" })
      .returning();

    const ctx = { services: container, user };

    // Query me
    const meResult = await graphql({
      schema: graphqlSchema,
      source: `
        query Me {
          me {
            id
            phone
            name
          }
        }
      `,
      contextValue: ctx,
    });

    expect(meResult.errors).toBeUndefined();
    const meData = meResult.data?.me as { name: string } | undefined;
    expect(meData?.name).toBe("Test User");

    // Add address
    const addAddrResult = await graphql({
      schema: graphqlSchema,
      source: `
        mutation AddAddress($label: String!, $line1: String!, $city: String!, $pincode: String!, $phone: String!, $lat: Float!, $lng: Float!) {
          addAddress(label: $label, line1: $line1, city: $city, pincode: $pincode, phone: $phone, lat: $lat, lng: $lng) {
            id
            label
            line1
            city
            pincode
          }
        }
      `,
      variableValues: {
        label: "Home",
        line1: "123 Main St",
        city: "Ballari",
        pincode: "583119",
        phone: "9998887770",
        lat: 15.15,
        lng: 76.6,
      },
      contextValue: ctx,
    });

    expect(addAddrResult.errors).toBeUndefined();
    const addr = addAddrResult.data?.addAddress as { id: string; label: string };
    expect(addr.id).toBeTruthy();
    expect(addr.label).toBe("Home");

    // Query myAddresses
    const myAddressesResult = await graphql({
      schema: graphqlSchema,
      source: `
        query MyAddresses {
          myAddresses {
            id
            label
            line1
          }
        }
      `,
      contextValue: ctx,
    });

    expect(myAddressesResult.errors).toBeUndefined();
    const addrData = myAddressesResult.data?.myAddresses as Array<{ label: string }> | undefined;
    expect(addrData?.length).toBe(1);

    // Delete address
    const delResult = await graphql({
      schema: graphqlSchema,
      source: `
        mutation DeleteAddress($id: String!) {
          deleteAddress(id: $id)
        }
      `,
      variableValues: { id: addr.id },
      contextValue: ctx,
    });

    expect(delResult.errors).toBeUndefined();
    expect(delResult.data?.deleteAddress).toBe(true);
  });
});
