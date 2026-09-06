<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { AdminCategoryInput } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import {
  findDuplicateCategory,
  normalizeCategoryName,
  slugify,
} from "./duplicate-detection";
import { bulkCreateCategories } from "./mutations";
import { fetchCategories } from "./queries";

interface ParsedCategoryRow {
  index: number;
  raw: Record<string, unknown>;
  category: AdminCategoryInput;
  errors: string[];
  isDuplicate: boolean;
  duplicateReason?: string;
  selected: boolean;
}

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "imported", count: number): void;
}>();

const queryClient = useQueryClient();
const activeInputTab = ref<"paste" | "upload" | "sample">("paste");
const rawInput = ref("");
const skipDuplicates = ref(true);
const filterTab = ref<"all" | "valid" | "duplicates" | "errors">("all");
const isSubmitting = ref(false);
const submitError = ref("");
const submitSuccess = ref<{ imported: number; skipped: number } | null>(null);

const { data: categoriesData } = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});

const existingCategories = computed(() => categoriesData.value?.adminCategories ?? []);

const SAMPLE_CSV = `name,slug,sort_order
"Fresh Vegetables","fresh-vegetables",1
"Fresh Fruits","fresh-fruits",2
"Dairy & Eggs","dairy-eggs",3
"Bakery & Breads","bakery-breads",4
"Beverages & Juices","beverages-juices",5
"Pantry & Staples","pantry-staples",6`;

const SAMPLE_JSON = `[
  { "name": "Fresh Vegetables", "slug": "fresh-vegetables", "sortOrder": 1 },
  { "name": "Fresh Fruits", "slug": "fresh-fruits", "sortOrder": 2 },
  { "name": "Dairy & Eggs", "slug": "dairy-eggs", "sortOrder": 3 },
  { "name": "Bakery & Breads", "slug": "bakery-breads", "sortOrder": 4 }
]`;

function loadSample(format: "csv" | "json") {
  rawInput.value = format === "csv" ? SAMPLE_CSV : SAMPLE_JSON;
  activeInputTab.value = "paste";
}

function downloadTemplate(format: "csv" | "json", isBlank = false) {
  const content =
    format === "csv"
      ? isBlank
        ? "name,slug,sort_order\n"
        : SAMPLE_CSV
      : isBlank
      ? `[\n  { "name": "Example Category", "slug": "example-category", "sortOrder": 1 }\n]`
      : SAMPLE_JSON;
  const mimeType =
    format === "csv" ? "text/csv;charset=utf-8;" : "application/json;charset=utf-8;";
  const filename = `sandur_fresh_categories_${isBlank ? "blank_template" : "sample_template"}.${format}`;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    rawInput.value = (e.target?.result as string) || "";
    activeInputTab.value = "paste";
  };
  reader.readAsText(file);
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      if (inQuotes && line[i + 1] === char) {
        current += char;
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((char === "," || char === "\t" || char === ";") && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headerLine = lines[0]!;
  const headers = parseCSVLine(headerLine).map((h) => h.trim().toLowerCase());

  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]!);
    if (values.length === 0) continue;
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] !== undefined ? values[idx].trim() : "";
    });
    rows.push(row);
  }
  return rows;
}

const parsedRows = computed<ParsedCategoryRow[]>(() => {
  const input = rawInput.value.trim();
  if (!input) return [];

  let rawList: Record<string, unknown>[] = [];

  if (input.startsWith("[") || input.startsWith("{")) {
    try {
      const parsed = JSON.parse(input);
      rawList = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      rawList = parseCSV(input);
    }
  } else {
    rawList = parseCSV(input);
  }

  const result: ParsedCategoryRow[] = [];
  const batchNamesSeen = new Map<string, number>();
  const batchSlugsSeen = new Map<string, number>();

  rawList.forEach((raw, idx) => {
    const name = String(raw.name || raw.category_name || raw.title || "").trim();
    let slug = String(raw.slug || raw.category_slug || "").trim().toLowerCase();
    if (!slug && name) {
      slug = slugify(name);
    }

    const sortOrderVal = raw.sortOrder !== undefined || raw.sort_order !== undefined || raw.order !== undefined
      ? Number(raw.sortOrder ?? raw.sort_order ?? raw.order)
      : idx + 1;
    const sortOrder = Number.isNaN(sortOrderVal) ? 0 : sortOrderVal;

    const errors: string[] = [];
    if (!name || name.length < 1) errors.push("Category name is required");
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      errors.push("Slug must contain only lowercase letters, numbers, and hyphens (e.g. fresh-produce)");
    }

    let isDuplicate = false;
    let duplicateReason: string | undefined;

    const dbDuplicate = findDuplicateCategory({ name, slug }, existingCategories.value);
    if (dbDuplicate.isDuplicate) {
      isDuplicate = true;
      duplicateReason = `Matches existing category "${dbDuplicate.matchedName}" (${dbDuplicate.matchType === "exact_slug" ? "duplicate slug" : "duplicate name"})`;
    }

    const normName = normalizeCategoryName(name);
    if (normName) {
      if (batchNamesSeen.has(normName)) {
        isDuplicate = true;
        const prevIdx = batchNamesSeen.get(normName)! + 1;
        duplicateReason = `Duplicate name of row #${prevIdx} in this batch`;
      } else {
        batchNamesSeen.set(normName, idx);
      }
    }

    if (slug) {
      if (batchSlugsSeen.has(slug)) {
        isDuplicate = true;
        const prevIdx = batchSlugsSeen.get(slug)! + 1;
        duplicateReason = `Duplicate slug of row #${prevIdx} in this batch`;
      } else {
        batchSlugsSeen.set(slug, idx);
      }
    }

    const category: AdminCategoryInput = {
      name,
      slug,
      sortOrder,
    };

    result.push({
      index: idx + 1,
      raw,
      category,
      errors,
      isDuplicate,
      duplicateReason,
      selected: errors.length === 0 && (!isDuplicate || !skipDuplicates.value),
    });
  });

  return result;
});

