import { describe, expect, test } from "bun:test";
import {
  ALLOWED_TRANSITIONS,
  canTransition,
  isTerminal,
  type OrderStatus,
} from "../src/modules/orders/order-status";

describe("order lifecycle", () => {
  test("PLACED can go to PACKED or CANCELLED", () => {
    expect(canTransition("PLACED", "PACKED")).toBe(true);
    expect(canTransition("PLACED", "CANCELLED")).toBe(true);
    expect(canTransition("PLACED", "DELIVERED")).toBe(false);
  });

  test("PACKED can go to OUT_FOR_DELIVERY or CANCELLED", () => {
    expect(canTransition("PACKED", "OUT_FOR_DELIVERY")).toBe(true);
    expect(canTransition("PACKED", "CANCELLED")).toBe(true);
    expect(canTransition("PACKED", "PLACED")).toBe(false);
  });

  test("OUT_FOR_DELIVERY only to DELIVERED", () => {
    expect(canTransition("OUT_FOR_DELIVERY", "DELIVERED")).toBe(true);
    expect(canTransition("OUT_FOR_DELIVERY", "CANCELLED")).toBe(false);
  });

  test("terminal states have no transitions", () => {
    expect(isTerminal("DELIVERED")).toBe(true);
    expect(isTerminal("CANCELLED")).toBe(true);
    expect(canTransition("DELIVERED", "CANCELLED")).toBe(false);
    expect(canTransition("CANCELLED", "PLACED")).toBe(false);
  });

  test("ALLOWED_TRANSITIONS covers every status", () => {
    const statuses: OrderStatus[] = [
      "PLACED",
      "PACKED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];
    for (const status of statuses) {
      expect(ALLOWED_TRANSITIONS[status]).toBeDefined();
    }
  });
});
