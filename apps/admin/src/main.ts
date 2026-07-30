import "./assets/main.css";

import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { VueFire } from "vuefire";
import App from "./App.vue";
import { AUTH_EXPIRED_EVENT } from "./api/client";
import { firebaseApp } from "./firebase";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();
const queryClient = new QueryClient();

app.use(pinia);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.use(VueFire, {
  firebaseApp: firebaseApp,
});

window.addEventListener(AUTH_EXPIRED_EVENT, () => {
  useAuthStore(pinia).setSession(null);
  queryClient.clear();
  const currentPath = router.currentRoute.value.path;
  if (currentPath !== "/login" && currentPath !== "/setup") {
    void router.replace({ path: "/login", query: { redirect: currentPath } });
  }
});

app.mount("#app");
