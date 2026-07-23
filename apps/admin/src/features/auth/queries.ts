import { request } from "@/api/client";
import { AdminSessionDocument } from "@/api/generated/graphql";

export const fetchSession = () => request(AdminSessionDocument);
