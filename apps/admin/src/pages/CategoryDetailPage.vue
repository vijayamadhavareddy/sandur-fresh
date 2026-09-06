<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import PaginationBar from "@/components/PaginationBar.vue";
import QueryError from "@/components/QueryError.vue";
import CategoryForm from "@/features/categories/CategoryForm.vue";
import { fetchCategory } from "@/features/categories/queries";
import BulkProductImportDialog from "@/features/products/BulkProductImportDialog.vue";
import { fetchProducts } from "@/features/products/queries";
import { formatCurrency } from "@/shared/formatting/currency";
import { formatDateTime } from "@/shared/formatting/date";

const route = useRoute();
const queryClient = useQueryClient();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));

const categoryQuery = useQuery({
  queryKey: computed(() => ["category", id.value]),
  queryFn: () => fetchCategory(id.value),
  enabled: computed(() => Boolean(id.value)),
});

const category = computed(() => categoryQuery.data.value?.adminCategory);

const page = ref(1);
const limit = ref(10);
const searchQuery = ref("");
const debouncedSearch = ref("");
const statusFilter = ref<"all" | "active" | "paused">("all");
const inventoryFilter = ref<"all" | "tracked" | "unlimited">("all");
let searchTimer: ReturnType<typeof setTimeout> | null = null;

watch(searchQuery, (newVal) => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedSearch.value = newVal.trim();
    page.value = 1;
  }, 300);
});

watch([statusFilter, inventoryFilter], () => {
  page.value = 1;
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

const productsQuery = useQuery({
  queryKey: computed(() => [
    "products",
    "category",
    id.value,
    page.value,
    limit.value,
    debouncedSearch.value,
    statusFilter.value,
    inventoryFilter.value,
  ]),
  queryFn: () =>
    fetchProducts(
      page.value,
      limit.value,
      debouncedSearch.value || undefined,
      undefined,
      id.value,
      activeStatusBool.value,
      trackInventoryBool.value,
    ),
  enabled: computed(() => Boolean(id.value)),
});

const products = computed(() => productsQuery.data.value?.adminProducts.items ?? []);
const totalProducts = computed(() => productsQuery.data.value?.adminProducts.total ?? 0);

const showEditDialog = ref(false);
const showBulkImport = ref(false);

async function handleCategorySaved() {
  showEditDialog.value = false;
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["category", id.value] }),
    queryClient.invalidateQueries({ queryKey: ["categories"] }),
  ]);
}

function handleImported() {
  queryClient.invalidateQueries({ queryKey: ["products"] });
}

function clearFilters() {
  searchQuery.value = "";
  debouncedSearch.value = "";
  statusFilter.value = "all";
  inventoryFilter.value = "all";
  page.value = 1;
}

