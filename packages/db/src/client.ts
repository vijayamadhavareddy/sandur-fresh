import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

console.log("path", process.env.DATABASE_PATH);
const sqlite = new Database(process.env.DATABASE_PATH);
sqlite.run("PRAGMA foreign_keys = ON;")

export const db = drizzle({client:sqlite, schema, logger: true });

export type Db = typeof db;
export type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];
export type DbOrTx = Db | Tx;
