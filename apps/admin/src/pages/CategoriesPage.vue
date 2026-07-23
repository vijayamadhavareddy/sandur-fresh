<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref } from "vue";
import type { AdminCategoriesQuery } from "@/api/generated/graphql";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import CategoryForm from "@/features/categories/CategoryForm.vue";
import { fetchCategories } from "@/features/categories/queries";

type Category = NonNullable<AdminCategoriesQuery["adminCategories"]>[number];
const selected = ref<Category>();
const creating = ref(false);
const client = useQueryClient();
const { data, isError, isPending } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

async function saved() {
  selected.value = undefined;
  creating.value = false;
  await client.invalidateQueries({ queryKey: ["categories"] });
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
            <PageHeader title="Categories" eyebrow="Catalog Management" />
            <p class="text-sm text-slate-400 mt-1">Organize product catalog categories and sort hierarchies.</p>
          </div>

          <button
            type="button"
            @click="creating = true; selected = undefined"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs self-start md:self-auto"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>New category</span>
          </button>
        </div>

        <!-- Form (Inline when creating or editing) -->
        <CategoryForm v-if="creating || selected" :key="selected?.id ?? 'new'" :category="selected" @saved="saved" @cancel="creating = false; selected = undefined" />

        <!-- Query Error -->
        <QueryError v-if="isError" />

        <!-- Categories List Grid -->
        <div v-else class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex-1">
          <div v-if="isPending" class="space-y-3 animate-pulse">
            <div v-for="i in 5" :key="i" class="h-14 rounded-xl bg-slate-800/60"></div>
          </div>

          <div v-else-if="!data?.adminCategories.length" class="py-12 text-center text-slate-400">
            <p class="text-sm font-semibold">No categories found.</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              v-for="category in data.adminCategories"
              :key="category.id"
              type="button"
              @click="selected = category; creating = false"
              class="group p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 text-left transition-all duration-200 flex items-center justify-between cursor-pointer"
            >
              <div>
                <strong class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors block">{{ category.name }}</strong>
                <span class="text-xs text-slate-400 font-mono">/{{ category.slug }}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-emerald-400">
                Order #{{ category.sortOrder }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
