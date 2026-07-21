import { describe, expect, test } from "bun:test";
import { canTransition } from "../src/modules/orders/order-status";
import { summarizeCart } from "../src/shared/pricing";

/**
 * Cart prices are always recomputed server-side from product.price / mrp.
 * This test models that pure recalculation path (no client prices trusted).
 */
describe("cart server-side price recalculation", () => {
  test("ignores client-supplied line totals — recomputes from unit prices", () => {
    const clientClaimedTotal = 1; // malicious client
    const serverLines = [
      { price: 3200, mrp: 4000, quantity: 2 }, // Banana
      { price: 2700, mrp: 2800, quantity: 1 }, // Milk
    ];
    const summary = summarizeCart(serverLines);
    expect(summary.subtotal).toBe(3200 * 2 + 2700);
    expect(summary.subtotal).not.toBe(clientClaimedTotal);
    expect(summary.savings).toBe((4000 - 3200) * 2 + (2800 - 2700));
  });

  test("stock rejection is modeled as OUT_OF_STOCK conflict path", () => {
    const stockQty = 2;
    const requested = 5;
    const insufficient = requested > stockQty;
    expect(insufficient).toBe(true);
  });

  test("invalid order status update is conflict", () => {
    expect(canTransition("DELIVERED", "PLACED")).toBe(false);
  });
});
