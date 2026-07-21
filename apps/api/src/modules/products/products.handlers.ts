import type { Context } from "hono";
import { fromResult, jsonList, valid } from "../../shared/http";
import type { AppEnv } from "../../types/hono";
import type { ListProductsQuery } from "./products.schemas";
import type { ProductsService } from "./products.service";

export const createProductsHandlers = (productsService: ProductsService) => {
  const listCategories = async (c: Context<AppEnv>) => {
    const result = await productsService.listCategories();
    return fromResult(c, result);
  };

  const listProducts = async (c: Context<AppEnv>) => {
    const query = valid<ListProductsQuery>(c, "query");
    const result = await productsService.listProducts(query);
    if (!result.ok) return fromResult(c, result);
    return jsonList(c, result.value.items, result.value.meta);
  };

  const getProduct = async (c: Context<AppEnv>) => {
    const { id } = valid<{ id: string }>(c, "param");
    const result = await productsService.getProduct(id);
    return fromResult(c, result);
  };

  const listStores = async (c: Context<AppEnv>) => {
    const result = await productsService.listStores();
    return fromResult(c, result);
  };

  const getStoreInventory = async (c: Context<AppEnv>) => {
    const { id } = valid<{ id: string }>(c, "param");
    const result = await productsService.getStoreInventory(id);
    return fromResult(c, result);
  };

  return {
    listCategories,
    listProducts,
    getProduct,
    listStores,
    getStoreInventory,
  };
};

export type ProductsHandlers = ReturnType<typeof createProductsHandlers>;
