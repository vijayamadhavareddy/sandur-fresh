<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import QueryError from "@/components/QueryError.vue";
import { usePagination } from "@/composables/usePagination";
import { fetchCategories, fetchProducts, fetchTimeBoundSections } from "@/features/products/queries";
import { fetchStores } from "@/features/stores/queries";
import { formatCurrency } from "@/shared/formatting/currency";

const query = ref("");
const debouncedQuery = ref("");
let searchTimer: ReturnType<typeof setTimeout> | null = null;

const selectedCategoryId = ref("");
const selectedStoreId = ref("");
const statusFilter = ref<"all" | "active" | "paused">("all");
const inventoryFilter = ref<"all" | "tracked" | "unlimited">("all");

const { page, limit, reset } = usePagination();

watch(query, (newVal) => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedQuery.value = newVal.trim();
    reset();
  }, 300);
});

watch([selectedCategoryId, selectedStoreId, statusFilter, inventoryFilter], () => {
  reset();
});

const activeStatusBool = computed(() => {
  if (statusFilter.value === "active") return true;
  if (statusFilter.value === "paused") return false;
  return undefined;
});

const trackInventoryBool = computed(() => {
  if (inventoryFilter.value === "tracked") return true;
  if (inventoryFilter.value === "unlimited") return false;
  return undefined;
});

const key = computed(() => [
  "products",
  page.value,
  limit.value,
  debouncedQuery.value,
  selectedStoreId.value,
  selectedCategoryId.value,
  statusFilter.value,
  inventoryFilter.value,
]);

const { data, isError, isPending } = useQuery({
  queryKey: key,
  queryFn: () =>
    fetchProducts(
      page.value,
      limit.value,
      debouncedQuery.value || undefined,
      selectedStoreId.value || undefined,
      selectedCategoryId.value || undefined,
      activeStatusBool.value,
      trackInventoryBool.value,
    ),
});

const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
const categories = computed(() => categoriesQuery.data.value?.adminCategories ?? []);

const storesQuery = useQuery({ queryKey: ["stores"], queryFn: () => fetchStores() });
const stores = computed(() => storesQuery.data.value?.adminStores ?? []);

const sections = useQuery({ queryKey: ["timeBoundSections"], queryFn: fetchTimeBoundSections });
const sectionTitle = (id: string) =>
  sections.data.value?.timeBoundSections.find((section) => section.id === id)?.title ?? id;

const selectedCategoryName = computed(
  () => categories.value.find((c) => c.id === selectedCategoryId.value)?.name ?? "",
);

const selectedStoreName = computed(() => {
  if (selectedStoreId.value === "global") return "Global Products Only";
  return stores.value.find((s) => s.id === selectedStoreId.value)?.name ?? "";
});

const hasActiveFilters = computed(
  () =>
    Boolean(debouncedQuery.value) ||
    Boolean(selectedCategoryId.value) ||
    Boolean(selectedStoreId.value) ||
    statusFilter.value !== "all" ||
    inventoryFilter.value !== "all",
);

