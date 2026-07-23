import { request } from "@/api/client";
import { CreateAdminCategoryDocument, UpdateAdminCategoryDocument } from "@/api/generated/graphql";
import type { CategoryFormValues } from "./validation";

export const createCategory = (input: CategoryFormValues) =>
  request(CreateAdminCategoryDocument, input);
export const updateCategory = (id: string, input: CategoryFormValues) =>
  request(UpdateAdminCategoryDocument, { id, ...input });
