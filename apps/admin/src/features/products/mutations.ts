import { request, uploadProductImage } from "@/api/client";
import { CreateAdminProductDocument, UpdateAdminProductDocument } from "@/api/generated/graphql";
import type { ProductFormValues } from "./validation";

/** The form uses "" for "no section"; the API expects null to clear the tag. */
const toVariables = ({ timeBoundSection, ...rest }: ProductFormValues) => ({
  ...rest,
  timeBoundSection: timeBoundSection === "" ? null : timeBoundSection,
});

export const createProduct = (input: ProductFormValues) =>
  request(CreateAdminProductDocument, toVariables(input));
export const updateProduct = (id: string, input: ProductFormValues) =>
  request(UpdateAdminProductDocument, { id, ...toVariables(input) });
export { uploadProductImage };
