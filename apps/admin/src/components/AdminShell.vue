<script setup lang="ts">
import {useQueryClient} from "@tanstack/vue-query";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {logout} from "@/features/auth/mutations";
import {useAuthStore} from "@/stores/auth";

const nav = [
  {name: "Dashboard", to: "/dashboard", icon: "dashboard"},
  {name: "Products", to: "/catalog/products", icon: "products"},
  {name: "Categories", to: "/catalog/categories", icon: "categories"},
  {name: "Inventory", to: "/inventory", icon: "inventory"},
  {name: "Orders", to: "/orders", icon: "orders"},
  {name: "Stores", to: "/stores", icon: "stores"},
] as const;

const menuOpen = ref(false);
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

async function signOut() {
  try {
    await logout();
  } finally {
    auth.setSession(null);
    queryClient.clear();
    await router.push("/login");
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
    <!-- MOBILE OVERLAY BACKDROP -->
    <button
        type="button"
        v-if="menuOpen"
        @click="menuOpen = false"
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 md:hidden transition-opacity border-0 cursor-default"
        aria-label="Close menu overlay"
    ></button>

    <!-- SIDEBAR NAVIGATION -->
    <aside
        class="fixed md:sticky top-0 left-0 bottom-0 z-50 w-72 h-screen bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out md:translate-x-0"
        :class="menuOpen ? 'translate-x-0 shadow-2xl shadow-emerald-950/50' : '-translate-x-full'"
    >
      <div class="flex flex-col gap-6">
        <!-- BRAND LOGO -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div class="flex items-center gap-3">
            <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white flex-shrink-0">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                   aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <span class="text-base font-bold text-white tracking-tight block">Sandur Fresh</span>
              <span
                  class="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest block">Admin Portal</span>
            </div>
          </div>

          <!-- CLOSE BUTTON (MOBILE ONLY) -->
          <button
              type="button"
              @click="menuOpen = false"
              class="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close navigation menu"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- NAVIGATION LINKS -->
        <nav class="flex flex-col gap-1.5">
          <RouterLink
              v-for="item in nav"
              :key="item.to"
              :to="item.to"
              @click="menuOpen = false"
              active-class="!bg-emerald-500/15 !text-emerald-300 border-l-4 border-emerald-400 font-semibold shadow-inner shadow-emerald-500/10"
              class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition duration-200 group"
          >
            <!-- Dashboard Icon -->
            <svg v-if="item.icon === 'dashboard'"
                 class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>

            <!-- Products Icon -->
            <svg v-else-if="item.icon === 'products'"
                 class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>

            <!-- Categories Icon -->
            <svg v-else-if="item.icon === 'categories'"
                 class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>

            <!-- Inventory Icon -->
            <svg v-else-if="item.icon === 'inventory'"
                 class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>

            <!-- Orders Icon -->
            <svg v-else-if="item.icon === 'orders'"
                 class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>

            <!-- Stores Icon -->
            <svg v-else class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V12m0 0h-5m5 0h5"/>
            </svg>

            <span>{{ item.name }}</span>
          </RouterLink>
        </nav>
      </div>

      <!-- FOOTER USER PROFILE & SIGN OUT -->
      <div class="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
        <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
          <div
              class="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-sm">
            {{ auth.admin?.user.name ? auth.admin.user.name.charAt(0).toUpperCase() : 'A' }}
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-semibold text-white truncate">{{ auth.admin?.user.name ?? 'Admin User' }}</p>
            <p class="text-[10px] text-slate-400 truncate">{{ auth.admin?.user.email ?? 'admin@sandurfresh.com' }}</p>
          </div>
        </div>

        <button
            type="button"
            @click="signOut"
            class="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 text-xs font-semibold text-slate-300 hover:text-rose-400 transition-all duration-200 cursor-pointer"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </aside>

    <!-- MAIN WORKSPACE & TOPBAR -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- TOP NAVIGATION BAR -->
      <header
          class="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- MOBILE MENU HAMBURGER BUTTON -->
          <button
              type="button"
              @click="menuOpen = !menuOpen"
              class="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Toggle navigation menu"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- TOPBAR TITLE / BREADCRUMB BADGE -->
          <div class="flex items-center gap-2">
            <span
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">Sandur Fresh</span>
            <span class="text-xs text-slate-600 hidden sm:inline">/</span>
            <span class="text-xs font-semibold text-emerald-400 capitalize">
              {{ route.path.split('/').filter(Boolean).pop() || 'Dashboard' }}
            </span>
          </div>
        </div>

        <!-- TOPBAR RIGHT ITEMS -->
        <div class="flex items-center gap-4">
          <div
              class="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="hidden sm:inline">Operational</span>
          </div>

          <div class="flex items-center gap-2">
            <div
                class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center text-xs">
              {{ auth.admin?.user.name ? auth.admin.user.name.charAt(0).toUpperCase() : 'A' }}
            </div>
            <span class="text-xs font-medium text-slate-300 hidden md:inline">{{ auth.admin?.user.name }}</span>
          </div>
        </div>
      </header>

      <!-- MAIN PAGE CONTENT VIEW -->
      <main class="flex-1 flex flex-col min-h-0 bg-slate-950">
        <RouterView />
      </main>
    </div>
  </div>
</template>
