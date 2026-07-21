import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { stores } from "./products";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
const createdAt = () =>
  integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date());

export const storeSlotConfig = sqliteTable("store_slot_config", {
  id: id(),
  storeId: text("store_id")
    .notNull()
    .unique()
    .references(() => stores.id, { onDelete: "cascade" }),
  slotDurationMinutes: integer("slot_duration_minutes").notNull().default(30),
  dayStartMinutes: integer("day_start_minutes").notNull().default(480),
  dayEndMinutes: integer("day_end_minutes").notNull().default(1320),
  capacityPerSlot: integer("capacity_per_slot").notNull().default(20),
  createdAt: createdAt(),
});

export const storeSlotConfigRelations = relations(storeSlotConfig, ({ one }) => ({
  store: one(stores, { fields: [storeSlotConfig.storeId], references: [stores.id] }),
}));
