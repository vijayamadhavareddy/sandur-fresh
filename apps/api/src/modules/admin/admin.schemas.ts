import { z } from "zod";
import { TIME_BOUND_SECTION_IDS } from "../../shared/time-bound-sections";
import { ORDER_STATUSES } from "../orders/order-status";

export const adminSetupSchema = z.object({
  secret: z.string().min(1, "Setup secret is required"),
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number is required").max(15),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});
export type AdminSetupInput = z.infer<typeof adminSetupSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8).max(200),
});

export const adminPageSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(20),
  query: z.string().trim().max(100).optional(),
});

const productFields = {
  categoryId: z.string().min(1),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).nullable().optional(),
  unit: z.string().trim().min(1).max(100),
  mrp: z.number().int().nonnegative(),
  price: z.number().int().nonnegative(),
  originalPrice: z.number().int().nonnegative().nullable().optional(),
  markup: z.number().int().nonnegative().nullable().optional(),
  markupType: z.enum(["PERCENTAGE", "AMOUNT"]).nullable().optional(),
  emoji: z.string().max(20).nullable().optional(),
  imageUrl: z.string().max(2048).nullable().optional(),
  /** Empty array or omitted = untagged; otherwise list of time-bound shelf IDs. */
  timeBoundSections: z.array(z.enum(TIME_BOUND_SECTION_IDS)).optional().default([]),
  trackInventory: z.boolean().optional().default(false),
  storeId: z.string().trim().min(1).nullable().optional(),
  isActive: z.boolean().optional(),
};

const validPrice = <T extends { price?: number; mrp?: number }>(value: T) =>
  value.price === undefined || value.mrp === undefined || value.price <= value.mrp;

export const createAdminProductSchema = z
  .object(productFields)
  .refine(validPrice, { message: "price must be less than or equal to mrp", path: ["price"] });

export const updateAdminProductSchema = z
  .object(productFields)
  .partial()
  .refine((value) => Object.keys(value).length > 0, { message: "At least one field is required" })
  .refine(validPrice, { message: "price must be less than or equal to mrp", path: ["price"] });

export const adminCategorySchema = z.object({
  name: z.string().trim().min(1).max(100),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sortOrder: z.number().int().default(0),
});

export const updateAdminCategorySchema = adminCategorySchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, { message: "At least one field is required" });

export const STORE_TYPES = ["DARK_STORE", "THIRD_PARTY"] as const;
export type StoreType = (typeof STORE_TYPES)[number];

export const adminStoreSchema = z.object({
  name: z.string().trim().min(1).max(200),
  type: z.enum(STORE_TYPES).default("DARK_STORE"),
  partnerName: z
    .string()
    .trim()
    .max(200)
    .nullable()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : null)),
  contactPhone: z
    .string()
    .trim()
    .max(20)
    .nullable()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : null)),
  contactEmail: z
    .string()
    .trim()
    .email()
    .or(z.literal(""))
    .nullable()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : null)),
  commissionPct: z.number().int().min(0).max(100).nullable().optional(),
  address: z.string().trim().min(1).max(500),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  serviceRadiusM: z.number().int().positive().default(5000),
  isActive: z.boolean().default(true),
});

export const updateAdminStoreSchema = adminStoreSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, { message: "At least one field is required" });

export const bulkAdminStoresSchema = z.array(adminStoreSchema).min(1).max(100);
export type BulkAdminStoresInput = z.infer<typeof bulkAdminStoresSchema>;

export const adjustInventorySchema = z.object({
  inventoryId: z.string().min(1),
  delta: z
    .number()
    .int()
    .refine((value) => value !== 0, "delta cannot be zero"),
  reason: z.string().trim().min(1).max(500),
});

export const transitionOrderSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(ORDER_STATUSES),
  reason: z.string().trim().max(500).nullable().optional(),
});

export const updateAdminCustomerSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    phone: z.string().trim().min(10).max(20).optional(),
    email: z.string().trim().toLowerCase().pipe(z.email()).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "At least one field is required" });

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type CreateAdminProductInput = z.infer<typeof createAdminProductSchema>;
export type UpdateAdminProductInput = z.infer<typeof updateAdminProductSchema>;
export type AdminCategoryInput = z.infer<typeof adminCategorySchema>;
export type UpdateAdminCategoryInput = z.infer<typeof updateAdminCategorySchema>;
export type AdminStoreInput = z.infer<typeof adminStoreSchema>;
export type UpdateAdminStoreInput = z.infer<typeof updateAdminStoreSchema>;
export type UpdateAdminCustomerInput = z.infer<typeof updateAdminCustomerSchema>;
