import { request } from "@/api/client";
import { AdminCustomerDocument, AdminCustomersDocument } from "@/api/generated/graphql";

export const fetchCustomers = (page: number, limit: number, query?: string) =>
  request(AdminCustomersDocument, { page, limit, query });

export const fetchCustomer = (id: string) => request(AdminCustomerDocument, { id });
