<script setup lang="ts">
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import type { AdminCategoriesQuery, AdminProductQuery } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { createProduct, updateProduct, uploadProductImage } from "./mutations";
import { type ProductFormValues, productSchema } from "./validation";

type Product = NonNullable<AdminProductQuery["adminProduct"]>;
type Category = NonNullable<AdminCategoriesQuery["adminCategories"]>[number];
const props = defineProps<{ product?: Product; categories: Category[] }>();
const emit = defineEmits<{ saved: [id: string]; cancel: [] }>();
const busy = ref(false);
const serverError = ref("");
const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: productSchema,
  initialValues: props.product
    ? {
        name: props.product.name,
        description: props.product.description ?? "",
        unit: props.product.unit,
        mrp: props.product.mrp,
        price: props.product.price,
        imageUrl: props.product.imageUrl ?? "",
        isActive: props.product.isActive,
        categoryId: props.product.categoryId,
      }
    : {
        name: "",
        description: "",
        unit: "",
        mrp: 0,
        price: 0,
        imageUrl: "",
        isActive: true,
        categoryId: "",
      },
});

const submit = handleSubmit(async (formValues) => {
  busy.value = true;
  serverError.value = "";
  try {
    const input: ProductFormValues = formValues;
    if (props.product) {
      const result = await updateProduct(props.product.id, input);
      emit("saved", result.updateAdminProduct.id);
    } else {
      const result = await createProduct(input);
      emit("saved", result.createAdminProduct.id);
    }
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Could not save product";
  } finally {
    busy.value = false;
  }
});

async function upload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  busy.value = true;
  serverError.value = "";
  try {
    setFieldValue("imageUrl", await uploadProductImage(file));
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Image upload failed";
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <form class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-6" @submit="submit">
    <div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
      <h2 class="text-base font-bold text-white flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        {{ product ? 'Edit Product Details' : 'New Product Information' }}
      </h2>
      <span class="text-xs text-slate-400 font-mono">Catalog Entry</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Name -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="product-name" class="text-xs font-semibold text-slate-300">Product Name</label>
        <Field
          id="product-name"
          name="name"
          placeholder="e.g. Organic Cavendish Bananas"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="name" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Description -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="product-description" class="text-xs font-semibold text-slate-300">Description</label>
        <Field
          id="product-description"
          name="description"
          as="textarea"
          rows="3"
          placeholder="Freshly sourced, rich in potassium..."
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="description" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Unit -->
      <div class="flex flex-col gap-1.5">
        <label for="product-unit" class="text-xs font-semibold text-slate-300">Unit / Pack Size</label>
        <Field
          id="product-unit"
          name="unit"
          placeholder="e.g. 500 g or 1 kg"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="unit" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Category -->
      <div class="flex flex-col gap-1.5">
        <label for="product-category" class="text-xs font-semibold text-slate-300">Category</label>
        <Field
          id="product-category"
          name="categoryId"
          as="select"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition cursor-pointer"
        >
          <option value="">Select Category</option>
          <option v-for="item in categories" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </Field>
        <ErrorMessage name="categoryId" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- MRP -->
      <div class="flex flex-col gap-1.5">
        <label for="product-mrp" class="text-xs font-semibold text-slate-300">MRP (in paise, e.g. 5000 = ₹50.00)</label>
        <Field
          id="product-mrp"
          name="mrp"
          type="number"
          placeholder="5000"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="mrp" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Price -->
      <div class="flex flex-col gap-1.5">
        <label for="product-price" class="text-xs font-semibold text-slate-300">Selling Price (in paise, e.g. 4500 = ₹45.00)</label>
        <Field
          id="product-price"
          name="price"
          type="number"
          placeholder="4500"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="price" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Image Upload & Preview -->
      <div class="md:col-span-2 flex flex-col gap-2">
        <label for="product-image" class="text-xs font-semibold text-slate-300">Product Image</label>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <img
            v-if="values.imageUrl"
            :src="values.imageUrl"
            alt="Preview"
            class="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
          />
          <div v-else class="w-14 h-14 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div class="flex-1">
            <input
              id="product-image"
              type="file"
              accept="image/*"
              @change="upload"
              class="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
            />
            <Field name="imageUrl" type="hidden" />
          </div>
        </div>
      </div>

      <!-- Active Checkbox -->
      <div class="md:col-span-2">
        <label for="product-active" class="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-300">
          <Field
            id="product-active"
            name="isActive"
            type="checkbox"
            :value="true"
            :unchecked-value="false"
            class="w-4 h-4 accent-emerald-500 rounded border-slate-700 bg-slate-950 cursor-pointer"
          />
          <span>Active in catalog</span>
        </label>
      </div>
    </div>

    <p v-if="serverError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">{{ serverError }}</p>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
      <AppButton variant="quiet" :disabled="busy" @click="$emit('cancel')">Cancel</AppButton>
      <AppButton type="submit" :disabled="busy">{{ busy ? "Saving..." : "Save product" }}</AppButton>
    </div>
  </form>
</template>
