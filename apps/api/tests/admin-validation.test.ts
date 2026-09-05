import { describe, expect, test } from "bun:test";
import {
  adjustInventorySchema,
  adminLoginSchema,
  adminSetupSchema,
  adminStoreSchema,
  bulkAdminStoresSchema,
  createAdminProductSchema,
  transitionOrderSchema,
  updateAdminCustomerSchema,
} from "../src/modules/admin/admin.schemas";

describe("admin validation", () => {
  test("validates bulk admin store inputs", () => {
    const validBatch = bulkAdminStoresSchema.safeParse([
      {
        name: "Hub 1",
        type: "DARK_STORE",
        address: "Address 1",
        lat: 12.1,
        lng: 77.1,
        serviceRadiusM: 3000,
        isActive: true,
      },
      {
        name: "Partner Mart",
        type: "THIRD_PARTY",
        partnerName: "Partner Co",
        address: "Address 2",
        lat: 12.2,
        lng: 77.2,
        serviceRadiusM: 4000,
        isActive: true,
      },
    ]);
    expect(validBatch.success).toBe(true);
    if (validBatch.success) {
      expect(validBatch.data.length).toBe(2);
    }

    const emptyBatch = bulkAdminStoresSchema.safeParse([]);
    expect(emptyBatch.success).toBe(false);
  });
  test("validates admin store inputs for dark stores and third-party stores", () => {
    const darkStore = adminStoreSchema.safeParse({
      name: "Indiranagar Hub #1",
      address: "100ft Road, Indiranagar, Bengaluru",
      lat: 12.9716,
      lng: 77.5946,
      serviceRadiusM: 4000,
      isActive: true,
    });
    expect(darkStore.success).toBe(true);
    if (darkStore.success) {
      expect(darkStore.data.type).toBe("DARK_STORE");
    }

    const thirdPartyStore = adminStoreSchema.safeParse({
      name: "Daily Fresh Supermarket",
      type: "THIRD_PARTY",
      partnerName: "Daily Fresh Retail Pvt Ltd",
      contactPhone: "+919876543210",
      contactEmail: "manager@dailyfresh.in",
      commissionPct: 12,
      address: "Koramangala 4th Block, Bengaluru",
      lat: 12.9352,
      lng: 77.6245,
      serviceRadiusM: 3000,
      isActive: true,
    });
    expect(thirdPartyStore.success).toBe(true);
    if (thirdPartyStore.success) {
      expect(thirdPartyStore.data.type).toBe("THIRD_PARTY");
      expect(thirdPartyStore.data.commissionPct).toBe(12);
      expect(thirdPartyStore.data.partnerName).toBe("Daily Fresh Retail Pvt Ltd");
    }

    const thirdPartyStoreWithEmptyEmail = adminStoreSchema.safeParse({
      name: "Skanda Mart",
      type: "THIRD_PARTY",
      partnerName: "Skanda Mart",
      contactPhone: "",
      contactEmail: "",
      commissionPct: 0,
      address: "Sandur",
      lat: 0,
      lng: 0,
      serviceRadiusM: 5000,
      isActive: true,
    });
    expect(thirdPartyStoreWithEmptyEmail.success).toBe(true);
    if (thirdPartyStoreWithEmptyEmail.success) {
      expect(thirdPartyStoreWithEmptyEmail.data.contactEmail).toBe(null);
      expect(thirdPartyStoreWithEmptyEmail.data.contactPhone).toBe(null);
    }

    const invalidType = adminStoreSchema.safeParse({
      name: "Bad Store",
      type: "INVALID_TYPE",
      address: "Address",
      lat: 12.0,
      lng: 77.0,
    });
    expect(invalidType.success).toBe(false);
  });
  test("validates admin setup input", () => {
    const valid = adminSetupSchema.safeParse({
      secret: "my-secret-123",
      name: "Admin User",
      phone: "+919999999999",
      email: "Admin@SandurFresh.com",
      password: "password123",
    });
    expect(valid.success).toBe(true);
    if (valid.success) {
      expect(valid.data.email).toBe("admin@sandurfresh.com");
    }

    const missingSecret = adminSetupSchema.safeParse({
      secret: "",
      name: "Admin",
      phone: "+919999999999",
      email: "admin@sandurfresh.com",
      password: "password123",
    });
    expect(missingSecret.success).toBe(false);

    const shortPassword = adminSetupSchema.safeParse({
      secret: "secret",
      name: "Admin",
      phone: "+919999999999",
      email: "admin@sandurfresh.com",
      password: "short",
    });
    expect(shortPassword.success).toBe(false);
  });

  test("normalizes login email", () => {
    const result = adminLoginSchema.parse({ email: " Ops@Example.COM ", password: "password123" });
    expect(result.email).toBe("ops@example.com");
  });

  test("validates update customer inputs", () => {
    const valid = updateAdminCustomerSchema.safeParse({
      name: "John",
      phone: "9876543210",
      email: "john@example.com",
    });
    expect(valid.success).toBe(true);

    const invalidPhone = updateAdminCustomerSchema.safeParse({ phone: "123" });
    expect(invalidPhone.success).toBe(false);

    const empty = updateAdminCustomerSchema.safeParse({});
    expect(empty.success).toBe(false);
  });

  test("requires integer paise and price not above MRP", () => {
    const base = { categoryId: "cat", name: "Milk", unit: "1 L", mrp: 5000, price: 4500 };
    expect(createAdminProductSchema.safeParse(base).success).toBe(true);
    expect(createAdminProductSchema.safeParse({ ...base, price: 5001 }).success).toBe(false);
    expect(createAdminProductSchema.safeParse({ ...base, price: 45.5 }).success).toBe(false);
  });

  test("validates timeBoundSections array", () => {
    const base = { categoryId: "cat", name: "Bread", unit: "400 g", mrp: 4000, price: 3500 };
    const withSections = createAdminProductSchema.safeParse({
      ...base,
      timeBoundSections: ["BREAKFAST", "LUNCH"],
    });
    expect(withSections.success).toBe(true);
    if (withSections.success) {
      expect(withSections.data.timeBoundSections).toEqual(["BREAKFAST", "LUNCH"]);
    }

    const invalidSection = createAdminProductSchema.safeParse({
      ...base,
      timeBoundSections: ["INVALID_SECTION"],
    });
    expect(invalidSection.success).toBe(false);
  });

  test("validates originalPrice, markup, and markupType", () => {
    const base = {
      categoryId: "cat",
      name: "Butter",
      unit: "500 g",
      mrp: 6000,
      price: 5500,
      originalPrice: 4500,
      markup: 22,
      markupType: "PERCENTAGE" as const,
    };
    expect(createAdminProductSchema.safeParse(base).success).toBe(true);

    const withAmountMarkup = {
      ...base,
      markup: 1000,
      markupType: "AMOUNT" as const,
    };
    expect(createAdminProductSchema.safeParse(withAmountMarkup).success).toBe(true);

    const invalidMarkupType = {
      ...base,
      markupType: "INVALID",
    };
    expect(createAdminProductSchema.safeParse(invalidMarkupType).success).toBe(false);
  });

  test("validates trackInventory boolean", () => {
    const base = {
      categoryId: "cat",
      name: "Butter",
      unit: "500 g",
      mrp: 6000,
      price: 5500,
    };
    const defaultTrack = createAdminProductSchema.parse(base);
    expect(defaultTrack.trackInventory).toBe(false);

    const explicitTrack = createAdminProductSchema.parse({ ...base, trackInventory: true });
    expect(explicitTrack.trackInventory).toBe(true);
  });

  test("validates optional storeId", () => {
    const base = {
      categoryId: "cat",
      name: "Special Tea",
      unit: "250 g",
      mrp: 15000,
      price: 13000,
    };
    const withoutStore = createAdminProductSchema.parse(base);
    expect(withoutStore.storeId).toBeUndefined();

    const withStore = createAdminProductSchema.parse({ ...base, storeId: "store-123" });
    expect(withStore.storeId).toBe("store-123");

    const withNullStore = createAdminProductSchema.parse({ ...base, storeId: null });
    expect(withNullStore.storeId).toBeNull();
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
