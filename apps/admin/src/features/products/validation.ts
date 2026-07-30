import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const productFormSchema = z
  .object({
    name: z.string().min(2),
    description: z.string(),
    unit: z.string().min(1),
    mrp: z.coerce.number().int().nonnegative(),
    price: z.coerce.number().int().nonnegative(),
    categoryId: z.string().min(1),
    imageUrl: z.string().optional(),
    // "" = untagged; the mutation maps it to null.
    timeBoundSection: z.enum(["", "BREAKFAST", "LUNCH", "DINNER"]),
    isActive: z.boolean(),
  })
  .refine((value) => value.price <= value.mrp, {
    message: "Price cannot exceed MRP",
    path: ["price"],
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productSchema = toTypedSchema(productFormSchema);
