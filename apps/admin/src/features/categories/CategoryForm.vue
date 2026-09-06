<script setup lang="ts">
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import type { AdminCategoriesQuery } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { createCategory, updateCategory } from "./mutations";
import { type CategoryFormValues, categorySchema } from "./validation";

type Category = NonNullable<AdminCategoriesQuery["adminCategories"]>[number];
const props = defineProps<{ category?: Category }>();
const emit = defineEmits<{
  saved: [];
  cancel: [];
  importProducts: [category: Category];
}>();
const busy = ref(false);
const serverError = ref("");
const { handleSubmit } = useForm({
  validationSchema: categorySchema,
  initialValues: {
    name: props.category?.name ?? "",
    slug: props.category?.slug ?? "",
    sortOrder: props.category?.sortOrder ?? 0,
  },
});
const submit = handleSubmit(async (values) => {
  busy.value = true;
  serverError.value = "";
  const input: CategoryFormValues = values;
  try {
    if (props.category) await updateCategory(props.category.id, input);
    else await createCategory(input);
    emit("saved");
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Could not save category";
  } finally {
    busy.value = false;
  }
});
</script>

<template>
  <form class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col gap-4 mb-6" @submit="submit">
    <div class="flex items-center justify-between pb-3 border-b border-slate-800/80">
      <div class="flex items-center gap-3">
        <h3 class="text-sm font-bold text-white">{{ category ? 'Edit Category' : 'Create New Category' }}</h3>
        <span v-if="category" class="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
          /{{ category.slug }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="category"
          type="button"
          @click="$emit('importProducts', category)"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Import Products</span>
        </button>
        <span v-else class="text-xs text-slate-400">Category Catalog</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="category-name" class="text-xs font-semibold text-slate-300">Name</label>
        <Field
          id="category-name"
          name="name"
          placeholder="e.g. Fresh Produce"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="name" class="text-xs text-red-400 font-medium" />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="category-slug" class="text-xs font-semibold text-slate-300">Slug</label>
        <Field
          id="category-slug"
          name="slug"
          placeholder="e.g. fresh-produce"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="slug" class="text-xs text-red-400 font-medium" />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="category-sort" class="text-xs font-semibold text-slate-300">Sort order</label>
        <Field
          id="category-sort"
          name="sortOrder"
          type="number"
          placeholder="0"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
      </div>
    </div>

    <p v-if="serverError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">{{ serverError }}</p>
    <div class="flex justify-end gap-3 pt-2 border-t border-slate-800/80">
      <AppButton variant="quiet" :disabled="busy" @click="$emit('cancel')">Cancel</AppButton>
      <AppButton type="submit" :disabled="busy">{{ busy ? 'Saving...' : 'Save category' }}</AppButton>
    </div>
  </form>
</template>
