import type { Db } from "@sf/db";
import { z } from "zod";
import { type DomainError, validationError } from "../../shared/errors";
import { publishAdminEvent } from "../../shared/events";
import type { PushMessage, PushResult, PushSender, PushTarget } from "../../shared/push";
import { err, ok, type Result } from "../../shared/result";
import type { OrderStatus } from "../orders/order-status";
import type { NotificationsRepo } from "./notifications.repo";

export type NotificationsServiceDeps = {
  db: Db;
  notificationsRepo: NotificationsRepo;
  sendPush: PushSender;
};

const NOOP: PushResult = { sent: 0, failed: 0, staleTargets: [] };

export const registerDeviceSchema = z.object({
  /** A Firebase Installation ID (web) or FCM registration token (mobile). */
  target: z.string().trim().min(1).max(500),
  kind: z.enum(["FID", "TOKEN"]),
  platform: z.enum(["web", "android", "ios"]),
  userAgent: z.string().trim().max(500).nullable().optional(),
});

export type RegisterDeviceInput = z.infer<typeof registerDeviceSchema>;

/** Customer-facing copy per status. PLACED is omitted deliberately — the
 * customer just did that themselves, so pushing it back is noise. */
const CUSTOMER_STATUS_COPY: Partial<Record<OrderStatus, { title: string; body: string }>> = {
  PACKED: { title: "Order packed", body: "Your order is packed and waiting for a rider." },
  OUT_FOR_DELIVERY: { title: "Out for delivery", body: "Your order is on its way." },
  DELIVERED: { title: "Delivered", body: "Your order has been delivered. Enjoy!" },
  CANCELLED: { title: "Order cancelled", body: "Your order was cancelled." },
};

/**
 * Outbound push notifications.
 *
 * Kept separate from the admin service so orders (which triggers pushes) and
 * admin (which exposes device registration) do not depend on each other — the
 * admin service already depends on the orders service.
 *
 * Every send is best-effort and never throws: a messaging failure must not roll
 * back or fail the operation that triggered it.
 */
export const createNotificationsService = (deps: NotificationsServiceDeps) => {
  const registerDevice = async (
    userId: string,
    input: unknown,
  ): Promise<Result<boolean, DomainError>> => {
    const parsed = registerDeviceSchema.safeParse(input);
    if (!parsed.success) {
      return err(validationError("Validation failed", parsed.error.issues));
    }
    await deps.notificationsRepo.upsertDevice(deps.db, { userId, ...parsed.data });
    return ok(true);
  };

  const unregisterDevice = async (target: string): Promise<Result<boolean, DomainError>> => {
    if (!target.trim()) return err(validationError("target is required"));
    await deps.notificationsRepo.deleteDevice(deps.db, target);
    return ok(true);
  };

  const dispatch = async (targets: PushTarget[], message: PushMessage): Promise<PushResult> => {
    try {
      const result = await deps.sendPush(targets, message);
      // FCM told us these destinations are gone — stop sending to them.
      if (result.staleTargets.length > 0) {
        await deps.notificationsRepo.deleteDevices(deps.db, result.staleTargets);
      }
      return result;
    } catch (cause) {
      console.error("[push] dispatch failed:", cause);
      return NOOP;
    }
  };

  /** Push to every admin device. */
  const notifyAdmins = async (message: PushMessage): Promise<PushResult> => {
    try {
      return await dispatch(await deps.notificationsRepo.listAdminTargets(deps.db), message);
    } catch (cause) {
      console.error("[push] notifyAdmins failed:", cause);
      return NOOP;
    }
  };

  /** Push to every device belonging to one user. */
  const notifyUser = async (userId: string, message: PushMessage): Promise<PushResult> => {
    try {
      return await dispatch(
        await deps.notificationsRepo.listTargetsForUser(deps.db, userId),
        message,
      );
    } catch (cause) {
      console.error("[push] notifyUser failed:", cause);
      return NOOP;
    }
  };

  /**
   * A customer placed an order — tell the admins.
   *
   * Fans out to both channels from one place: the SSE stream (instant, but only
   * reaches an admin with the console open) and FCM (reaches a closed app, but
   * depends on permission being granted and credentials being configured).
   */
  const notifyOrderPlaced = async (order: { id: string; total: number }): Promise<PushResult> => {
    publishAdminEvent({ type: "ORDER_PLACED", orderId: order.id, total: order.total });
    return notifyAdmins({
      title: "New order received",
      body: `Order #${order.id.slice(0, 8)} · ₹${(order.total / 100).toFixed(2)}`,
      data: { type: "ORDER_PLACED", orderId: order.id, url: `/orders/${order.id}` },
    });
  };

  /** An order moved along the status machine — tell the customer who owns it. */
  const notifyOrderStatusChanged = async (order: {
    id: string;
    userId: string;
    status: OrderStatus;
  }): Promise<PushResult> => {
    publishAdminEvent({ type: "ORDER_STATUS", orderId: order.id, status: order.status });

    const copy = CUSTOMER_STATUS_COPY[order.status];
    if (!copy) return NOOP;
    return notifyUser(order.userId, {
      ...copy,
      data: {
        type: "ORDER_STATUS",
        orderId: order.id,
        status: order.status,
        url: `/orders/${order.id}`,
      },
    });
  };

  return {
    registerDevice,
    unregisterDevice,
    notifyAdmins,
    notifyUser,
    notifyOrderPlaced,
    notifyOrderStatusChanged,
  };
};

export type NotificationsService = ReturnType<typeof createNotificationsService>;
