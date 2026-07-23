import "./assets/main.css";

import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import { AUTH_EXPIRED_EVENT } from "./api/client";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();
const queryClient = new QueryClient();

app.use(pinia);
app.use(VueQueryPlugin, { queryClient });
app.use(router);

window.addEventListener(AUTH_EXPIRED_EVENT, () => {
  useAuthStore(pinia).setSession(null);
  queryClient.clear();
  void router.replace("/login");
});

app.mount("#app");
