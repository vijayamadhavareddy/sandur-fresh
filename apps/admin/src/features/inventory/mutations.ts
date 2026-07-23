import { request } from "@/api/client";
import { AdjustAdminInventoryDocument } from "@/api/generated/graphql";

export const adjustInventory = (inventoryId: string, delta: number, reason: string) =>
  request(AdjustAdminInventoryDocument, { inventoryId, delta, reason });
