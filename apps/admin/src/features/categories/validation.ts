import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const categoryFormSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sortOrder: z.coerce.number().int(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const categorySchema = toTypedSchema(categoryFormSchema);
