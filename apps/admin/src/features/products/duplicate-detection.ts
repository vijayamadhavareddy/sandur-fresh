/**
 * Product Name Duplicate Detection Utility using Normalized Matching.
 */

export interface ProductCandidate {
  id?: string;
  name: string;
}

export interface DuplicateMatchResult {
  isDuplicate: boolean;
  matchedName?: string;
  matchType?: "exact" | "regex";
  matchedProductId?: string;
}

export function normalizeProductName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[#\-_.,/\\()[\]{}:;!?'"`~@$%^&*+=|<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildProductNameRegex(name: string): RegExp | null {
  const normalized = normalizeProductName(name);
  if (!normalized) return null;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  const escapedTokens = tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = `^\\s*${escapedTokens.join("[\\s\\-_#.,]*")}\\s*$`;
  return new RegExp(pattern, "i");
}

export function findDuplicateProduct(
  candidateName: string,
  existingProducts: ProductCandidate[],
  currentProductId?: string,
): DuplicateMatchResult {
  const trimmed = candidateName.trim();
  if (!trimmed) return { isDuplicate: false };

  const normalizedCandidate = normalizeProductName(trimmed);
  const regex = buildProductNameRegex(trimmed);

  for (const existing of existingProducts) {
    if (currentProductId && existing.id === currentProductId) {
      continue;
    }

    const existingTrimmed = existing.name.trim();
    if (!existingTrimmed) continue;

    if (existingTrimmed.toLowerCase() === trimmed.toLowerCase()) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "exact",
        matchedProductId: existing.id,
      };
    }

    const normalizedExisting = normalizeProductName(existingTrimmed);
    if (normalizedCandidate && normalizedExisting === normalizedCandidate) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "exact",
        matchedProductId: existing.id,
      };
    }

    if (regex && (regex.test(existingTrimmed) || regex.test(normalizedExisting))) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "regex",
        matchedProductId: existing.id,
      };
    }

    const existingRegex = buildProductNameRegex(existingTrimmed);
    if (existingRegex && (existingRegex.test(trimmed) || existingRegex.test(normalizedCandidate))) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "regex",
        matchedProductId: existing.id,
      };
    }
  }

  return { isDuplicate: false };
}
