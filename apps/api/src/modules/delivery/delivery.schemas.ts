import { z } from "zod";
import { latSchema, lngSchema, uuidSchema } from "../../shared/schemas";

export const serviceabilityQuerySchema = z
  .object({
    lat: latSchema.optional(),
    lng: lngSchema.optional(),
    addressId: uuidSchema.optional(),
  })
  .refine((v) => v.addressId !== undefined || (v.lat !== undefined && v.lng !== undefined), {
    message: "Provide addressId or both lat and lng",
  });

export type ServiceabilityQuery = z.infer<typeof serviceabilityQuerySchema>;

export const slotsQuerySchema = z.object({
  addressId: uuidSchema,
});

export type SlotsQuery = z.infer<typeof slotsQuerySchema>;
