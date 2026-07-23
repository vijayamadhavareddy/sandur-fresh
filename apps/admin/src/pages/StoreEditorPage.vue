<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import { fetchStore } from "@/features/stores/queries";
import StoreForm from "@/features/stores/StoreForm.vue";

const route = useRoute();
const router = useRouter();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));
const editing = computed(() => Boolean(id.value));
const store = useQuery({
  queryKey: computed(() => ["store", id.value]),
  queryFn: () => fetchStore(id.value),
  enabled: editing,
});
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Ambient Background Glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-6 flex-1">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <PageHeader :title="editing ? 'Edit Store Hub' : 'New Dark Store Hub'" eyebrow="Fulfillment Network" />
          <p class="text-sm text-slate-400 mt-1">Configure dark store hub address, geolocation coordinates, and dispatch radius.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="editing && store.isPending.value" class="p-12 text-center text-slate-400 animate-pulse">
        <p class="text-sm font-semibold">Loading store configuration...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="store.isError.value" class="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-xs">
        <p>Could not load this store. Please refresh or try again.</p>
      </div>

      <!-- Store Form -->
      <StoreForm
        v-else-if="!editing || store.data.value?.adminStore"
        :key="id"
        :store="store.data.value?.adminStore ?? undefined"
        @saved="router.push('/stores')"
        @cancel="router.push('/stores')"
      />
    </div>
  </div>
</template>
