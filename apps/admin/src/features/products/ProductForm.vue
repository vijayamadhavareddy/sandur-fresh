<script setup lang="ts">
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import type {
  AdminCategoriesQuery,
  AdminProductQuery,
  TimeBoundSectionsQuery,
} from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { formatCurrency } from "@/shared/formatting/currency";
import { createProduct, updateProduct, uploadProductImage } from "./mutations";
import { type ProductFormValues, productSchema } from "./validation";

type Product = NonNullable<AdminProductQuery["adminProduct"]>;
type Category = NonNullable<AdminCategoriesQuery["adminCategories"]>[number];
type TimeBoundSection = TimeBoundSectionsQuery["timeBoundSections"][number];
const props = defineProps<{
  product?: Product;
  categories: Category[];
  sections: TimeBoundSection[];
}>();
const emit = defineEmits<{ saved: [id: string]; cancel: [] }>();
const busy = ref(false);
const serverError = ref("");
const { handleSubmit, setFieldValue, values } = useForm<ProductFormValues>({
  validationSchema: productSchema,
  initialValues: props.product
    ? {
        name: props.product.name,
        description: props.product.description ?? "",
        unit: props.product.unit,
        mrp: props.product.mrp,
        price: props.product.price,
        originalPrice: props.product.originalPrice ?? undefined,
        markup: props.product.markup ?? undefined,
        markupType: (props.product.markupType as "PERCENTAGE" | "AMOUNT") ?? "PERCENTAGE",
        imageUrl: props.product.imageUrl ?? "",
        timeBoundSections: (props.product.timeBoundSections as ("BREAKFAST" | "LUNCH" | "DINNER")[]) ?? [],
        isActive: props.product.isActive,
        categoryId: props.product.categoryId,
      }
    : {
        name: "",
        description: "",
        unit: "",
        mrp: 0,
        price: 0,
        originalPrice: undefined,
        markup: undefined,
        markupType: "PERCENTAGE" as "PERCENTAGE" | "AMOUNT",
        imageUrl: "",
        timeBoundSections: [] as ("BREAKFAST" | "LUNCH" | "DINNER")[],
        isActive: true,
        categoryId: "",
      },
});

function toggleSection(sectionId: "BREAKFAST" | "LUNCH" | "DINNER") {
  const current = (values.timeBoundSections as ("BREAKFAST" | "LUNCH" | "DINNER")[] | undefined) ?? [];
  const index = current.indexOf(sectionId);
  if (index >= 0) {
    setFieldValue(
      "timeBoundSections",
      current.filter((id) => id !== sectionId),
    );
  } else {
    setFieldValue("timeBoundSections", [...current, sectionId]);
  }
}

function onOriginalPriceInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  const val = raw !== "" ? Number(raw) : undefined;
  setFieldValue("originalPrice", val);
  syncPriceFromMarkup(val, values.markup as number | undefined, values.markupType as "PERCENTAGE" | "AMOUNT" | undefined);
}

function onMarkupInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  const val = raw !== "" ? Number(raw) : undefined;
  setFieldValue("markup", val);
  syncPriceFromMarkup(values.originalPrice as number | undefined, val, values.markupType as "PERCENTAGE" | "AMOUNT" | undefined);
}

function setMarkupType(type: "PERCENTAGE" | "AMOUNT") {
  setFieldValue("markupType", type);
  syncPriceFromMarkup(values.originalPrice as number | undefined, values.markup as number | undefined, type);
}

function syncPriceFromMarkup(
  origPrice?: number,
  markupVal?: number,
  type: "PERCENTAGE" | "AMOUNT" = "PERCENTAGE",
) {
  if (typeof origPrice === "number" && origPrice > 0 && typeof markupVal === "number" && markupVal >= 0) {
    if (type === "PERCENTAGE") {
      const computedPrice = Math.round(origPrice + (origPrice * markupVal) / 100);
      setFieldValue("price", computedPrice);
    } else {
      const computedPrice = origPrice + markupVal;
      setFieldValue("price", computedPrice);
    }
  }
}

