import { createMiddleware } from "hono/factory";
import type { AppEnv, AuthUser } from "../../types/hono";
import { unauthorized } from "../errors";
import { jsonError } from "../http";

export type ResolveUser = (token: string) => Promise<AuthUser | null>;

let resolveUser: ResolveUser = async () => null;

export const setAuthResolver = (fn: ResolveUser) => {
  resolveUser = fn;
};

export const optionalAuth = createMiddleware<AppEnv>(async (c, next) => {
  c.set("user", null);
  const header = c.req.header("authorization");
  if (header?.startsWith("Bearer ")) {
    const token = header.slice("Bearer ".length).trim();
    if (token.length > 0) {
      const user = await resolveUser(token);
      c.set("user", user);
    }
  }
  await next();
});

export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const header = c.req.header("authorization");
  if (!header?.startsWith("Bearer ")) {
    return jsonError(c, unauthorized("Missing or invalid Authorization header"));
  }
  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return jsonError(c, unauthorized("Missing or invalid Authorization header"));
  }
  const user = await resolveUser(token);
  if (!user) {
    return jsonError(c, unauthorized("Invalid or expired session"));
  }
  c.set("user", user);
  await next();
});

export const requireAdmin = createMiddleware<AppEnv>(async (c, next) => {
  const user = c.get("user");
  if (!user) {
    return jsonError(c, unauthorized());
  }
  if (user.role !== "admin") {
    return jsonError(c, {
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  await next();
});
