<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import type { AdminOrderStatus } from "@/api/generated/graphql";
import PageHeader from "@/components/PageHeader.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import QueryError from "@/components/QueryError.vue";
import { usePagination } from "@/composables/usePagination";
import { formatCurrency, formatDateTime } from "@/features/orders/formatters";
import { fetchOrders } from "@/features/orders/queries";
import { orderStatuses, statusLabel } from "@/features/orders/status";

const status = ref<AdminOrderStatus | "">("");
const { page, limit, reset } = usePagination();
watch(status, reset);
const key = computed(() => ["orders", page.value, status.value]);
const { data, isError, isPending } = useQuery({
  queryKey: key,
  queryFn: () => fetchOrders(page.value, limit.value, status.value || undefined),
});

function getStatusBadgeClass(orderStatus: AdminOrderStatus): string {
  switch (orderStatus) {
    case "PLACED":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "PACKED":
      return "bg-sky-500/15 text-sky-400 border-sky-500/30";
    case "OUT_FOR_DELIVERY":
      return "bg-indigo-500/15 text-indigo-400 border-indigo-500/30";
    case "DELIVERED":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "CANCELLED":
      return "bg-rose-500/15 text-rose-400 border-rose-500/30";
    default:
      return "bg-slate-800 text-slate-400 border-slate-700";
  }
}
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
            <PageHeader title="Orders Desk" eyebrow="Hyperlocal Dispatch" />
            <p class="text-sm text-slate-400 mt-1">Live order fulfillment, customer status tracking, and rider dispatch control.</p>
          </div>
        </div>

        <!-- Filter Toolbar -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="relative w-full sm:w-64">
            <label class="sr-only" for="order-status">Filter by status</label>
            <select
              id="order-status"
              v-model="status"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition cursor-pointer"
            >
              <option value="">All Order Statuses</option>
              <option v-for="item in orderStatuses" :key="item" :value="item">
                {{ statusLabel(item) }}
              </option>
            </select>
          </div>

          <div class="text-xs text-slate-400 font-medium">
            <span v-if="data?.adminOrders">Total: <strong class="text-emerald-400 font-semibold">{{ data.adminOrders.total }}</strong> orders</span>
            <span v-else-if="isPending">Loading orders...</span>
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
                  <th class="py-3.5 px-4 sm:px-6">Order Ref</th>
                  <th class="py-3.5 px-4">Customer</th>
                  <th class="py-3.5 px-4">Store Hub</th>
                  <th class="py-3.5 px-4">Placed At</th>
                  <th class="py-3.5 px-4">Total Amount</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>

              <!-- Loading Skeleton -->
              <tbody v-if="isPending" class="divide-y divide-slate-800/60 animate-pulse">
                <tr v-for="i in 5" :key="i">
                  <td class="py-4 px-4 sm:px-6"><div class="w-24 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-32 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-24 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-28 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-16 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-20 h-5 rounded-full bg-slate-800"></div></td>
                  <td class="py-4 px-4 sm:px-6 text-right"><div class="w-12 h-4 rounded bg-slate-800 ml-auto"></div></td>
                </tr>
              </tbody>

              <!-- Empty State -->
              <tbody v-else-if="!data?.adminOrders.items.length">
                <tr>
                  <td colspan="7" class="py-16 text-center text-slate-400">
                    <p class="text-sm font-semibold text-slate-300">No orders found</p>
                    <p class="text-xs text-slate-500 mt-1">No orders match the selected filter criteria.</p>
                  </td>
                </tr>
              </tbody>

              <!-- Data Rows -->
              <tbody v-else class="divide-y divide-slate-800/60">
                <tr
                  v-for="order in data.adminOrders.items"
                  :key="order.id"
                  class="hover:bg-slate-800/40 transition duration-150 group"
                >
                  <td class="py-3.5 px-4 sm:px-6">
                    <RouterLink :to="`/orders/${order.id}`" class="font-mono text-emerald-400 font-bold hover:underline">
                      #{{ order.id }}
                    </RouterLink>
                  </td>

                  <td class="py-3.5 px-4">
                    <RouterLink :to="`/customers/${order.customer.id}/edit`" class="group/cust block">
                      <strong class="text-slate-100 font-semibold group-hover/cust:text-emerald-400 transition-colors block">{{ order.customer.name || 'Unnamed Customer' }}</strong>
                      <span class="text-[11px] text-slate-400 block font-mono">{{ order.customer.phone }}</span>
                    </RouterLink>
                  </td>

                  <td class="py-3.5 px-4 text-slate-300 font-medium">{{ order.store.name }}</td>

                  <td class="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{{ formatDateTime(order.placedAt) }}</td>

                  <td class="py-3.5 px-4 font-mono text-emerald-400 font-bold">{{ formatCurrency(order.total) }}</td>

                  <td class="py-3.5 px-4">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                      :class="getStatusBadgeClass(order.status)"
                    >
                      {{ statusLabel(order.status) }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <RouterLink
                      :to="`/orders/${order.id}`"
                      class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>View</span>
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination Footer -->
      <div v-if="data" class="pt-4 border-t border-slate-800/80">
        <PaginationBar v-bind="data.adminOrders" @change="page = $event" />
      </div>
    </div>
  </div>
</template>
