import { describe, expect, test } from "bun:test";
import {
  adjustInventorySchema,
  adminLoginSchema,
  createAdminProductSchema,
  transitionOrderSchema,
} from "../src/modules/admin/admin.schemas";

describe("admin validation", () => {
  test("normalizes login email", () => {
    const result = adminLoginSchema.parse({ email: " Ops@Example.COM ", password: "password123" });
    expect(result.email).toBe("ops@example.com");
  });

  test("requires integer paise and price not above MRP", () => {
    const base = { categoryId: "cat", name: "Milk", unit: "1 L", mrp: 5000, price: 4500 };
    expect(createAdminProductSchema.safeParse(base).success).toBe(true);
    expect(createAdminProductSchema.safeParse({ ...base, price: 5001 }).success).toBe(false);
    expect(createAdminProductSchema.safeParse({ ...base, price: 45.5 }).success).toBe(false);
  });

  test("rejects zero inventory adjustments", () => {
    expect(
      adjustInventorySchema.safeParse({ inventoryId: "inventory", delta: 0, reason: "count" })
        .success,
    ).toBe(false);
  });

  test("accepts only the existing order statuses", () => {
    expect(
      transitionOrderSchema.safeParse({ orderId: "order", status: "PACKED", reason: null }).success,
    ).toBe(true);
    expect(transitionOrderSchema.safeParse({ orderId: "order", status: "REFUNDED" }).success).toBe(
      false,
    );
  });
});
