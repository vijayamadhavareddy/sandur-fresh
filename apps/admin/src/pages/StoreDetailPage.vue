<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import QueryError from "@/components/QueryError.vue";
import BulkProductImportDialog from "@/features/products/BulkProductImportDialog.vue";
import { fetchProducts } from "@/features/products/queries";
import { fetchStore } from "@/features/stores/queries";
import { formatCurrency } from "@/shared/formatting/currency";
import { formatDateTime } from "@/shared/formatting/date";

const route = useRoute();
const queryClient = useQueryClient();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));

const storeQuery = useQuery({
  queryKey: computed(() => ["store", id.value]),
  queryFn: () => fetchStore(id.value),
  enabled: computed(() => Boolean(id.value)),
});

const store = computed(() => storeQuery.data.value?.adminStore);

const page = ref(1);
const limit = ref(10);
const searchQuery = ref("");
const debouncedSearch = ref("");
let searchTimer: ReturnType<typeof setTimeout> | null = null;

watch(searchQuery, (newVal) => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedSearch.value = newVal.trim();
    page.value = 1;
  }, 300);
});

const productsQuery = useQuery({
  queryKey: computed(() => [
    "products",
    "store",
    id.value,
    page.value,
    limit.value,
    debouncedSearch.value,
  ]),
  queryFn: () => fetchProducts(page.value, limit.value, debouncedSearch.value, id.value),
  enabled: computed(() => Boolean(id.value)),
});

const products = computed(() => productsQuery.data.value?.adminProducts.items ?? []);
const totalProducts = computed(() => productsQuery.data.value?.adminProducts.total ?? 0);
const totalPages = computed(() => Math.max(1, Math.ceil(totalProducts.value / limit.value)));

const showBulkImport = ref(false);

