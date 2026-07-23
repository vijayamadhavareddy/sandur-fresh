import type { AdminOrderStatus } from "@/api/generated/graphql";

export const orderStatuses: AdminOrderStatus[] = [
  "PLACED",
  "PACKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];
export const statusLabel = (status: AdminOrderStatus) => status.toLowerCase().replaceAll("_", " ");
