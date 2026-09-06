<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { AdminStoreInput, AdminStoreType } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { findDuplicateStore, normalizeStoreName } from "./duplicate-detection";
import { bulkCreateStores } from "./mutations";
import { fetchStores } from "./queries";

interface ParsedStoreRow {
  index: number;
  raw: Record<string, string | number | boolean>;
  store: AdminStoreInput;
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

const { data: existingStoresData } = useQuery({
  queryKey: ["stores"],
  queryFn: () => fetchStores(),
});

const existingStores = computed(() => existingStoresData.value?.adminStores ?? []);

const SAMPLE_CSV = `name,type,partner_name,contact_phone,contact_email,commission_pct,address,lat,lng,service_radius_m,is_active
"Indiranagar Dark Hub #1",DARK_STORE,,,0,"100ft Rd, Indiranagar, Bengaluru",12.9716,77.5946,5000,true
"Whitefield Fulfillment Hub",DARK_STORE,,,0,"ITPL Main Rd, Whitefield, Bengaluru",12.9698,77.7499,6000,true
"Daily Fresh Supermarket",THIRD_PARTY,"Daily Fresh Retail Ltd","+919876543210","partner@dailyfresh.in",10,"4th Block Koramangala, Bengaluru",12.9352,77.6245,3500,true
"Green Leaf Organics",THIRD_PARTY,"Green Leaf Agro Pvt Ltd","+919811223344","orders@greenleaf.com",12,"12th Main, HSR Layout, Bengaluru",12.9121,77.6446,4000,true`;

const SAMPLE_JSON = `[
  {
    "name": "Jayanagar Dark Hub #2",
    "type": "DARK_STORE",
    "address": "9th Block, Jayanagar, Bengaluru",
    "lat": 12.9250,
    "lng": 77.5938,
    "serviceRadiusM": 5000,
    "isActive": true
  },
  {
    "name": "Nature Basket Partner Store",
    "type": "THIRD_PARTY",
    "partnerName": "Nature Basket Ltd",
    "contactPhone": "+919845012345",
    "contactEmail": "contact@naturebasket.com",
    "commissionPct": 15,
    "address": "CMH Road, Indiranagar, Bengaluru",
    "lat": 12.9784,
    "lng": 77.6408,
    "serviceRadiusM": 4000,
    "isActive": true
  }
]`;

function loadSample(format: "csv" | "json") {
  rawInput.value = format === "csv" ? SAMPLE_CSV : SAMPLE_JSON;
  activeInputTab.value = "paste";
}

function downloadTemplate(format: "csv" | "json", isBlank = false) {
  const content =
    format === "csv"
      ? isBlank
        ? "name,type,partner_name,contact_phone,contact_email,commission_pct,address,lat,lng,service_radius_m,is_active\n"
        : SAMPLE_CSV
      : isBlank
      ? `[\n  {\n    "name": "Indiranagar Dark Hub",\n    "type": "DARK_STORE",\n    "address": "100ft Rd, Indiranagar, Bengaluru",\n    "lat": 12.9716,\n    "lng": 77.5946,\n    "serviceRadiusM": 5000,\n    "isActive": true\n  }\n]`
      : SAMPLE_JSON;
  const mimeType =
    format === "csv" ? "text/csv;charset=utf-8;" : "application/json;charset=utf-8;";
  const filename = `sandur_fresh_stores_${isBlank ? "blank_template" : "sample_template"}.${format}`;

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

/**
 * Robust CSV parser supporting quotes and escaped characters
 */
function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
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

/**
 * Normalized store field extractor
 */
function normalizeType(val: unknown): AdminStoreType {
  const str = String(val || "").toUpperCase().trim();
  if (str.includes("THIRD") || str.includes("PARTNER") || str.includes("MERCHANT") || str === "3RD_PARTY") {
    return "THIRD_PARTY";
  }
  return "DARK_STORE";
}

const parsedRows = computed<ParsedStoreRow[]>(() => {
  const input = rawInput.value.trim();
  if (!input) return [];

  let rawList: Record<string, unknown>[] = [];

  // 1. Try parsing JSON
  if (input.startsWith("[") || input.startsWith("{")) {
    try {
      const parsed = JSON.parse(input);
      rawList = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // Not valid JSON, fall back to CSV
      rawList = parseCSV(input);
    }
  } else {
    rawList = parseCSV(input);
  }

  const result: ParsedStoreRow[] = [];
  const batchSeen = new Map<string, number>();

  rawList.forEach((raw, idx) => {
    const name = String(raw.name || raw.store_name || raw.title || "").trim();
    const type = normalizeType(raw.type || raw.store_type || raw.kind);
    const partnerName = raw.partnerName || raw.partner_name || raw.partner || raw.merchant || raw.business ? String(raw.partnerName || raw.partner_name || raw.partner || raw.merchant || raw.business).trim() : undefined;
    const contactPhone = raw.contactPhone || raw.contact_phone || raw.phone || raw.mobile ? String(raw.contactPhone || raw.contact_phone || raw.phone || raw.mobile).trim() : undefined;
    const contactEmail = raw.contactEmail || raw.contact_email || raw.email ? String(raw.contactEmail || raw.contact_email || raw.email).trim() : undefined;
    const commissionPct = raw.commissionPct !== undefined || raw.commission_pct !== undefined || raw.commission !== undefined
      ? Number(raw.commissionPct ?? raw.commission_pct ?? raw.commission)
      : undefined;

    const address = String(raw.address || raw.location || raw.street || "").trim();
    const lat = Number(raw.lat || raw.latitude || 0);
    const lng = Number(raw.lng || raw.longitude || raw.long || 0);
    const serviceRadiusM = Number(raw.serviceRadiusM || raw.service_radius_m || raw.radius || raw.radius_meters || 5000);
    const isActive = raw.isActive !== undefined ? Boolean(raw.isActive) : raw.is_active !== undefined ? Boolean(raw.is_active) : raw.active !== undefined ? Boolean(raw.active) : true;

    const errors: string[] = [];
    if (!name || name.length < 2) errors.push("Store name is required (min 2 chars)");
    if (!address || address.length < 5) errors.push("Address is required (min 5 chars)");
    if (Number.isNaN(lat) || lat < -90 || lat > 90) errors.push("Valid latitude (-90 to 90) required");
    if (Number.isNaN(lng) || lng < -180 || lng > 180) errors.push("Valid longitude (-180 to 180) required");
    if (Number.isNaN(serviceRadiusM) || serviceRadiusM <= 0) errors.push("Positive dispatch radius required");

    // Check duplicate against existing stores in DB
    let isDuplicate = false;
    let duplicateReason: string | undefined;

    const dbDuplicate = findDuplicateStore(name, existingStores.value);
    if (dbDuplicate.isDuplicate) {
      isDuplicate = true;
      duplicateReason = `Matches existing store "${dbDuplicate.matchedName}" (${dbDuplicate.matchType === 'exact' ? 'exact' : 'regex'})`;
    }

    // Check duplicate within the current batch
    const normalizedKey = normalizeStoreName(name);
    if (normalizedKey) {
      if (batchSeen.has(normalizedKey)) {
        isDuplicate = true;
        const prevRowIndex = batchSeen.get(normalizedKey)! + 1;
        duplicateReason = `Duplicate of row #${prevRowIndex} in this batch`;
      } else {
        batchSeen.set(normalizedKey, idx);
      }
    }

    const store: AdminStoreInput = {
      name,
      type,
      partnerName: partnerName || null,
      contactPhone: contactPhone || null,
      contactEmail: contactEmail || null,
      commissionPct: Number.isNaN(commissionPct) ? null : commissionPct,
      address,
      lat: Number.isNaN(lat) ? 0 : lat,
      lng: Number.isNaN(lng) ? 0 : lng,
      serviceRadiusM: Number.isNaN(serviceRadiusM) ? 5000 : serviceRadiusM,
      isActive,
    };

    result.push({
      index: idx + 1,
      raw: raw as Record<string, string | number | boolean>,
      store,
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

const readyToImportCount = computed(() => {
  return parsedRows.value.filter((r) => r.errors.length === 0 && (!r.isDuplicate || !skipDuplicates.value)).length;
});

async function executeImport() {
  const storesToImport = parsedRows.value
    .filter((r) => r.errors.length === 0 && (!r.isDuplicate || !skipDuplicates.value))
    .map((r) => r.store);

  if (storesToImport.length === 0) {
    submitError.value = "No valid store rows selected for import.";
    return;
  }

  isSubmitting.value = true;
  submitError.value = "";
  submitSuccess.value = null;

  try {
    const result = await bulkCreateStores(storesToImport);
    const importedCount = result.bulkCreateAdminStores.length;
    const skippedCount = totalRows.value - importedCount;

    submitSuccess.value = {
      imported: importedCount,
      skipped: skippedCount,
    };

    await queryClient.invalidateQueries({ queryKey: ["stores"] });
    emit("imported", importedCount);
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : "Bulk import failed. Please check inputs.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
    <div class="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-950/40">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
            📦
          </div>
          <div>
            <h2 class="text-base font-bold text-white">Bulk Store Import</h2>
            <p class="text-xs text-slate-400">Import multiple dark store hubs and partner merchant stores via CSV or JSON.</p>
          </div>
        </div>

        <button
          type="button"
          @click="emit('close')"
          class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          ✕
        </button>
      </div>

      <!-- Main Content Scroll Area -->
      <div class="p-6 flex-1 overflow-y-auto space-y-6">
        <!-- Input Method Tabs -->
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              @click="activeInputTab = 'paste'"
              class="px-3 py-1.5 rounded-lg font-medium transition cursor-pointer"
              :class="activeInputTab === 'paste' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'"
            >
              Paste CSV / JSON
            </button>
            <button
              type="button"
              @click="activeInputTab = 'upload'"
              class="px-3 py-1.5 rounded-lg font-medium transition cursor-pointer"
              :class="activeInputTab === 'upload' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'"
            >
              Upload File
            </button>
            <button
              type="button"
              @click="activeInputTab = 'sample'"
              class="px-3 py-1.5 rounded-lg font-medium transition cursor-pointer"
              :class="activeInputTab === 'sample' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'"
            >
              Templates
            </button>
          </div>

          <div v-if="rawInput" class="flex items-center gap-3">
            <label class="flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 cursor-pointer">
              <input type="checkbox" v-model="skipDuplicates" class="accent-emerald-500 rounded" />
              <span>Auto-skip duplicate names</span>
            </label>
            <button
              type="button"
              @click="rawInput = ''"
              class="text-xs text-slate-400 hover:text-red-400 transition"
            >
              Clear
            </button>
          </div>
        </div>

        <!-- Input Mode 1: Paste Textarea -->
        <div v-if="activeInputTab === 'paste'" class="space-y-2">
          <textarea
            v-model="rawInput"
            rows="6"
            placeholder="Paste CSV rows or JSON array of stores here...&#10;e.g. name,type,address,lat,lng,service_radius_m"
            class="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-y"
          ></textarea>
        </div>

        <!-- Input Mode 2: File Upload -->
        <div v-else-if="activeInputTab === 'upload'" class="space-y-4">
          <div class="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center bg-slate-950/50 hover:border-emerald-500/40 transition flex flex-col items-center justify-center gap-3">
            <span class="text-3xl">📁</span>
            <div>
              <p class="text-sm font-semibold text-white">Select a CSV or JSON file to upload</p>
              <p class="text-xs text-slate-400 mt-1">Supports standard CSV with column headers or JSON arrays.</p>
            </div>
            <input
              type="file"
              accept=".csv, .json, text/csv, application/json"
              @change="handleFileUpload"
              class="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/20 file:text-emerald-300 hover:file:bg-emerald-500/30 cursor-pointer"
            />
          </div>

          <!-- Download Template Callout -->
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span class="font-semibold text-white">Need a spreadsheet template to fill in?</span>
              <p class="text-[11px] text-slate-400 mt-0.5">Download a blank or sample template, populate your stores, and upload here.</p>
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

        <!-- Input Mode 3: Sample Templates -->
        <div v-else-if="activeInputTab === 'sample'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <span class="text-xs font-bold text-emerald-400">CSV Template</span>
                <span class="text-[10px] text-slate-500 font-mono">Spreadsheet (Excel / Sheets)</span>
              </div>
              <pre class="text-[11px] font-mono text-slate-400 mt-2 overflow-x-auto p-2 bg-slate-900/80 rounded-lg max-h-32">{{ SAMPLE_CSV }}</pre>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
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
              <AppButton variant="quiet" @click="loadSample('csv')">Paste in Editor →</AppButton>
            </div>
          </div>

          <div class="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <span class="text-xs font-bold text-sky-400">JSON Template</span>
                <span class="text-[10px] text-slate-500 font-mono">Structured Array</span>
              </div>
              <pre class="text-[11px] font-mono text-slate-400 mt-2 overflow-x-auto p-2 bg-slate-900/80 rounded-lg max-h-32">{{ SAMPLE_JSON }}</pre>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
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
              <AppButton variant="quiet" @click="loadSample('json')">Paste in Editor →</AppButton>
            </div>
          </div>
        </div>

        <!-- Feedback Alerts -->
        <div v-if="submitError" class="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-300 flex items-center gap-3">
          <span>❌</span>
          <span>{{ submitError }}</span>
        </div>

        <div v-if="submitSuccess" class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span>🎉</span>
            <span>Successfully imported <strong>{{ submitSuccess.imported }}</strong> stores! ({{ submitSuccess.skipped }} skipped).</span>
          </div>
          <button type="button" @click="emit('close')" class="font-bold underline cursor-pointer">Done</button>
        </div>

        <!-- Parsed Data Preview Table -->
        <div v-if="totalRows > 0" class="space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-800">
            <div class="flex items-center gap-2 text-xs">
              <span class="font-bold text-white">Parsed Preview:</span>
              <button
                type="button"
                @click="filterTab = 'all'"
                class="px-2.5 py-1 rounded-lg transition"
                :class="filterTab === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'"
              >
                All ({{ totalRows }})
              </button>
              <button
                type="button"
                @click="filterTab = 'valid'"
                class="px-2.5 py-1 rounded-lg transition text-emerald-400"
                :class="filterTab === 'valid' ? 'bg-emerald-500/20 font-bold' : 'hover:text-emerald-300'"
              >
                Valid ({{ validRows.length }})
              </button>
              <button
                v-if="duplicateRows.length > 0"
                type="button"
                @click="filterTab = 'duplicates'"
                class="px-2.5 py-1 rounded-lg transition text-amber-400"
                :class="filterTab === 'duplicates' ? 'bg-amber-500/20 font-bold' : 'hover:text-amber-300'"
              >
                ⚠️ Duplicates ({{ duplicateRows.length }})
              </button>
              <button
                v-if="errorRows.length > 0"
                type="button"
                @click="filterTab = 'errors'"
                class="px-2.5 py-1 rounded-lg transition text-red-400"
                :class="filterTab === 'errors' ? 'bg-red-500/20 font-bold' : 'hover:text-red-300'"
              >
                Errors ({{ errorRows.length }})
              </button>
            </div>

            <span class="text-xs text-slate-400 font-mono">
              Ready to import: <strong class="text-emerald-400">{{ readyToImportCount }}</strong> stores
            </span>
          </div>

          <div class="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/60 max-h-72 overflow-y-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-900/90 text-[11px] text-slate-400 border-b border-slate-800 font-mono sticky top-0 z-10 backdrop-blur">
                <tr>
                  <th class="p-3 w-12 text-center">#</th>
                  <th class="p-3">Store Name</th>
                  <th class="p-3">Type</th>
                  <th class="p-3">Address</th>
                  <th class="p-3">Coordinates</th>
                  <th class="p-3">Radius</th>
                  <th class="p-3">Status / Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                <tr
                  v-for="row in displayedRows"
                  :key="row.index"
                  class="transition-colors hover:bg-slate-900/50"
                  :class="{
                    'bg-amber-500/5': row.isDuplicate,
                    'bg-red-500/5': row.errors.length > 0,
                  }"
                >
                  <td class="p-3 text-center text-slate-500 font-mono">{{ row.index }}</td>
                  <td class="p-3 font-semibold text-white">
                    {{ row.store.name || '(Empty Name)' }}
                    <span v-if="row.store.partnerName" class="block text-[11px] text-slate-400 font-normal">
                      Partner: {{ row.store.partnerName }}
                    </span>
                  </td>
                  <td class="p-3">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-semibold"
                      :class="row.store.type === 'DARK_STORE' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-sky-500/15 text-sky-300'"
                    >
                      {{ row.store.type === 'DARK_STORE' ? '🏢 Dark Store' : '🏪 3rd Party' }}
                    </span>
                  </td>
                  <td class="p-3 text-slate-300 max-w-xs truncate" :title="row.store.address">{{ row.store.address }}</td>
                  <td class="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {{ row.store.lat.toFixed(4) }}, {{ row.store.lng.toFixed(4) }}
                  </td>
                  <td class="p-3 font-mono text-slate-300 whitespace-nowrap">
                    {{ (row.store.serviceRadiusM ?? 5000) / 1000 }} km
                  </td>
                  <td class="p-3 whitespace-nowrap">
                    <div v-if="row.errors.length > 0" class="text-red-400 text-[11px]">
                      <span>❌ {{ row.errors[0] }}</span>
                    </div>
                    <div v-else-if="row.isDuplicate" class="text-amber-400 text-[11px]">
                      <span :title="row.duplicateReason">⚠️ {{ row.duplicateReason }}</span>
                    </div>
                    <div v-else class="text-emerald-400 text-[11px] flex items-center gap-1">
                      <span>✓ Ready</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-between p-6 border-t border-slate-800/80 bg-slate-950/60">
        <AppButton variant="quiet" :disabled="isSubmitting" @click="emit('close')">Cancel</AppButton>
        <div class="flex items-center gap-3">
          <span v-if="readyToImportCount > 0" class="text-xs text-slate-400">
            Will create <strong>{{ readyToImportCount }}</strong> store records
          </span>
          <AppButton
            variant="primary"
            :disabled="readyToImportCount === 0 || isSubmitting"
            @click="executeImport"
          >
            {{ isSubmitting ? "Importing stores..." : `Import ${readyToImportCount} Stores` }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
