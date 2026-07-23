import { request } from "@/api/client";
import { CreateAdminStoreDocument, UpdateAdminStoreDocument } from "@/api/generated/graphql";
import type { StoreFormValues } from "./validation";

export const createStore = (input: StoreFormValues) => request(CreateAdminStoreDocument, input);
export const updateStore = (id: string, input: StoreFormValues) =>
  request(UpdateAdminStoreDocument, { id, ...input });
