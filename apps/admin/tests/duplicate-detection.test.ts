import { describe, expect, test } from "bun:test";
import {
  buildStoreNameRegex,
  findDuplicateStore,
  normalizeStoreName,
} from "../src/features/stores/duplicate-detection";

describe("store duplicate detection", () => {
  test("normalizes names correctly", () => {
    expect(normalizeStoreName("  Indiranagar  Hub #1  ")).toBe("indiranagar hub 1");
    expect(normalizeStoreName("Koramangala-Dark_Store.4th")).toBe("koramangala dark store 4th");
  });

  test("builds regex matching variants and punctuation", () => {
    const regex = buildStoreNameRegex("Indiranagar Hub #1");
    expect(regex).not.toBeNull();
    if (regex) {
      expect(regex.test("Indiranagar Hub #1")).toBe(true);
      expect(regex.test("indiranagar hub 1")).toBe(true);
      expect(regex.test("Indiranagar-Hub-1")).toBe(true);
      expect(regex.test("Indiranagar Hub 2")).toBe(false);
    }
  });

  test("detects exact and pattern duplicate matches in store lists", () => {
    const existing = [
      { id: "store-1", name: "Indiranagar Dark Hub #1" },
      { id: "store-2", name: "Daily Fresh Supermarket" },
    ];

    // Exact match
    const exact = findDuplicateStore("Indiranagar Dark Hub #1", existing);
    expect(exact.isDuplicate).toBe(true);
    expect(exact.matchedName).toBe("Indiranagar Dark Hub #1");

    // Case-insensitive & normalized match
    const caseInsensitive = findDuplicateStore("indiranagar dark hub 1", existing);
    expect(caseInsensitive.isDuplicate).toBe(true);

    // Punctuation variation match
    const punctuationVar = findDuplicateStore("Indiranagar-Dark-Hub-1", existing);
    expect(punctuationVar.isDuplicate).toBe(true);

    // Ignore self during edit
    const selfEdit = findDuplicateStore("Indiranagar Dark Hub #1", existing, "store-1");
    expect(selfEdit.isDuplicate).toBe(false);

    // Distinct new store
    const unique = findDuplicateStore("Whitefield Hub #1", existing);
    expect(unique.isDuplicate).toBe(false);
  });
});