function handleImported() {
  queryClient.invalidateQueries({ queryKey: ["products"] });
}
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Ambient Background Glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full flex flex-col gap-6 flex-1">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs font-medium text-slate-400">
        <RouterLink to="/stores" class="hover:text-emerald-400 transition-colors flex items-center gap-1">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Stores</span>
        </RouterLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-200 truncate max-w-[200px]">{{ store?.name ?? "Store Details" }}</span>
      </nav>

      <!-- Loading State -->
      <div v-if="storeQuery.isPending.value" class="p-12 text-center text-slate-400 animate-pulse">
        <div class="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-sm font-semibold">Loading store profile...</p>
      </div>

      <!-- Error State -->
      <QueryError v-else-if="storeQuery.isError.value || !store" />

      <!-- Store Content -->
      <div v-else class="flex flex-col gap-6">
        <!-- Store Header Banner -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2.5">
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5"
                :class="store.type === 'DARK_STORE'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-sky-500/15 text-sky-300 border-sky-500/30'"
              >
                <span>{{ store.type === 'DARK_STORE' ? '🏢 Dark Store' : '🏪 Third-Party Partner' }}</span>
              </span>

              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5"
                :class="store.isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'"
              >
                <span
                  class="w-2 h-2 rounded-full"
                  :class="store.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'"
                ></span>
                <span>{{ store.isActive ? 'Active & Fulfilling' : 'Inactive' }}</span>
              </span>
            </div>

            <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {{ store.name }}
            </h1>
            <p class="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {{ store.address }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              @click="showBulkImport = true"
              class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold py-2.5 px-4 rounded-xl shadow-lg transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Bulk Import Products</span>
            </button>

            <RouterLink
              :to="`/catalog/products/new?storeId=${store.id}`"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Product</span>
            </RouterLink>

            <RouterLink
              :to="`/stores/${store.id}/edit`"
              class="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2.5 px-4 rounded-xl shadow transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Edit Store</span>
            </RouterLink>
          </div>
        </div>

        <!-- Store Attributes Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Dispatch Radius Card -->
          <div class="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Service Coverage</span>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold font-mono text-emerald-400">{{ (store.serviceRadiusM / 1000).toFixed(1) }} km</span>
              <span class="text-xs text-slate-500 font-mono">({{ store.serviceRadiusM }} m)</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-1">Delivery dispatched within this radius.</p>
          </div>

          <!-- Geolocation Coordinates -->
          <div class="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Geo Coordinates</span>
            <div class="mt-2 space-y-0.5 text-xs font-mono">
              <div class="flex justify-between">
                <span class="text-slate-500">Lat:</span>
                <span class="text-slate-200 font-semibold">{{ store.lat.toFixed(5) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Lng:</span>
                <span class="text-slate-200 font-semibold">{{ store.lng.toFixed(5) }}</span>
              </div>
            </div>
            <p class="text-[11px] text-slate-500 mt-1">Fulfillment hub center anchor.</p>
          </div>

          <!-- Store Type & Commission -->
          <div class="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Store Model</span>
            <div class="mt-2">
              <span class="text-sm font-bold text-white">
                {{ store.type === 'DARK_STORE' ? 'Self-Operated Hub' : 'Third-Party Merchant' }}
              </span>
              <div v-if="store.commissionPct !== null && store.commissionPct !== undefined" class="text-xs text-sky-400 font-semibold mt-0.5">
                {{ store.commissionPct }}% Commission Fee
              </div>
            </div>
            <p class="text-[11px] text-slate-500 mt-1">
              {{ store.type === 'DARK_STORE' ? 'Dedicated rapid dark warehouse.' : 'Commissioned external retailer.' }}
            </p>
          </div>

          <!-- Partner Info / Timestamps -->
          <div class="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {{ store.type === 'THIRD_PARTY' ? 'Merchant Contact' : 'Registration' }}
            </span>
            <div class="mt-2 text-xs">
              <template v-if="store.type === 'THIRD_PARTY'">
                <div v-if="store.partnerName" class="font-bold text-slate-200 truncate">{{ store.partnerName }}</div>
                <div v-if="store.contactPhone" class="text-slate-400 font-mono text-[11px]">{{ store.contactPhone }}</div>
                <div v-if="store.contactEmail" class="text-slate-500 truncate text-[11px]">{{ store.contactEmail }}</div>
              </template>
              <template v-else>
                <div class="text-slate-300 font-mono text-[11px]" v-if="store.createdAt">
                  Added: {{ formatDateTime(store.createdAt) }}
                </div>
                <div class="text-slate-500 font-mono text-[11px]" v-if="store.updatedAt">
                  Updated: {{ formatDateTime(store.updatedAt) }}
                </div>
              </template>
            </div>
            <p class="text-[11px] text-slate-500 mt-1 font-mono text-[10px] truncate">ID: {{ store.id }}</p>
          </div>
        </div>

        <!-- Products in Store Section -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <!-- Section Header -->
          <div class="p-6 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-white flex items-center gap-2">
                <span>Products in this Store</span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {{ totalProducts }}
                </span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Manage products, active status, pricing, and stock catalog assigned to {{ store.name }}.
              </p>
            </div>

            <!-- Search & Actions Bar -->
            <div class="flex items-center gap-3">
              <div class="relative w-full sm:w-64">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search products..."
                  class="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
                <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button
                type="button"
                @click="showBulkImport = true"
                class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition border border-slate-700 cursor-pointer whitespace-nowrap"
              >
                <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Bulk Import</span>
              </button>
            </div>
          </div>

          <!-- Products Table Body -->
          <div class="overflow-x-auto">
            <!-- Loading Skeletons -->
            <div v-if="productsQuery.isPending.value" class="p-8 text-center text-slate-500 animate-pulse">
              <p class="text-xs font-semibold">Loading catalog products...</p>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="products.length === 0"
              class="py-16 text-center text-slate-400 p-8 flex flex-col items-center justify-center gap-3"
            >
              <div class="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center text-xl">
                📦
              </div>
              <p class="text-sm font-semibold text-slate-300">No products configured for this store</p>
              <p class="text-xs text-slate-500 max-w-sm">
                Get started by adding your first product or bulk importing a grocery spreadsheet.
              </p>
              <div class="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  @click="showBulkImport = true"
                  class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Bulk Import Products</span>
                </button>

                <RouterLink
                  :to="`/catalog/products/new?storeId=${store.id}`"
                  class="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow transition"
                >
                  <span>+ Add Product</span>
                </RouterLink>
              </div>
            </div>

            <!-- Table -->
            <table v-else class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th class="py-3.5 px-6">Product</th>
                  <th class="py-3.5 px-4">Category</th>
                  <th class="py-3.5 px-4">Unit</th>
                  <th class="py-3.5 px-4">Price / MRP</th>
                  <th class="py-3.5 px-4">Inventory</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                <tr
                  v-for="prod in products"
                  :key="prod.id"
                  class="hover:bg-slate-800/40 transition group"
                >
                  <!-- Product Name & Thumbnail -->
                  <td class="py-3 px-6">
                    <div class="flex items-center gap-3">
                      <img
                        v-if="prod.imageUrl"
                        :src="prod.imageUrl"
                        :alt="prod.name"
                        class="w-9 h-9 rounded-lg object-cover border border-slate-800 bg-slate-950"
                      />
                      <div
                        v-else
                        class="w-9 h-9 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center text-base"
                      >
                        🥗
                      </div>
                      <div>
                        <RouterLink
                          :to="`/catalog/products/${prod.id}`"
                          class="font-semibold text-white group-hover:text-emerald-400 transition-colors"
                        >
                          {{ prod.name }}
                        </RouterLink>
                        <p v-if="prod.description" class="text-[11px] text-slate-500 truncate max-w-xs">
                          {{ prod.description }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <!-- Category -->
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px]">
                      {{ prod.category.name }}
                    </span>
                  </td>

                  <!-- Unit -->
                  <td class="py-3 px-4 text-slate-400 font-mono">
                    {{ prod.unit }}
                  </td>

                  <!-- Price & MRP -->
                  <td class="py-3 px-4 font-mono">
                    <div class="text-white font-semibold">{{ formatCurrency(prod.price) }}</div>
                    <div v-if="prod.mrp > prod.price" class="text-[10px] text-slate-500 line-through">
                      {{ formatCurrency(prod.mrp) }}
                    </div>
                  </td>

                  <!-- Inventory Tracking -->
                  <td class="py-3 px-4 font-mono text-[11px]">
                    <span
                      v-if="prod.trackInventory"
                      class="inline-flex items-center gap-1 text-emerald-400 font-semibold"
                    >
                      <span>Tracked</span>
                    </span>
                    <span v-else class="text-slate-500">
                      Untracked
                    </span>
                  </td>

                  <!-- Active Status -->
                  <td class="py-3 px-4">
                    <span
                      class="inline-flex items-center gap-1.5 text-[11px] font-medium"
                      :class="prod.isActive ? 'text-emerald-400' : 'text-slate-500'"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full"
                        :class="prod.isActive ? 'bg-emerald-400' : 'bg-slate-600'"
                      ></span>
                      <span>{{ prod.isActive ? 'Active' : 'Disabled' }}</span>
                    </span>
                  </td>

                  <!-- Action Links -->
                  <td class="py-3 px-6 text-right">
                    <div class="inline-flex items-center gap-2 justify-end">
                      <RouterLink
                        :to="`/catalog/products/${prod.id}`"
                        class="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
                      >
                        View
                      </RouterLink>
                      <RouterLink
                        :to="`/catalog/products/${prod.id}/edit`"
                        class="px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition"
                      >
                        Edit
                      </RouterLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Footer -->
          <div
            v-if="totalPages > 1"
            class="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400"
          >
            <span>
              Page <strong class="text-white">{{ page }}</strong> of <strong class="text-white">{{ totalPages }}</strong>
              ({{ totalProducts }} items)
            </span>

            <div class="flex items-center gap-2">
              <button
                type="button"
                :disabled="page <= 1"
                @click="page--"
                class="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <button
                type="button"
                :disabled="page >= totalPages"
                @click="page++"
                class="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Product Import Dialog -->
    <BulkProductImportDialog
      v-if="store"
      :open="showBulkImport"
      :store-id="store.id"
      :store-name="store.name"
      @close="showBulkImport = false"
      @imported="handleImported"
    />
  </div>
</template>
