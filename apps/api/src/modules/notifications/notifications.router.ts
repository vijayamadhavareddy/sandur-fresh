import { Hono } from "hono";
import { fromResult } from "../../shared/http";
import { requireAuth } from "../../shared/middleware/auth";
import type { AppEnv } from "../../types/hono";
import type { NotificationsService } from "./notifications.service";

/**
 * Device registration for the customer mobile app, which talks REST v1.
 * The admin console registers over GraphQL instead (see resolvers/admin.ts).
 */
export const createNotificationsRouter = (notificationsService: NotificationsService) => {
  const router = new Hono<AppEnv>();
  router.use("*", requireAuth);

  router.post("/", async (c) => {
    const user = c.get("user");
    const body = await c.req.json().catch(() => ({}));
    return fromResult(c, await notificationsService.registerDevice(user!.id, body));
  });

  router.delete("/:target", async (c) =>
    fromResult(c, await notificationsService.unregisterDevice(c.req.param("target"))),
  );

  return router;
};
