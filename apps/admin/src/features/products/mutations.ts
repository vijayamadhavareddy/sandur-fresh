import { request, uploadProductImage } from "@/api/client";
import {
  type AdminProductInput,
  BulkCreateAdminProductsDocument,
  CreateAdminProductDocument,
  UpdateAdminProductDocument,
} from "@/api/generated/graphql";
import type { ProductFormValues } from "./validation";

const toVariables = (input: ProductFormValues) => ({
  ...input,
  timeBoundSections: input.timeBoundSections ?? [],
  storeId: input.storeId ? input.storeId : null,
});

export const createProduct = (input: ProductFormValues) =>
  request(CreateAdminProductDocument, toVariables(input));
export const bulkCreateProducts = (products: AdminProductInput[]) =>
  request(BulkCreateAdminProductsDocument, { products });
export const updateProduct = (id: string, input: ProductFormValues) =>
  request(UpdateAdminProductDocument, { id, ...toVariables(input) });
export const updateProductPatch = (
  id: string,
  patch: Partial<ProductFormValues> & { trackInventory?: boolean },
) => request(UpdateAdminProductDocument, { id, ...patch });
export { uploadProductImage };
