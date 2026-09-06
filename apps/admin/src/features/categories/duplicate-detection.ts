/**
 * Category Duplicate Detection Utility.
 */

export interface CategoryCandidate {
  id?: string;
  name: string;
  slug: string;
}

export interface DuplicateCategoryMatchResult {
  isDuplicate: boolean;
  matchedName?: string;
  matchType?: "exact_name" | "exact_slug" | "normalized_name";
  matchedCategoryId?: string;
}

export function normalizeCategoryName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[#\-_.,/\\()[\]{}:;!?'"`~@$%^&*+=|<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findDuplicateCategory(
  candidate: { name: string; slug: string },
  existingCategories: CategoryCandidate[],
  currentCategoryId?: string,
): DuplicateCategoryMatchResult {
  const nameTrimmed = candidate.name.trim();
  const slugTrimmed = candidate.slug.trim().toLowerCase();

  if (!nameTrimmed && !slugTrimmed) return { isDuplicate: false };

  const normalizedName = normalizeCategoryName(nameTrimmed);

  for (const existing of existingCategories) {
    if (currentCategoryId && existing.id === currentCategoryId) {
      continue;
    }

    if (slugTrimmed && existing.slug.trim().toLowerCase() === slugTrimmed) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "exact_slug",
        matchedCategoryId: existing.id,
      };
    }

    if (nameTrimmed && existing.name.trim().toLowerCase() === nameTrimmed.toLowerCase()) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "exact_name",
        matchedCategoryId: existing.id,
      };
    }

    const existingNormalized = normalizeCategoryName(existing.name.trim());
    if (normalizedName && existingNormalized === normalizedName) {
      return {
        isDuplicate: true,
        matchedName: existing.name,
        matchType: "normalized_name",
        matchedCategoryId: existing.id,
      };
    }
  }

  return { isDuplicate: false };
}
