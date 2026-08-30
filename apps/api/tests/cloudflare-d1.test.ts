import { Database } from "bun:sqlite";
import { describe, expect, test } from "bun:test";
import type { D1Database, D1PreparedStatement, D1Result } from "@cloudflare/workers-types";
import { createApp } from "../src/app";

const createMockD1 = () => {
  const sqlite = new Database(":memory:");
  sqlite.run("PRAGMA foreign_keys = ON;");
  sqlite.run(`
    CREATE TABLE categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE products (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      unit TEXT NOT NULL,
      mrp INTEGER NOT NULL,
      price INTEGER NOT NULL,
      original_price INTEGER,
      markup INTEGER,
      markup_type TEXT,
      emoji TEXT,
      image_url TEXT,
      time_bound_sections TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE stores (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'DARK_STORE',
      partner_name TEXT,
      contact_phone TEXT,
      contact_email TEXT,
      commission_pct INTEGER,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      service_radius_m INTEGER NOT NULL DEFAULT 5000,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);

  const mockD1 = {
    prepare: (query: string) => {
      let boundValues: unknown[] = [];
      const stmt = {
        bind: (...values: unknown[]) => {
          boundValues = values.map((v) => (v instanceof Date ? v.getTime() : v));
          return stmt;
        },
        all: async <T = unknown>(): Promise<D1Result<T>> => {
          const rows = sqlite.query(query).all(...(boundValues as never[])) as T[];
          return {
            results: rows,
            success: true,
            meta: { duration: 0, rows_read: rows.length, rows_written: 0 } as never,
          };
        },
        first: async <T = unknown>(colName?: string): Promise<T | null> => {
          const row = sqlite.query(query).get(...(boundValues as never[])) as Record<
            string,
            unknown
          > | null;
          if (!row) return null;
          if (colName) return (row[colName] ?? null) as T;
          return row as T;
        },
        run: async () => {
          sqlite.query(query).run(...(boundValues as never[]));
          return {
            success: true,
            meta: { duration: 0, rows_read: 0, rows_written: 1 } as never,
          };
        },
        raw: async () => {
          const rows = sqlite.query(query).values(...(boundValues as never[]));
          return rows;
        },
      };
      return stmt as unknown as D1PreparedStatement;
    },
    batch: async <T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> => {
      const results: D1Result<T>[] = [];
      for (const s of statements) {
        results.push(await s.all<T>());
      }
      return results;
    },
    exec: async (query: string) => {
      sqlite.run(query);
      return { count: 0, duration: 0 };
    },
    dump: async () => new ArrayBuffer(0),
  } as unknown as D1Database;

  return { sqlite, mockD1 };
};

describe("Cloudflare D1 runtime execution", () => {
  test("REST and GraphQL routes return real data from D1 database binding", async () => {
    const { sqlite, mockD1 } = createMockD1();

    const now = Date.now();
    sqlite.run(
      `INSERT INTO categories (id, name, slug, sort_order, created_at) VALUES ('cat-1', 'Dairy & Eggs', 'dairy-eggs', 1, ${now})`,
    );
    sqlite.run(
      `INSERT INTO products (id, category_id, name, description, unit, mrp, price, emoji, is_active, created_at, updated_at) VALUES ('prod-1', 'cat-1', 'Fresh Milk 1L', 'Farm fresh cow milk', '1 L', 6000, 5500, '🥛', 1, ${now}, ${now})`,
    );
    sqlite.run(
      `INSERT INTO stores (id, name, address, lat, lng, service_radius_m, is_active, created_at, updated_at) VALUES ('store-1', 'Main Hub', 'Sandur Main Road', 15.08, 76.55, 5000, 1, ${now}, ${now})`,
    );

    const app = createApp();

    // 1. Health check with D1
    const healthRes = await app.request("/health", {}, { DB: mockD1 });
    expect(healthRes.status).toBe(200);
    const healthData = await healthRes.json();
    expect(healthData).toEqual({ data: { status: "ok" } });

    // 2. REST categories endpoint
    const categoriesRes = await app.request("/api/v1/categories", {}, { DB: mockD1 });
    expect(categoriesRes.status).toBe(200);
    const categoriesData = await categoriesRes.json();
    expect(categoriesData.data).toHaveLength(1);
    expect(categoriesData.data[0].name).toBe("Dairy & Eggs");
    expect(categoriesData.data[0].slug).toBe("dairy-eggs");

    // 3. REST products endpoint
    const productsRes = await app.request("/api/v1/products", {}, { DB: mockD1 });
    expect(productsRes.status).toBe(200);
    const productsData = await productsRes.json();
    expect(productsData.data).toHaveLength(1);
    expect(productsData.data[0].name).toBe("Fresh Milk 1L");
    expect(productsData.data[0].price).toBe(5500);
    expect(productsData.meta.total).toBe(1);

    // 4. REST stores endpoint
    const storesRes = await app.request("/api/v1/stores", {}, { DB: mockD1 });
    expect(storesRes.status).toBe(200);
    const storesData = await storesRes.json();
    expect(storesData.data).toHaveLength(1);
    expect(storesData.data[0].name).toBe("Main Hub");

    // 5. GraphQL GetCatalog query
    const gqlRes = await app.request(
      "/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetCatalog {
              products(limit: 10) {
                id
                name
                price
              }
              categories(limit: 10) {
                id
                name
              }
            }
          `,
        }),
      },
      { DB: mockD1 },
    );

    expect(gqlRes.status).toBe(200);
    const gqlData = await gqlRes.json();
    expect(gqlData.errors).toBeUndefined();
    expect(gqlData.data.products).toHaveLength(1);
    expect(gqlData.data.products[0].name).toBe("Fresh Milk 1L");
    expect(gqlData.data.products[0].price).toBe(5500);
    expect(gqlData.data.categories).toHaveLength(1);
    expect(gqlData.data.categories[0].name).toBe("Dairy & Eggs");
  });
});
