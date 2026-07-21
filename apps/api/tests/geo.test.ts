import { describe, expect, test } from "bun:test";
import { etaMinutesFromDistance, haversineMeters, isWithinRadius } from "../src/shared/geo";

describe("geo", () => {
  test("haversine is ~0 for same point", () => {
    expect(haversineMeters(15.1, 76.5, 15.1, 76.5)).toBeLessThan(1);
  });

  test("haversine rough distance for ~1km", () => {
    // ~0.009 degrees latitude ≈ 1 km
    const d = haversineMeters(15.1, 76.5, 15.109, 76.5);
    expect(d).toBeGreaterThan(900);
    expect(d).toBeLessThan(1100);
  });

  test("isWithinRadius boundary", () => {
    const lat = 15.1;
    const lng = 76.5;
    expect(isWithinRadius(lat, lng, lat, lng, 100)).toBe(true);
    expect(isWithinRadius(lat, lng, 15.2, lng, 500)).toBe(false);
    expect(isWithinRadius(lat, lng, 15.109, lng, 1200)).toBe(true);
  });

  test("etaMinutesFromDistance clamps", () => {
    expect(etaMinutesFromDistance(100)).toBe(10);
    expect(etaMinutesFromDistance(50_000)).toBe(60);
  });
});
