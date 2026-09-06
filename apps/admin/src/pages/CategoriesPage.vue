<script setup lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import type { AdminCategoriesQuery } from "@/api/generated/graphql";
import PageHeader from "@/components/PageHeader.vue";
import QueryError from "@/components/QueryError.vue";
import BulkCategoryImportDialog from "@/features/categories/BulkCategoryImportDialog.vue";
import CategoryForm from "@/features/categories/CategoryForm.vue";
import { fetchCategories } from "@/features/categories/queries";
import BulkProductImportDialog from "@/features/products/BulkProductImportDialog.vue";

type Category = NonNullable<AdminCategoriesQuery["adminCategories"]>[number];
const selected = ref<Category>();
const creating = ref(false);
const showBulkImport = ref(false);
const bulkImportCategory = ref<Category | null>(null);
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
            <PageHeader title="Categories" eyebrow="" />
            <p class="text-sm text-slate-400 mt-1">Organize product catalog categories and sort hierarchies.</p>
          </div>

          <div class="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              @click="showBulkImport = true"
              class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold py-2.5 px-4 rounded-xl shadow-lg transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Bulk Import Categories</span>
            </button>

            <button
              type="button"
              @click="creating = true; selected = undefined"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer text-xs"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New category</span>
            </button>
          </div>
        </div>

        <!-- Form (Inline when creating or editing) -->
        <CategoryForm
          v-if="creating || selected"
          :key="selected?.id ?? 'new'"
          :category="selected"
          @saved="saved"
          @cancel="creating = false; selected = undefined"
          @import-products="(cat) => bulkImportCategory = cat"
        />

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
            <div
              v-for="category in data.adminCategories"
              :key="category.id"
              class="group p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col justify-between gap-3"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <RouterLink
                    :to="`/catalog/categories/${category.id}`"
                    class="group-hover:text-emerald-400 transition-colors block"
                  >
                    <h4 class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors block">
                      {{ category.name }}
                    </h4>
                  </RouterLink>
                  <span class="text-xs text-slate-400 font-mono">/{{ category.slug }}</span>
                </div>
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-emerald-400">
                  Order #{{ category.sortOrder }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-2.5 border-t border-slate-800/60 mt-1">
                <div class="flex items-center gap-1.5">
                  <RouterLink
                    :to="`/catalog/categories/${category.id}`"
                    class="text-xs font-semibold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-slate-800/60"
                    :title="`View products in ${category.name}`"
                  >
                    <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>View</span>
                  </RouterLink>

                  <button
                    type="button"
                    @click="selected = category; creating = false"
                    class="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-800/60"
                  >
                    <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                </div>

                <button
                  type="button"
                  @click="bulkImportCategory = category"
                  class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg px-2.5 py-1 flex items-center gap-1.5 transition cursor-pointer"
                  :title="`Import products into ${category.name}`"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Import Products</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Category Import Modal Dialog -->
    <BulkCategoryImportDialog
      :open="showBulkImport"
      @close="showBulkImport = false"
      @imported="client.invalidateQueries({ queryKey: ['categories'] })"
    />

    <!-- Bulk Product Import Modal Dialog for Category -->
    <BulkProductImportDialog
      v-if="bulkImportCategory"
      :open="Boolean(bulkImportCategory)"
      :category-id="bulkImportCategory.id"
      :category-name="bulkImportCategory.name"
      @close="bulkImportCategory = null"
      @imported="bulkImportCategory = null"
    />
  </div>
</template>