const totalRows = computed(() => parsedRows.value.length);
const validRows = computed(() => parsedRows.value.filter((r) => r.errors.length === 0 && !r.isDuplicate));
const duplicateRows = computed(() => parsedRows.value.filter((r) => r.isDuplicate));
const errorRows = computed(() => parsedRows.value.filter((r) => r.errors.length > 0));

const displayedRows = computed(() => {
  if (filterTab.value === "valid") return validRows.value;
  if (filterTab.value === "duplicates") return duplicateRows.value;
  if (filterTab.value === "errors") return errorRows.value;
  return parsedRows.value;
});

const selectedCount = computed(() => parsedRows.value.filter((r) => r.selected).length);

function toggleRow(row: ParsedCategoryRow) {
  row.selected = !row.selected;
}

function selectAll() {
  for (const r of parsedRows.value) {
    if (r.errors.length === 0) {
      r.selected = true;
    }
  }
}

function deselectAll() {
  for (const r of parsedRows.value) {
    r.selected = false;
  }
}

async function handleImport() {
  const toImport = parsedRows.value
    .filter((r) => r.selected && r.errors.length === 0)
    .map((r) => r.category);

  if (toImport.length === 0) {
    submitError.value = "No valid categories selected to import.";
    return;
  }

  isSubmitting.value = true;
  submitError.value = "";

  try {
    const res = await bulkCreateCategories(toImport);
    const createdCount = res.bulkCreateAdminCategories.length;
    submitSuccess.value = {
      imported: createdCount,
      skipped: totalRows.value - createdCount,
    };

    await queryClient.invalidateQueries({ queryKey: ["categories"] });
    emit("imported", createdCount);
  } catch (err: unknown) {
    submitError.value = err instanceof Error ? err.message : "Failed to import categories.";
  } finally {
    isSubmitting.value = false;
  }
}

