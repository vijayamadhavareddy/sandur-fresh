<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import type { AdminInventoryQuery } from "@/api/generated/graphql";
import PageHeader from "@/components/PageHeader.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import QueryError from "@/components/QueryError.vue";
import { usePagination } from "@/composables/usePagination";
import AdjustmentDialog from "@/features/inventory/AdjustmentDialog.vue";
import { fetchInventory } from "@/features/inventory/queries";
import { isLowStock } from "@/features/inventory/status";
import { fetchStores } from "@/features/stores/queries";
import { formatDateTime } from "@/shared/formatting/date";

type InventoryItem = NonNullable<NonNullable<AdminInventoryQuery["adminInventory"]>["items"]>[number];
const storeId = ref("");
const query = ref("");
const lowStockOnly = ref(false);
const selected = ref<InventoryItem>();
const { page, limit, reset } = usePagination();
const client = useQueryClient();
const stores = useQuery({ queryKey: ["stores"], queryFn: () => fetchStores() });

watch(
  () => stores.data.value,
  (value) => {
    if (!storeId.value && value?.adminStores[0]) storeId.value = value.adminStores[0].id;
  },
  { immediate: true },
);
watch([storeId, query, lowStockOnly], reset);

const key = computed(() => ["inventory", storeId.value, page.value, query.value, lowStockOnly.value]);
const inventory = useQuery({
  queryKey: key,
  queryFn: () => fetchInventory(storeId.value, page.value, limit.value, query.value, lowStockOnly.value),
  enabled: computed(() => Boolean(storeId.value)),
});
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Ambient Background Glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full flex flex-col gap-6 flex-1 justify-between">
      <div class="flex flex-col gap-6 flex-1">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <PageHeader title="Inventory Control" eyebrow="Stock Control" />
            <p class="text-sm text-slate-400 mt-1">Real-time dark store stock levels, replenishment alerts, and inventory adjustments.</p>
          </div>
        </div>

        <!-- Filter & Store Toolbar -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <!-- Store Selector Dropdown -->
            <div class="relative w-full sm:w-56">
              <label class="sr-only" for="inventory-store">Store Location</label>
              <select
                id="inventory-store"
                v-model="storeId"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition cursor-pointer"
              >
                <option v-for="store in stores.data.value?.adminStores" :key="store.id" :value="store.id">
                  {{ store.type === 'DARK_STORE' ? '🏢 [Hub] ' : '🏪 [Partner] ' }}{{ store.name }}
                </option>
              </select>
            </div>

            <!-- Search Input -->
            <div class="relative w-full sm:w-64">
              <svg class="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <label class="sr-only" for="inventory-search">Search stock</label>
              <input
                id="inventory-search"
                v-model="query"
                type="search"
                placeholder="Search inventory items..."
                class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
          </div>

          <!-- Low Stock Toggle -->
          <div class="flex items-center gap-2">
            <label for="low-stock" class="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <input id="low-stock" v-model="lowStockOnly" type="checkbox" class="w-4 h-4 accent-rose-500 rounded border-slate-700 bg-slate-900 cursor-pointer" />
              <span :class="lowStockOnly ? 'text-rose-400 font-bold' : ''">Low stock only</span>
            </label>
          </div>
        </div>

        <!-- Query Error -->
        <QueryError v-if="stores.isError.value || inventory.isError.value" />

        <!-- Table Container -->
        <div v-else class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex-1 flex flex-col justify-between">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-950/60 border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th class="py-3.5 px-4 sm:px-6">Product</th>
                  <th class="py-3.5 px-4">On Hand Stock</th>
                  <th class="py-3.5 px-4">Low Stock Threshold</th>
                  <th class="py-3.5 px-4">Last Updated</th>
                  <th class="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>

              <!-- Loading Skeleton -->
              <tbody v-if="inventory.isPending.value" class="divide-y divide-slate-800/60 animate-pulse">
                <tr v-for="i in 5" :key="i">
                  <td class="py-4 px-4 sm:px-6"><div class="w-36 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-16 h-5 rounded-full bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-12 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-24 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4 sm:px-6 text-right"><div class="w-12 h-4 rounded bg-slate-800 ml-auto"></div></td>
                </tr>
              </tbody>

              <!-- Empty State -->
              <tbody v-else-if="!inventory.data.value?.adminInventory.items.length">
                <tr>
                  <td colspan="5" class="py-16 text-center text-slate-400">
                    <p class="text-sm font-semibold text-slate-300">No stock items found</p>
                    <p class="text-xs text-slate-500 mt-1">Try switching store locations or adjusting filter criteria.</p>
                  </td>
                </tr>
              </tbody>

              <!-- Data Rows -->
              <tbody v-else class="divide-y divide-slate-800/60">
                <tr
                  v-for="item in inventory.data.value.adminInventory.items"
                  :key="item.id"
                  class="hover:bg-slate-800/40 transition duration-150 group"
                >
                  <td class="py-3.5 px-4 sm:px-6">
                    <strong class="text-slate-100 font-semibold block group-hover:text-emerald-400 transition-colors">{{ item.product.name }}</strong>
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-mono border"
                      :class="isLowStock(item) ? 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse' : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'"
                    >
                      {{ item.stockQty }} units
                    </span>
                  </td>

                  <td class="py-3.5 px-4 font-mono text-slate-400 text-xs">{{ item.lowStockThreshold }} units</td>

                  <td class="py-3.5 px-4 text-slate-400 text-[11px] font-mono">{{ formatDateTime(item.updatedAt) }}</td>

                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      @click="selected = item"
                      class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg"
                    >
                      Adjust
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination Footer -->
      <div v-if="inventory.data.value" class="pt-4 border-t border-slate-800/80">
        <PaginationBar v-bind="inventory.data.value.adminInventory" @change="page = $event" />
      </div>
    </div>

    <!-- Adjustment Dialog -->
    <AdjustmentDialog
      :open="Boolean(selected)"
      :inventory-id="selected?.id ?? ''"
      :product-name="selected?.product.name ?? ''"
      @close="selected = undefined"
      @saved="client.invalidateQueries({ queryKey: ['inventory'] })"
    />
  </div>
</template>
