import type { D1Database } from "@cloudflare/workers-types";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { drizzle as drizzleD1, type DrizzleD1Database } from "drizzle-orm/d1";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as schema from "./schema";

export type Schema = typeof schema;
export type BunDb = BunSQLiteDatabase<Schema>;
export type D1Db = DrizzleD1Database<Schema>;

export const createD1Db = (d1: D1Database): D1Db => {
  const d1Instance = drizzleD1(d1, { schema, logger: false });
  const originalTx = d1Instance.transaction.bind(d1Instance);
  // biome-ignore lint/suspicious/noExplicitAny: D1 transaction fallback wrapper
  d1Instance.transaction = (async (cb: (tx: any) => Promise<any>, config?: any) => {
    try {
      return await originalTx(cb, config);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("begin") || msg.includes("Failed query: begin")) {
        return await cb(d1Instance);
      }
      throw err;
    }
  }) as any;
  return d1Instance;
};

console.log("DATABASE_PATH", process.env.DATABASE_PATH);
console.log("ADMIN_EMAIL", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD", process.env.ADMIN_PASSWORD);

export const createBunDb = (databasePath = process?.env?.DATABASE_PATH ?? ":memory:"): BunDb => {
  // @ts-ignore bun:sqlite exists only in Bun runtime
  const { Database } = require("bun:sqlite");
  // @ts-ignore drizzle-orm/bun-sqlite
  const { drizzle } = require("drizzle-orm/bun-sqlite");
  const sqlite = new Database(databasePath);
  sqlite.run("PRAGMA foreign_keys = ON;");
  return drizzle({ client: sqlite, schema, logger: true });
};

const dummyD1 = {
  prepare: () => ({
    bind: () => ({
      all: () => Promise.resolve({ results: [] }),
      first: () => Promise.resolve(null),
      run: () => Promise.resolve({ success: true }),
      raw: () => Promise.resolve([]),
    }),
  }),
  batch: () => Promise.resolve([]),
  exec: () => Promise.resolve({ count: 0, duration: 0 }),
  dump: () => Promise.resolve(new ArrayBuffer(0)),
} as unknown as D1Database;

export const schemaDb: D1Db = drizzleD1(dummyD1, { schema, logger: false });

export const db: BunDb =
  typeof (globalThis as unknown as { Bun?: unknown }).Bun !== "undefined"
    ? createBunDb()
    : (schemaDb as unknown as BunDb);

export type Db = BunDb;
export type Tx = Parameters<Parameters<BunDb["transaction"]>[0]>[0];
export type DbOrTx = Db | Tx;



