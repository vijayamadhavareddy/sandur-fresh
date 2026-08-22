<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import QueryError from "@/components/QueryError.vue";
import { usePagination } from "@/composables/usePagination";
import { fetchProducts, fetchTimeBoundSections } from "@/features/products/queries";
import { formatCurrency } from "@/shared/formatting/currency";

const query = ref("");
const { page, limit, reset } = usePagination();
watch(query, reset);
const key = computed(() => ["products", page.value, limit.value, query.value]);
const { data, isError, isPending } = useQuery({
  queryKey: key,
  queryFn: () => fetchProducts(page.value, limit.value, query.value),
});
const sections = useQuery({ queryKey: ["timeBoundSections"], queryFn: fetchTimeBoundSections });
const sectionTitle = (id: string) =>
  sections.data.value?.timeBoundSections.find((section) => section.id === id)?.title ?? id;
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
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="relative w-full sm:w-80">
            <svg class="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <label class="sr-only" for="product-search">Search products</label>
            <input
              id="product-search"
              v-model="query"
              type="search"
              placeholder="Search products by name..."
              class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            />
          </div>

          <div class="text-xs text-slate-400 font-medium">
            <span v-if="data?.adminProducts">Total: <strong class="text-emerald-400 font-semibold">{{ data.adminProducts.total }}</strong> items</span>
            <span v-else-if="isPending">Loading catalog...</span>
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
                      <p class="text-xs text-slate-500 max-w-sm">No items match your search criteria. Try adjusting your query or add a new product.</p>
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
                        <strong class="text-slate-100 font-semibold block truncate group-hover:text-emerald-400 transition-colors">{{ product.name }}</strong>
                        <span v-if="product.description" class="text-[11px] text-slate-400 truncate block max-w-xs">{{ product.description }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                      {{ product.category.name }}
                    </span>
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
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                      :class="product.isActive ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-slate-800/80 text-slate-400 border-slate-700'"
                    >
                      {{ product.isActive ? 'Active' : 'Paused' }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <RouterLink
                      :to="`/catalog/products/${product.id}/edit`"
                      class="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>Edit</span>
                    </RouterLink>
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
