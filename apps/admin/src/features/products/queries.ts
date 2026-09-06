import { request } from "@/api/client";
import {
  AdminCategoriesDocument,
  AdminCategoryDocument,
  AdminProductDocument,
  AdminProductsDocument,
  TimeBoundSectionsDocument,
} from "@/api/generated/graphql";

export const fetchProducts = (
  page: number,
  limit: number,
  query?: string,
  storeId?: string,
  categoryId?: string,
  isActive?: boolean,
  trackInventory?: boolean,
) =>
  request(AdminProductsDocument, {
    page,
    limit,
    query: query || undefined,
    storeId: storeId || undefined,
    categoryId: categoryId || undefined,
    isActive: isActive !== undefined ? isActive : undefined,
    trackInventory: trackInventory !== undefined ? trackInventory : undefined,
  });
export const fetchProduct = (id: string) => request(AdminProductDocument, { id });
export const fetchCategories = () => request(AdminCategoriesDocument);
export const fetchCategory = (id: string) => request(AdminCategoryDocument, { id });
export const fetchTimeBoundSections = () => request(TimeBoundSectionsDocument);
