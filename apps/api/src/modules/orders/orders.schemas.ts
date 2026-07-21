import { z } from "zod";
import { paginationSchema, uuidSchema } from "../../shared/schemas";
import { ORDER_STATUSES } from "./order-status";

export const checkoutBodySchema = z
  .object({
    addressId: uuidSchema,
    paymentMethod: z.enum(["COD", "UPI", "CARD"]).default("COD"),
  })
  .strict();

export type CheckoutInput = z.infer<typeof checkoutBodySchema>;

export const listOrdersQuerySchema = paginationSchema;

export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>;

export const orderIdParamSchema = z.object({
  id: uuidSchema,
});

export const updateOrderStatusBodySchema = z
  .object({
    status: z.enum(ORDER_STATUSES),
  })
  .strict();

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusBodySchema>;
