import { request } from "@/api/client";
import { AdminInventoryDocument } from "@/api/generated/graphql";

export const fetchInventory = (
  storeId: string,
  page: number,
  limit: number,
  query: string,
  lowStockOnly: boolean,
) =>
  request(AdminInventoryDocument, {
    storeId,
    page,
    limit,
    query: query || undefined,
    lowStockOnly,
  });
