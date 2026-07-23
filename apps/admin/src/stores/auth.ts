import { defineStore } from "pinia";
import { ref } from "vue";
import type { AdminSessionQuery } from "@/api/generated/graphql";
import { fetchSession } from "@/features/auth/queries";

type Session = NonNullable<AdminSessionQuery["adminSession"]>;

export const useAuthStore = defineStore("auth", () => {
  const admin = ref<Session | null>(null);
  const checked = ref(false);

  async function restore() {
    if (checked.value) return admin.value;
    try {
      admin.value = (await fetchSession()).adminSession ?? null;
    } catch {
      admin.value = null;
    } finally {
      checked.value = true;
    }
    return admin.value;
  }

  function setSession(session: Session | null) {
    admin.value = session;
    checked.value = true;
  }

  return { admin, checked, restore, setSession };
});
