import { request } from "@/api/client";
import {
  AdminLoginDocument,
  AdminLogoutDocument,
  AdminSetupDocument,
  type MutationAdminSetupArgs,
} from "@/api/generated/graphql";

export const login = (email: string, password: string) =>
  request(AdminLoginDocument, { email, password });
export const logout = () => request(AdminLogoutDocument);
export const setup = (args: MutationAdminSetupArgs) => request(AdminSetupDocument, args);
