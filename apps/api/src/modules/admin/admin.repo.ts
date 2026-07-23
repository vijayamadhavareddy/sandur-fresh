import type { DbOrTx } from "@sf/db";
import {
  addresses,
  adminCredentials,
  categories,
  inventory,
  inventoryAdjustments,
  orderItems,
  orderStatusHistory,
  orders,
  products,
  sessions,
  storeSlotConfig,
  stores,
  users,
} from "@sf/db";
import { and, count, desc, eq, gte, like, lte, or, sql } from "drizzle-orm";
import type { OrderStatus } from "../orders/order-status";
import type {
  AdminCategoryInput,
  AdminStoreInput,
  CreateAdminProductInput,
  UpdateAdminCategoryInput,
  UpdateAdminProductInput,
  UpdateAdminStoreInput,
} from "./admin.schemas";

export const findCredentialByEmail = async (db: DbOrTx, email: string) => {
  const rows = await db
    .select({ credential: adminCredentials, user: users })
    .from(adminCredentials)
    .innerJoin(users, eq(adminCredentials.userId, users.id))
    .where(eq(adminCredentials.email, email))
    .limit(1);
  return rows[0] ?? null;
};

export const createSession = async (
  db: DbOrTx,
  input: { userId: string; token: string; expiresAt: Date },
) => (await db.insert(sessions).values(input).returning())[0]!;

export const revokeSession = async (db: DbOrTx, token: string) => {
  await db.delete(sessions).where(eq(sessions.token, token));
};

export const dashboard = async (db: DbOrTx) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const [today, placed, processing, lowStock] = await Promise.all([
    db.select({ value: count() }).from(orders).where(gte(orders.placedAt, start)),
    db.select({ value: count() }).from(orders).where(eq(orders.status, "PLACED")),
    db
      .select({ value: count() })
      .from(orders)
      .where(or(eq(orders.status, "PACKED"), eq(orders.status, "OUT_FOR_DELIVERY"))),
    db
      .select({ value: count() })
      .from(inventory)
      .where(lte(inventory.stockQty, inventory.lowStockThreshold)),
  ]);
  return {
    todaysOrders: today[0]?.value ?? 0,
    placedOrders: placed[0]?.value ?? 0,
    processingOrders: processing[0]?.value ?? 0,
    lowStockItems: lowStock[0]?.value ?? 0,
  };
};

export const listProducts = async (
  db: DbOrTx,
  input: { page: number; limit: number; query?: string },
) => {
  const where = input.query
    ? or(like(products.name, `%${input.query}%`), like(products.description, `%${input.query}%`))
    : undefined;
  const total = (await db.select({ value: count() }).from(products).where(where))[0]?.value ?? 0;
  const items = await db
    .select({ product: products, category: categories })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(where)
    .orderBy(products.name)
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);
  return { items: items.map(({ product, category }) => ({ ...product, category })), total };
};

export const findProduct = async (db: DbOrTx, id: string) => {
  const rows = await db
    .select({ product: products, category: categories })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.id, id))
    .limit(1);
  return rows[0] ? { ...rows[0].product, category: rows[0].category } : null;
};

export const listCategories = (db: DbOrTx) =>
  db.select().from(categories).orderBy(categories.sortOrder, categories.name);
export const listStores = (db: DbOrTx) => db.select().from(stores).orderBy(stores.name);
export const findStore = async (db: DbOrTx, id: string) =>
  (await db.select().from(stores).where(eq(stores.id, id)).limit(1))[0] ?? null;

export const listInventory = async (
  db: DbOrTx,
  input: { storeId: string; page: number; limit: number; query?: string; lowStockOnly: boolean },
) => {
  const filters = [eq(inventory.storeId, input.storeId)];
  if (input.query) filters.push(like(products.name, `%${input.query}%`));
  if (input.lowStockOnly) filters.push(lte(inventory.stockQty, inventory.lowStockThreshold));
  const where = and(...filters);
  const total =
    (
      await db
        .select({ value: count() })
        .from(inventory)
        .innerJoin(products, eq(inventory.productId, products.id))
        .where(where)
    )[0]?.value ?? 0;
  const rows = await db
    .select({ inventory, product: products, category: categories })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(where)
    .orderBy(products.name)
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);
  return {
    items: rows.map((row) => ({
      ...row.inventory,
      product: { ...row.product, category: row.category },
    })),
    total,
  };
};

