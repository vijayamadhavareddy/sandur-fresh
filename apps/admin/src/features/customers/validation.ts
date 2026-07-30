import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const customerFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  email: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? null : val),
    z.string().trim().email("Invalid email address").nullable().optional(),
  ),
});

export type CustomerFormValues = {
  name: string;
  phone: string;
  email?: string | null;
};

export const customerSchema = toTypedSchema(customerFormSchema);
