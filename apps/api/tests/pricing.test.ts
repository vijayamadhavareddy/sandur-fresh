import { describe, expect, test } from "bun:test";
import {
  cartSavings,
  cartSubtotal,
  DELIVERY_FEE_PAISE,
  deliveryFee,
  FREE_DELIVERY_THRESHOLD_PAISE,
  lineSavings,
  lineTotal,
  orderTotal,
  summarizeCart,
} from "../src/shared/pricing";

describe("pricing", () => {
  test("lineTotal multiplies price by quantity", () => {
    expect(lineTotal(3200, 3)).toBe(9600);
  });

  test("lineSavings uses mrp - price", () => {
    expect(lineSavings(3200, 4000, 2)).toBe(1600);
    expect(lineSavings(4000, 4000, 2)).toBe(0);
  });

  test("cartSubtotal and cartSavings aggregate lines", () => {
    const lines = [
      { price: 1000, mrp: 1200, quantity: 2 },
      { price: 500, mrp: 500, quantity: 1 },
    ];
    expect(cartSubtotal(lines)).toBe(2500);
    expect(cartSavings(lines)).toBe(400);
  });

  test("delivery fee free above threshold", () => {
    expect(deliveryFee(FREE_DELIVERY_THRESHOLD_PAISE - 1)).toBe(DELIVERY_FEE_PAISE);
    expect(deliveryFee(FREE_DELIVERY_THRESHOLD_PAISE)).toBe(0);
    expect(deliveryFee(FREE_DELIVERY_THRESHOLD_PAISE + 1000)).toBe(0);
  });

  test("orderTotal applies fee and discount", () => {
    expect(orderTotal(10_000, 2500, 500)).toBe(12_000);
    expect(orderTotal(100, 0, 500)).toBe(0);
  });

  test("summarizeCart returns full summary", () => {
    const summary = summarizeCart([{ price: 10_000, mrp: 12_000, quantity: 2 }]);
    expect(summary.subtotal).toBe(20_000);
    expect(summary.savings).toBe(4_000);
    expect(summary.deliveryFee).toBe(0);
    expect(summary.total).toBe(20_000);
  });
});
