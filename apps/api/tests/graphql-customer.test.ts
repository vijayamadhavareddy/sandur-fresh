import { Database } from "bun:sqlite";
import { describe, expect, test } from "bun:test";
import * as schema from "@sf/db/schema";
import { categories, inventory, products, stores, users } from "@sf/db/schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { graphql } from "graphql";
import { getGraphqlSchema } from "../src/graphql/schema";
import { MockOtpProvider } from "../src/modules/otp";
import { productsRepo } from "../src/modules/products/products.repo";
import { createProductsService } from "../src/modules/products/products.service";
import { usersRepo } from "../src/modules/users/users.repo";
import { createUsersService } from "../src/modules/users/users.service";

const createTestDb = () => {
  const sqlite = new Database(":memory:");
  sqlite.run("PRAGMA foreign_keys = ON;");
  sqlite.run(`
    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      phone TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL DEFAULT '',
      email TEXT,
      role TEXT NOT NULL DEFAULT 'customer',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE otp_challenges (
      id TEXT PRIMARY KEY,
      phone TEXT NOT NULL,
      code TEXT NOT NULL,
      session_id TEXT,
      expires_at INTEGER NOT NULL,
      consumed_at INTEGER,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE addresses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      line1 TEXT NOT NULL,
      line2 TEXT,
      city TEXT NOT NULL,
      pincode TEXT NOT NULL,
      phone TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
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
      address TEXT NOT NULL DEFAULT '',
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      service_radius_m INTEGER NOT NULL DEFAULT 5000,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE products (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
      name TEXT NOT NULL,
      description TEXT,
      unit TEXT NOT NULL,
      mrp INTEGER NOT NULL,
      price INTEGER NOT NULL,
      original_price INTEGER,
      markup INTEGER,
      markup_type TEXT DEFAULT 'PERCENTAGE',
      emoji TEXT,
      image_url TEXT,
      time_bound_sections TEXT NOT NULL DEFAULT '[]',
      track_inventory INTEGER NOT NULL DEFAULT 0,
      store_id TEXT REFERENCES stores(id),
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE inventory (
      id TEXT PRIMARY KEY,
      store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      stock_qty INTEGER NOT NULL DEFAULT 0,
      low_stock_threshold INTEGER NOT NULL DEFAULT 10,
      updated_at INTEGER NOT NULL
    );
    CREATE UNIQUE INDEX inventory_store_product_uidx ON inventory (store_id, product_id);
  `);
  // biome-ignore lint/suspicious/noExplicitAny: test helper
  return drizzle({ client: sqlite, schema }) as any;
};