function clearFilters() {
  query.value = "";
  debouncedQuery.value = "";
  selectedCategoryId.value = "";
  selectedStoreId.value = "";
  statusFilter.value = "all";
  inventoryFilter.value = "all";
  reset();
}
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Glowing Ambient Background Effects matching Login theme -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full flex flex-col gap-6 flex-1 justify-between">
      <div class="flex flex-col gap-6 flex-1">
        <!-- Page Header Bar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <PageHeader title="Product Catalog" eyebrow="" />
            <p class="text-sm text-slate-400 mt-1">Manage dark store inventory items, pricing, categories, and stock availability.</p>
          </div>

          <div>
            <RouterLink
              to="/catalog/products/new"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New product</span>
            </RouterLink>
          </div>
        </div>

        <!-- Search & Filter Toolbar -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col gap-4">
          <!-- Primary Filter Controls Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <!-- Search Input -->
            <div class="relative w-full">
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <label class="sr-only" for="product-search">Search products</label>
              <input
                id="product-search"
                v-model="query"
                type="search"
                placeholder="Search products..."
                class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-7 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <button
                v-if="query"
                type="button"
                @click="query = ''"
                class="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <!-- Category Filter Dropdown -->
            <div>
              <label class="sr-only" for="product-category-filter">Filter by category</label>
              <select
                id="product-category-filter"
                v-model="selectedCategoryId"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              >
                <option value="">🏷️ All Categories</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Store Filter Dropdown -->
            <div>
              <label class="sr-only" for="product-store-filter">Filter by store</label>
              <select
                id="product-store-filter"
                v-model="selectedStoreId"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              >
                <option value="">🏬 All Stores</option>
                <option value="global">🌐 Global Products Only</option>
                <option v-for="store in stores" :key="store.id" :value="store.id">
                  {{ store.name }}
                </option>
              </select>
            </div>

            <!-- Status Filter Dropdown -->
            <div>
              <label class="sr-only" for="product-status-filter">Filter by status</label>
              <select
                id="product-status-filter"
                v-model="statusFilter"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              >
                <option value="all">⚡ All Statuses</option>
                <option value="active">Active Only</option>
                <option value="paused">Paused Only</option>
              </select>
            </div>

            <!-- Inventory Tracking Dropdown -->
            <div>
              <label class="sr-only" for="product-inventory-filter">Filter by stock tracking</label>
              <select
                id="product-inventory-filter"
                v-model="inventoryFilter"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              >
                <option value="all">📦 All Inventory</option>
                <option value="tracked">Stock Tracked</option>
                <option value="unlimited">No Stock Limit</option>
              </select>
            </div>
          </div>

          <!-- Active Filter Badges & Summary -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-slate-400 font-medium">Filters:</span>

              <span
                v-if="debouncedQuery"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px]"
              >
                <span>Search: "{{ debouncedQuery }}"</span>
                <button type="button" @click="query = ''" class="hover:text-white">✕</button>
              </span>

              <span
                v-if="selectedCategoryId"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px]"
              >
                <span>🏷️ {{ selectedCategoryName }}</span>
                <button type="button" @click="selectedCategoryId = ''" class="hover:text-white">✕</button>
              </span>

              <span
                v-if="selectedStoreId"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px]"
              >
                <span>🏬 {{ selectedStoreName }}</span>
                <button type="button" @click="selectedStoreId = ''" class="hover:text-white">✕</button>
              </span>

              <span
                v-if="statusFilter !== 'all'"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[11px]"
              >
                <span>Status: {{ statusFilter === 'active' ? 'Active' : 'Paused' }}</span>
                <button type="button" @click="statusFilter = 'all'" class="hover:text-white">✕</button>
              </span>

              <span
                v-if="inventoryFilter !== 'all'"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[11px]"
              >
                <span>Stock: {{ inventoryFilter === 'tracked' ? 'Tracked' : 'Unlimited' }}</span>
                <button type="button" @click="inventoryFilter = 'all'" class="hover:text-white">✕</button>
              </span>

              <button
                v-if="hasActiveFilters"
                type="button"
                @click="clearFilters"
                class="text-xs text-slate-400 hover:text-white underline ml-1 cursor-pointer transition"
              >
                Clear all filters
              </button>

              <span v-if="!hasActiveFilters" class="text-slate-500 italic">None active (showing all)</span>
            </div>

            <div class="text-xs text-slate-400 font-medium">
              <span v-if="data?.adminProducts">
                Total: <strong class="text-emerald-400 font-semibold">{{ data.adminProducts.total }}</strong> items
              </span>
              <span v-else-if="isPending">Loading catalog...</span>
            </div>
          </div>
        </div>

        <!-- Query Error -->
        <QueryError v-if="isError" />

        <!-- Table Container -->
        <div v-else class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex-1 flex flex-col justify-between">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-950/60 border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th class="py-3.5 px-4 sm:px-6">Product</th>
                  <th class="py-3.5 px-4">Category</th>
                  <th class="py-3.5 px-4">Section</th>
                  <th class="py-3.5 px-4">Unit</th>
                  <th class="py-3.5 px-4">Price</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>

              <!-- Loading Skeleton -->
              <tbody v-if="isPending" class="divide-y divide-slate-800/60 animate-pulse">
                <tr v-for="i in 5" :key="i">
                  <td class="py-4 px-4 sm:px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-slate-800 flex-shrink-0"></div>
                      <div class="space-y-1.5">
                        <div class="w-32 h-4 rounded bg-slate-800"></div>
                        <div class="w-48 h-3 rounded bg-slate-800"></div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-4"><div class="w-20 h-5 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-20 h-5 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-12 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-16 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-14 h-5 rounded-full bg-slate-800"></div></td>
                  <td class="py-4 px-4 sm:px-6 text-right"><div class="w-10 h-4 rounded bg-slate-800 ml-auto"></div></td>
                </tr>
              </tbody>

              <!-- Empty State -->
              <tbody v-else-if="!data?.adminProducts.items.length">
                <tr>
                  <td colspan="7" class="py-16 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </div>
                      <p class="text-sm font-semibold text-slate-300">No products found</p>
                      <p class="text-xs text-slate-500 max-w-sm">
                        {{ hasActiveFilters ? "No items match your filter criteria. Try adjusting or resetting filters." : "No items in catalog yet. Add a new product to get started." }}
                      </p>
                      <button
                        v-if="hasActiveFilters"
                        type="button"
                        @click="clearFilters"
                        class="mt-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>

              <!-- Data Rows -->
              <tbody v-else class="divide-y divide-slate-800/60">
                <tr
                  v-for="product in data.adminProducts.items"
                  :key="product.id"
                  class="hover:bg-slate-800/40 transition duration-150 group"
                >
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-3">
                      <img
                        v-if="product.imageUrl"
                        :src="product.imageUrl"
                        :alt="product.name"
                        class="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 flex-shrink-0"
                      />
                      <div v-else class="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>

                      <div class="overflow-hidden">
                        <RouterLink :to="`/catalog/products/${product.id}`" class="block">
                          <strong class="text-slate-100 font-semibold block truncate group-hover:text-emerald-400 transition-colors">{{ product.name }}</strong>
                        </RouterLink>
                        <span v-if="product.description" class="text-[11px] text-slate-400 truncate block max-w-xs">{{ product.description }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex flex-col gap-1 items-start">
                      <RouterLink
                        :to="`/catalog/categories/${product.category.id}`"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700/60 transition-colors"
                        :title="`View ${product.category.name} category`"
                      >
                        {{ product.category.name }}
                      </RouterLink>
                      <RouterLink
                        v-if="product.store"
                        :to="`/stores/${product.store.id}`"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/20 transition-colors"
                        :title="`View ${product.store.name}`"
                      >
                        🏬 {{ product.store.name }}
                      </RouterLink>
                      <span
                        v-else
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/60 text-slate-400 border border-slate-700/40"
                      >
                        🌐 Global
                      </span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div v-if="product.timeBoundSections?.length" class="flex flex-wrap gap-1">
                      <span
                        v-for="sec in product.timeBoundSections"
                        :key="sec"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      >
                        {{ sectionTitle(sec) }}
                      </span>
                    </div>
                    <span v-else class="text-[11px] text-slate-500">—</span>
                  </td>

                  <td class="py-3.5 px-4 font-mono text-slate-300 text-[11px]">{{ product.unit }}</td>

                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="font-mono text-emerald-400 font-bold text-xs">{{ formatCurrency(product.price) }}</span>
                      <span v-if="product.originalPrice" class="font-mono text-[10px] text-slate-400">
                        Cost: {{ formatCurrency(product.originalPrice) }}
                        <span v-if="product.markup !== undefined && product.markup !== null" class="text-amber-400/90 font-sans">
                          ({{ product.markupType === 'AMOUNT' ? `+${formatCurrency(product.markup)}` : `+${product.markup}%` }})
                        </span>
                      </span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex flex-col gap-1 items-start">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                        :class="product.isActive ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-slate-800/80 text-slate-400 border-slate-700'"
                      >
                        {{ product.isActive ? 'Active' : 'Paused' }}
                      </span>
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border"
                        :class="product.trackInventory ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'"
                      >
                        {{ product.trackInventory ? 'Stock Tracked' : 'No Stock Limit' }}
                      </span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <div class="inline-flex items-center gap-3 justify-end">
                      <RouterLink
                        :to="`/catalog/products/${product.id}`"
                        class="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>View</span>
                      </RouterLink>
                      <RouterLink
                        :to="`/catalog/products/${product.id}/edit`"
                        class="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Edit</span>
                      </RouterLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination Bar Footer -->
      <div v-if="data" class="pt-4 border-t border-slate-800/80">
        <PaginationBar :page="data.adminProducts.page" :limit="limit" :total="data.adminProducts.total" @change="page = $event" />
      </div>
    </div>
  </div>
</template>
