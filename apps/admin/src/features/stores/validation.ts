import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const storeFormSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  serviceRadiusM: z.coerce.number().int().positive(),
  isActive: z.boolean(),
});

export type StoreFormValues = z.infer<typeof storeFormSchema>;

export const storeSchema = toTypedSchema(storeFormSchema);
