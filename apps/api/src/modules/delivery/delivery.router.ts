import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { optionalAuth, requireAuth } from "../../shared/middleware/auth";
import type { AppEnv } from "../../types/hono";
import type { DeliveryHandlers } from "./delivery.handlers";
import { serviceabilityQuerySchema, slotsQuerySchema } from "./delivery.schemas";

export const createDeliveryRouter = (handlers: DeliveryHandlers) => {
  const router = new Hono<AppEnv>();

  router.get(
    "/serviceability",
    optionalAuth,
    zValidator("query", serviceabilityQuerySchema),
    handlers.serviceability,
  );
  router.get("/slots", requireAuth, zValidator("query", slotsQuerySchema), handlers.slots);

  return router;
};
