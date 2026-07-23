<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { RouterLink } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import { fetchStores } from "@/features/stores/queries";

const { data, isError, isPending } = useQuery({ queryKey: ["stores"], queryFn: fetchStores });
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
            <PageHeader title="Dark Store Hubs" eyebrow="Fulfillment Network" />
            <p class="text-sm text-slate-400 mt-1">Manage dark store hub locations, service dispatch radii, and operational status.</p>
          </div>

          <div>
            <RouterLink
              to="/stores/new"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New store</span>
            </RouterLink>
          </div>
        </div>

        <QueryError v-if="isError" />

        <div v-else class="flex-1">
          <!-- Loading Skeleton -->
          <div v-if="isPending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-56 rounded-2xl bg-slate-900/60 border border-slate-800 p-6"></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!data?.adminStores.length" class="py-16 text-center text-slate-400">
            <p class="text-sm font-semibold text-slate-300">No dark stores registered</p>
          </div>

          <!-- Stores Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="store in data.adminStores"
              :key="store.id"
              class="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-xl"
            >
              <div class="space-y-4">
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

                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {{ store.serviceRadiusM / 1000 }} km Radius
                  </span>
                </div>

                <div>
                  <h2 class="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{{ store.name }}</h2>
                  <p class="text-xs text-slate-400 mt-1 leading-relaxed">{{ store.address }}</p>
                </div>

                <div class="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60 font-mono">
                  <div>
                    <span class="text-slate-500 text-[10px] block">LATITUDE</span>
                    <span class="text-slate-300">{{ store.lat }}</span>
                  </div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">LONGITUDE</span>
                    <span class="text-slate-300">{{ store.lng }}</span>
                  </div>
                </div>
              </div>

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
  </div>
</template>
