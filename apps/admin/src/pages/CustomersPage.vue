<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import QueryError from "@/components/QueryError.vue";
import { usePagination } from "@/composables/usePagination";
import { fetchCustomers } from "@/features/customers/queries";
import { formatDateTime } from "@/features/orders/formatters";

const query = ref("");
const { page, limit, reset } = usePagination();
watch(query, reset);

const key = computed(() => ["customers", page.value, query.value]);
const { data, isError, isPending } = useQuery({
  queryKey: key,
  queryFn: () => fetchCustomers(page.value, limit.value, query.value || undefined),
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
            <PageHeader title="Customer Directory" eyebrow="User Management" />
            <p class="text-sm text-slate-400 mt-1">View registered customers, manage contact details, and update profile information.</p>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="relative w-full sm:w-80">
            <label class="sr-only" for="customer-search">Search customers</label>
            <div class="relative">
              <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="customer-search"
                v-model="query"
                type="text"
                placeholder="Search by name, phone, or email..."
                class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
          </div>

          <div class="text-xs text-slate-400 font-medium">
            <span v-if="data?.adminCustomers">Total: <strong class="text-emerald-400 font-semibold">{{ data.adminCustomers.total }}</strong> customers</span>
            <span v-else-if="isPending">Loading customers...</span>
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
                  <th class="py-3.5 px-4 sm:px-6">Customer Name</th>
                  <th class="py-3.5 px-4">Phone Number</th>
                  <th class="py-3.5 px-4">Email Address</th>
                  <th class="py-3.5 px-4">Registered</th>
                  <th class="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>

              <!-- Loading Skeleton -->
              <tbody v-if="isPending" class="divide-y divide-slate-800/60 animate-pulse">
                <tr v-for="i in 5" :key="i">
                  <td class="py-4 px-4 sm:px-6"><div class="w-32 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-28 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-36 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4"><div class="w-24 h-4 rounded bg-slate-800"></div></td>
                  <td class="py-4 px-4 sm:px-6 text-right"><div class="w-12 h-4 rounded bg-slate-800 ml-auto"></div></td>
                </tr>
              </tbody>

              <!-- Empty State -->
              <tbody v-else-if="!data?.adminCustomers.items.length">
                <tr>
                  <td colspan="5" class="py-16 text-center text-slate-400">
                    <p class="text-sm font-semibold text-slate-300">No customers found</p>
                    <p class="text-xs text-slate-500 mt-1">No customer profiles match your search criteria.</p>
                  </td>
                </tr>
              </tbody>

              <!-- Data Rows -->
              <tbody v-else class="divide-y divide-slate-800/60">
                <tr
                  v-for="customer in data.adminCustomers.items"
                  :key="customer.id"
                  class="hover:bg-slate-800/40 transition duration-150 group"
                >
                  <td class="py-3.5 px-4 sm:px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-xs flex-shrink-0">
                        {{ customer.name ? customer.name.charAt(0).toUpperCase() : 'C' }}
                      </div>
                      <div>
                        <strong class="text-slate-100 font-semibold block">{{ customer.name || 'Unnamed Customer' }}</strong>
                        <span class="text-[10px] text-slate-500 font-mono block">ID: {{ customer.id }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 font-mono text-slate-300 font-medium">{{ customer.phone }}</td>

                  <td class="py-3.5 px-4 text-slate-300">
                    <span v-if="customer.email">{{ customer.email }}</span>
                    <span v-else class="text-slate-600 italic">Not set</span>
                  </td>

                  <td class="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                    {{ customer.createdAt ? formatDateTime(customer.createdAt) : '—' }}
                  </td>

                  <td class="py-3.5 px-4 sm:px-6 text-right">
                    <RouterLink
                      :to="`/customers/${customer.id}/edit`"
                      class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
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

      <!-- Pagination Footer -->
      <div v-if="data" class="pt-4 border-t border-slate-800/80">
        <PaginationBar v-bind="data.adminCustomers" @change="page = $event" />
      </div>
    </div>
  </div>
</template>
