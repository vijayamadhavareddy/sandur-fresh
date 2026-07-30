<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ErrorMessage, Field, useForm } from "vee-validate";
import { computed, ref, watch } from "vue";
import type { AdminStoreQuery, AdminStoreType } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { findDuplicateStore } from "./duplicate-detection";
import { createStore, updateStore } from "./mutations";
import { fetchStores } from "./queries";
import { type StoreFormValues, storeSchema } from "./validation";

type Store = NonNullable<AdminStoreQuery["adminStore"]>;
const props = defineProps<{ store?: Store }>();
const emit = defineEmits<{ saved: [id: string]; cancel: [] }>();
const busy = ref(false);
const serverError = ref("");

const selectedType = ref<AdminStoreType>(props.store?.type ?? "DARK_STORE");

const { data: allStoresData } = useQuery({
  queryKey: ["stores"],
  queryFn: () => fetchStores(),
});

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: storeSchema,
  initialValues: {
    name: props.store?.name ?? "",
    type: props.store?.type ?? "DARK_STORE",
    partnerName: props.store?.partnerName ?? "",
    contactPhone: props.store?.contactPhone ?? "",
    contactEmail: props.store?.contactEmail ?? "",
    commissionPct: props.store?.commissionPct ?? 0,
    address: props.store?.address ?? "",
    lat: props.store?.lat ?? 0,
    lng: props.store?.lng ?? 0,
    serviceRadiusM: props.store?.serviceRadiusM ?? 5000,
    isActive: props.store?.isActive ?? true,
  },
});

const duplicateCheck = computed(() => {
  const currentName = values.name ?? "";
  const existingList = allStoresData.value?.adminStores ?? [];
  return findDuplicateStore(currentName, existingList, props.store?.id);
});

watch(selectedType, (val) => {
  setFieldValue("type", val);
});

const submit = handleSubmit(async (values) => {
  busy.value = true;
  serverError.value = "";
  const input: StoreFormValues = {
    ...values,
    type: selectedType.value,
    partnerName: values.partnerName?.trim() || undefined,
    contactPhone: values.contactPhone?.trim() || undefined,
    contactEmail: values.contactEmail?.trim() || undefined,
  };
  try {
    if (props.store) {
      const result = await updateStore(props.store.id, input);
      emit("saved", result.updateAdminStore.id);
    } else {
      const result = await createStore(input);
      emit("saved", result.createAdminStore.id);
    }
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Could not save store";
  } finally {
    busy.value = false;
  }
});
</script>