describe("GraphQL customer resolvers", () => {
  test("requestOtp and verifyOtp mutations", async () => {
    const db = createTestDb();
    const schema = getGraphqlSchema(db);
    const uService = createUsersService({ db, usersRepo, otpProvider: new MockOtpProvider() });
    const container = { users: uService };

    const reqResult = await graphql({
      schema,
      source: `
        mutation RequestOtp($phone: String!) {
          requestOtp(phone: $phone) {
            message
          }
        }
      `,
      variableValues: { phone: "9876543210" },
      contextValue: { services: container, user: null },
    });

    expect(reqResult.errors).toBeUndefined();
    const reqData = reqResult.data?.requestOtp as { message: string } | undefined;
    expect(reqData?.message).toBe("OTP sent");

    const verifyResult = await graphql({
      schema,
      source: `
        mutation VerifyOtp($phone: String!, $code: String!) {
          verifyOtp(phone: $phone, code: $code) {
            token
            user {
              id
              phone
              role
            }
          }
        }
      `,
      variableValues: { phone: "9876543210", code: "000000" },
      contextValue: { services: container, user: null },
    });

    expect(verifyResult.errors).toBeUndefined();
    const authData = verifyResult.data?.verifyOtp as
      | {
          token: string;
          user: { id: string; phone: string };
        }
      | undefined;
    expect(authData?.token).toBeTruthy();
    expect(authData?.user.phone).toBe("9876543210");
  });

  test("me and address queries and mutations", async () => {
    const db = createTestDb();
    const schema = getGraphqlSchema(db);
    const uService = createUsersService({ db, usersRepo, otpProvider: new MockOtpProvider() });
    const container = { users: uService };

    const [user] = await db
      .insert(users)
      .values({ phone: "9998887770", name: "Test User", role: "customer" })
      .returning();

    const ctx = { services: container, user };

    // Query me
    const meResult = await graphql({
      schema,
      source: `
        query Me {
          me {
            id
            phone
            name
          }
        }
      `,
      contextValue: ctx,
    });

    expect(meResult.errors).toBeUndefined();
    const meData = meResult.data?.me as { name: string } | undefined;
    expect(meData?.name).toBe("Test User");

    // Add address
    const addAddrResult = await graphql({
      schema,
      source: `
        mutation AddAddress($label: String!, $line1: String!, $city: String!, $pincode: String!, $phone: String!, $lat: Float!, $lng: Float!) {
          addAddress(label: $label, line1: $line1, city: $city, pincode: $pincode, phone: $phone, lat: $lat, lng: $lng) {
            id
            label
            line1
            city
            pincode
          }
        }
      `,
      variableValues: {
        label: "Home",
        line1: "123 Main St",
        city: "Ballari",
        pincode: "583119",
        phone: "9998887770",
        lat: 15.15,
        lng: 76.6,
      },
      contextValue: ctx,
    });

    expect(addAddrResult.errors).toBeUndefined();
    const addr = addAddrResult.data?.addAddress as { id: string; label: string };
    expect(addr.id).toBeTruthy();
    expect(addr.label).toBe("Home");

    // Query myAddresses
    const myAddressesResult = await graphql({
      schema,
      source: `
        query MyAddresses {
          myAddresses {
            id
            label
            line1
          }
        }
      `,
      contextValue: ctx,
    });

    expect(myAddressesResult.errors).toBeUndefined();
    const addrData = myAddressesResult.data?.myAddresses as Array<{ label: string }> | undefined;
    expect(addrData?.length).toBe(1);

    // Delete address
    const delResult = await graphql({
      schema,
      source: `
        mutation DeleteAddress($id: String!) {
          deleteAddress(id: $id)
        }
      `,
      variableValues: { id: addr.id },
      contextValue: ctx,
    });

    expect(delResult.errors).toBeUndefined();
    expect(delResult.data?.deleteAddress).toBe(true);
  });

  test("query Products with none, one, or multiple timeBoundSections", async () => {
    const db = createTestDb();
    const schema = getGraphqlSchema(db);
    const pService = createProductsService({ db, productsRepo });
    const container = { products: pService };

    await db.insert(categories).values({
      id: "cat-1",
      name: "Breakfast & Dairy",
      slug: "breakfast-dairy",
      sortOrder: 1,
    });

    await db.insert(products).values([
      {
        id: "p1",
        categoryId: "cat-1",
        name: "Dinner Thali",
        unit: "1 meal",
        mrp: 15000,
        price: 13000,
        timeBoundSections: ["DINNER"],
      },
      {
        id: "p2",
        categoryId: "cat-1",
        name: "Bread and Eggs",
        unit: "1 pack",
        mrp: 8000,
        price: 7000,
        timeBoundSections: ["BREAKFAST", "LUNCH"],
      },
      {
        id: "p3",
        categoryId: "cat-1",
        name: "Salt",
        unit: "1 kg",
        mrp: 2500,
        price: 2200,
        timeBoundSections: [],
      },
    ]);

    const result = await graphql({
      schema,
      source: `
        query Products {
          products {
            id
            categoryId
            name
            timeBoundSections
          }
        }
      `,
      contextValue: { services: container, auth: null },
    });

    expect(result.errors).toBeUndefined();
    const items = result.data?.products as Array<{
      id: string;
      name: string;
      timeBoundSections: string[];
    }>;
    expect(items).toBeDefined();
    expect(items.length).toBe(3);

    const dinnerItem = items.find((p) => p.id === "p1");
    expect(dinnerItem?.timeBoundSections).toEqual(["DINNER"]);

    const multiItem = items.find((p) => p.id === "p2");
    expect(multiItem?.timeBoundSections).toEqual(["BREAKFAST", "LUNCH"]);

    const untaggedItem = items.find((p) => p.id === "p3");
    expect(untaggedItem?.timeBoundSections).toEqual([]);
  });

  test("query Products with inventory relation", async () => {
    const db = createTestDb();
    const schema = getGraphqlSchema(db);
    const pService = createProductsService({ db, productsRepo });
    const container = { products: pService };

    await db.insert(categories).values({
      id: "cat-1",
      name: "Dairy",
      slug: "dairy",
      sortOrder: 1,
    });

    await db.insert(stores).values({
      id: "store-1",
      name: "Main Dark Store",
      lat: 15.0,
      lng: 76.0,
    });

    await db.insert(products).values([
      {
        id: "p1",
        categoryId: "cat-1",
        name: "Milk",
        unit: "500ml",
        mrp: 3000,
        price: 2800,
        timeBoundSections: ["BREAKFAST"],
      },
      {
        id: "p2",
        categoryId: "cat-1",
        name: "Butter",
        unit: "100g",
        mrp: 5000,
        price: 4800,
        timeBoundSections: [],
      },
    ]);

    await db.insert(inventory).values({
      id: "inv-1",
      storeId: "store-1",
      productId: "p1",
      stockQty: 50,
      lowStockThreshold: 10,
    });

    const result = await graphql({
      schema,
      source: `
        query Products {
          products {
            id
            categoryId
            name
            timeBoundSections
            description
            unit
            mrp
            price
            originalPrice
            markup
            markupType
            emoji
            imageUrl
            isActive
            inventory {
              id
            }
          }
        }
      `,
      contextValue: { services: container, auth: null },
    });

    expect(result.errors).toBeUndefined();
    const items = result.data?.products as Array<{
      id: string;
      name: string;
      inventory: Array<{ id: string }>;
    }>;
    expect(items).toBeDefined();
    expect(items.length).toBe(2);

    const milk = items.find((p) => p.id === "p1");
    expect(milk?.inventory).toEqual([{ id: "inv-1" }]);

    const butter = items.find((p) => p.id === "p2");
    expect(butter?.inventory).toEqual([]);
  });
});
