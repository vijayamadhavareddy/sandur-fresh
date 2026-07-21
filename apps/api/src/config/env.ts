import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  /** Filesystem path to the SQLite database file */
  DATABASE_PATH: z.string().min(1, "DATABASE_PATH is required").default("./data/sandur.db"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  GRAPHQL_INTROSPECTION: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  DEV_OTP: z.string().min(4).max(8).default("000000"),
});

export type Env = z.infer<typeof envSchema>;

const parseEnv = (): Env => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    console.error(`Invalid environment configuration:\n${formatted}`);
    process.exit(1);
  }
  return result.data;
};

export const env = parseEnv();

export const isProduction = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";
