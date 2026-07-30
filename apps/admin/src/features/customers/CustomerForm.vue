<script setup lang="ts">
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import type { AdminCustomerQuery } from "@/api/generated/graphql";
import AppButton from "@/components/AppButton.vue";
import { updateCustomer } from "./mutations";
import { type CustomerFormValues, customerSchema } from "./validation";

type Customer = NonNullable<AdminCustomerQuery["adminCustomer"]>;
const props = defineProps<{ customer: Customer }>();
const emit = defineEmits<{ saved: [id: string]; cancel: [] }>();
const busy = ref(false);
const serverError = ref("");
const successMessage = ref("");

const { handleSubmit } = useForm({
  validationSchema: customerSchema,
  initialValues: {
    name: props.customer.name,
    phone: props.customer.phone,
    email: props.customer.email ?? "",
  },
});

const submit = handleSubmit(async (values) => {
  busy.value = true;
  serverError.value = "";
  successMessage.value = "";
  const input: CustomerFormValues = {
    name: values.name,
    phone: values.phone,
    email: values.email || null,
  };
  try {
    const result = await updateCustomer(props.customer.id, input);
    successMessage.value = "Customer updated successfully";
    emit("saved", result.updateAdminCustomer.id);
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Could not save customer";
  } finally {
    busy.value = false;
  }
});
</script>

<template>
  <form class="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-6" @submit="submit">
    <div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
      <div>
        <h2 class="text-base font-bold text-white flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          Edit Customer Account
        </h2>
        <p class="text-xs text-slate-400 mt-0.5 font-mono">ID: {{ customer.id }}</p>
      </div>
      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 capitalize">
        {{ customer.role }}
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Full Name -->
      <div class="md:col-span-2 flex flex-col gap-1.5">
        <label for="customer-name" class="text-xs font-semibold text-slate-300">Full Name</label>
        <Field
          id="customer-name"
          name="name"
          placeholder="Customer Full Name"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="name" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Phone Number -->
      <div class="flex flex-col gap-1.5">
        <label for="customer-phone" class="text-xs font-semibold text-slate-300">Phone Number</label>
        <Field
          id="customer-phone"
          name="phone"
          type="tel"
          placeholder="e.g. 9876543210"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
        />
        <ErrorMessage name="phone" class="text-xs text-red-400 font-medium" />
      </div>

      <!-- Email Address -->
      <div class="flex flex-col gap-1.5">
        <label for="customer-email" class="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
        <Field
          id="customer-email"
          name="email"
          type="email"
          placeholder="customer@example.com"
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <ErrorMessage name="email" class="text-xs text-red-400 font-medium" />
      </div>
    </div>

    <!-- Feedback messages -->
    <p v-if="serverError" class="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
      {{ serverError }}
    </p>

    <p v-if="successMessage" class="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
      {{ successMessage }}
    </p>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
      <AppButton type="button" variant="quiet" :disabled="busy" @click="$emit('cancel')">Cancel</AppButton>
      <AppButton type="submit" :disabled="busy">{{ busy ? "Saving..." : "Save customer" }}</AppButton>
    </div>
  </form>
</template>