<template>
  <form class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-6" @submit="submit">
    <div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
      <h2 class="text-base font-bold text-white flex items-center gap-2">
        <span
          class="w-2.5 h-2.5 rounded-full"
          :class="selectedType === 'DARK_STORE' ? 'bg-emerald-400' : 'bg-sky-400'"
        ></span>
        {{ store ? (selectedType === 'DARK_STORE' ? 'Edit Dark Store Hub' : 'Edit Partner Store') : (selectedType === 'DARK_STORE' ? 'New Dark Store Hub' : 'New Partner Store') }}
      </h2>
      <span class="text-xs text-slate-400 font-mono">
        {{ selectedType === 'DARK_STORE' ? 'Self-Operated Hub' : 'Third-Party Merchant' }}
      </span>
    </div>

    <!-- Store Type Selection Cards -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-semibold text-slate-300">Store Classification</span>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          @click="selectedType = 'DARK_STORE'"
          class="p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5"
          :class="selectedType === 'DARK_STORE'
            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'"
        >
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
            :class="selectedType === 'DARK_STORE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'"
          >
            🏢
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-white">Dark Store Hub</span>
              <span v-if="selectedType === 'DARK_STORE'" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">Self-operated fulfillment center with direct inventory management.</p>
          </div>
        </button>

        <button
          type="button"
          @click="selectedType = 'THIRD_PARTY'"
          class="p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5"
          :class="selectedType === 'THIRD_PARTY'
            ? 'bg-sky-500/10 border-sky-500/50 shadow-lg shadow-sky-500/10'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'"
        >
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
            :class="selectedType === 'THIRD_PARTY' ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'"
          >
            🏪
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-white">Third-Party Store</span>
              <span v-if="selectedType === 'THIRD_PARTY'" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">Active</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">External partner merchant or retail store fulfilling hyperlocal deliveries.</p>
          </div>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Store Name -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="store-name" class="text-xs font-semibold text-slate-300">
          {{ selectedType === 'DARK_STORE' ? 'Store Hub Name' : 'Store / Branch Name' }}
        </label>
        <Field
          id="store-name"
          name="name"
          :placeholder="selectedType === 'DARK_STORE' ? 'e.g. Indiranagar Dark Hub #1' : 'e.g. Daily Fresh Supermarket - Koramangala'"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="name" class="text-xs text-red-400 font-medium" />

        <!-- Real-time Duplicate Warning Banner -->
        <div
          v-if="duplicateCheck.isDuplicate"
          class="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 animate-in fade-in duration-200"
        >
          <span class="text-base flex-shrink-0">⚠️</span>
          <div>
            <p class="font-bold">Potential Duplicate Store Name Detected</p>
            <p class="text-amber-300/80 text-[11px] mt-0.5">
              A store named <span class="font-semibold text-white underline decoration-amber-400">"{{ duplicateCheck.matchedName }}"</span> already exists (matched via {{ duplicateCheck.matchType === 'exact' ? 'exact name' : 'pattern similarity' }}).
            </p>
          </div>
        </div>
      </div>

      <!-- Third-Party Specific Fields -->
      <template v-if="selectedType === 'THIRD_PARTY'">
        <!-- Partner Name -->
        <div class="flex flex-col gap-1.5">
          <label for="partner-name" class="text-xs font-semibold text-slate-300">Partner Business Entity</label>
          <Field
            id="partner-name"
            name="partnerName"
            placeholder="e.g. Daily Fresh Retail Ltd."
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
          />
          <ErrorMessage name="partnerName" class="text-xs text-red-400 font-medium" />
        </div>

        <!-- Commission Pct -->
        <div class="flex flex-col gap-1.5">
          <label for="commission-pct" class="text-xs font-semibold text-slate-300">Platform Commission (%)</label>
          <Field
            id="commission-pct"
            name="commissionPct"
            type="number"
            min="0"
            max="100"
            placeholder="e.g. 10"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition font-mono"
          />
          <ErrorMessage name="commissionPct" class="text-xs text-red-400 font-medium" />
        </div>

        <!-- Contact Phone -->
        <div class="flex flex-col gap-1.5">
          <label for="contact-phone" class="text-xs font-semibold text-slate-300">Partner Contact Phone</label>
          <Field
            id="contact-phone"
            name="contactPhone"
            type="tel"
            placeholder="+919876543210"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
          />
          <ErrorMessage name="contactPhone" class="text-xs text-red-400 font-medium" />
        </div>

        <!-- Contact Email -->
        <div class="flex flex-col gap-1.5">
          <label for="contact-email" class="text-xs font-semibold text-slate-300">Partner Contact Email</label>
          <Field
            id="contact-email"
            name="contactEmail"
            type="email"
            placeholder="partner@store.com"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
          />
          <ErrorMessage name="contactEmail" class="text-xs text-red-400 font-medium" />
        </div>
      </template>

      <!-- Address -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="store-address" class="text-xs font-semibold text-slate-300">Physical Location Address</label>
        <Field
          id="store-address"
          name="address"
          as="textarea"
          rows="3"
          placeholder="e.g. 100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="address" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Latitude -->
      <div class="flex flex-col gap-1.5">
        <label for="store-lat" class="text-xs font-semibold text-slate-300">Latitude Coordinates</label>
        <Field
          id="store-lat"
          name="lat"
          type="number"
          step="any"
          placeholder="12.9716"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="lat" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Longitude -->
      <div class="flex flex-col gap-1.5">
        <label for="store-lng" class="text-xs font-semibold text-slate-300">Longitude Coordinates</label>
        <Field
          id="store-lng"
          name="lng"
          type="number"
          step="any"
          placeholder="77.5946"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="lng" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Service Radius -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="store-radius" class="text-xs font-semibold text-slate-300">Dispatch Radius (in meters, e.g. 5000 = 5 km)</label>
        <Field
          id="store-radius"
          name="serviceRadiusM"
          type="number"
          placeholder="5000"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="serviceRadiusM" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Active Checkbox -->
      <div class="md:col-span-2">
        <label for="store-active" class="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-300">
          <Field
            id="store-active"
            name="isActive"
            type="checkbox"
            :value="true"
            :unchecked-value="false"
            class="w-4 h-4 accent-emerald-500 rounded border-slate-700 bg-slate-950 cursor-pointer"
          />
          <span>Active & accepting live customer orders</span>
        </label>
      </div>
    </div>

    <p v-if="serverError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">{{ serverError }}</p>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
      <AppButton variant="quiet" :disabled="busy" @click="$emit('cancel')">Cancel</AppButton>
      <AppButton type="submit" :disabled="busy">{{ busy ? "Saving..." : "Save store" }}</AppButton>
    </div>
  </form>
</template>

