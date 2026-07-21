import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { requireAuth } from "../../shared/middleware/auth";
import type { AppEnv } from "../../types/hono";
import type { CartHandlers } from "./cart.handlers";
import {
  addCartItemBodySchema,
  cartItemIdParamSchema,
  updateCartItemBodySchema,
} from "./cart.schemas";

export const createCartRouter = (handlers: CartHandlers) => {
  const router = new Hono<AppEnv>();
  router.use("*", requireAuth);

  router.get("/", handlers.getCart);
  router.delete("/", handlers.clearCart);
  router.post("/items", zValidator("json", addCartItemBodySchema), handlers.addItem);
  router.patch(
    "/items/:id",
    zValidator("param", cartItemIdParamSchema),
    zValidator("json", updateCartItemBodySchema),
    handlers.updateItem,
  );
  router.delete("/items/:id", zValidator("param", cartItemIdParamSchema), handlers.removeItem);

  return router;
};
