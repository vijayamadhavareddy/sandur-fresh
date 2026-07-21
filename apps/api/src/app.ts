import { Hono } from "hono";
import { db } from "../../../packages/db";
import {
  cartHandlers,
  deliveryHandlers,
  ordersHandlers,
  productsHandlers,
  usersHandlers,
  usersService,
} from "./container";
import { createAppYoga } from "./graphql/yoga";
import { createCartRouter } from "./modules/cart/cart.router";
import { createDeliveryRouter } from "./modules/delivery/delivery.router";
import { createOrdersRouter } from "./modules/orders/orders.router";
import { createProductsRouter } from "./modules/products/products.router";
import { createUsersRouter } from "./modules/users/users.router";
import { optionalAuth, setAuthResolver } from "./shared/middleware/auth";
import { globalErrorHandler } from "./shared/middleware/error-handler";
import { loggerMiddleware } from "./shared/middleware/logger";
import { requestIdMiddleware } from "./shared/middleware/request-id";
import type { AppEnv } from "./types/hono";

export const createApp = () => {
  setAuthResolver((token) => usersService.resolveUserFromToken(token));

  const app = new Hono<AppEnv>();
  app.onError(globalErrorHandler);
  app.use("*", requestIdMiddleware);
  app.use("*", loggerMiddleware);
  app.use("*", optionalAuth);

  app.get("/health", async (c) => {
    try {
      db.$client.query("select 1").get();
      return c.json({ data: { status: "ok" } });
    } catch {
      return c.json(
        {
          error: {
            code: "INTERNAL",
            message: "Database unavailable",
          },
          requestId: c.get("requestId"),
        },
        503,
      );
    }
  });

  const { authRouter, meRouter } = createUsersRouter(usersHandlers);
  const productsRouter = createProductsRouter(productsHandlers);
  const cartRouter = createCartRouter(cartHandlers);
  const ordersRouter = createOrdersRouter(ordersHandlers);
  const deliveryRouter = createDeliveryRouter(deliveryHandlers);

  const v1 = new Hono<AppEnv>();
  v1.route("/auth", authRouter);
  v1.route("/me", meRouter);
  v1.route("/", productsRouter);
  v1.route("/cart", cartRouter);
  v1.route("/orders", ordersRouter);
  v1.route("/delivery", deliveryRouter);

  app.route("/api/v1", v1);

  const yoga = createAppYoga((token) => usersService.resolveUserFromToken(token));
  app.on(["GET", "POST"], "/graphql", (c) => yoga.fetch(c.req.raw));

  return app;
};
