<script setup lang="ts">
defineProps<{ page: number; limit: number; total: number }>();
defineEmits<{ change: [page: number] }>();
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
    <span>Showing <strong class="text-white">{{ (page - 1) * limit + (total ? 1 : 0) }}</strong> to <strong class="text-white">{{ Math.min(page * limit, total) }}</strong> of <strong class="text-emerald-400">{{ total }}</strong> records</span>
    <div class="flex items-center gap-2">
      <button
        type="button"
        :disabled="page <= 1"
        @click="$emit('change', page - 1)"
        class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-900 transition cursor-pointer disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="px-2.5 py-1 font-semibold text-slate-200 bg-slate-950 border border-slate-800/80 rounded-md">
        {{ page }} / {{ Math.max(1, Math.ceil(total / limit)) }}
      </span>
      <button
        type="button"
        :disabled="page * limit >= total"
        @click="$emit('change', page + 1)"
        class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-900 transition cursor-pointer disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>
