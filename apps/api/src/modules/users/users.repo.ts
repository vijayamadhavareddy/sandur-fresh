import type { DbOrTx } from "@sf/db";
import { addresses, otpChallenges, sessions, users } from "@sf/db";
import { and, eq, gt, isNull } from "drizzle-orm";

export type UserRow = typeof users.$inferSelect;
export type AddressRow = typeof addresses.$inferSelect;
export type SessionRow = typeof sessions.$inferSelect;

export const findUserByPhone = async (db: DbOrTx, phone: string) => {
  const rows = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
  return rows[0] ?? null;
};

export const findUserById = async (db: DbOrTx, id: string) => {
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? null;
};

export const createUser = async (
  db: DbOrTx,
  input: { phone: string; name?: string; role?: "customer" | "admin" },
) => {
  const rows = await db
    .insert(users)
    .values({
      phone: input.phone,
      name: input.name ?? "",
      role: input.role ?? "customer",
    })
    .returning();
  return rows[0]!;
};

export const updateUser = async (
  db: DbOrTx,
  id: string,
  patch: { name?: string; email?: string | null },
) => {
  const rows = await db
    .update(users)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return rows[0] ?? null;
};

export const createOtpChallenge = async (
  db: DbOrTx,
  input: { phone: string; code: string; expiresAt: Date },
) => {
  const rows = await db.insert(otpChallenges).values(input).returning();
  return rows[0]!;
};

export const findValidOtp = async (db: DbOrTx, phone: string, code: string, now: Date) => {
  const rows = await db
    .select()
    .from(otpChallenges)
    .where(
      and(
        eq(otpChallenges.phone, phone),
        eq(otpChallenges.code, code),
        isNull(otpChallenges.consumedAt),
        gt(otpChallenges.expiresAt, now),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
};

export const consumeOtp = async (db: DbOrTx, id: string, now: Date) => {
  await db.update(otpChallenges).set({ consumedAt: now }).where(eq(otpChallenges.id, id));
};

export const createSession = async (
  db: DbOrTx,
  input: { userId: string; token: string; expiresAt: Date },
) => {
  const rows = await db.insert(sessions).values(input).returning();
  return rows[0]!;
};

export const findSessionByToken = async (db: DbOrTx, token: string, now: Date) => {
  const rows = await db
    .select({
      session: sessions,
      user: users,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, now)))
    .limit(1);
  return rows[0] ?? null;
};

export const listAddressesByUser = async (db: DbOrTx, userId: string) =>
  db.select().from(addresses).where(eq(addresses.userId, userId));

export const findAddressById = async (db: DbOrTx, id: string) => {
  const rows = await db.select().from(addresses).where(eq(addresses.id, id)).limit(1);
  return rows[0] ?? null;
};

export const findAddressForUser = async (db: DbOrTx, id: string, userId: string) => {
  const rows = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
};

export const clearDefaultAddresses = async (db: DbOrTx, userId: string) => {
  await db
    .update(addresses)
    .set({ isDefault: false, updatedAt: new Date() })
    .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)));
};

export const createAddress = async (
  db: DbOrTx,
  input: {
    userId: string;
    label: string;
    line1: string;
    line2?: string | null;
    city: string;
    pincode: string;
    phone: string;
    lat: number;
    lng: number;
    isDefault: boolean;
  },
) => {
  const rows = await db.insert(addresses).values(input).returning();
  return rows[0]!;
};

export const updateAddress = async (
  db: DbOrTx,
  id: string,
  patch: Partial<{
    label: string;
    line1: string;
    line2: string | null;
    city: string;
    pincode: string;
    phone: string;
    lat: number;
    lng: number;
    isDefault: boolean;
  }>,
) => {
  const rows = await db
    .update(addresses)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(addresses.id, id))
    .returning();
  return rows[0] ?? null;
};

export const deleteAddress = async (db: DbOrTx, id: string) => {
  const rows = await db.delete(addresses).where(eq(addresses.id, id)).returning();
  return rows[0] ?? null;
};

export const usersRepo = {
  findUserByPhone,
  findUserById,
  createUser,
  updateUser,
  createOtpChallenge,
  findValidOtp,
  consumeOtp,
  createSession,
  findSessionByToken,
  listAddressesByUser,
  findAddressById,
  findAddressForUser,
  clearDefaultAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};

export type UsersRepo = typeof usersRepo;
