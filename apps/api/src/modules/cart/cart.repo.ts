import { and, eq } from "drizzle-orm";
import type { DbOrTx } from "../../db/client";
import { cartItems, carts, products } from "../../db/schema";

export type CartRow = typeof carts.$inferSelect;
export type CartItemRow = typeof cartItems.$inferSelect;

export const findCartByUser = async (db: DbOrTx, userId: string) => {
  const rows = await db.select().from(carts).where(eq(carts.userId, userId)).limit(1);
  return rows[0] ?? null;
};

export const createCart = async (db: DbOrTx, userId: string, storeId: string) => {
  const rows = await db.insert(carts).values({ userId, storeId }).returning();
  return rows[0]!;
};

export const updateCartStore = async (db: DbOrTx, cartId: string, storeId: string) => {
  const rows = await db
    .update(carts)
    .set({ storeId, updatedAt: new Date() })
    .where(eq(carts.id, cartId))
    .returning();
  return rows[0] ?? null;
};

export const listCartItemsWithProducts = async (db: DbOrTx, cartId: string) =>
  db
    .select({
      item: cartItems,
      product: products,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cartId));

export const findCartItem = async (db: DbOrTx, itemId: string) => {
  const rows = await db.select().from(cartItems).where(eq(cartItems.id, itemId)).limit(1);
  return rows[0] ?? null;
};

export const findCartItemByProduct = async (db: DbOrTx, cartId: string, productId: string) => {
  const rows = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)))
    .limit(1);
  return rows[0] ?? null;
};

export const upsertCartItem = async (
  db: DbOrTx,
  input: { cartId: string; productId: string; quantity: number },
) => {
  const existing = await findCartItemByProduct(db, input.cartId, input.productId);
  if (existing) {
    const rows = await db
      .update(cartItems)
      .set({ quantity: input.quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, existing.id))
      .returning();
    return rows[0]!;
  }
  const rows = await db.insert(cartItems).values(input).returning();
  return rows[0]!;
};

export const updateCartItemQuantity = async (db: DbOrTx, itemId: string, quantity: number) => {
  const rows = await db
    .update(cartItems)
    .set({ quantity, updatedAt: new Date() })
    .where(eq(cartItems.id, itemId))
    .returning();
  return rows[0] ?? null;
};

export const deleteCartItem = async (db: DbOrTx, itemId: string) => {
  const rows = await db.delete(cartItems).where(eq(cartItems.id, itemId)).returning();
  return rows[0] ?? null;
};

export const clearCartItems = async (db: DbOrTx, cartId: string) => {
  await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
};

export const deleteCart = async (db: DbOrTx, cartId: string) => {
  await db.delete(carts).where(eq(carts.id, cartId));
};

export const cartRepo = {
  findCartByUser,
  createCart,
  updateCartStore,
  listCartItemsWithProducts,
  findCartItem,
  findCartItemByProduct,
  upsertCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartItems,
  deleteCart,
};

export type CartRepo = typeof cartRepo;
