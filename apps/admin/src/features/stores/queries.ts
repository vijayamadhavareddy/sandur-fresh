import { request } from "@/api/client";
import { AdminStoreDocument, AdminStoresDocument } from "@/api/generated/graphql";

export const fetchStores = () => request(AdminStoresDocument);
export const fetchStore = (id: string) => request(AdminStoreDocument, { id });
