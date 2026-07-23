import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { orders } from "./orders";
import { inventory } from "./products";
import { users } from "./users";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
const createdAt = () =>
  integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date());
const updatedAt = () =>
  integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date());

export const adminCredentials = sqliteTable("admin_credentials", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const inventoryAdjustments = sqliteTable("inventory_adjustments", {
  id: id(),
  inventoryId: text("inventory_id")
    .notNull()
    .references(() => inventory.id, { onDelete: "cascade" }),
  delta: integer("delta").notNull(),
  reason: text("reason").notNull(),
  adjustedBy: text("adjusted_by")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  createdAt: createdAt(),
});

const orderStatus = (name: string) =>
  text(name, {
    enum: ["PLACED", "PACKED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
  });

export const orderStatusHistory = sqliteTable("order_status_history", {
  id: id(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  fromStatus: orderStatus("from_status"),
  toStatus: orderStatus("to_status").notNull(),
  changedBy: text("changed_by").references(() => users.id, { onDelete: "set null" }),
  reason: text("reason"),
  createdAt: createdAt(),
});

export const adminCredentialsRelations = relations(adminCredentials, ({ one }) => ({
  user: one(users, { fields: [adminCredentials.userId], references: [users.id] }),
}));

export const inventoryAdjustmentsRelations = relations(inventoryAdjustments, ({ one }) => ({
  inventory: one(inventory, {
    fields: [inventoryAdjustments.inventoryId],
    references: [inventory.id],
  }),
  user: one(users, { fields: [inventoryAdjustments.adjustedBy], references: [users.id] }),
}));

export const orderStatusHistoryRelations = relations(orderStatusHistory, ({ one }) => ({
  order: one(orders, { fields: [orderStatusHistory.orderId], references: [orders.id] }),
  user: one(users, { fields: [orderStatusHistory.changedBy], references: [users.id] }),
}));
