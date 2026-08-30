import type { D1Database } from "@cloudflare/workers-types";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import * as schema from "./schema";

export type Schema = typeof schema;
export type BunDb = BunSQLiteDatabase<Schema>;
export type D1Db = DrizzleD1Database<Schema>;
export type Db = BunDb;
export type Tx = Parameters<Parameters<BunDb["transaction"]>[0]>[0];
export type DbOrTx = Db | Tx;

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

export const createBunDb = (databasePath = process?.env?.DATABASE_PATH ?? ":memory:"): BunDb => {
  // @ts-ignore bun:sqlite exists only in Bun runtime
  const { Database } = require("bun:sqlite");
  // @ts-ignore drizzle-orm/bun-sqlite
  const { drizzle } = require("drizzle-orm/bun-sqlite");
  const sqlite = new Database(databasePath);
  sqlite.run("PRAGMA foreign_keys = ON;");
  return drizzle({ client: sqlite, schema, logger: false });
};

const d1Cache = new WeakMap<D1Database, D1Db>();
let bunDbSingleton: BunDb | undefined;

export const createDb = (binding?: D1Database | null): Db => {
  if (binding) {
    let d1Instance = d1Cache.get(binding);
    if (!d1Instance) {
      d1Instance = createD1Db(binding);
      d1Cache.set(binding, d1Instance);
    }
    return d1Instance as unknown as Db;
  }
  if (!bunDbSingleton) {
    bunDbSingleton = createBunDb();
  }
  return bunDbSingleton;
};
