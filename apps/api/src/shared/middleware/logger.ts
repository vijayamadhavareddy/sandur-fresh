import { createMiddleware } from "hono/factory";
import { env } from "../../config/env";
import type { AppEnv } from "../../types/hono";

const levels = ["debug", "info", "warn", "error"] as const;
type Level = (typeof levels)[number];

const shouldLog = (level: Level): boolean => levels.indexOf(level) >= levels.indexOf(env.LOG_LEVEL);

export const loggerMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const start = performance.now();
  await next();
  if (!shouldLog("info")) return;
  const ms = Math.round(performance.now() - start);
  const requestId = c.get("requestId");
  console.log(
    JSON.stringify({
      level: "info",
      msg: "request",
      requestId,
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      durationMs: ms,
    }),
  );
});
