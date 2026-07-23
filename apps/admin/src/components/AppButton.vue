<script setup lang="ts">
withDefaults(
  defineProps<{ type?: "button" | "submit"; variant?: "primary" | "quiet" | "danger"; disabled?: boolean }>(),
  { type: "button", variant: "primary", disabled: false },
);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl text-xs transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-600/25 px-4 py-2.5' :
      variant === 'danger' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 px-4 py-2.5' :
      'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2.5'
    ]"
  >
    <slot />
  </button>
</template>
