import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { AppEnv } from "../types/hono";
import type { DomainError } from "./errors";
import { toErrorBody, toHttpStatus } from "./errors";
import type { Result } from "./result";

/**
 * Read data already validated by zValidator on the route.
 * Hono only types `c.req.valid` when validators are inlined on the same chain;
 * handlers live separately, so we bridge at runtime (safe after zValidator).
 */
type ValidTarget = "json" | "query" | "param" | "header" | "form";

export const valid = <T>(c: Context<AppEnv>, target: ValidTarget): T =>
  (c.req as unknown as { valid: (t: ValidTarget) => T }).valid(target);

export const jsonData = <T>(c: Context<AppEnv>, data: T, status: ContentfulStatusCode = 200) =>
  c.json({ data }, status);

export const jsonList = <T>(
  c: Context<AppEnv>,
  data: T[],
  meta: { page: number; limit: number; total: number },
  status: ContentfulStatusCode = 200,
) => c.json({ data, meta }, status);

export const jsonError = (c: Context<AppEnv>, error: DomainError) => {
  const requestId = c.get("requestId");
  return c.json(toErrorBody(error, requestId), toHttpStatus(error) as ContentfulStatusCode);
};

export const fromResult = <T>(
  c: Context<AppEnv>,
  result: Result<T, DomainError>,
  status: ContentfulStatusCode = 200,
) => {
  if (!result.ok) return jsonError(c, result.error);
  return jsonData(c, result.value, status);
};
