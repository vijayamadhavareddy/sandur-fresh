<script setup lang="ts">
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import type { AdminStoreQuery } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { createStore, updateStore } from "./mutations";
import { type StoreFormValues, storeSchema } from "./validation";

type Store = NonNullable<AdminStoreQuery["adminStore"]>;
const props = defineProps<{ store?: Store }>();
const emit = defineEmits<{ saved: [id: string]; cancel: [] }>();
const busy = ref(false);
const serverError = ref("");
const { handleSubmit } = useForm({
  validationSchema: storeSchema,
  initialValues: props.store ?? {
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    serviceRadiusM: 3000,
    isActive: true,
  },
});
const submit = handleSubmit(async (values) => {
  busy.value = true;
  serverError.value = "";
  const input: StoreFormValues = values;
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
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        {{ store ? 'Edit Store Hub' : 'New Dark Store Hub' }}
      </h2>
      <span class="text-xs text-slate-400 font-mono">Fulfillment Center</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Store Name -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="store-name" class="text-xs font-semibold text-slate-300">Store Hub Name</label>
        <Field
          id="store-name"
          name="name"
          placeholder="e.g. Indiranagar Dark Hub #1"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="name" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Address -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="store-address" class="text-xs font-semibold text-slate-300">Hub Address</label>
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
        <label for="store-radius" class="text-xs font-semibold text-slate-300">Dispatch Radius (in meters, e.g. 3000 = 3 km)</label>
        <Field
          id="store-radius"
          name="serviceRadiusM"
          type="number"
          placeholder="3000"
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
          <span>Active & accepting live orders</span>
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
