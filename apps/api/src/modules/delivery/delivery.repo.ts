import type { DbOrTx } from "@sf/db";
import { storeSlotConfig } from "@sf/db";
import { eq } from "drizzle-orm";

export type SlotConfigRow = typeof storeSlotConfig.$inferSelect;

export const findSlotConfigByStore = async (db: DbOrTx, storeId: string) => {
  const rows = await db
    .select()
    .from(storeSlotConfig)
    .where(eq(storeSlotConfig.storeId, storeId))
    .limit(1);
  return rows[0] ?? null;
};

export const deliveryRepo = {
  findSlotConfigByStore,
};

export type DeliveryRepo = typeof deliveryRepo;
