import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const adjustmentSchema = toTypedSchema(
  z.object({
    delta: z.coerce
      .number()
      .int()
      .refine((value) => value !== 0, "Adjustment cannot be zero"),
    reason: z.string().min(3),
  }),
);
