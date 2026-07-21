import type { ErrorHandler } from "hono";
import type { AppEnv } from "../../types/hono";
import { ErrorCode, toErrorBody } from "../errors";

export const globalErrorHandler: ErrorHandler<AppEnv> = (err, c) => {
  const requestId = c.get("requestId") ?? "unknown";
  console.error(
    JSON.stringify({
      level: "error",
      msg: "unhandled_error",
      requestId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    }),
  );

  return c.json(
    toErrorBody(
      {
        code: ErrorCode.INTERNAL,
        message: "Internal server error",
      },
      requestId,
    ),
    500,
  );
};
