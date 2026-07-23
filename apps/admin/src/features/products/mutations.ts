import { request, uploadProductImage } from "@/api/client";
import { CreateAdminProductDocument, UpdateAdminProductDocument } from "@/api/generated/graphql";
import type { ProductFormValues } from "./validation";

export const createProduct = (input: ProductFormValues) =>
  request(CreateAdminProductDocument, input);
export const updateProduct = (id: string, input: ProductFormValues) =>
  request(UpdateAdminProductDocument, { id, ...input });
export { uploadProductImage };
