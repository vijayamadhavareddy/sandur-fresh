import { request, uploadProductImage } from "@/api/client";
import { CreateAdminProductDocument, UpdateAdminProductDocument } from "@/api/generated/graphql";
import type { ProductFormValues } from "./validation";

const toVariables = (input: ProductFormValues) => ({
  ...input,
  timeBoundSections: input.timeBoundSections ?? [],
  storeId: input.storeId ? input.storeId : null,
});

export const createProduct = (input: ProductFormValues) =>
  request(CreateAdminProductDocument, toVariables(input));
export const updateProduct = (id: string, input: ProductFormValues) =>
  request(UpdateAdminProductDocument, { id, ...toVariables(input) });
export { uploadProductImage };
