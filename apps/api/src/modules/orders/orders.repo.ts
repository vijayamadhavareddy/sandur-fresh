import { count, desc, eq } from "drizzle-orm";
import type { DbOrTx } from "../../db/client";
import { orderItems, orders } from "../../db/schema";
import type { OrderStatus } from "./order-status";

export type OrderRow = typeof orders.$inferSelect;
export type OrderItemRow = typeof orderItems.$inferSelect;

export const findOrderByIdempotencyKey = async (db: DbOrTx, key: string) => {
  const rows = await db.select().from(orders).where(eq(orders.idempotencyKey, key)).limit(1);
  return rows[0] ?? null;
};

export const findOrderById = async (db: DbOrTx, id: string) => {
  const rows = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return rows[0] ?? null;
};

export const listOrdersByUser = async (db: DbOrTx, userId: string, page: number, limit: number) => {
  const where = eq(orders.userId, userId);
  const totalRows = await db.select({ value: count() }).from(orders).where(where);
  const total = totalRows[0]?.value ?? 0;
  const items = await db
    .select()
    .from(orders)
    .where(where)
    .orderBy(desc(orders.placedAt))
    .limit(limit)
    .offset((page - 1) * limit);
  return { total, items };
};

export const listOrderItems = async (db: DbOrTx, orderId: string) =>
  db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

export const createOrder = async (
  db: DbOrTx,
  input: {
    userId: string;
    storeId: string;
    addressId: string;
    status: OrderStatus;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    paymentMethod: string;
    idempotencyKey: string;
  },
) => {
  const rows = await db.insert(orders).values(input).returning();
  return rows[0]!;
};

export const createOrderItems = async (
  db: DbOrTx,
  items: Array<{
    orderId: string;
    productId: string;
    name: string;
    unit: string;
    unitPrice: number;
    mrp: number;
    quantity: number;
  }>,
) => {
  if (items.length === 0) return [];
  return db.insert(orderItems).values(items).returning();
};

export const updateOrderStatus = async (db: DbOrTx, id: string, status: OrderStatus) => {
  const rows = await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, id))
    .returning();
  return rows[0] ?? null;
};

export const ordersRepo = {
  findOrderByIdempotencyKey,
  findOrderById,
  listOrdersByUser,
  listOrderItems,
  createOrder,
  createOrderItems,
  updateOrderStatus,
};

export type OrdersRepo = typeof ordersRepo;
