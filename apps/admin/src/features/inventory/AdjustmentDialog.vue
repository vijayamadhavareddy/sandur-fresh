<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import AppButton from "@/components/AppButton.vue";
import { adjustInventory } from "./mutations";
import { adjustmentSchema } from "./validation";

const props = defineProps<{ open: boolean; inventoryId: string; productName: string }>();
const emit = defineEmits<{ close: []; saved: [] }>();
const serverError = ref("");
const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: adjustmentSchema, initialValues: { delta: 0, reason: "" } });
const submit = handleSubmit(async ({ delta, reason }) => {
  serverError.value = "";
  try {
    await adjustInventory(props.inventoryId, delta, reason);
    resetForm();
    emit("saved");
    emit("close");
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Could not adjust inventory";
  }
});
</script>

<template>
  <Dialog :open="open" class="relative z-50" @close="$emit('close')">
    <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" aria-hidden="true" />

    <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <DialogPanel class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 text-slate-100">
        <DialogTitle class="text-lg font-bold text-white flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          Adjust Stock: {{ productName }}
        </DialogTitle>

        <form @submit="submit" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="stock-delta" class="text-xs font-semibold text-slate-300">Quantity change (positive or negative)</label>
            <Field
              id="stock-delta"
              name="delta"
              type="number"
              placeholder="e.g. +10 or -5"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
            />
            <ErrorMessage name="delta" class="text-xs text-red-400 font-medium" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="stock-reason" class="text-xs font-semibold text-slate-300">Reason for adjustment</label>
            <Field
              id="stock-reason"
              name="reason"
              as="textarea"
              rows="3"
              placeholder="e.g. Dark store shipment received / Damaged goods"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            />
            <ErrorMessage name="reason" class="text-xs text-red-400 font-medium" />
          </div>

          <p v-if="serverError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">{{ serverError }}</p>

          <div class="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <AppButton variant="quiet" :disabled="isSubmitting" @click="$emit('close')">Cancel</AppButton>
            <AppButton type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Applying...' : 'Apply adjustment' }}</AppButton>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
