import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { requireAdmin, requireAuth } from "../../shared/middleware/auth";
import type { AppEnv } from "../../types/hono";
import type { OrdersHandlers } from "./orders.handlers";
import {
  checkoutBodySchema,
  listOrdersQuerySchema,
  orderIdParamSchema,
  updateOrderStatusBodySchema,
} from "./orders.schemas";

export const createOrdersRouter = (handlers: OrdersHandlers) => {
  const router = new Hono<AppEnv>();
  router.use("*", requireAuth);

  router.post("/", zValidator("json", checkoutBodySchema), handlers.checkout);
  router.get("/", zValidator("query", listOrdersQuerySchema), handlers.listOrders);
  router.get("/:id", zValidator("param", orderIdParamSchema), handlers.getOrder);
  router.post("/:id/cancel", zValidator("param", orderIdParamSchema), handlers.cancelOrder);
  router.patch(
    "/:id/status",
    requireAdmin,
    zValidator("param", orderIdParamSchema),
    zValidator("json", updateOrderStatusBodySchema),
    handlers.updateStatus,
  );

  return router;
};
