<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import { formatCurrency, formatDateTime } from "@/features/orders/formatters";
import { fetchOrder } from "@/features/orders/queries";
import { statusLabel } from "@/features/orders/status";
import TransitionDialog from "@/features/orders/TransitionDialog.vue";

const route = useRoute();
const transitionOpen = ref(false);
const client = useQueryClient();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));
const { data, isError, isPending } = useQuery({
  queryKey: computed(() => ["order", id.value]),
  queryFn: () => fetchOrder(id.value),
});
const order = computed(() => data.value?.adminOrder);
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
            <PageHeader :title="`Order #${id}`" eyebrow="Order Detail" />
            <p class="text-sm text-slate-400 mt-1">Detailed order overview, customer delivery address, items, and status timeline.</p>
          </div>

          <button
            v-if="order?.allowedNextStatuses.length"
            type="button"
            @click="transitionOpen = true"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs self-start md:self-auto"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Update status</span>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isPending" class="space-y-4 animate-pulse">
          <div class="h-32 rounded-2xl bg-slate-900/60 border border-slate-800"></div>
          <div class="h-48 rounded-2xl bg-slate-900/60 border border-slate-800"></div>
        </div>

        <QueryError v-else-if="isError" />

        <template v-else-if="order">
          <!-- Order Summary Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Order Details Card -->
            <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <h2 class="text-base font-bold text-white flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Order Status & Store
                </h2>
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {{ statusLabel(order.status) }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span class="text-slate-400 font-medium block">Placed At</span>
                  <span class="text-slate-200 font-mono font-semibold">{{ formatDateTime(order.placedAt) }}</span>
                </div>
                <div>
                  <span class="text-slate-400 font-medium block">Payment Method</span>
                  <span class="text-slate-200 font-semibold uppercase">{{ order.paymentMethod }}</span>
                </div>
                <div>
                  <span class="text-slate-400 font-medium block">Store Hub</span>
                  <span class="text-emerald-400 font-semibold">{{ order.store.name }}</span>
                </div>
                <div>
                  <span class="text-slate-400 font-medium block">Grand Total</span>
                  <span class="text-emerald-400 font-bold font-mono text-sm">{{ formatCurrency(order.total) }}</span>
                </div>
              </div>
            </div>

            <!-- Customer Details Card -->
            <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <h2 class="text-base font-bold text-white flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  Customer & Delivery Address
                </h2>
                <RouterLink
                  :to="`/customers/${order.customer.id}/edit`"
                  class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Edit Customer</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </RouterLink>
              </div>

              <div class="text-xs space-y-2">
                <strong class="text-sm text-white block">{{ order.customer.name }}</strong>
                <p class="text-slate-400 font-mono">{{ order.customer.email }} • {{ order.customer.phone }}</p>
                <div class="pt-2 border-t border-slate-800/60 text-slate-300">
                  <p>{{ order.address.line1 }} {{ order.address.line2 }}</p>
                  <p class="text-slate-400">{{ order.address.city }} - {{ order.address.pincode }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Items Table Card -->
          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 class="text-base font-bold text-white pb-3 border-b border-slate-800/80 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Order Items Breakdown
            </h2>

            <div class="divide-y divide-slate-800/60 text-xs">
              <div v-for="item in order.items" :key="item.id" class="py-3 flex items-center justify-between">
                <div>
                  <strong class="text-slate-100 block text-sm">{{ item.name }}</strong>
                  <span class="text-slate-400 text-[11px] font-mono">
                    {{ item.quantity }} x {{ item.unit }} @ {{ formatCurrency(item.unitPrice) }}
                  </span>
                </div>
                <strong class="text-emerald-400 font-mono text-sm">{{ formatCurrency(item.unitPrice * item.quantity) }}</strong>
              </div>
            </div>

            <!-- Totals Breakdown -->
            <div class="pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300 max-w-xs ml-auto">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-mono text-slate-100">{{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Delivery Fee</span>
                <span class="font-mono text-slate-100">{{ formatCurrency(order.deliveryFee) }}</span>
              </div>
              <div class="flex justify-between text-rose-400">
                <span>Discount</span>
                <span class="font-mono">-{{ formatCurrency(order.discount) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                <span>Grand Total</span>
                <span class="font-mono text-emerald-400">{{ formatCurrency(order.total) }}</span>
              </div>
            </div>
          </div>

          <!-- History Timeline Card -->
          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 class="text-base font-bold text-white pb-3 border-b border-slate-800/80 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              Status History Timeline
            </h2>

            <div class="space-y-3 text-xs">
              <div v-for="event in order.history" :key="event.createdAt" class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span class="font-bold text-emerald-400 block">{{ statusLabel(event.toStatus) }}</span>
                  <span v-if="event.reason" class="text-slate-400 text-[11px] block">{{ event.reason }}</span>
                </div>
                <time class="text-slate-400 font-mono text-[11px]">{{ formatDateTime(event.createdAt) }}</time>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Transition Dialog -->
    <TransitionDialog
      v-if="order"
      :open="transitionOpen"
      :order-id="id"
      :statuses="order.allowedNextStatuses"
      @close="transitionOpen = false"
      @saved="client.invalidateQueries({ queryKey: ['order', id] })"
    />
  </div>
</template>
