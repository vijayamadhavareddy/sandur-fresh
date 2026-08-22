<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import { fetchStore } from "@/features/stores/queries";
import StoreForm from "@/features/stores/StoreForm.vue";

const route = useRoute();
const router = useRouter();
const storeId = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));
const isEditing = computed(() => Boolean(storeId.value));

const storeQuery = useQuery({
  queryKey: computed(() => ["store", storeId.value]),
  queryFn: () => fetchStore(storeId.value),
  enabled: isEditing,
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
          <PageHeader
            :title="isEditing ? (storeQuery.data.value?.adminStore?.type === 'THIRD_PARTY' ? 'Edit Partner Store' : 'Edit Dark Store Hub') : 'Register New Store'"
            eyebrow=""
          />
          <p class="text-sm text-slate-400 mt-1">Configure store classification (Dark Store Hub vs Third-Party Partner), geolocation coordinates, and dispatch radius.</p>
        </div>
      </div>

      <!-- Loading State (Only when editing and fetching) -->
      <div v-if="isEditing && storeQuery.isPending.value" class="p-12 text-center text-slate-400 animate-pulse">
        <p class="text-sm font-semibold">Loading store configuration...</p>
      </div>

      <!-- Error State (Only when editing and query failed) -->
      <div v-else-if="isEditing && storeQuery.isError.value" class="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-xs">
        <p>Could not load this store. Please refresh or try again.</p>
      </div>

      <!-- Store Form: Always renders when creating, or when store data is available when editing -->
      <StoreForm
        v-else
        :key="storeId"
        :store="isEditing ? storeQuery.data.value?.adminStore ?? undefined : undefined"
        @saved="router.push('/stores')"
        @cancel="router.push('/stores')"
      />
    </div>
  </div>
</template>
