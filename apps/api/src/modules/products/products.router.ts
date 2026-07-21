import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { AppEnv } from "../../types/hono";
import type { ProductsHandlers } from "./products.handlers";
import {
  listProductsQuerySchema,
  productIdParamSchema,
  storeIdParamSchema,
} from "./products.schemas";

export const createProductsRouter = (handlers: ProductsHandlers) => {
  const router = new Hono<AppEnv>();

  router.get("/categories", handlers.listCategories);
  router.get("/products", zValidator("query", listProductsQuerySchema), handlers.listProducts);
  router.get("/products/:id", zValidator("param", productIdParamSchema), handlers.getProduct);
  router.get("/stores", handlers.listStores);
  router.get(
    "/stores/:id/inventory",
    zValidator("param", storeIdParamSchema),
    handlers.getStoreInventory,
  );

  return router;
};
