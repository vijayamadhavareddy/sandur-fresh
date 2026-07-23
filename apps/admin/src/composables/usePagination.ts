import { ref } from "vue";

export function usePagination(initialLimit = 20) {
  const page = ref(1);
  const limit = ref(initialLimit);
  const reset = () => {
    page.value = 1;
  };
  return { page, limit, reset };
}
