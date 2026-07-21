import { defineConfig } from "drizzle-kit";

const databasePath = process.env.DATABASE_PATH ?? "../../sandur-fresh.db";

export default defineConfig({
  out: "./migrations",
  schema: "./src/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databasePath,
  },
});
