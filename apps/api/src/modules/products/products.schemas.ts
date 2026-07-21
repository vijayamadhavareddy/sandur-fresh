import { z } from "zod";
import { paginationSchema, uuidSchema } from "../../shared/schemas";

export const listProductsQuerySchema = paginationSchema.extend({
  categoryId: uuidSchema.optional(),
  q: z.string().trim().min(1).max(100).optional(),
  storeId: uuidSchema.optional(),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;

export const productIdParamSchema = z.object({
  id: uuidSchema,
});

export const storeIdParamSchema = z.object({
  id: uuidSchema,
});
