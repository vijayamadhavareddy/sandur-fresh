import { eq } from "drizzle-orm";
import {
  addresses,
  categories,
  db,
  inventory,
  products,
  storeSlotConfig,
  stores,
  users,
} from "../src";

const rupeesToPaise = (n: number) => Math.round(n * 100);

const categoryDefs = [
  { name: "Fruits & Veg", slug: "fruits-veg", sortOrder: 1 },
  { name: "Dairy", slug: "dairy", sortOrder: 2 },
  { name: "Snacks", slug: "snacks", sortOrder: 3 },
  { name: "Beverages", slug: "beverages", sortOrder: 4 },
  { name: "Household", slug: "household", sortOrder: 5 },
  { name: "Personal Care", slug: "personal-care", sortOrder: 6 },
  { name: "Pharmacy", slug: "pharmacy", sortOrder: 7 },
  { name: "Bakery", slug: "bakery", sortOrder: 8 },
];

const productDefs: Array<{
  name: string;
  category: string;
  price: number;
  mrp: number;
  unit: string;
  emoji: string;
  stock?: number;
}> = [
  {
    name: "Banana Robusta",
    category: "Fruits & Veg",
    price: 32,
    mrp: 40,
    unit: "500 g",
    emoji: "🍌",
  },
  {
    name: "Tomato Desi",
    category: "Fruits & Veg",
    price: 24,
    mrp: 30,
    unit: "500 g",
    emoji: "🍅",
  },
  {
    name: "Onion",
    category: "Fruits & Veg",
    price: 38,
    mrp: 45,
    unit: "1 kg",
    emoji: "🧅",
  },
  {
    name: "Apple Shimla",
    category: "Fruits & Veg",
    price: 145,
    mrp: 145,
    unit: "4 pcs",
    emoji: "🍎",
  },
  {
    name: "Spinach Bunch",
    category: "Fruits & Veg",
    price: 18,
    mrp: 25,
    unit: "250 g",
    emoji: "🥬",
    stock: 0,
  },
  {
    name: "Amul Taaza Milk",
    category: "Dairy",
    price: 27,
    mrp: 28,
    unit: "500 ml",
    emoji: "🥛",
  },
  {
    name: "Curd Cup",
    category: "Dairy",
    price: 35,
    mrp: 40,
    unit: "400 g",
    emoji: "🍶",
  },
  {
    name: "Butter Salted",
    category: "Dairy",
    price: 58,
    mrp: 60,
    unit: "100 g",
    emoji: "🧈",
  },
  {
    name: "Paneer Fresh",
    category: "Dairy",
    price: 92,
    mrp: 110,
    unit: "200 g",
    emoji: "🧀",
  },
  {
    name: "Eggs Brown",
    category: "Dairy",
    price: 84,
    mrp: 84,
    unit: "6 pcs",
    emoji: "🥚",
  },
  {
    name: "Potato Chips",
    category: "Snacks",
    price: 20,
    mrp: 20,
    unit: "52 g",
    emoji: "🍟",
  },
  {
    name: "Chocolate Bar",
    category: "Snacks",
    price: 45,
    mrp: 50,
    unit: "1 pc",
    emoji: "🍫",
  },
  {
    name: "Cookies Cream",
    category: "Snacks",
    price: 30,
    mrp: 35,
    unit: "120 g",
    emoji: "🍪",
  },
  {
    name: "Instant Noodles",
    category: "Snacks",
    price: 14,
    mrp: 14,
    unit: "70 g",
    emoji: "🍜",
  },
  {
    name: "Cola Drink",
    category: "Beverages",
    price: 40,
    mrp: 45,
    unit: "750 ml",
    emoji: "🥤",
  },
  {
    name: "Orange Juice",
    category: "Beverages",
    price: 110,
    mrp: 125,
    unit: "1 L",
    emoji: "🧃",
  },
  {
    name: "Green Tea",
    category: "Beverages",
    price: 145,
    mrp: 180,
    unit: "25 bags",
    emoji: "🍵",
  },
  {
    name: "Cold Coffee",
    category: "Beverages",
    price: 60,
    mrp: 60,
    unit: "200 ml",
    emoji: "🧋",
    stock: 0,
  },
  {
    name: "Dishwash Gel",
    category: "Household",
    price: 99,
    mrp: 115,
    unit: "500 ml",
    emoji: "🧴",
  },
  {
    name: "Floor Cleaner",
    category: "Household",
    price: 120,
    mrp: 140,
    unit: "1 L",
    emoji: "🧹",
  },
  {
    name: "Garbage Bags",
    category: "Household",
    price: 75,
    mrp: 75,
    unit: "30 pcs",
    emoji: "🛍️",
  },
  {
    name: "Laundry Detergent",
    category: "Household",
    price: 210,
    mrp: 240,
    unit: "2 kg",
    emoji: "🧺",
  },
  {
    name: "Shampoo Anti-Dandruff",
    category: "Personal Care",
    price: 165,
    mrp: 199,
    unit: "340 ml",
    emoji: "🧴",
  },
  {
    name: "Toothpaste",
    category: "Personal Care",
    price: 85,
    mrp: 95,
    unit: "150 g",
    emoji: "🪥",
  },
  {
    name: "Handwash Refill",
    category: "Personal Care",
    price: 72,
    mrp: 89,
    unit: "750 ml",
    emoji: "🧼",
  },
  {
    name: "Face Moisturizer",
    category: "Personal Care",
    price: 199,
    mrp: 199,
    unit: "100 g",
    emoji: "🧖",
  },
  {
    name: "Paracetamol 500mg",
    category: "Pharmacy",
    price: 22,
    mrp: 26,
    unit: "15 tabs",
    emoji: "💊",
  },
  {
    name: "Vitamin C Chewable",
    category: "Pharmacy",
    price: 95,
    mrp: 110,
    unit: "20 tabs",
    emoji: "🍊",
  },
  {
    name: "First Aid Bandages",
    category: "Pharmacy",
    price: 40,
    mrp: 40,
    unit: "10 pcs",
    emoji: "🩹",
  },
  {
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 45,
    mrp: 50,
    unit: "400 g",
    emoji: "🍞",
  },
  {
    name: "Croissant",
    category: "Bakery",
    price: 55,
    mrp: 55,
    unit: "2 pcs",
    emoji: "🥐",
  },
  {
    name: "Chocolate Muffin",
    category: "Bakery",
    price: 38,
    mrp: 45,
    unit: "1 pc",
    emoji: "🧁",
  },
];

