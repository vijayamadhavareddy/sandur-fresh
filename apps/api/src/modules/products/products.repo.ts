import type { DbOrTx } from "@sf/db";
import { categories, inventory, products, stores } from "@sf/db";
import { and, count, eq, isNull, like, or, sql } from "drizzle-orm";

export type ProductRow = typeof products.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type StoreRow = typeof stores.$inferSelect;
export type InventoryRow = typeof inventory.$inferSelect;

export const listCategories = async (db: DbOrTx) =>
  db.select().from(categories).orderBy(categories.sortOrder, categories.name);

export const findProductById = async (db: DbOrTx, id: string) => {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0] ?? null;
};

export const listProducts = async (
  db: DbOrTx,
  input: {
    page: number;
    limit: number;
    categoryId?: string;
    q?: string;
    storeId?: string;
  },
) => {
  const filters = [eq(products.isActive, true)];
  if (input.categoryId) filters.push(eq(products.categoryId, input.categoryId));
  if (input.q) filters.push(like(products.name, `%${input.q}%`));
  if (input.storeId) {
    filters.push(or(isNull(products.storeId), eq(products.storeId, input.storeId))!);
  }

  const where = and(...filters);
  const offset = (input.page - 1) * input.limit;

  const totalRows = await db.select({ value: count() }).from(products).where(where);
  const total = totalRows[0]?.value ?? 0;

  if (input.storeId) {
    const rows = await db
      .select({
        product: products,
        stockQty: inventory.stockQty,
      })
      .from(products)
      .leftJoin(
        inventory,
        and(eq(inventory.productId, products.id), eq(inventory.storeId, input.storeId)),
      )
      .where(where)
      .orderBy(products.name)
      .limit(input.limit)
      .offset(offset);

    return {
      total,
      items: rows.map((r) => ({
        ...r.product,
        stockQty: r.stockQty ?? 0,
      })),
    };
  }

  const rows = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(products.name)
    .limit(input.limit)
    .offset(offset);

  return { total, items: rows };
};

export const listStores = async (db: DbOrTx) =>
  db.select().from(stores).where(eq(stores.isActive, true)).orderBy(stores.name);

export const findStoreById = async (db: DbOrTx, id: string) => {
  const rows = await db.select().from(stores).where(eq(stores.id, id)).limit(1);
  return rows[0] ?? null;
};

export const listActiveStores = async (db: DbOrTx) =>
  db.select().from(stores).where(eq(stores.isActive, true));

export const findInventory = async (db: DbOrTx, storeId: string, productId: string) => {
  const rows = await db
    .select()
    .from(inventory)
    .where(and(eq(inventory.storeId, storeId), eq(inventory.productId, productId)))
    .limit(1);
  return rows[0] ?? null;
};

export const listInventoryByStore = async (db: DbOrTx, storeId: string) =>
  db
    .select({
      inventory,
      product: products,
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(eq(inventory.storeId, storeId));

/** Decrement stock if enough quantity; returns updated row or null if insufficient. */
export const decrementStock = async (
  db: DbOrTx,
  storeId: string,
  productId: string,
  quantity: number,
) => {
  const rows = await db
    .update(inventory)
    .set({
      stockQty: sql`${inventory.stockQty} - ${quantity}`,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(inventory.storeId, storeId),
        eq(inventory.productId, productId),
        sql`${inventory.stockQty} >= ${quantity}`,
      ),
    )
    .returning();
  return rows[0] ?? null;
};

export const incrementStock = async (
  db: DbOrTx,
  storeId: string,
  productId: string,
  quantity: number,
) => {
  const rows = await db
    .update(inventory)
    .set({
      stockQty: sql`${inventory.stockQty} + ${quantity}`,
      updatedAt: new Date(),
    })
    .where(and(eq(inventory.storeId, storeId), eq(inventory.productId, productId)))
    .returning();
  return rows[0] ?? null;
};

export const productsRepo = {
  listCategories,
  findProductById,
  listProducts,
  listStores,
  findStoreById,
  listActiveStores,
  findInventory,
  listInventoryByStore,
  decrementStock,
  incrementStock,
};

export type ProductsRepo = typeof productsRepo;
