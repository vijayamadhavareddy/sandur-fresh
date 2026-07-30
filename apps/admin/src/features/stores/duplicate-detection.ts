/**
 * Store Name Duplicate Detection Utility using Normalized Regex Matching.
 */

export interface StoreCandidate {
  id?: string;
  name: string;
}

export interface DuplicateMatchResult {
  isDuplicate: boolean;
  matchedName?: string;
  matchType?: "exact" | "regex";
  matchedStoreId?: string;
}

/**
 * Normalizes a store name string for robust regex matching:
 * - Trims and converts to lowercase
 * - Replaces punctuation/symbols with spaces
 * - Collapses consecutive spaces
 */
export function normalizeStoreName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[#\-_.,/\\()[\]{}:;!?'"`~@$%^&*+=|<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Builds a flexible RegExp for a given store name:
 * E.g. "Indiranagar Hub #1" becomes `^\s*indiranagar[\s\-_#.,]*hub[\s\-_#.,]*1\s*$`
 */
export function buildStoreNameRegex(name: string): RegExp | null {
  const normalized = normalizeStoreName(name);
  if (!normalized) return null;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  // Escape any regex special chars in tokens
  const escapedTokens = tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  // Match tokens allowing flexible punctuation/spacing separators
  const pattern = `^\\s*${escapedTokens.join("[\\s\\-_#.,]*")}\\s*$`;
  return new RegExp(pattern, "i");
}

/**
 * Checks a store name against a list of existing stores for duplicates.
 *
 * @param candidateName Name being typed or imported
 * @param existingStores List of existing stores to check against
 * @param currentStoreId Optional ID of store currently being edited (to ignore self)
 */
export function findDuplicateStore(
  candidateName: string,
  existingStores: StoreCandidate[],
  currentStoreId?: string,
): DuplicateMatchResult {
  const trimmed = candidateName.trim();
  if (!trimmed) return { isDuplicate: false };

  const normalizedCandidate = normalizeStoreName(trimmed);
  const regex = buildStoreNameRegex(trimmed);

  for (const existing of existingStores) {
    if (currentStoreId && existing.id === currentStoreId) {
      continue;
    }

    const existingTrimmed = existing.name.trim();
    if (!existingTrimmed) continue;

    // 1. Direct Case-Insensitive Exact Match
    if (existingTrimmed.toLowerCase() === trimmed.toLowerCase()) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "exact",
        matchedStoreId: existing.id,
      };
    }

    // 2. Normalized String Match (ignoring punctuation & whitespace differences)
    const normalizedExisting = normalizeStoreName(existingTrimmed);
    if (normalizedCandidate && normalizedExisting === normalizedCandidate) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "exact",
        matchedStoreId: existing.id,
      };
    }

    // 3. Regex Match
    if (regex && (regex.test(existingTrimmed) || regex.test(normalizedExisting))) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "regex",
        matchedStoreId: existing.id,
      };
    }

    // Reverse regex match (in case existing name has fewer/more tokens)
    const existingRegex = buildStoreNameRegex(existingTrimmed);
    if (existingRegex && (existingRegex.test(trimmed) || existingRegex.test(normalizedCandidate))) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "regex",
        matchedStoreId: existing.id,
      };
    }
  }

  return { isDuplicate: false };
}
