import type { Db } from "../../db/client";
import { conflict, type DomainError, notFound, outOfStock } from "../../shared/errors";
import { summarizeCart } from "../../shared/pricing";
import { err, ok, type Result } from "../../shared/result";
import type { ProductsRepo } from "../products/products.repo";
import type { CartRepo } from "./cart.repo";
import type { AddCartItemInput, UpdateCartItemInput } from "./cart.schemas";

export type CartServiceDeps = {
  db: Db;
  cartRepo: CartRepo;
  productsRepo: ProductsRepo;
};

export type CartViewItem = {
  id: string;
  productId: string;
  name: string;
  unit: string;
  emoji: string | null;
  price: number;
  mrp: number;
  quantity: number;
  lineTotal: number;
  lineSavings: number;
  stockQty: number;
};

export type CartView = {
  id: string | null;
  storeId: string | null;
  items: CartViewItem[];
  subtotal: number;
  savings: number;
  deliveryFee: number;
  discount: number;
  total: number;
};

const emptyCart = (): CartView => ({
  id: null,
  storeId: null,
  items: [],
  subtotal: 0,
  savings: 0,
  deliveryFee: 0,
  discount: 0,
  total: 0,
});

export const createCartService = (deps: CartServiceDeps) => {
  const buildCartView = async (userId: string): Promise<CartView> => {
    const cart = await deps.cartRepo.findCartByUser(deps.db, userId);
    if (!cart) return emptyCart();

    const rows = await deps.cartRepo.listCartItemsWithProducts(deps.db, cart.id);
    const items: CartViewItem[] = [];

    for (const row of rows) {
      const inv = await deps.productsRepo.findInventory(deps.db, cart.storeId, row.product.id);
      const stockQty = inv?.stockQty ?? 0;
      const lineTotal = row.product.price * row.item.quantity;
      const lineSavings = Math.max(0, row.product.mrp - row.product.price) * row.item.quantity;
      items.push({
        id: row.item.id,
        productId: row.product.id,
        name: row.product.name,
        unit: row.product.unit,
        emoji: row.product.emoji,
        price: row.product.price,
        mrp: row.product.mrp,
        quantity: row.item.quantity,
        lineTotal,
        lineSavings,
        stockQty,
      });
    }

    const summary = summarizeCart(
      items.map((i) => ({ price: i.price, mrp: i.mrp, quantity: i.quantity })),
    );

    return {
      id: cart.id,
      storeId: cart.storeId,
      items,
      ...summary,
    };
  };

  const getCart = async (userId: string): Promise<Result<CartView, DomainError>> =>
    ok(await buildCartView(userId));

  const resolveStoreId = async (preferred?: string): Promise<Result<string, DomainError>> => {
    if (preferred) {
      const store = await deps.productsRepo.findStoreById(deps.db, preferred);
      if (!store?.isActive) return err(notFound("Store not found"));
      return ok(store.id);
    }
    const stores = await deps.productsRepo.listStores(deps.db);
    const first = stores[0];
    if (!first) return err(notFound("No active stores available"));
    return ok(first.id);
  };

  const addItem = async (
    userId: string,
    input: AddCartItemInput,
  ): Promise<Result<CartView, DomainError>> => {
    const product = await deps.productsRepo.findProductById(deps.db, input.productId);
    if (!product?.isActive) return err(notFound("Product not found"));

    let cart = await deps.cartRepo.findCartByUser(deps.db, userId);

    if (!cart) {
      const storeResult = await resolveStoreId(input.storeId);
      if (!storeResult.ok) return storeResult;
      cart = await deps.cartRepo.createCart(deps.db, userId, storeResult.value);
    } else if (input.storeId && input.storeId !== cart.storeId) {
      const items = await deps.cartRepo.listCartItemsWithProducts(deps.db, cart.id);
      if (items.length > 0) {
        return err(
          conflict("Cart belongs to a different store; clear cart before switching stores"),
        );
      }
      const storeResult = await resolveStoreId(input.storeId);
      if (!storeResult.ok) return storeResult;
      cart = (await deps.cartRepo.updateCartStore(deps.db, cart.id, storeResult.value)) ?? cart;
    }

    const inv = await deps.productsRepo.findInventory(deps.db, cart.storeId, input.productId);
    const stockQty = inv?.stockQty ?? 0;
    if (input.quantity > stockQty) {
      return err(outOfStock("Insufficient stock", { available: stockQty }));
    }

    await deps.cartRepo.upsertCartItem(deps.db, {
      cartId: cart.id,
      productId: input.productId,
      quantity: input.quantity,
    });

    return ok(await buildCartView(userId));
  };

  const updateItem = async (
    userId: string,
    itemId: string,
    input: UpdateCartItemInput,
  ): Promise<Result<CartView, DomainError>> => {
    const cart = await deps.cartRepo.findCartByUser(deps.db, userId);
    if (!cart) return err(notFound("Cart not found"));

    const item = await deps.cartRepo.findCartItem(deps.db, itemId);
    if (!item || item.cartId !== cart.id) return err(notFound("Cart item not found"));

    const inv = await deps.productsRepo.findInventory(deps.db, cart.storeId, item.productId);
    const stockQty = inv?.stockQty ?? 0;
    if (input.quantity > stockQty) {
      return err(outOfStock("Insufficient stock", { available: stockQty }));
    }

    await deps.cartRepo.updateCartItemQuantity(deps.db, itemId, input.quantity);
    return ok(await buildCartView(userId));
  };

  const removeItem = async (
    userId: string,
    itemId: string,
  ): Promise<Result<CartView, DomainError>> => {
    const cart = await deps.cartRepo.findCartByUser(deps.db, userId);
    if (!cart) return err(notFound("Cart not found"));

    const item = await deps.cartRepo.findCartItem(deps.db, itemId);
    if (!item || item.cartId !== cart.id) return err(notFound("Cart item not found"));

    await deps.cartRepo.deleteCartItem(deps.db, itemId);
    return ok(await buildCartView(userId));
  };

  const clearCart = async (userId: string): Promise<Result<CartView, DomainError>> => {
    const cart = await deps.cartRepo.findCartByUser(deps.db, userId);
    if (!cart) return ok(emptyCart());
    await deps.cartRepo.clearCartItems(deps.db, cart.id);
    return ok(await buildCartView(userId));
  };

  return {
    getCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    buildCartView,
  };
};

export type CartService = ReturnType<typeof createCartService>;
