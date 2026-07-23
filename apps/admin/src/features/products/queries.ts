import { request } from "@/api/client";
import {
  AdminCategoriesDocument,
  AdminProductDocument,
  AdminProductsDocument,
} from "@/api/generated/graphql";

export const fetchProducts = (page: number, limit: number, query?: string) =>
  request(AdminProductsDocument, { page, limit, query: query || undefined });
export const fetchProduct = (id: string) => request(AdminProductDocument, { id });
export const fetchCategories = () => request(AdminCategoriesDocument);
