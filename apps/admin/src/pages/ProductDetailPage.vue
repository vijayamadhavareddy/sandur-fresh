<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import type { AdminProductQuery } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import { adjustInventory } from "@/features/inventory/mutations";
import { updateProductPatch } from "@/features/products/mutations";
import { fetchProduct, fetchTimeBoundSections } from "@/features/products/queries";
import { formatCurrency } from "@/shared/formatting/currency";
import { formatDateTime } from "@/shared/formatting/date";

type ProductInventoryItem = NonNullable<
  NonNullable<AdminProductQuery["adminProduct"]>["inventory"]
>[number];

const route = useRoute();
const client = useQueryClient();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));

const { data, isError, isPending } = useQuery({
  queryKey: computed(() => ["product", id.value]),
  queryFn: () => fetchProduct(id.value),
  enabled: computed(() => Boolean(id.value)),
});

const sections = useQuery({
  queryKey: ["timeBoundSections"],
  queryFn: fetchTimeBoundSections,
});

const product = computed(() => data.value?.adminProduct);

const sectionTitle = (secId: string) =>
  sections.data.value?.timeBoundSections.find((sec) => sec.id === secId)?.title ?? secId;

// Add / Adjust Inventory Dialog State
const inventoryDialogOpen = ref(false);
const selectedInventoryId = ref("");
const selectedStoreName = ref("");
const adjustmentDelta = ref<number>(10);
const adjustmentReason = ref("");
const isSubmittingAdjustment = ref(false);
const adjustmentError = ref("");

// Enabling stock tracking state
const isEnablingTracking = ref(false);
const enableTrackingError = ref("");

const openAddInventory = (item?: ProductInventoryItem) => {
  adjustmentError.value = "";
  if (item) {
    selectedInventoryId.value = item.id;
    selectedStoreName.value = item.store?.name ?? "Store";
  } else if (product.value?.inventory?.length) {
    const first = product.value.inventory[0];
    if (first) {
      selectedInventoryId.value = first.id;
      selectedStoreName.value = first.store?.name ?? "Store";
    }
  }
  adjustmentDelta.value = 10;
  adjustmentReason.value = "Stock replenishment";
  inventoryDialogOpen.value = true;
};

const handleAddInventoryClick = async () => {
  if (!product.value) return;
  if (!product.value.trackInventory) {
    await handleEnableTracking();
    return;
  }
  openAddInventory();
};

const handleEnableTracking = async () => {
  if (!product.value) return;
  isEnablingTracking.value = true;
  enableTrackingError.value = "";
  try {
    await updateProductPatch(product.value.id, { trackInventory: true });
    await client.invalidateQueries({ queryKey: ["product", id.value] });
    await client.invalidateQueries({ queryKey: ["products"] });
    openAddInventory();
  } catch (error) {
    enableTrackingError.value =
      error instanceof Error ? error.message : "Failed to enable inventory tracking";
  } finally {
    isEnablingTracking.value = false;
  }
};

const submitInventoryAdjustment = async () => {
  if (!selectedInventoryId.value) {
    adjustmentError.value = "Please select a store location.";
    return;
  }
  if (!adjustmentDelta.value || adjustmentDelta.value === 0) {
    adjustmentError.value = "Quantity adjustment cannot be zero.";
    return;
  }
  if (!adjustmentReason.value.trim()) {
    adjustmentError.value = "Please provide a reason for the adjustment.";
    return;
  }

  isSubmittingAdjustment.value = true;
  adjustmentError.value = "";

  try {
    await adjustInventory(
      selectedInventoryId.value,
      adjustmentDelta.value,
      adjustmentReason.value.trim(),
    );
    await client.invalidateQueries({ queryKey: ["product", id.value] });
    await client.invalidateQueries({ queryKey: ["inventory"] });
    inventoryDialogOpen.value = false;
  } catch (error) {
    adjustmentError.value =
      error instanceof Error ? error.message : "Could not adjust stock. Please try again.";
  } finally {
    isSubmittingAdjustment.value = false;
  }
};

const totalStock = computed(() =>
  (product.value?.inventory ?? []).reduce((acc, curr) => acc + curr.stockQty, 0),
);

