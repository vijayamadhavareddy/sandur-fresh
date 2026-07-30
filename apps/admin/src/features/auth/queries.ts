import { request } from "@/api/client";
import { AdminSessionDocument, AdminSetupStatusDocument } from "@/api/generated/graphql";

export const fetchSession = () => request(AdminSessionDocument);
export const fetchSetupStatus = () => request(AdminSetupStatusDocument);
