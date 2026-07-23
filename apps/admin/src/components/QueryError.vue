<script setup lang="ts">
defineProps<{ message?: string }>();
</script>

<template>
  <div class="empty-state" role="alert">{{ message ?? "Could not load this data. Try again." }}</div>
</template>
