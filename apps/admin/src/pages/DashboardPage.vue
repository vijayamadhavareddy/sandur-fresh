<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { RouterLink } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import { fetchDashboard } from "@/features/dashboard/queries";

const { data, isError, isPending, refetch, isFetching } = useQuery({
  queryKey: ["dashboard"],
  queryFn: fetchDashboard,
});

const cards = [
  {
    title: "Today's Orders",
    key: "todaysOrders",
    subtitle: "Total orders received today",
    tag: "Daily Activity",
    tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-400 via-teal-500 to-emerald-600",
    glow: "shadow-emerald-500/20",
    link: "/orders",
    linkText: "View all orders",
  },
  {
    title: "Awaiting Action",
    key: "placedOrders",
    subtitle: "Placed orders needing dispatch",
    tag: "Action Required",
    tagColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    gradient: "from-amber-400 via-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
    link: "/orders",
    linkText: "Process orders",
  },
  {
    title: "In Processing",
    key: "processingOrders",
    subtitle: "Orders currently in fulfillment",
    tag: "In Transit",
    tagColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "shadow-sky-500/20",
    link: "/orders",
    linkText: "Track progress",
  },
  {
    title: "Low Stock Alerts",
    key: "lowStockItems",
    subtitle: "Items below minimum threshold",
    tag: "Inventory Warning",
    tagColor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    gradient: "from-rose-400 via-rose-500 to-red-600",
    glow: "shadow-rose-500/20",
    link: "/inventory",
    linkText: "Restock inventory",
  },
] as const;
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Glowing Ambient Background Effects matching Login theme -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full flex flex-col gap-8 flex-1">
      <!-- Standard PageHeader + Custom Live Control Tower Action Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <PageHeader title="Daily Overview" eyebrow="Live Control Tower" />
          <p class="text-sm text-slate-400 mt-1">Real-time hyperlocal dispatch, order flow, and dark store inventory intelligence.</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-inner">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-medium text-emerald-400">Live Sync</span>
          </div>

          <button
            type="button"
            @click="() => refetch()"
            :disabled="isFetching"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition duration-200 cursor-pointer disabled:opacity-50 shadow-md"
          >
            <svg
              class="w-4 h-4 text-emerald-400"
              :class="{ 'animate-spin': isFetching }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isFetching ? 'Refreshing...' : 'Refresh' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State Glassmorphic Skeleton -->
      <div v-if="isPending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        <div v-for="i in 4" :key="i" class="h-48 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-xl bg-slate-800"></div>
            <div class="w-24 h-6 rounded-full bg-slate-800"></div>
          </div>
          <div class="space-y-2 mt-4">
            <div class="w-20 h-9 rounded bg-slate-800"></div>
            <div class="w-32 h-4 rounded bg-slate-800"></div>
          </div>
          <div class="w-full h-4 rounded bg-slate-800 mt-4"></div>
        </div>
      </div>

      <!-- Query Error State -->
      <QueryError v-else-if="isError" />

      <!-- Main Dashboard Operational Content -->
      <div v-else class="flex flex-col gap-8">
        <!-- Metric Cards Grid -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article
            v-for="(card, index) in cards"
            :key="card.key"
            class="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/40"
          >
            <!-- Card Top Header -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                :class="[card.gradient, card.glow]"
              >
                <!-- Today's Orders Icon -->
                <svg v-if="index === 0" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                <!-- Awaiting Action Icon -->
                <svg v-else-if="index === 1" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <!-- In Processing Icon -->
                <svg v-else-if="index === 2" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>

                <!-- Low Stock Icon -->
                <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <span
                class="px-2.5 py-1 rounded-full text-[11px] font-semibold border tracking-wide uppercase"
                :class="card.tagColor"
              >
                {{ card.tag }}
              </span>
            </div>

            <!-- Card Value & Label -->
            <div class="my-2">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">{{ card.title }}</span>
              <div class="flex items-baseline gap-2">
                <strong class="text-4xl font-black text-white tracking-tight">
                  {{ data?.adminDashboard[card.key] ?? 0 }}
                </strong>
                <span class="text-xs text-slate-500 font-medium">units</span>
              </div>
              <p class="text-xs text-slate-400 mt-1">{{ card.subtitle }}</p>
            </div>

            <!-- Card Action Footer -->
            <div class="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <RouterLink
                :to="card.link"
                class="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{{ card.linkText }}</span>
                <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </RouterLink>
            </div>
          </article>
        </section>

        <!-- Operational Command Center & Dark Store Intelligence Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Quick Action Workflows (2 Columns) -->
          <div class="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                <div>
                  <h2 class="text-lg font-bold text-white flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    Operational Command Center
                  </h2>
                  <p class="text-xs text-slate-400 mt-0.5">Quick access shortcuts to core platform workflows</p>
                </div>
                <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Ready
                </span>
              </div>

              <!-- Quick Shortcuts Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RouterLink
                  to="/orders"
                  class="group p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200 flex items-center gap-4"
                >
                  <div class="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">Orders Dispatch</h3>
                    <p class="text-xs text-slate-400">Manage fulfillment & rider delivery status</p>
                  </div>
                </RouterLink>

                <RouterLink
                  to="/inventory"
                  class="group p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-rose-500/40 hover:bg-slate-900/90 transition-all duration-200 flex items-center gap-4"
                >
                  <div class="w-10 h-10 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">Inventory Stock</h3>
                    <p class="text-xs text-slate-400">Monitor dark store stock levels & replenish</p>
                  </div>
                </RouterLink>

                <RouterLink
                  to="/catalog/products"
                  class="group p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-900/90 transition-all duration-200 flex items-center gap-4"
                >
                  <div class="w-10 h-10 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">Product Catalog</h3>
                    <p class="text-xs text-slate-400">Manage items, pricing & categories</p>
                  </div>
                </RouterLink>

                <RouterLink
                  to="/stores"
                  class="group p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-200 flex items-center gap-4"
                >
                  <div class="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V12m0 0h-5m5 0h5" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">Store Dark Hubs</h3>
                    <p class="text-xs text-slate-400">Configure fulfillment locations & radii</p>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Dark Hub Operational Health Side Panel (1 Column) -->
          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                <h2 class="text-base font-bold text-white">Dark Store Fleet Health</h2>
                <span class="text-xs text-emerald-400 font-medium">99.8% Uptime</span>
              </div>

              <!-- Metric Progress Bars -->
              <div class="space-y-4 my-4">
                <div>
                  <div class="flex justify-between text-xs mb-1.5">
                    <span class="text-slate-300 font-medium">Dispatch Velocity</span>
                    <span class="text-emerald-400 font-semibold">9.4 min avg</span>
                  </div>
                  <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs mb-1.5">
                    <span class="text-slate-300 font-medium">Fulfillment Rate</span>
                    <span class="text-sky-400 font-semibold">98.2%</span>
                  </div>
                  <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div class="bg-gradient-to-r from-sky-500 to-indigo-400 h-2 rounded-full w-[98%]"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs mb-1.5">
                    <span class="text-slate-300 font-medium">Stock Health Ratio</span>
                    <span class="text-amber-400 font-semibold">
                      {{ data?.adminDashboard.lowStockItems ? 'Requires Review' : 'Optimal' }}
                    </span>
                  </div>
                  <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      class="h-2 rounded-full transition-all duration-500"
                      :class="data?.adminDashboard.lowStockItems ? 'bg-gradient-to-r from-amber-500 to-rose-500 w-[78%]' : 'bg-gradient-to-r from-emerald-500 to-teal-400 w-[96%]'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Status Footer -->
            <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Hyperlocal Engine v2.4</span>
              <span class="text-emerald-400 font-semibold">● All Nodes Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
