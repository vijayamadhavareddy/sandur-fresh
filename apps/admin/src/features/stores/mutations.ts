import { request } from "@/api/client";
import {
  type AdminStoreInput,
  BulkCreateAdminStoresDocument,
  CreateAdminStoreDocument,
  UpdateAdminStoreDocument,
} from "@/api/generated/graphql";
import type { StoreFormValues } from "./validation";

export const createStore = (input: StoreFormValues) => request(CreateAdminStoreDocument, input);
export const bulkCreateStores = (stores: AdminStoreInput[]) =>
  request(BulkCreateAdminStoresDocument, { stores });
export const updateStore = (id: string, input: StoreFormValues) =>
  request(UpdateAdminStoreDocument, { id, ...input });