const main = async () => {
  console.log("Seeding database...");

  // Idempotent-ish: wipe catalog tables for local seed
  await db.delete(inventory);
  await db.delete(storeSlotConfig);
  await db.delete(products);
  await db.delete(categories);
  await db.delete(stores);

  const insertedCategories = await db
    .insert(categories)
    .values(categoryDefs)
    .returning();
  const categoryByName = new Map(insertedCategories.map((c) => [c.name, c]));

  const storeRows = await db
    .insert(stores)
    .values([
      {
        name: "Sandur Fresh — Main Dark Store",
        lat: 15.086,
        lng: 76.546,
        serviceRadiusM: 8000,
        isActive: true,
      },
      {
        name: "Sandur Fresh — Hospet Road",
        lat: 15.12,
        lng: 76.58,
        serviceRadiusM: 6000,
        isActive: true,
      },
    ])
    .returning();

  const productRows = await db
    .insert(products)
    .values(
      productDefs.map((p) => {
        const cat = categoryByName.get(p.category);
        if (!cat) throw new Error(`Missing category ${p.category}`);
        return {
          categoryId: cat.id,
          name: p.name,
          unit: p.unit,
          mrp: rupeesToPaise(p.mrp),
          price: rupeesToPaise(p.price),
          emoji: p.emoji,
          isActive: true,
        };
      }),
    )
    .returning();

  for (const store of storeRows) {
    await db.insert(storeSlotConfig).values({
      storeId: store.id,
      slotDurationMinutes: 30,
      dayStartMinutes: 480,
      dayEndMinutes: 1320,
      capacityPerSlot: 25,
    });

    await db.insert(inventory).values(
      productRows.map((prod, idx) => ({
        storeId: store.id,
        productId: prod.id,
        stockQty: productDefs[idx]?.stock ?? 50,
      })),
    );
  }

  let demoUser = (
    await db
      .select()
      .from(users)
      .where(eq(users.phone, "+919876543210"))
      .limit(1)
  )[0];

  if (!demoUser) {
    demoUser = (
      await db
        .insert(users)
        .values({
          phone: "+919876543210",
          name: "Demo Customer",
          role: "customer",
        })
        .returning()
    )[0]!;
  }

  const existingAdmin = (
    await db
      .select()
      .from(users)
      .where(eq(users.phone, "+919999999999"))
      .limit(1)
  )[0];
  if (!existingAdmin) {
    await db.insert(users).values({
      phone: "+919999999999",
      name: "Ops Admin",
      role: "admin",
    });
  }

  const existingAddr = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, demoUser.id))
    .limit(1);
  if (existingAddr.length === 0) {
    await db.insert(addresses).values({
      userId: demoUser.id,
      label: "Home",
      line1: "12 MG Road",
      city: "Sandur",
      pincode: "583119",
      phone: "+919876543210",
      lat: 15.09,
      lng: 76.55,
      isDefault: true,
    });
  }

  console.log(
    `Seeded ${productRows.length} products across ${storeRows.length} stores`,
  );
  console.log("Demo customer phone: +919876543210 (OTP: DEV_OTP / 000000)");
  console.log("Admin phone: +919999999999");
  process.exit(0);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
