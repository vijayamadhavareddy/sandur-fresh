import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  RUNTIME: z.enum(["cloudflare", "bun"]).optional(),
  /** Filesystem path to the SQLite database file (used when running locally in Bun) */
  DATABASE_PATH: z.string().default("./data/sandur.db"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  GRAPHQL_INTROSPECTION: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .default(false)
    .transform((v) => v === true || v === "true"),
  DEV_OTP: z.string().min(4).max(8).default("0000"),
  ADMIN_SESSION_COOKIE: z.string().min(1).default("sf_admin_session"),
  /** Secret phrase required during first-time initial admin account creation */
  ADMIN_SETUP_SECRET: z.string().min(6).default("sandur-admin-setup-secret"),
  /**
   * Service account for sending FCM pushes. Either a path to the JSON key file
   * or the JSON itself. When unset, push sending is disabled (logged once).
   */
  FIREBASE_SERVICE_ACCOUNT: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined)),
  UPLOAD_DIR: z.string().min(1).default("./data/uploads"),
  UPLOAD_MAX_BYTES: z.coerce
    .number()
    .int()
    .positive()
    .default(5 * 1024 * 1024),
  /** Comma-separated list of allowed CORS origins */
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:5173,http://localhost:4173,http://localhost:8788"),
});

export type Env = z.infer<typeof envSchema>;

export const parseCorsOrigins = (raw?: string): string[] => {
  const value = raw ?? env.CORS_ORIGIN;
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const parseEnv = (
  source: Record<string, unknown> = (typeof process !== "undefined" ? process.env : {}) as Record<
    string,
    unknown
  >,
): Env => {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    return envSchema.parse({});
  }
  return result.data;
};

export const env = parseEnv();

export const isProduction = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";
