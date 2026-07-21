import { z } from "zod";
import { uuidSchema } from "../../shared/schemas";

export const addCartItemBodySchema = z
  .object({
    productId: uuidSchema,
    quantity: z.number().int().min(1).max(99),
    storeId: uuidSchema.optional(),
  })
  .strict();

export type AddCartItemInput = z.infer<typeof addCartItemBodySchema>;

export const updateCartItemBodySchema = z
  .object({
    quantity: z.number().int().min(1).max(99),
  })
  .strict();

export type UpdateCartItemInput = z.infer<typeof updateCartItemBodySchema>;

export const cartItemIdParamSchema = z.object({
  id: uuidSchema,
});
