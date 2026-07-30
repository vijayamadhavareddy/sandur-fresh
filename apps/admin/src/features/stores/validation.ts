import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const storeFormSchema = z.object({
  name: z.string().min(2, "Store name is required (min 2 chars)"),
  type: z.enum(["DARK_STORE", "THIRD_PARTY"]),
  partnerName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email("Enter a valid email address").or(z.literal("")).optional(),
  commissionPct: z.coerce.number().int().min(0).max(100).optional(),
  address: z.string().min(5, "Address is required (min 5 chars)"),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  serviceRadiusM: z.coerce.number().int().positive(),
  isActive: z.boolean(),
});

export type StoreFormValues = z.infer<typeof storeFormSchema>;

export const storeSchema = toTypedSchema(storeFormSchema);
