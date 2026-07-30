import { request } from "@/api/client";
import {
  AdminStoreDocument,
  AdminStoresDocument,
  type AdminStoreType,
} from "@/api/generated/graphql";

export const fetchStores = (type?: AdminStoreType) => request(AdminStoresDocument, { type });
export const fetchStore = (id: string) => request(AdminStoreDocument, { id });
