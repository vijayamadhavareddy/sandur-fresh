import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const productFormSchema = z
  .object({
    name: z.string().min(2),
    description: z.string(),
    unit: z.string().min(1),
    mrp: z.coerce.number().int().nonnegative(),
    price: z.coerce.number().int().nonnegative(),
    originalPrice: z.coerce.number().int().nonnegative().optional(),
    markup: z.coerce.number().int().nonnegative().optional(),
    markupType: z.enum(["PERCENTAGE", "AMOUNT"]).optional(),
    categoryId: z.string().min(1),
    imageUrl: z.string().optional(),
    timeBoundSections: z.array(z.enum(["BREAKFAST", "LUNCH", "DINNER"])),
    isActive: z.boolean(),
  })
  .refine((value) => value.price <= value.mrp, {
    message: "Price cannot exceed MRP",
    path: ["price"],
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productSchema = toTypedSchema(productFormSchema);
