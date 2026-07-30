import { describe, expect, test } from "bun:test";
import { createApp } from "../src/app";
import { parseCorsOrigins } from "../src/config/env";

describe("CORS configuration", () => {
  test("parseCorsOrigins splits and trims comma-separated list", () => {
    const parsed = parseCorsOrigins(
      "http://localhost:5173, https://admin.sandurfresh.com , http://localhost:8788",
    );
    expect(parsed).toEqual([
      "http://localhost:5173",
      "https://admin.sandurfresh.com",
      "http://localhost:8788",
    ]);
  });

  test("app allows configured CORS origin", async () => {
    const app = createApp();
    const res = await app.request("/health", {
      method: "GET",
      headers: {
        Origin: "http://localhost:5173",
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("access-control-allow-origin")).toBe("http://localhost:5173");
    expect(res.headers.get("access-control-allow-credentials")).toBe("true");
  });
});
