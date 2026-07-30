import { createRouter, createWebHistory } from "vue-router";
import AdminShell from "@/components/AdminShell.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/setup", component: () => import("@/pages/SetupPage.vue"), meta: { public: true } },
    { path: "/login", component: () => import("@/pages/LoginPage.vue"), meta: { public: true } },
    {
      path: "/",
      component: AdminShell,
      children: [
        { path: "", redirect: "/dashboard" },
        { path: "dashboard", component: () => import("@/pages/DashboardPage.vue") },
        { path: "catalog/products", component: () => import("@/pages/ProductsPage.vue") },
        { path: "catalog/products/new", component: () => import("@/pages/ProductEditorPage.vue") },
        {
          path: "catalog/products/:id/edit",
          component: () => import("@/pages/ProductEditorPage.vue"),
        },
        { path: "catalog/categories", component: () => import("@/pages/CategoriesPage.vue") },
        { path: "inventory", component: () => import("@/pages/InventoryPage.vue") },
        { path: "orders", component: () => import("@/pages/OrdersPage.vue") },
        { path: "orders/:id", component: () => import("@/pages/OrderDetailPage.vue") },
        { path: "stores", component: () => import("@/pages/StoresPage.vue") },
        { path: "stores/new", component: () => import("@/pages/StoreEditorPage.vue") },
        { path: "stores/:id/edit", component: () => import("@/pages/StoreEditorPage.vue") },
        { path: "customers", component: () => import("@/pages/CustomersPage.vue") },
        { path: "customers/:id/edit", component: () => import("@/pages/CustomerEditorPage.vue") },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.restore();

  if (auth.admin) {
    if (to.path === "/login" || to.path === "/setup") return "/dashboard";
    return;
  }

  if (to.meta.public) {
    return;
  }

  return { path: "/login", query: { redirect: to.fullPath } };
});

export default router;
