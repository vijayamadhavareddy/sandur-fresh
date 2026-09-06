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
import { and, count, desc, eq, gte, isNull, like, lte, or, sql } from "drizzle-orm";
import type { OrderStatus } from "../orders/order-status";
import type {
  AdminCategoryInput,
  AdminStoreInput,
  CreateAdminProductInput,
  StoreType,
  UpdateAdminCategoryInput,
  UpdateAdminCustomerInput,
  UpdateAdminProductInput,
  UpdateAdminStoreInput,
} from "./admin.schemas";

export const hasAdmin = async (db: DbOrTx): Promise<boolean> => {
  const rows = await db.select({ val: count() }).from(adminCredentials).limit(1);
  return (rows[0]?.val ?? 0) > 0;
};

export const createAdminWithCredential = async (
  db: DbOrTx,
  input: { phone: string; name: string; email: string; passwordHash: string },
) => {
  const user = (
    await db
      .insert(users)
      .values({
        phone: input.phone,
        name: input.name,
        email: input.email,
        role: "admin",
      })
      .returning()
  )[0]!;

  const credential = (
    await db
      .insert(adminCredentials)
      .values({
        userId: user.id,
        email: input.email,
        passwordHash: input.passwordHash,
      })
      .returning()
  )[0]!;

  return { user, credential };
};

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
      .innerJoin(products, eq(inventory.productId, products.id))
      .where(
        and(
          lte(inventory.stockQty, inventory.lowStockThreshold),
          eq(products.trackInventory, true),
        ),
      ),
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
  input: {
    page: number;
    limit: number;
    query?: string;
    storeId?: string;
    categoryId?: string;
    isActive?: boolean;
    trackInventory?: boolean;
  },
) => {
  const filters = [];
  if (input.query) {
    filters.push(
      or(like(products.name, `%${input.query}%`), like(products.description, `%${input.query}%`)),
    );
  }
  if (input.storeId) {
    if (input.storeId === "global") {
      filters.push(isNull(products.storeId));
    } else {
      filters.push(eq(products.storeId, input.storeId));
    }
  }
  if (input.categoryId) {
    filters.push(eq(products.categoryId, input.categoryId));
  }
  if (input.isActive !== undefined) {
    filters.push(eq(products.isActive, input.isActive));
  }
  if (input.trackInventory !== undefined) {
    filters.push(eq(products.trackInventory, input.trackInventory));
  }
  const where = filters.length > 0 ? and(...filters) : undefined;
  const total = (await db.select({ value: count() }).from(products).where(where))[0]?.value ?? 0;
  const items = await db
    .select({ product: products, category: categories, store: stores })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(stores, eq(products.storeId, stores.id))
    .where(where)
    .orderBy(products.name)
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);
  return {
    items: items.map(({ product, category, store }) => ({ ...product, category, store })),
    total,
  };
};

export const findProduct = async (db: DbOrTx, id: string) => {
  const rows = await db
    .select({ product: products, category: categories, store: stores })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(stores, eq(products.storeId, stores.id))
    .where(eq(products.id, id))
    .limit(1);
  if (!rows[0]) return null;

  const product = rows[0].product;
  if (product.trackInventory) {
    if (product.storeId) {
      await db
        .insert(inventory)
        .values({ storeId: product.storeId, productId: product.id })
        .onConflictDoNothing();
    } else {
      const storeRows = await db.select({ id: stores.id }).from(stores);
      if (storeRows.length > 0) {
        await db
          .insert(inventory)
          .values(storeRows.map((store) => ({ storeId: store.id, productId: product.id })))
          .onConflictDoNothing();
      }
    }
  }

  const inventoryRows = await db
    .select({ inventory, store: stores })
    .from(inventory)
    .innerJoin(stores, eq(inventory.storeId, stores.id))
    .where(eq(inventory.productId, id))
    .orderBy(stores.name);

  return {
    ...product,
    category: rows[0].category,
    store: rows[0].store,
    inventory: inventoryRows.map((r) => ({
      ...r.inventory,
      store: r.store,
    })),
  };
};

export const getCategory = async (db: DbOrTx, id: string) =>
  (await db.select().from(categories).where(eq(categories.id, id)).limit(1))[0] ?? null;

export const listCategories = (db: DbOrTx) =>
  db.select().from(categories).orderBy(categories.sortOrder, categories.name);
export const listStores = (db: DbOrTx, filter?: { type?: StoreType }) => {
  const where = filter?.type ? eq(stores.type, filter.type) : undefined;
  return db.select().from(stores).where(where).orderBy(stores.name);
};
export const findStore = async (db: DbOrTx, id: string) =>
  (await db.select().from(stores).where(eq(stores.id, id)).limit(1))[0] ?? null;

export const listInventory = async (
  db: DbOrTx,
  input: { storeId: string; page: number; limit: number; query?: string; lowStockOnly: boolean },
) => {
  const filters = [eq(inventory.storeId, input.storeId), eq(products.trackInventory, true)];
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
    .select({ inventory, product: products, category: categories, store: stores })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .innerJoin(stores, eq(inventory.storeId, stores.id))
    .where(where)
    .orderBy(products.name)
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);
  return {
    items: rows.map((row) => ({
      ...row.inventory,
      store: row.store,
      product: { ...row.product, category: row.category },
    })),
    total,
  };
};

