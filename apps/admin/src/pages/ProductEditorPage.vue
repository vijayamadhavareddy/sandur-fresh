<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import ProductForm from "@/features/products/ProductForm.vue";
import {
  fetchCategories,
  fetchProduct,
  fetchTimeBoundSections,
} from "@/features/products/queries";

const route = useRoute();
const router = useRouter();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));
const editing = computed(() => Boolean(id.value));
const categories = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
const sections = useQuery({ queryKey: ["timeBoundSections"], queryFn: fetchTimeBoundSections });
const product = useQuery({
  queryKey: computed(() => ["product", id.value]),
  queryFn: () => fetchProduct(id.value),
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
          <PageHeader :title="editing ? 'Edit Product' : 'Create New Product'" eyebrow="" />
          <p class="text-sm text-slate-400 mt-1">Configure product pricing, packaging unit, category, time-bound shelf, and active availability.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="categories.isPending.value || sections.isPending.value || (editing && product.isPending.value)" class="p-12 text-center text-slate-400 animate-pulse">
        <p class="text-sm font-semibold">Loading product editor form...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="categories.isError.value || sections.isError.value || product.isError.value" class="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-xs">
        <p>Could not load the product form. Please refresh or try again.</p>
      </div>

      <!-- Product Form -->
      <ProductForm
        v-else-if="!editing || product.data.value?.adminProduct"
        :key="id"
        :product="product.data.value?.adminProduct ?? undefined"
        :categories="categories.data.value?.adminCategories ?? []"
        :sections="sections.data.value?.timeBoundSections ?? []"
        @saved="router.push('/catalog/products')"
        @cancel="router.push('/catalog/products')"
      />
    </div>
  </div>
</template>
