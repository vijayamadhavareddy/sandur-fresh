import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const loginSchema = toTypedSchema(
  z.object({ email: z.string().email("Enter a valid email"), password: z.string().min(8) }),
);

export const setupSchema = toTypedSchema(
  z
    .object({
      secret: z.string().min(1, "Setup secret is required"),
      name: z.string().trim().min(1, "Name is required"),
      phone: z.string().trim().min(10, "Valid phone number (10+ digits) is required"),
      email: z.string().email("Enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(8, "Please confirm password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
);