export const createProduct = async (db: DbOrTx, input: CreateAdminProductInput) => {
  const { initialStock, ...productValues } = input;
  const product = (await db.insert(products).values(productValues).returning())[0]!;
  if (
    product.trackInventory ||
    (initialStock !== undefined && initialStock !== null && initialStock > 0)
  ) {
    const stockQty = initialStock ?? 0;
    if (product.storeId) {
      await db
        .insert(inventory)
        .values({ storeId: product.storeId, productId: product.id, stockQty })
        .onConflictDoNothing();
    } else {
      const storeRows = await db.select({ id: stores.id }).from(stores);
      if (storeRows.length > 0) {
        await db
          .insert(inventory)
          .values(
            storeRows.map((store) => ({ storeId: store.id, productId: product.id, stockQty })),
          )
          .onConflictDoNothing();
      }
    }
  }
  return product;
};

export const createProductsBulk = async (db: DbOrTx, inputs: CreateAdminProductInput[]) => {
  const created = [];
  for (const input of inputs) {
    const product = await createProduct(db, input);
    created.push(product);
  }
  return created;
};
export const updateProduct = async (db: DbOrTx, id: string, patch: UpdateAdminProductInput) => {
  const updated =
    (
      await db
        .update(products)
        .set({ ...patch, updatedAt: new Date() })
        .where(eq(products.id, id))
        .returning()
    )[0] ?? null;

  if (updated?.trackInventory) {
    if (updated.storeId) {
      await db
        .insert(inventory)
        .values({ storeId: updated.storeId, productId: updated.id })
        .onConflictDoNothing();
    } else {
      const storeRows = await db.select({ id: stores.id }).from(stores);
      if (storeRows.length > 0) {
        await db
          .insert(inventory)
          .values(storeRows.map((store) => ({ storeId: store.id, productId: updated.id })))
          .onConflictDoNothing();
      }
    }
  }

  return updated;
};
export const createCategory = async (db: DbOrTx, input: AdminCategoryInput) =>
  (await db.insert(categories).values(input).returning())[0]!;
export const createCategoriesBulk = async (db: DbOrTx, inputs: AdminCategoryInput[]) => {
  const created = [];
  for (const input of inputs) {
    const row = (await db.insert(categories).values(input).returning())[0]!;
    created.push(row);
  }
  return created;
};
export const updateCategory = async (db: DbOrTx, id: string, patch: UpdateAdminCategoryInput) =>
  (await db.update(categories).set(patch).where(eq(categories.id, id)).returning())[0] ?? null;
export const createStore = async (db: DbOrTx, input: AdminStoreInput) => {
  const store = (await db.insert(stores).values(input).returning())[0]!;
  const productRows = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.trackInventory, true));
  if (productRows.length > 0) {
    await db
      .insert(inventory)
      .values(productRows.map((product) => ({ storeId: store.id, productId: product.id })));
  }
  await db.insert(storeSlotConfig).values({ storeId: store.id });
  return store;
};

export const createStoresBulk = async (db: DbOrTx, inputs: AdminStoreInput[]) => {
  const createdStores = [];
  const productRows = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.trackInventory, true));

  for (const input of inputs) {
    const store = (await db.insert(stores).values(input).returning())[0]!;
    if (productRows.length > 0) {
      await db
        .insert(inventory)
        .values(productRows.map((product) => ({ storeId: store.id, productId: product.id })));
    }
    await db.insert(storeSlotConfig).values({ storeId: store.id });
    createdStores.push(store);
  }
  return createdStores;
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
    .select({ inventory, product: products, category: categories, store: stores })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .innerJoin(stores, eq(inventory.storeId, stores.id))
    .where(eq(inventory.id, id))
    .limit(1);
  const row = rows[0];
  return row
    ? {
        ...row.inventory,
        store: row.store,
        product: { ...row.product, category: row.category },
      }
    : null;
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

export const listCustomers = async (
  db: DbOrTx,
  input: { page: number; limit: number; query?: string },
) => {
  const baseFilter = eq(users.role, "customer");
  const where = input.query
    ? and(
        baseFilter,
        or(
          like(users.name, `%${input.query}%`),
          like(users.phone, `%${input.query}%`),
          like(users.email, `%${input.query}%`),
        ),
      )
    : baseFilter;
  const total = (await db.select({ value: count() }).from(users).where(where))[0]?.value ?? 0;
  const items = await db
    .select()
    .from(users)
    .where(where)
    .orderBy(desc(users.createdAt))
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);
  return { items, total };
};

export const findCustomer = async (db: DbOrTx, id: string) =>
  (
    await db
      .select()
      .from(users)
      .where(and(eq(users.id, id), eq(users.role, "customer")))
      .limit(1)
  )[0] ?? null;

export const updateCustomer = async (db: DbOrTx, id: string, patch: UpdateAdminCustomerInput) =>
  (
    await db
      .update(users)
      .set({ ...patch, updatedAt: new Date() })
      .where(and(eq(users.id, id), eq(users.role, "customer")))
      .returning()
  )[0] ?? null;

export const adminRepo = {
  hasAdmin,
  createAdminWithCredential,
  findCredentialByEmail,
  createSession,
  revokeSession,
  dashboard,
  listProducts,
  findProduct,
  getCategory,
  listCategories,
  listStores,
  findStore,
  listInventory,
  createProduct,
  createProductsBulk,
  updateProduct,
  createCategory,
  createCategoriesBulk,
  updateCategory,
  createStore,
  createStoresBulk,
  updateStore,
  adjustInventory,
  findInventory,
  listOrders,
  findOrder,
  listCustomers,
  findCustomer,
  updateCustomer,
};

export type AdminRepo = typeof adminRepo;
