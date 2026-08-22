<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import CustomerForm from "@/features/customers/CustomerForm.vue";
import { fetchCustomer } from "@/features/customers/queries";

const route = useRoute();
const router = useRouter();
const id = computed(() => (typeof route.params.id === "string" ? route.params.id : ""));

const customerQuery = useQuery({
  queryKey: computed(() => ["customer", id.value]),
  queryFn: () => fetchCustomer(id.value),
  enabled: computed(() => Boolean(id.value)),
});
</script>

<template>
  <div class="relative w-full h-full min-h-[calc(100vh-4rem)] flex-1 bg-slate-950 font-sans text-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
    <!-- Ambient Background Glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-6 flex-1">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <PageHeader title="Edit Customer Details" eyebrow="" />
          <p class="text-sm text-slate-400 mt-1">Update personal info, phone number, and primary email address for customer accounts.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="customerQuery.isPending.value" class="p-12 text-center text-slate-400 animate-pulse">
        <p class="text-sm font-semibold">Loading customer profile...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="customerQuery.isError.value" class="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-xs">
        <p>Could not load customer information. Please refresh or try again.</p>
      </div>

      <!-- Customer Form -->
      <CustomerForm
        v-else-if="customerQuery.data.value?.adminCustomer"
        :key="id"
        :customer="customerQuery.data.value.adminCustomer"
        @saved="router.push('/customers')"
        @cancel="router.push('/customers')"
      />
    </div>
  </div>
</template>
