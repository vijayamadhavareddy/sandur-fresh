import type { Db } from "../../db/client";
import { type DomainError, notFound } from "../../shared/errors";
import { err, ok, type Result } from "../../shared/result";
import type { CategoryRow, ProductsRepo, StoreRow } from "./products.repo";
import type { ListProductsQuery } from "./products.schemas";

export type ProductsServiceDeps = {
  db: Db;
  productsRepo: ProductsRepo;
};

export const createProductsService = (deps: ProductsServiceDeps) => {
  const listCategories = async (): Promise<Result<CategoryRow[], DomainError>> => {
    const rows = await deps.productsRepo.listCategories(deps.db);
    return ok(rows);
  };

  const listProducts = async (query: ListProductsQuery) => {
    const result = await deps.productsRepo.listProducts(deps.db, query);
    return ok({
      items: result.items,
      meta: { page: query.page, limit: query.limit, total: result.total },
    });
  };

  const getProduct = async (id: string) => {
    const product = await deps.productsRepo.findProductById(deps.db, id);
    if (!product?.isActive) return err(notFound("Product not found"));
    return ok(product);
  };

  const listStores = async (): Promise<Result<StoreRow[], DomainError>> => {
    const rows = await deps.productsRepo.listStores(deps.db);
    return ok(rows);
  };

  const getStoreInventory = async (storeId: string) => {
    const store = await deps.productsRepo.findStoreById(deps.db, storeId);
    if (!store) return err(notFound("Store not found"));
    const rows = await deps.productsRepo.listInventoryByStore(deps.db, storeId);
    return ok(
      rows.map((r) => ({
        productId: r.product.id,
        name: r.product.name,
        stockQty: r.inventory.stockQty,
        price: r.product.price,
        mrp: r.product.mrp,
      })),
    );
  };

  return {
    listCategories,
    listProducts,
    getProduct,
    listStores,
    getStoreInventory,
  };
};

export type ProductsService = ReturnType<typeof createProductsService>;
