import { eq } from "drizzle-orm";
import type { DbOrTx } from "../../db/client";
import { storeSlotConfig } from "../../db/schema";

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
