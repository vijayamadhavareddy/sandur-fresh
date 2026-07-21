import { z } from "zod";
import { latSchema, lngSchema, phoneSchema, uuidSchema } from "../../shared/schemas";

export const requestOtpBodySchema = z
  .object({
    phone: phoneSchema,
  })
  .strict();

export type RequestOtpInput = z.infer<typeof requestOtpBodySchema>;

export const verifyOtpBodySchema = z
  .object({
    phone: phoneSchema,
    code: z.string().min(4).max(8),
  })
  .strict();

export type VerifyOtpInput = z.infer<typeof verifyOtpBodySchema>;

export const updateProfileBodySchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),
    email: z.string().email().nullable().optional(),
  })
  .strict();

export type UpdateProfileInput = z.infer<typeof updateProfileBodySchema>;

export const addressBodySchema = z
  .object({
    label: z.string().trim().min(1).max(64),
    line1: z.string().trim().min(1).max(255),
    line2: z.string().trim().max(255).nullable().optional(),
    city: z.string().trim().min(1).max(128),
    pincode: z.string().trim().min(4).max(16),
    phone: phoneSchema,
    lat: latSchema,
    lng: lngSchema,
    isDefault: z.boolean().optional(),
  })
  .strict();

export type AddressInput = z.infer<typeof addressBodySchema>;

export const updateAddressBodySchema = addressBodySchema.partial().strict();

export type UpdateAddressInput = z.infer<typeof updateAddressBodySchema>;

export const addressIdParamSchema = z.object({
  id: uuidSchema,
});
