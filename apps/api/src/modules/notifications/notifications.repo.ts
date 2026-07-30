import type { DbOrTx } from "@sf/db";
import { deviceRegistrations, users } from "@sf/db";
import { eq, inArray } from "drizzle-orm";

export type DeviceRegistrationRow = typeof deviceRegistrations.$inferSelect;

export type RegisterDeviceInput = {
  userId: string;
  target: string;
  kind: "FID" | "TOKEN";
  platform: "web" | "android" | "ios";
  userAgent?: string | null;
};

/**
 * Register (or refresh) a push target. `target` is unique, so the same browser
 * or device re-registering moves it to the current user instead of creating a
 * duplicate — which is what you want when two people share a device.
 */
export const upsertDevice = async (db: DbOrTx, input: RegisterDeviceInput) =>
  (
    await db
      .insert(deviceRegistrations)
      .values(input)
      .onConflictDoUpdate({
        target: deviceRegistrations.target,
        set: {
          userId: input.userId,
          kind: input.kind,
          platform: input.platform,
          userAgent: input.userAgent ?? null,
          updatedAt: new Date(),
        },
      })
      .returning()
  )[0]!;

export const deleteDevice = async (db: DbOrTx, target: string) =>
  db.delete(deviceRegistrations).where(eq(deviceRegistrations.target, target));

export const deleteDevices = async (db: DbOrTx, targets: string[]) =>
  targets.length === 0
    ? undefined
    : db.delete(deviceRegistrations).where(inArray(deviceRegistrations.target, targets));

const asTargets = (rows: Array<{ target: string; kind: "FID" | "TOKEN" }>) =>
  rows.map((r) => ({ value: r.target, kind: r.kind }));

/** Every push target belonging to a user with the admin role. */
export const listAdminTargets = async (db: DbOrTx) => {
  const rows = await db
    .select({ target: deviceRegistrations.target, kind: deviceRegistrations.kind })
    .from(deviceRegistrations)
    .innerJoin(users, eq(deviceRegistrations.userId, users.id))
    .where(eq(users.role, "admin"));
  return asTargets(rows);
};

/** Every push target belonging to one user. */
export const listTargetsForUser = async (db: DbOrTx, userId: string) => {
  const rows = await db
    .select({ target: deviceRegistrations.target, kind: deviceRegistrations.kind })
    .from(deviceRegistrations)
    .where(eq(deviceRegistrations.userId, userId));
  return asTargets(rows);
};

export const notificationsRepo = {
  upsertDevice,
  deleteDevice,
  deleteDevices,
  listAdminTargets,
  listTargetsForUser,
};

export type NotificationsRepo = typeof notificationsRepo;
