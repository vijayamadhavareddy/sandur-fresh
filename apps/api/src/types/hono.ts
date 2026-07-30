import type { D1Database, R2Bucket } from "@cloudflare/workers-types";
import type { DbOrTx } from "@sf/db";
import type { Services } from "../container";
import type { StorageService } from "../shared/storage";

export type AuthUser = {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  role: "customer" | "admin";
};

export type CloudflareBindings = {
  DB?: D1Database;
  BUCKET?: R2Bucket;
  RUNTIME?: string;
  NODE_ENV?: string;
  DATABASE_PATH?: string;
  UPLOAD_DIR?: string;
  UPLOAD_MAX_BYTES?: string | number;
  DEV_OTP?: string;
  ADMIN_SESSION_COOKIE?: string;
  ADMIN_SETUP_SECRET?: string;
  FIREBASE_SERVICE_ACCOUNT?: string;
  GRAPHQL_INTROSPECTION?: string;
  CORS_ORIGIN?: string;
};

export type AppVariables = {
  requestId: string;
  user: AuthUser | null;
  db?: DbOrTx;
  storage?: StorageService;
  services?: Services;
};

export type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: AppVariables;
};
