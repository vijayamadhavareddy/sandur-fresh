import { request } from "@/api/client";
import {
  AdminOrderDocument,
  type AdminOrderStatus,
  AdminOrdersDocument,
} from "@/api/generated/graphql";

export const fetchOrders = (page: number, limit: number, status?: AdminOrderStatus) =>
  request(AdminOrdersDocument, { page, limit, status });
export const fetchOrder = (id: string) => request(AdminOrderDocument, { id });
