import { request } from "@/api/client";
import { type AdminOrderStatus, TransitionAdminOrderDocument } from "@/api/generated/graphql";

export const transitionOrder = (orderId: string, status: AdminOrderStatus, reason?: string) =>
  request(TransitionAdminOrderDocument, { orderId, status, reason: reason || undefined });
