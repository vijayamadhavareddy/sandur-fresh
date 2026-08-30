import { createDb, type Db, type DbOrTx } from "@sf/db";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env, parseCorsOrigins } from "./config/env";
import { createContainer } from "./container";
import { createAppYoga } from "./graphql/yoga";
import { createAdminRouter, createUploadsRouter } from "./modules/admin/admin.router";
import { createCartHandlers } from "./modules/cart/cart.handlers";
import { createCartRouter } from "./modules/cart/cart.router";
import { createDeliveryHandlers } from "./modules/delivery/delivery.handlers";
import { createDeliveryRouter } from "./modules/delivery/delivery.router";
import { createEventsRouter } from "./modules/notifications/events.router";
import { createNotificationsRouter } from "./modules/notifications/notifications.router";
import { createOrdersHandlers } from "./modules/orders/orders.handlers";
import { createOrdersRouter } from "./modules/orders/orders.router";
import { createProductsHandlers } from "./modules/products/products.handlers";
import { createProductsRouter } from "./modules/products/products.router";
import { createUsersHandlers } from "./modules/users/users.handlers";
import { createUsersRouter } from "./modules/users/users.router";
import { getStorage } from "./shared/common";
import { optionalAuth } from "./shared/middleware/auth";
import { globalErrorHandler } from "./shared/middleware/error-handler";
import { loggerMiddleware } from "./shared/middleware/logger";
import { requestIdMiddleware } from "./shared/middleware/request-id";
import type { StorageService } from "./shared/storage";
import type { AppEnv } from "./types/hono";

export const createApp = () => {
  const app = new Hono<AppEnv>();
  app.onError(globalErrorHandler);
  app.use(
    "*",
    cors({
      origin: (incomingOrigin, c) => {
        const raw = typeof c.env?.CORS_ORIGIN === "string" ? c.env.CORS_ORIGIN : env.CORS_ORIGIN;
        const allowed = parseCorsOrigins(raw);

        if (!incomingOrigin) return undefined;
        if (allowed.includes("*") || allowed.includes(incomingOrigin)) {
          return incomingOrigin;
        }
        return allowed[0] ?? undefined;
      },
      credentials: true,
      allowMethods: ["POST", "GET", "OPTIONS", "PUT", "PATCH", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    }),
  );
  app.use("*", requestIdMiddleware);
  app.use("*", loggerMiddleware);

  // Runtime context middleware: detects Cloudflare D1/R2 bindings or falls back to local Bun
  app.use("*", async (c, next) => {
    const currentDb: Db = createDb(c.env?.DB);
    const storage: StorageService = getStorage(c.env);
    const container = createContainer(currentDb as DbOrTx, c.env);

    c.set("db", currentDb);
    c.set("storage", storage);
    c.set("services", container.services);

    return await next();
  });

  app.use("*", optionalAuth);

  app.get("/health", async (c) => {
    const db = c.get("db");
    try {
      db?.run("SELECT 1");
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

  // Handlers resolve their service from the per-request `c.get("services")`
  // context (set by the middleware above), so no service needs to be bound here.
  const { authRouter, meRouter } = createUsersRouter(createUsersHandlers());
  const productsRouter = createProductsRouter(createProductsHandlers());
  const cartRouter = createCartRouter(createCartHandlers());
  const ordersRouter = createOrdersRouter(createOrdersHandlers());
  const deliveryRouter = createDeliveryRouter(createDeliveryHandlers());
  const adminRouter = createAdminRouter();
  const notificationsRouter = createNotificationsRouter();
  const eventsRouter = createEventsRouter();

  const v1 = new Hono<AppEnv>();
  v1.route("/auth", authRouter);
  v1.route("/me", meRouter);
  v1.route("/", productsRouter);
  v1.route("/cart", cartRouter);
  v1.route("/me/devices", notificationsRouter);
  v1.route("/admin/events", eventsRouter);
  v1.route("/orders", ordersRouter);
  v1.route("/delivery", deliveryRouter);
  v1.route("/admin", adminRouter);

  app.route("/api/v1", v1);
  app.route("/uploads", createUploadsRouter());

  app.on(["GET", "POST"], "/graphql", async (c) => {
    const responseHeaders = new Headers();
    const yoga = createAppYoga(
      (token, s) => (s?.users ? s.users.resolveUserFromToken(token) : Promise.resolve(null)),
      c.get("db") as DbOrTx,
    );
    const response = await yoga.fetch(c.req.raw, {
      responseHeaders,
      services: c.get("services"),
      db: c.get("db"),
      env: c.env,
    });
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
