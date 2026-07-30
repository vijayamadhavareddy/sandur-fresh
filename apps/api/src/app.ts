import { createD1Db, type Db, type DbOrTx, db } from "@sf/db";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env, parseCorsOrigins } from "./config/env";
import {
  cartHandlers,
  createContainer,
  defaultContainer,
  deliveryHandlers,
  eventsRouter,
  notificationsRouter,
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
import { LocalStorageService, R2StorageService, type StorageService } from "./shared/storage";
import type { AppEnv } from "./types/hono";

export const createApp = () => {
  setAuthResolver((token) => usersService.resolveUserFromToken(token));

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
    let currentDb: Db = db;
    let storage: StorageService;
    let container = defaultContainer;

    if (c.env?.DB) {
      currentDb = createD1Db(c.env.DB) as unknown as Db;
      storage = c.env.BUCKET
        ? new R2StorageService(c.env.BUCKET)
        : new LocalStorageService(
            typeof c.env.UPLOAD_DIR === "string" ? c.env.UPLOAD_DIR : env.UPLOAD_DIR,
          );
      container = createContainer(currentDb as DbOrTx);
    } else {
      storage = new LocalStorageService(env.UPLOAD_DIR);
    }

    c.set("db", currentDb);
    c.set("storage", storage);
    c.set("services", container.services);
    await next();
  });

  app.use("*", optionalAuth);

  app.get("/health", async (c) => {
    try {
      if (c.env?.DB) {
        await c.env.DB.prepare("SELECT 1").run();
      } else {
        // biome-ignore lint/suspicious/noExplicitAny: fallback for bun:sqlite client reflection
        (db as any).$client?.query?.("select 1")?.get?.();
      }
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
  v1.route("/me/devices", notificationsRouter);
  v1.route("/admin/events", eventsRouter);
  v1.route("/orders", ordersRouter);
  v1.route("/delivery", deliveryRouter);
  v1.route("/admin", adminRouter);

  app.route("/api/v1", v1);
  app.route("/uploads", createUploadsRouter());

  const yoga = createAppYoga((token, s) => (s?.users ?? usersService).resolveUserFromToken(token));
  app.on(["GET", "POST"], "/graphql", async (c) => {
    const responseHeaders = new Headers();
    const response = await yoga.fetch(c.req.raw, {
      responseHeaders,
      services: c.get("services"),
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