export const createProduct = async (db: DbOrTx, input: CreateAdminProductInput) => {
  const product = (await db.insert(products).values(input).returning())[0]!;
  const storeRows = await db.select({ id: stores.id }).from(stores);
  if (storeRows.length > 0) {
    await db
      .insert(inventory)
      .values(storeRows.map((store) => ({ storeId: store.id, productId: product.id })));
  }
  return product;
};
export const updateProduct = async (db: DbOrTx, id: string, patch: UpdateAdminProductInput) =>
  (
    await db
      .update(products)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning()
  )[0] ?? null;
export const createCategory = async (db: DbOrTx, input: AdminCategoryInput) =>
  (await db.insert(categories).values(input).returning())[0]!;
export const updateCategory = async (db: DbOrTx, id: string, patch: UpdateAdminCategoryInput) =>
  (await db.update(categories).set(patch).where(eq(categories.id, id)).returning())[0] ?? null;
export const createStore = async (db: DbOrTx, input: AdminStoreInput) => {
  const store = (await db.insert(stores).values(input).returning())[0]!;
  const productRows = await db.select({ id: products.id }).from(products);
  if (productRows.length > 0) {
    await db
      .insert(inventory)
      .values(productRows.map((product) => ({ storeId: store.id, productId: product.id })));
  }
  await db.insert(storeSlotConfig).values({ storeId: store.id });
  return store;
};
export const updateStore = async (db: DbOrTx, id: string, patch: UpdateAdminStoreInput) =>
  (
    await db
      .update(stores)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(stores.id, id))
      .returning()
  )[0] ?? null;

export const adjustInventory = async (
  db: DbOrTx,
  input: { inventoryId: string; delta: number; reason: string; adjustedBy: string },
) => {
  const rows = await db
    .update(inventory)
    .set({ stockQty: sql`${inventory.stockQty} + ${input.delta}`, updatedAt: new Date() })
    .where(and(eq(inventory.id, input.inventoryId), gte(inventory.stockQty, -input.delta)))
    .returning();
  const updated = rows[0] ?? null;
  if (!updated) return null;
  await db.insert(inventoryAdjustments).values(input);
  return updated;
};

export const findInventory = async (db: DbOrTx, id: string) => {
  const rows = await db
    .select({ inventory, product: products, category: categories })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(inventory.id, id))
    .limit(1);
  const row = rows[0];
  return row ? { ...row.inventory, product: { ...row.product, category: row.category } } : null;
};

const hydrateOrder = async (db: DbOrTx, order: typeof orders.$inferSelect) => {
  const [customer, store, address, items, history] = await Promise.all([
    db.select().from(users).where(eq(users.id, order.userId)).limit(1),
    db.select().from(stores).where(eq(stores.id, order.storeId)).limit(1),
    db.select().from(addresses).where(eq(addresses.id, order.addressId)).limit(1),
    db.select().from(orderItems).where(eq(orderItems.orderId, order.id)),
    db
      .select()
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.orderId, order.id))
      .orderBy(orderStatusHistory.createdAt),
  ]);
  return {
    ...order,
    customer: customer[0]!,
    store: store[0]!,
    address: address[0]!,
    items,
    history,
  };
};

export const listOrders = async (
  db: DbOrTx,
  input: { page: number; limit: number; status?: OrderStatus },
) => {
  const where = input.status ? eq(orders.status, input.status) : undefined;
  const total = (await db.select({ value: count() }).from(orders).where(where))[0]?.value ?? 0;
  const rows = await db
    .select()
    .from(orders)
    .where(where)
    .orderBy(desc(orders.placedAt))
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);
  return { items: await Promise.all(rows.map((order) => hydrateOrder(db, order))), total };
};

export const findOrder = async (db: DbOrTx, id: string) => {
  const order = (await db.select().from(orders).where(eq(orders.id, id)).limit(1))[0];
  return order ? hydrateOrder(db, order) : null;
};

export const adminRepo = {
  findCredentialByEmail,
  createSession,
  revokeSession,
  dashboard,
  listProducts,
  findProduct,
  listCategories,
  listStores,
  findStore,
  listInventory,
  createProduct,
  updateProduct,
  createCategory,
  updateCategory,
  createStore,
  updateStore,
  adjustInventory,
  findInventory,
  listOrders,
  findOrder,
};

export type AdminRepo = typeof adminRepo;
