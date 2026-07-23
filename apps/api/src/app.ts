import { db } from "@sf/db";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  cartHandlers,
  deliveryHandlers,
  ordersHandlers,
  productsHandlers,
  usersHandlers,
  usersService,
} from "./container";
import { createAppYoga } from "./graphql/yoga";
import { createAdminRouter, createUploadsRouter } from "./modules/admin/admin.router";
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
  app.use(
    "*",
    cors({
      origin: "http://localhost:5173", // or your frontend's actual origin
      credentials: true,
      allowMethods: ["POST", "GET", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  );
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
  const adminRouter = createAdminRouter();

  const v1 = new Hono<AppEnv>();
  v1.route("/auth", authRouter);
  v1.route("/me", meRouter);
  v1.route("/", productsRouter);
  v1.route("/cart", cartRouter);
  v1.route("/orders", ordersRouter);
  v1.route("/delivery", deliveryRouter);
  v1.route("/admin", adminRouter);

  app.route("/api/v1", v1);
  app.route("/uploads", createUploadsRouter());

  const yoga = createAppYoga((token) => usersService.resolveUserFromToken(token));
  app.on(["GET", "POST"], "/graphql", async (c) => {
    const responseHeaders = new Headers();
    const response = await yoga.fetch(c.req.raw, { responseHeaders });
    const headers = new Headers(response.headers);
    for (const [key, value] of responseHeaders) headers.append(key, value);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  });
  return app;
};