function onSellingPriceInput(e: Event) {
  const newPrice = Number((e.target as HTMLInputElement).value);
  setFieldValue("price", newPrice);
  const origPrice = values.originalPrice as number | undefined;
  if (typeof origPrice === "number" && origPrice > 0 && newPrice >= origPrice) {
    if (values.markupType === "AMOUNT") {
      setFieldValue("markup", newPrice - origPrice);
    } else {
      const pct = Math.round(((newPrice - origPrice) / origPrice) * 100);
      setFieldValue("markup", pct);
    }
  }
}

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

      <!-- Time-bound sections (Multi-select) -->
      <div class="md:col-span-2 flex flex-col gap-2">
        <span class="text-xs font-semibold text-slate-300">Time-bound Sections (Multi-select)</span>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            v-for="item in sections"
            :key="item.id"
            type="button"
            @click="toggleSection(item.id as 'BREAKFAST' | 'LUNCH' | 'DINNER')"
            class="flex items-start gap-2.5 p-3 rounded-xl border text-left transition duration-150 cursor-pointer select-none"
            :class="
              values.timeBoundSections?.includes(item.id as 'BREAKFAST' | 'LUNCH' | 'DINNER')
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-500/10'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
            "
          >
            <div
              class="w-4 h-4 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
              :class="
                values.timeBoundSections?.includes(item.id as 'BREAKFAST' | 'LUNCH' | 'DINNER')
                  ? 'bg-amber-500 border-amber-500 text-slate-950'
                  : 'border-slate-700 bg-slate-900'
              "
            >
              <svg
                v-if="values.timeBoundSections?.includes(item.id as 'BREAKFAST' | 'LUNCH' | 'DINNER')"
                class="w-3 h-3 stroke-[3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-xs font-semibold block leading-tight">{{ item.title }}</span>
              <span class="text-[11px] opacity-75 font-mono">{{ item.window }}</span>
            </div>
          </button>
        </div>
        <p class="text-xs text-slate-500">
          Tagged products get their own shelf in the customer app during these active windows. Select all that apply.
        </p>
        <ErrorMessage name="timeBoundSections" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Pricing & Margins Section -->
      <div class="md:col-span-2 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-4">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800/60">
          <span class="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            Pricing & Margins
          </span>
          <span class="text-[11px] text-slate-400">All values in integer paise (₹1 = 100 paise)</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- MRP -->
          <div class="flex flex-col gap-1.5">
            <label for="product-mrp" class="text-xs font-semibold text-slate-300">
              MRP (Maximum Retail Price)
            </label>
            <Field
              id="product-mrp"
              name="mrp"
              type="number"
              placeholder="5000"
              class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
            />
            <span v-if="typeof values.mrp === 'number' && values.mrp > 0" class="text-[11px] font-mono text-slate-400">
              {{ formatCurrency(Number(values.mrp)) }}
            </span>
            <ErrorMessage name="mrp" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Cost / Original Price -->
          <div class="flex flex-col gap-1.5">
            <label for="product-original-price" class="text-xs font-semibold text-slate-300">
              Cost / Original Price
            </label>
            <input
              id="product-original-price"
              type="number"
              :value="values.originalPrice"
              @input="onOriginalPriceInput"
              placeholder="3500"
              class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
            />
            <Field name="originalPrice" type="hidden" />
            <span v-if="typeof values.originalPrice === 'number' && values.originalPrice > 0" class="text-[11px] font-mono text-slate-400">
              {{ formatCurrency(Number(values.originalPrice)) }}
            </span>
            <ErrorMessage name="originalPrice" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Markup -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <label for="product-markup" class="text-xs font-semibold text-slate-300">
                Markup
              </label>
              <div class="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-[10px] font-medium">
                <button
                  type="button"
                  @click="setMarkupType('PERCENTAGE')"
                  class="px-2 py-0.5 rounded transition cursor-pointer"
                  :class="values.markupType === 'PERCENTAGE' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'"
                >
                  %
                </button>
                <button
                  type="button"
                  @click="setMarkupType('AMOUNT')"
                  class="px-2 py-0.5 rounded transition cursor-pointer"
                  :class="values.markupType === 'AMOUNT' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'"
                >
                  ₹ (paise)
                </button>
              </div>
            </div>
            <input
              id="product-markup"
              type="number"
              :value="values.markup"
              @input="onMarkupInput"
              :placeholder="values.markupType === 'PERCENTAGE' ? '20 (%)' : '1000 (paise)'"
              class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
            />
            <Field name="markup" type="hidden" />
            <Field name="markupType" type="hidden" />
            <span v-if="typeof values.markup === 'number' && values.markupType === 'AMOUNT'" class="text-[11px] font-mono text-slate-400">
              {{ formatCurrency(Number(values.markup)) }}
            </span>
            <ErrorMessage name="markup" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Selling Price -->
          <div class="flex flex-col gap-1.5">
            <label for="product-price" class="text-xs font-semibold text-slate-300">
              Selling Price
            </label>
            <input
              id="product-price"
              type="number"
              :value="values.price"
              @input="onSellingPriceInput"
              placeholder="4500"
              class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono font-semibold"
            />
            <Field name="price" type="hidden" />
            <span v-if="typeof values.price === 'number' && values.price > 0" class="text-[11px] font-mono text-emerald-400 font-semibold">
              {{ formatCurrency(Number(values.price)) }}
            </span>
            <ErrorMessage name="price" class="text-xs text-red-400 font-medium" />
          </div>
        </div>
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
