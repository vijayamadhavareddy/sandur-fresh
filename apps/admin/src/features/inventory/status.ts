import type { AdminInventoryQuery } from "@/api/generated/graphql";

type InventoryItem = NonNullable<
  NonNullable<AdminInventoryQuery["adminInventory"]>["items"]
>[number];
export const isLowStock = (item: InventoryItem) => item.stockQty <= item.lowStockThreshold;
