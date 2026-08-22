<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import BulkStoreImportDialog from "@/features/stores/BulkStoreImportDialog.vue";
import { fetchStores } from "@/features/stores/queries";

type StoreTab = "ALL" | "DARK_STORE" | "THIRD_PARTY";
const activeTab = ref<StoreTab>("ALL");
const showBulkImport = ref(false);

const { data, isError, isPending } = useQuery({
  queryKey: ["stores"],
  queryFn: () => fetchStores(),
});

const allStores = computed(() => data.value?.adminStores ?? []);

const darkStoreCount = computed(
  () => allStores.value.filter((s) => s.type === "DARK_STORE").length,
);
const thirdPartyCount = computed(
  () => allStores.value.filter((s) => s.type === "THIRD_PARTY").length,
);

const filteredStores = computed(() => {
  if (activeTab.value === "ALL") return allStores.value;
  return allStores.value.filter((s) => s.type === activeTab.value);
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
            <PageHeader title="Stores" eyebrow="" />
            <p class="text-sm text-slate-400 mt-1">Manage self-operated dark store hubs and external third-party merchant partners.</p>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="showBulkImport = true"
              class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold py-2.5 px-4 rounded-xl shadow-lg transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Bulk Import</span>
            </button>

            <RouterLink
              to="/stores/new"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Store</span>
            </RouterLink>
          </div>
        </div>

        <!-- Store Classification Tabs -->
        <div class="flex items-center gap-2 border-b border-slate-800/80 pb-px">
          <button
            type="button"
            @click="activeTab = 'ALL'"
            class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all cursor-pointer"
            :class="activeTab === 'ALL'
              ? 'border-emerald-500 text-white bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'"
          >
            <span>All Stores</span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
              :class="activeTab === 'ALL' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'"
            >
              {{ allStores.length }}
            </span>
          </button>

          <button
            type="button"
            @click="activeTab = 'DARK_STORE'"
            class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all cursor-pointer"
            :class="activeTab === 'DARK_STORE'
              ? 'border-emerald-500 text-white bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'"
          >
            <span>🏢 Dark Stores</span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
              :class="activeTab === 'DARK_STORE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'"
            >
              {{ darkStoreCount }}
            </span>
          </button>

          <button
            type="button"
            @click="activeTab = 'THIRD_PARTY'"
            class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all cursor-pointer"
            :class="activeTab === 'THIRD_PARTY'
              ? 'border-sky-500 text-white bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'"
          >
            <span>🏪 Third-Party Stores</span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
              :class="activeTab === 'THIRD_PARTY' ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'"
            >
              {{ thirdPartyCount }}
            </span>
          </button>
        </div>

        <QueryError v-if="isError" />

        <div v-else class="flex-1">
          <!-- Loading Skeleton -->
          <div v-if="isPending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-56 rounded-2xl bg-slate-900/60 border border-slate-800 p-6"></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!filteredStores.length" class="py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800/60 p-8">
            <div class="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">
              {{ activeTab === 'DARK_STORE' ? '🏢' : activeTab === 'THIRD_PARTY' ? '🏪' : '🏬' }}
            </div>
            <p class="text-sm font-semibold text-slate-300">
              {{ activeTab === 'DARK_STORE'
                ? 'No dark store hubs registered yet'
                : activeTab === 'THIRD_PARTY'
                ? 'No third-party partner stores onboarded yet'
                : 'No stores registered' }}
            </p>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {{ activeTab === 'DARK_STORE'
                ? 'Create a dark store fulfillment hub to dispatch rapid grocery deliveries.'
                : activeTab === 'THIRD_PARTY'
                ? 'Onboard a local partner merchant or retail supermarket to fulfill partner orders.'
                : 'Get started by creating your first store.' }}
            </p>
            <div class="mt-4">
              <RouterLink
                to="/stores/new"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
              >
                <span>+ Create Store Now</span>
              </RouterLink>
            </div>
          </div>

          <!-- Stores Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="store in filteredStores"
              :key="store.id"
              class="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-xl"
            >
              <div class="space-y-4">
                <!-- Status & Type Header -->
                <div class="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-2.5 h-2.5 rounded-full"
                      :class="store.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'"
                    ></span>
                    <span
                      class="text-xs font-semibold"
                      :class="store.isActive ? 'text-emerald-400' : 'text-slate-400'"
                    >
                      {{ store.isActive ? 'Accepting Orders' : 'Inactive' }}
                    </span>
                  </div>

                  <!-- Store Classification Badge -->
                  <span
                    class="px-2 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1"
                    :class="store.type === 'DARK_STORE'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-sky-500/15 text-sky-300 border-sky-500/30'"
                  >
                    <span>{{ store.type === 'DARK_STORE' ? '🏢 Dark Store' : '🏪 3rd Party' }}</span>
                  </span>
                </div>

                <!-- Store Info -->
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h2 class="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {{ store.name }}
                    </h2>
                  </div>
                  <p class="text-xs text-slate-400 mt-1 leading-relaxed">{{ store.address }}</p>
                </div>

                <!-- Partner Merchant Details (if 3rd party) -->
                <div v-if="store.type === 'THIRD_PARTY' && (store.partnerName || store.contactPhone || store.commissionPct !== null)" class="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 text-xs space-y-1.5">
                  <div v-if="store.partnerName" class="flex items-center justify-between">
                    <span class="text-slate-500 text-[11px]">Partner:</span>
                    <span class="text-slate-200 font-semibold truncate max-w-[180px]">{{ store.partnerName }}</span>
                  </div>
                  <div v-if="store.contactPhone" class="flex items-center justify-between">
                    <span class="text-slate-500 text-[11px]">Contact:</span>
                    <span class="text-slate-300 font-mono text-[11px]">{{ store.contactPhone }}</span>
                  </div>
                  <div v-if="store.commissionPct !== null && store.commissionPct !== undefined" class="flex items-center justify-between">
                    <span class="text-slate-500 text-[11px]">Commission:</span>
                    <span class="text-sky-300 font-semibold">{{ store.commissionPct }}%</span>
                  </div>
                </div>

                <!-- Geolocation & Dispatch Radius -->
                <div class="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-800/60 font-mono">
                  <div>
                    <span class="text-slate-500 text-[10px] block">RADIUS</span>
                    <span class="text-emerald-400 font-semibold">{{ store.serviceRadiusM / 1000 }} km</span>
                  </div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">LATITUDE</span>
                    <span class="text-slate-300">{{ store.lat.toFixed(4) }}</span>
                  </div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">LONGITUDE</span>
                    <span class="text-slate-300">{{ store.lng.toFixed(4) }}</span>
                  </div>
                </div>
              </div>

              <!-- Card Action Footer -->
              <div class="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
                <RouterLink
                  :to="`/stores/${store.id}/edit`"
                  class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Edit Store</span>
                </RouterLink>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Store Import Modal Dialog -->
    <BulkStoreImportDialog :open="showBulkImport" @close="showBulkImport = false" />
  </div>
</template>
