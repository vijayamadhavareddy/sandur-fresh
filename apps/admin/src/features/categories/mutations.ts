import { request } from "@/api/client";
import {
  type AdminCategoryInput,
  BulkCreateAdminCategoriesDocument,
  CreateAdminCategoryDocument,
  UpdateAdminCategoryDocument,
} from "@/api/generated/graphql";
import type { CategoryFormValues } from "./validation";

export const createCategory = (input: CategoryFormValues) =>
  request(CreateAdminCategoryDocument, input);
export const bulkCreateCategories = (categories: AdminCategoryInput[]) =>
  request(BulkCreateAdminCategoriesDocument, { categories });
export const updateCategory = (id: string, input: CategoryFormValues) =>
  request(UpdateAdminCategoryDocument, { id, ...input });
