<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import type { AdminOrderStatus } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { transitionOrder } from "./mutations";
import { statusLabel } from "./status";
import { transitionSchema } from "./validation";

const props = defineProps<{ open: boolean; orderId: string; statuses: AdminOrderStatus[] }>();
const emit = defineEmits<{ close: []; saved: [] }>();
const { handleSubmit, resetForm } = useForm({ validationSchema: transitionSchema, initialValues: { reason: "" } });
const busy = ref(false);
const serverError = ref("");

function change(status: AdminOrderStatus) {
  return handleSubmit(async ({ reason }) => {
    busy.value = true;
    serverError.value = "";
    try {
      await transitionOrder(props.orderId, status, reason);
      resetForm();
      emit("saved");
      emit("close");
    } catch (error) {
      serverError.value = error instanceof Error ? error.message : "Could not update order";
    } finally {
      busy.value = false;
    }
  })();
}
</script>

<template>
  <Dialog :open="open" class="relative z-50" @close="$emit('close')">
    <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" aria-hidden="true" />

    <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <DialogPanel class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 text-slate-100">
        <DialogTitle class="text-lg font-bold text-white flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          Update Order Status
        </DialogTitle>

        <form @submit.prevent class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="transition-reason" class="text-xs font-semibold text-slate-300">Reason / Notes (optional)</label>
            <Field
              id="transition-reason"
              name="reason"
              as="textarea"
              rows="3"
              placeholder="e.g. Order verified and dispatched to rider"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            />
            <ErrorMessage name="reason" class="text-xs text-red-400 font-medium" />
          </div>

          <div class="flex flex-col gap-2 pt-2">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Transition To:</span>
            <div class="grid grid-cols-1 gap-2">
              <AppButton
                v-for="status in statuses"
                :key="status"
                :disabled="busy"
                @click="change(status)"
              >
                {{ statusLabel(status) }}
              </AppButton>
            </div>
          </div>

          <p v-if="serverError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">{{ serverError }}</p>

          <div class="flex justify-end pt-3 border-t border-slate-800">
            <AppButton variant="quiet" :disabled="busy" @click="$emit('close')">Cancel</AppButton>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