const isLowStock = (item: { stockQty: number; lowStockThreshold: number }) =>
  item.stockQty <= item.lowStockThreshold;
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Glowing Ambient Background Effects -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full flex flex-col gap-6 flex-1 justify-between">
      <div class="flex flex-col gap-6 flex-1">
        <!-- Back Link & Header Bar -->
        <div class="flex flex-col gap-3 pb-6 border-b border-slate-800/80">
          <div>
            <RouterLink
              to="/catalog/products"
              class="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Products catalog</span>
            </RouterLink>
          </div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <PageHeader :title="product?.name ?? 'Product Details'" eyebrow="" />
              <p class="text-sm text-slate-400 mt-1">
                Overview of product specifications, pricing, shelf section, and real-time inventory levels.
              </p>
            </div>

            <!-- Action Buttons: Edit and Add inventory -->
            <div class="flex items-center gap-3">
              <RouterLink
                :to="`/catalog/products/${id}/edit`"
                class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl border border-slate-700/80 shadow-md transition duration-200 cursor-pointer text-xs"
              >
                <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Edit product</span>
              </RouterLink>

              <button
                type="button"
                @click="handleAddInventoryClick"
                :disabled="isEnablingTracking"
                class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs disabled:opacity-50"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>{{ isEnablingTracking ? "Enabling..." : "Add inventory" }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isPending" class="space-y-6 animate-pulse">
          <div class="h-64 rounded-2xl bg-slate-900/60 border border-slate-800"></div>
          <div class="h-48 rounded-2xl bg-slate-900/60 border border-slate-800"></div>
        </div>

        <!-- Query Error -->
        <QueryError v-else-if="isError" />

        <!-- Product Content -->
        <template v-else-if="product">
          <!-- Error banner if enabling tracking failed -->
          <div v-if="enableTrackingError" class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300">
            {{ enableTrackingError }}
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left 2 Cols: Main Info & Inventory -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Product Overview Card -->
              <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div class="flex flex-col sm:flex-row gap-5 items-start">
                  <!-- Product Image -->
                  <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
                    <img
                      v-if="product.imageUrl"
                      :src="product.imageUrl"
                      :alt="product.name"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="text-slate-600 flex items-center justify-center">
                      <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <!-- Header details -->
                  <div class="flex-1 space-y-2.5">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {{ product.category.name }}
                      </span>
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                        :class="product.isActive ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'"
                      >
                        {{ product.isActive ? 'Active' : 'Paused' }}
                      </span>
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                        :class="product.trackInventory ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-800/80 text-slate-400 border-slate-700'"
                      >
                        {{ product.trackInventory ? 'Stock Tracked' : 'Unlimited / No Stock Limit' }}
                      </span>
                    </div>

                    <h1 class="text-xl font-bold text-white">{{ product.name }}</h1>
                    <p class="text-xs text-slate-400 leading-relaxed max-w-2xl">
                      {{ product.description || "No description provided for this product." }}
                    </p>
                  </div>
                </div>

                <!-- Attributes Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-800/80 text-xs">
                  <div>
                    <span class="text-slate-500 font-medium block">Packaging Unit</span>
                    <span class="text-slate-200 font-mono font-semibold text-sm">{{ product.unit }}</span>
                  </div>

                  <div>
                    <span class="text-slate-500 font-medium block">Assigned Store</span>
                    <span class="text-slate-200 font-semibold">{{ product.store?.name ?? "All Stores (Central)" }}</span>
                  </div>

                  <div>
                    <span class="text-slate-500 font-medium block">Time Shelves</span>
                    <div v-if="product.timeBoundSections?.length" class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="sec in product.timeBoundSections"
                        :key="sec"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      >
                        {{ sectionTitle(sec) }}
                      </span>
                    </div>
                    <span v-else class="text-slate-400">All day</span>
                  </div>

                  <div>
                    <span class="text-slate-500 font-medium block">Total Stock</span>
                    <span
                      v-if="product.trackInventory"
                      class="font-mono font-bold text-sm"
                      :class="totalStock > 0 ? 'text-emerald-400' : 'text-rose-400'"
                    >
                      {{ totalStock }} units
                    </span>
                    <span v-else class="text-cyan-400 font-medium">Untracked</span>
                  </div>
                </div>
              </div>

              <!-- Inventory & Stock Management Section -->
              <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <h2 class="text-base font-bold text-white">Stock & Inventory by Store</h2>
                  </div>

                  <button
                    v-if="product.trackInventory"
                    type="button"
                    @click="openAddInventory()"
                    class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-emerald-500/30"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add inventory</span>
                  </button>
                </div>

                <!-- Case A: Stock tracking enabled -->
                <div v-if="product.trackInventory">
                  <div v-if="product.inventory?.length" class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr class="bg-slate-950/60 border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
                          <th class="py-3 px-4">Store Location</th>
                          <th class="py-3 px-4">Stock on Hand</th>
                          <th class="py-3 px-4">Low Stock Threshold</th>
                          <th class="py-3 px-4">Last Stock Update</th>
                          <th class="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/60">
                        <tr v-for="item in product.inventory" :key="item.id" class="hover:bg-slate-800/40 transition">
                          <td class="py-3 px-4">
                            <strong class="text-white block">{{ item.store?.name ?? 'Store' }}</strong>
                            <span class="text-[10px] text-slate-500 font-mono">{{ item.store?.type === 'DARK_STORE' ? 'Dark Store Hub' : 'Partner Store' }}</span>
                          </td>

                          <td class="py-3 px-4">
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border"
                              :class="isLowStock(item) ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'"
                            >
                              {{ item.stockQty }} units
                            </span>
                          </td>

                          <td class="py-3 px-4 font-mono text-slate-400">{{ item.lowStockThreshold }} units</td>

                          <td class="py-3 px-4 font-mono text-slate-400 text-[11px]">{{ formatDateTime(item.updatedAt) }}</td>

                          <td class="py-3 px-4 text-right">
                            <button
                              type="button"
                              @click="openAddInventory(item)"
                              class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg"
                            >
                              <span>Adjust</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div v-else class="p-8 text-center text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800/60">
                    <p class="text-xs font-medium">No inventory records configured yet for this product.</p>
                    <button
                      type="button"
                      @click="openAddInventory()"
                      class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Initialize stock</span>
                    </button>
                  </div>
                </div>

                <!-- Case B: Stock tracking disabled -->
                <div v-else class="p-6 text-center bg-slate-950/50 border border-slate-800 rounded-xl space-y-3">
                  <div class="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white">Stock tracking is disabled</h3>
                    <p class="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      This product currently has unlimited availability. Turn on stock tracking to enforce dark store inventory caps, view low-stock alerts, and track restocking shipments.
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="handleEnableTracking"
                    :disabled="isEnablingTracking"
                    class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 font-semibold px-4 py-2 rounded-xl text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    <span>{{ isEnablingTracking ? "Enabling tracking..." : "Enable stock tracking & add inventory" }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right 1 Col: Pricing & Meta Cards -->
            <div class="space-y-6">
              <!-- Pricing Breakdown Card -->
              <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
                <div class="flex items-center gap-2 pb-3 border-b border-slate-800/80">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h2 class="text-base font-bold text-white">Pricing & Profitability</h2>
                </div>

                <div class="space-y-3 text-xs">
                  <div class="flex justify-between items-baseline">
                    <span class="text-slate-400">Selling Price</span>
                    <span class="font-mono text-emerald-400 font-bold text-base">{{ formatCurrency(product.price) }}</span>
                  </div>

                  <div class="flex justify-between items-baseline">
                    <span class="text-slate-400">Maximum Retail Price (MRP)</span>
                    <span class="font-mono text-slate-300 line-through">{{ formatCurrency(product.mrp) }}</span>
                  </div>

                  <div v-if="product.originalPrice" class="flex justify-between items-baseline pt-2 border-t border-slate-800/60">
                    <span class="text-slate-400">Cost Price</span>
                    <span class="font-mono text-slate-300">{{ formatCurrency(product.originalPrice) }}</span>
                  </div>

                  <div v-if="product.originalPrice" class="flex justify-between items-baseline">
                    <span class="text-slate-400">Gross Margin per unit</span>
                    <span class="font-mono text-emerald-400 font-semibold">
                      +{{ formatCurrency(product.price - product.originalPrice) }}
                      <span class="text-[10px] text-slate-400">({{ (((product.price - product.originalPrice) / product.price) * 100).toFixed(1) }}%)</span>
                    </span>
                  </div>

                  <div v-if="product.markup !== undefined && product.markup !== null" class="flex justify-between items-baseline">
                    <span class="text-slate-400">Configured Markup</span>
                    <span class="font-mono text-amber-400">
                      {{ product.markupType === 'AMOUNT' ? `+${formatCurrency(product.markup)}` : `+${product.markup}%` }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Metadata & System Card -->
              <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
                <div class="flex items-center gap-2 pb-3 border-b border-slate-800/80">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                  <h2 class="text-base font-bold text-white">System Information</h2>
                </div>

                <div class="space-y-3 text-xs">
                  <div>
                    <span class="text-slate-500 font-medium block">Product ID</span>
                    <span class="text-slate-300 font-mono text-[11px] select-all break-all">{{ product.id }}</span>
                  </div>

                  <div>
                    <span class="text-slate-500 font-medium block">Category ID</span>
                    <span class="text-slate-300 font-mono text-[11px] select-all break-all">{{ product.categoryId }}</span>
                  </div>

                  <div v-if="product.createdAt">
                    <span class="text-slate-500 font-medium block">Created At</span>
                    <span class="text-slate-300 font-mono text-[11px]">{{ formatDateTime(product.createdAt) }}</span>
                  </div>

                  <div v-if="product.updatedAt">
                    <span class="text-slate-500 font-medium block">Last Updated</span>
                    <span class="text-slate-300 font-mono text-[11px]">{{ formatDateTime(product.updatedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Add / Adjust Inventory Dialog -->
    <Dialog :open="inventoryDialogOpen" class="relative z-50" @close="inventoryDialogOpen = false">
      <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" aria-hidden="true" />

      <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        <DialogPanel class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 text-slate-100">
          <DialogTitle class="text-lg font-bold text-white flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            Add Stock: {{ product?.name }}
          </DialogTitle>

          <form @submit.prevent="submitInventoryAdjustment" class="flex flex-col gap-4">
            <!-- Store Selection if multiple inventory items -->
            <div v-if="(product?.inventory?.length ?? 0) > 1" class="flex flex-col gap-1.5">
              <label for="inventory-store-select" class="text-xs font-semibold text-slate-300">Store Location</label>
              <select
                id="inventory-store-select"
                v-model="selectedInventoryId"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition cursor-pointer"
              >
                <option v-for="item in product?.inventory" :key="item.id" :value="item.id">
                  {{ item.store?.name ?? 'Store' }} (Current: {{ item.stockQty }} units)
                </option>
              </select>
            </div>
            <div v-else class="text-xs text-slate-400">
              Target store: <strong class="text-slate-200">{{ selectedStoreName || product?.store?.name || 'Central Dark Store' }}</strong>
            </div>

            <!-- Quantity to Add / Adjust -->
            <div class="flex flex-col gap-1.5">
              <label for="adjustment-qty" class="text-xs font-semibold text-slate-300">
                Quantity to add (e.g. +10 or -5)
              </label>
              <input
                id="adjustment-qty"
                v-model.number="adjustmentDelta"
                type="number"
                placeholder="e.g. 10"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
              />
            </div>

            <!-- Reason -->
            <div class="flex flex-col gap-1.5">
              <label for="adjustment-reason" class="text-xs font-semibold text-slate-300">Reason for adjustment</label>
              <textarea
                id="adjustment-reason"
                v-model="adjustmentReason"
                rows="3"
                placeholder="e.g. Restock shipment received / Inventory replenishment"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              ></textarea>
            </div>

            <p v-if="adjustmentError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
              {{ adjustmentError }}
            </p>

            <div class="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <AppButton variant="quiet" :disabled="isSubmittingAdjustment" @click="inventoryDialogOpen = false">
                Cancel
              </AppButton>
              <AppButton type="submit" :disabled="isSubmittingAdjustment">
                {{ isSubmittingAdjustment ? 'Applying...' : 'Add to inventory' }}
              </AppButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>
