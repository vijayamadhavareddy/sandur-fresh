import { request } from "@/api/client";
import { UpdateAdminCustomerDocument } from "@/api/generated/graphql";
import type { CustomerFormValues } from "./validation";

export const updateCustomer = (id: string, input: CustomerFormValues) =>
  request(UpdateAdminCustomerDocument, { id, ...input });