const hasActiveFilters = computed(
  () =>
    Boolean(debouncedSearch.value) ||
    statusFilter.value !== "all" ||
    inventoryFilter.value !== "all",
);
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Ambient Background Glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full flex flex-col gap-6 flex-1">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs font-medium text-slate-400">
        <RouterLink to="/catalog/categories" class="hover:text-emerald-400 transition-colors flex items-center gap-1">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Categories</span>
        </RouterLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-200 truncate max-w-[200px]">{{ category?.name ?? "Category Details" }}</span>
      </nav>

      <!-- Loading State -->
      <div v-if="categoryQuery.isPending.value" class="p-12 text-center text-slate-400 animate-pulse">
        <div class="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-sm font-semibold">Loading category details...</p>
      </div>

      <!-- Error State -->
      <QueryError v-else-if="categoryQuery.isError.value || !category" />

      <!-- Main Category Content -->
      <div v-else class="flex flex-col gap-6">
        <!-- Header Banner -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2.5">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-emerald-500/15 text-emerald-300 border-emerald-500/30 flex items-center gap-1.5">
                🏷️ Category
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                Order #{{ category.sortOrder }}
              </span>
              <span class="text-xs text-slate-500 font-mono">
                /{{ category.slug }}
              </span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {{ category.name }}
            </h2>

            <p class="text-xs text-slate-400 flex items-center gap-2">
              <span>Catalog category ID:</span>
              <code class="font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded text-[11px] border border-slate-800">{{ category.id }}</code>
              <span>•</span>
              <span>Created {{ formatDateTime(category.createdAt) }}</span>
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2.5 flex-wrap self-start lg:self-auto">
            <button
              type="button"
              @click="showEditDialog = true"
              class="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold py-2 px-3.5 rounded-xl shadow transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Category</span>
            </button>

            <button
              type="button"
              @click="showBulkImport = true"
              class="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-400 font-semibold py-2 px-3.5 rounded-xl shadow transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Bulk Import Products</span>
            </button>

            <RouterLink
              :to="`/catalog/products/new?categoryId=${category.id}`"
              class="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2 px-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Product</span>
            </RouterLink>
          </div>
        </div>

        <!-- Inline Edit Category Form (Collapsible/Toggled) -->
        <div v-if="showEditDialog" class="mb-2">
          <CategoryForm
            :key="category.id"
            :category="category"
            @saved="handleCategorySaved"
            @cancel="showEditDialog = false"
            @import-products="showBulkImport = true; showEditDialog = false"
          />
        </div>

        <!-- Metric Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</p>
              <h4 class="text-2xl font-bold text-white mt-1">{{ totalProducts }}</h4>
              <p class="text-[11px] text-slate-500 mt-0.5">Assigned to this category</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
              📦
            </div>
          </div>

          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category Hierarchy</p>
              <h4 class="text-2xl font-bold text-white mt-1">#{{ category.sortOrder }}</h4>
              <p class="text-[11px] text-slate-500 mt-0.5">Catalog display sequence</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xl">
              📊
            </div>
          </div>

          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Route Slug</p>
              <h4 class="text-lg font-mono font-bold text-emerald-400 mt-1 truncate max-w-[180px]">/{{ category.slug }}</h4>
              <p class="text-[11px] text-slate-500 mt-0.5">Public catalog URL slug</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xl">
              🔗
            </div>
          </div>
        </div>

        <!-- Products List Section -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <!-- Toolbar Header -->
          <div class="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>Products in {{ category.name }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-semibold">
                  {{ totalProducts }}
                </span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Browse, search, and manage products categorized under {{ category.name }}.
              </p>
            </div>

            <!-- Search and Filters Bar -->
            <div class="flex flex-wrap items-center gap-3">
              <!-- Search Input -->
              <div class="relative w-full sm:w-64">
                <svg class="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <label :for="`category-product-search-${category.id}`" class="sr-only">Search products</label>
                <input
                  :id="`category-product-search-${category.id}`"
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search in category..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  v-if="searchQuery"
                  type="button"
                  @click="searchQuery = ''"
                  class="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <!-- Status Filter Dropdown -->
              <select
                v-model="statusFilter"
                class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="paused">Paused Only</option>
              </select>

              <!-- Inventory Filter Dropdown -->
              <select
                v-model="inventoryFilter"
                class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Inventory</option>
                <option value="tracked">Stock Tracked</option>
                <option value="unlimited">No Stock Limit</option>
              </select>

              <button
                v-if="hasActiveFilters"
                type="button"
                @click="clearFilters"
                class="text-xs text-slate-400 hover:text-white transition px-2 py-1"
              >
                Reset
              </button>
            </div>
          </div>

          <!-- Product Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-950/60 border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th class="py-3 px-4 sm:px-6">Product</th>
                  <th class="py-3 px-4">Assigned Store</th>
                  <th class="py-3 px-4">Unit</th>
                  <th class="py-3 px-4">Price</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>

              <!-- Loading State -->
              <tbody v-if="productsQuery.isPending.value" class="divide-y divide-slate-800/60 animate-pulse">
                <tr v-for="i in 5" :key="i">
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-slate-800 flex-shrink-0"></div>
                      <div class="space-y-1">
                        <div class="w-28 h-3.5 rounded bg-slate-800"></div>
                        <div class="w-40 h-2.5 rounded bg-slate-800"></div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-4"><div class="w-20 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-3.5 px-4"><div class="w-12 h-3.5 rounded bg-slate-800"></div></td>
                  <td class="py-3.5 px-4"><div class="w-14 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-3.5 px-4"><div class="w-14 h-4 rounded-full bg-slate-800"></div></td>
                  <td class="py-3.5 px-4 sm:px-6 text-right"><div class="w-12 h-3.5 rounded bg-slate-800 ml-auto"></div></td>
                </tr>
              </tbody>

              <!-- Empty State -->
              <tbody v-else-if="products.length === 0">
                <tr>
                  <td colspan="6" class="py-14 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500 text-xl">
                        📦
                      </div>
                      <p class="text-sm font-semibold text-slate-300">
                        {{ hasActiveFilters ? "No products match these filters" : `No products in ${category.name} yet` }}
                      </p>
                      <p class="text-xs text-slate-500 max-w-sm">
                        {{ hasActiveFilters ? "Try clearing search or filter selections." : "Add products individually or upload via bulk import." }}
                      </p>
                      <div class="flex items-center gap-2 mt-2">
                        <button
                          v-if="hasActiveFilters"
                          type="button"
                          @click="clearFilters"
                          class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                        >
                          Clear Filters
                        </button>
                        <template v-else>
                          <RouterLink
                            :to="`/catalog/products/new?categoryId=${category.id}`"
                            class="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition shadow-lg shadow-emerald-500/20"
                          >
                            + Add Product
                          </RouterLink>
                          <button
                            type="button"
                            @click="showBulkImport = true"
                            class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                          >
                            Bulk Import
                          </button>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>

              <!-- Data Rows -->
              <tbody v-else class="divide-y divide-slate-800/60">
                <tr
                  v-for="product in products"
                  :key="product.id"
                  class="hover:bg-slate-800/40 transition duration-150 group"
                >
                  <td class="py-3 px-4 sm:px-6">
                    <div class="flex items-center gap-3">
                      <img
                        v-if="product.imageUrl"
                        :src="product.imageUrl"
                        :alt="product.name"
                        class="w-9 h-9 rounded-lg object-cover bg-slate-950 border border-slate-800 flex-shrink-0"
                      />
                      <div v-else class="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center flex-shrink-0 text-sm">
                        📦
                      </div>

                      <div class="overflow-hidden">
                        <RouterLink
                          :to="`/catalog/products/${product.id}`"
                          class="font-semibold text-slate-100 block truncate group-hover:text-emerald-400 transition-colors"
                        >
                          {{ product.name }}
                        </RouterLink>
                        <span v-if="product.description" class="text-[11px] text-slate-400 truncate block max-w-xs">
                          {{ product.description }}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3 px-4">
                    <span
                      v-if="product.store"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20"
                    >
                      🏬 {{ product.store.name }}
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700"
                    >
                      🌐 All Stores (Global)
                    </span>
                  </td>

                  <td class="py-3 px-4 font-mono text-slate-300 text-[11px]">
                    {{ product.unit }}
                  </td>

                  <td class="py-3 px-4">
                    <div class="flex flex-col">
                      <span class="font-mono text-emerald-400 font-bold text-xs">
                        {{ formatCurrency(product.price) }}
                      </span>
                      <span v-if="product.mrp && product.mrp > product.price" class="font-mono text-[10px] text-slate-500 line-through">
                        {{ formatCurrency(product.mrp) }}
                      </span>
                    </div>
                  </td>

                  <td class="py-3 px-4">
                    <div class="flex flex-col gap-1 items-start">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                        :class="product.isActive ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-slate-800/80 text-slate-400 border-slate-700'"
                      >
                        {{ product.isActive ? 'Active' : 'Paused' }}
                      </span>
                      <span
                        class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border"
                        :class="product.trackInventory ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'"
                      >
                        {{ product.trackInventory ? 'Tracked' : 'No Limit' }}
                      </span>
                    </div>
                  </td>

                  <td class="py-3 px-4 sm:px-6 text-right">
                    <div class="inline-flex items-center gap-2.5 justify-end">
                      <RouterLink
                        :to="`/catalog/products/${product.id}`"
                        class="text-slate-400 hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>View</span>
                      </RouterLink>

                      <RouterLink
                        :to="`/catalog/products/${product.id}/edit`"
                        class="text-slate-400 hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1"
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

          <!-- Pagination Bar Footer -->
          <div v-if="productsQuery.data.value" class="p-4 border-t border-slate-800/80 bg-slate-950/40">
            <PaginationBar
              :page="productsQuery.data.value.adminProducts.page"
              :limit="limit"
              :total="productsQuery.data.value.adminProducts.total"
              @change="page = $event"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Product Import Modal Dialog -->
    <BulkProductImportDialog
      v-if="category"
      :open="showBulkImport"
      :category-id="category.id"
      :category-name="category.name"
      @close="showBulkImport = false"
      @imported="handleImported"
    />
  </div>
</template>