function handleClose() {
  rawInput.value = "";
  submitError.value = "";
  submitSuccess.value = null;
  emit("close");
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
  >
    <!-- Modal Content -->
    <div
      class="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/90 backdrop-blur">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
            🏷️
          </div>
          <div>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>Bulk Import Categories</span>
            </h3>
            <p class="text-xs text-slate-400">
              Paste CSV/JSON or upload a spreadsheet of catalog categories to batch import.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Success Banner -->
      <div
        v-if="submitSuccess"
        class="p-6 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-300 flex flex-col items-center text-center gap-3"
      >
        <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl">
          ✓
        </div>
        <div>
          <h4 class="text-base font-bold text-white">Import Successful!</h4>
          <p class="text-xs text-emerald-300/90 mt-1">
            Successfully imported <strong class="text-emerald-200">{{ submitSuccess.imported }}</strong> categories into the catalog.
          </p>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <AppButton variant="primary" @click="handleClose">Done</AppButton>
        </div>
      </div>

      <!-- Main Body -->
      <div v-else class="flex-1 overflow-y-auto p-6 space-y-5">
        <!-- Input Method Tabs -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="activeInputTab = 'paste'"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
              :class="activeInputTab === 'paste' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
            >
              Paste CSV / JSON
            </button>
            <button
              type="button"
              @click="activeInputTab = 'upload'"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
              :class="activeInputTab === 'upload' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
            >
              Upload File
            </button>
            <button
              type="button"
              @click="activeInputTab = 'sample'"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
              :class="activeInputTab === 'sample' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
            >
              Templates
            </button>
          </div>

          <!-- Configuration Controls -->
          <div class="flex items-center gap-4 text-xs text-slate-300">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="skipDuplicates"
                class="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20"
              />
              <span>Auto-skip duplicates</span>
            </label>
          </div>
        </div>

        <!-- Input Tab Content -->
        <div v-if="activeInputTab === 'paste'" class="space-y-2">
          <label for="raw-category-input" class="block text-xs font-medium text-slate-300">
            Paste CSV or JSON payload
          </label>
          <textarea
            id="raw-category-input"
            v-model="rawInput"
            rows="6"
            placeholder="name,slug,sort_order&#10;Fresh Vegetables,fresh-vegetables,1&#10;Fresh Fruits,fresh-fruits,2"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
          ></textarea>
        </div>

        <div v-else-if="activeInputTab === 'upload'" class="space-y-4">
          <div class="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-slate-950/40 transition">
            <svg class="w-10 h-10 text-slate-500 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-xs font-semibold text-slate-300">Select a CSV or JSON file from your device</p>
            <p class="text-[11px] text-slate-500 mt-1">Supports standard CSV spreadsheets and JSON files</p>
            <input
              type="file"
              accept=".csv,.json,text/csv,application/json"
              @change="handleFileUpload"
              class="mt-4 block mx-auto text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
            />
          </div>

          <!-- Download Template Callout -->
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span class="font-semibold text-white">Need an empty spreadsheet template to fill in?</span>
              <p class="text-[11px] text-slate-400 mt-0.5">Download a blank or sample template, populate categories, and upload here.</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                @click="downloadTemplate('csv', false)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Sample CSV</span>
              </button>
              <button
                type="button"
                @click="downloadTemplate('csv', true)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Blank CSV</span>
              </button>
              <button
                type="button"
                @click="downloadTemplate('json', false)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 border border-sky-500/30 text-xs font-semibold transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>JSON Template</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="activeInputTab === 'sample'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <h5 class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>📄 CSV Category Template</span>
                </h5>
                <span class="text-[10px] text-emerald-400 font-mono font-semibold">Spreadsheet</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-2">
                Standard columns: <code class="text-emerald-300 font-mono text-[10px]">name, slug, sort_order</code> (slug auto-generated if omitted)
              </p>
              <pre class="text-[10px] font-mono text-slate-500 mt-2 p-2 bg-slate-900/60 rounded-lg overflow-x-auto max-h-24">{{ SAMPLE_CSV }}</pre>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                @click="downloadTemplate('csv', false)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold hover:bg-emerald-500/25 transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Sample</span>
              </button>
              <button
                type="button"
                @click="downloadTemplate('csv', true)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-700 transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Blank CSV</span>
              </button>
              <button
                type="button"
                @click="loadSample('csv')"
                class="px-2.5 py-1.5 text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
              >
                Paste in Editor →
              </button>
            </div>
          </div>

          <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <h5 class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>📦 JSON Category Template</span>
                </h5>
                <span class="text-[10px] text-sky-400 font-mono font-semibold">Structured Array</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-2">
                Array of category objects with display name, slug, and sort order.
              </p>
              <pre class="text-[10px] font-mono text-slate-500 mt-2 p-2 bg-slate-900/60 rounded-lg overflow-x-auto max-h-24">{{ SAMPLE_JSON }}</pre>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                @click="downloadTemplate('json', false)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/15 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold hover:bg-sky-500/25 transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Sample</span>
              </button>
              <button
                type="button"
                @click="downloadTemplate('json', true)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-700 transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Blank JSON</span>
              </button>
              <button
                type="button"
                @click="loadSample('json')"
                class="px-2.5 py-1.5 text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
              >
                Paste in Editor →
              </button>
            </div>
          </div>
        </div>

        <!-- Preview & Validation Area -->
        <div v-if="totalRows > 0" class="space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            <!-- Filter Tabs with Badges -->
            <div class="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                @click="filterTab = 'all'"
                class="px-2.5 py-1 rounded-lg border font-semibold transition cursor-pointer"
                :class="filterTab === 'all' ? 'bg-slate-800 text-white border-slate-700' : 'text-slate-400 border-transparent hover:text-slate-200'"
              >
                All ({{ totalRows }})
              </button>

              <button
                type="button"
                @click="filterTab = 'valid'"
                class="px-2.5 py-1 rounded-lg border font-semibold transition flex items-center gap-1 cursor-pointer"
                :class="filterTab === 'valid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'text-emerald-400/70 border-transparent hover:text-emerald-300'"
              >
                <span>Valid</span>
                <span class="px-1.5 py-0.2 bg-emerald-500/30 rounded-full text-[10px]">{{ validRows.length }}</span>
              </button>

              <button
                v-if="duplicateRows.length > 0"
                type="button"
                @click="filterTab = 'duplicates'"
                class="px-2.5 py-1 rounded-lg border font-semibold transition flex items-center gap-1 cursor-pointer"
                :class="filterTab === 'duplicates' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'text-amber-400/70 border-transparent hover:text-amber-300'"
              >
                <span>Duplicates</span>
                <span class="px-1.5 py-0.2 bg-amber-500/30 rounded-full text-[10px]">{{ duplicateRows.length }}</span>
              </button>

              <button
                v-if="errorRows.length > 0"
                type="button"
                @click="filterTab = 'errors'"
                class="px-2.5 py-1 rounded-lg border font-semibold transition flex items-center gap-1 cursor-pointer"
                :class="filterTab === 'errors' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'text-red-400/70 border-transparent hover:text-red-300'"
              >
                <span>Errors</span>
                <span class="px-1.5 py-0.2 bg-red-500/30 rounded-full text-[10px]">{{ errorRows.length }}</span>
              </button>
            </div>

            <!-- Selection Controls -->
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <button type="button" @click="selectAll" class="hover:text-emerald-400 transition cursor-pointer">Select All Valid</button>
              <span>•</span>
              <button type="button" @click="deselectAll" class="hover:text-slate-200 transition cursor-pointer">Deselect All</button>
            </div>
          </div>

          <!-- Preview Table -->
          <div class="border border-slate-800 rounded-xl overflow-x-auto max-h-60 bg-slate-950/60">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-900/90 text-slate-400 sticky top-0 border-b border-slate-800">
                <tr>
                  <th class="p-2.5 w-10 text-center">Import</th>
                  <th class="p-2.5">#</th>
                  <th class="p-2.5">Category Name</th>
                  <th class="p-2.5">Slug</th>
                  <th class="p-2.5">Sort Order</th>
                  <th class="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                <tr
                  v-for="row in displayedRows"
                  :key="row.index"
                  class="hover:bg-slate-900/40 transition"
                  :class="{
                    'bg-red-500/5': row.errors.length > 0,
                    'bg-amber-500/5': row.isDuplicate && row.errors.length === 0,
                  }"
                >
                  <td class="p-2.5 text-center">
                    <input
                      type="checkbox"
                      :checked="row.selected"
                      :disabled="row.errors.length > 0"
                      @change="toggleRow(row)"
                      class="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20 disabled:opacity-30"
                    />
                  </td>
                  <td class="p-2.5 font-mono text-slate-500">{{ row.index }}</td>
                  <td class="p-2.5 font-medium text-white max-w-[200px] truncate">
                    {{ row.category.name || "(Unnamed)" }}
                  </td>
                  <td class="p-2.5 font-mono text-emerald-400">/{{ row.category.slug }}</td>
                  <td class="p-2.5 font-mono text-slate-300">#{{ row.category.sortOrder }}</td>
                  <td class="p-2.5 text-[11px]">
                    <div v-if="row.errors.length > 0" class="text-red-400 font-medium space-y-0.5">
                      <div v-for="err in row.errors" :key="err">• {{ err }}</div>
                    </div>
                    <div v-else-if="row.isDuplicate" class="text-amber-400 flex items-center gap-1">
                      <span>⚠️</span>
                      <span :title="row.duplicateReason" class="truncate max-w-[180px]">
                        {{ row.duplicateReason }}
                      </span>
                    </div>
                    <span v-else class="text-emerald-400 font-semibold">✓ Ready</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Submit Error Banner -->
        <div v-if="submitError" class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs">
          {{ submitError }}
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-slate-800/80 bg-slate-900/90 flex items-center justify-between">
        <div class="text-xs text-slate-400">
          <span v-if="totalRows > 0">
            <strong>{{ selectedCount }}</strong> of {{ totalRows }} categories selected
          </span>
        </div>

        <div class="flex items-center gap-3">
          <AppButton variant="quiet" @click="handleClose">Cancel</AppButton>
          <AppButton
            v-if="!submitSuccess"
            variant="primary"
            :disabled="selectedCount === 0 || isSubmitting"
            @click="handleImport"
          >
            <span v-if="isSubmitting">Importing Categories...</span>
            <span v-else>Import {{ selectedCount }} Categories</span>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
