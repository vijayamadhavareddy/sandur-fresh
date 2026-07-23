import { request } from "@/api/client";
import { AdminDashboardDocument } from "@/api/generated/graphql";

export const fetchDashboard = () => request(AdminDashboardDocument);
