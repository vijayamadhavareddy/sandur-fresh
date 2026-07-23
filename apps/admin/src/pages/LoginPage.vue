<script setup lang="ts">
import {ErrorMessage, Field, useForm} from "vee-validate";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {login} from "@/features/auth/mutations";
import {loginSchema} from "@/features/auth/validation";
import {useAuthStore} from "@/stores/auth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const error = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const {handleSubmit, isSubmitting} = useForm({validationSchema: loginSchema});
const submit = handleSubmit(async ({email, password}) => {
  error.value = "";
  try {
    const result = await login(email, password);
    auth.setSession(result.adminLogin);
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "";
    await router.replace(redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/dashboard");
  } catch {
    error.value = "Email or password is incorrect.";
  }
});
const togglePassword = () => {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
    <!-- LEFT HALF: BRANDING PANEL (Quick Commerce & Hyperlocal) -->
    <div class="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-emerald-950 border-r border-emerald-900/40">
      <!-- Background Image & Gradient Overlay -->
      <div
          class="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-10000 ease-out"
          style="background-image: url('/images/sandur_quick_commerce.jpg');"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-slate-950/95"></div>

      <!-- Glowing Ambient Background Glows -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Branding Content -->
      <div class="relative z-10 flex flex-col h-full justify-between">
        <!-- Brand Logo -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-white">Sandur Fresh</h1>
            <p class="text-xs font-semibold tracking-widest text-emerald-400 uppercase">Quick Commerce Platform</p>
          </div>
        </div>

        <!-- Headline & Narrative -->
        <div class="my-auto py-8">
          <!-- Category Badges Pill Container -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <span>🛒</span> Groceries & Produce
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <span>🍔</span> Food & Meals
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <span>💊</span> Pharmacy & Care
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
              <span>📦</span> Daily Essentials
            </span>
          </div>

          <h2 class="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everything You Need.<br />
            <span class="bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">Delivered in Minutes.</span>
          </h2>
          <p class="mt-4 text-base text-slate-300 max-w-md leading-relaxed">
            Unified admin control tower for ultra-fast hyperlocal logistics, instant catalog dispatch, store dark hubs, and rider fleet operations.
          </p>

          <!-- Quick Stats Cards Grid -->
          <div class="grid grid-cols-2 gap-4 mt-8">
            <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-white">10-Min Flash</p>
                <p class="text-xs text-slate-400">Hyperlocal Dispatch</p>
              </div>
            </div>

            <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-white">Multi-Category</p>
                <p class="text-xs text-slate-400">Integrated Dark Stores</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer / Status Badge -->
        <div class="flex items-center justify-between pt-6 border-t border-white/10 text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hyperlocal Fleet & Dark Stores Online</span>
          </div>
          <span>v2.4.0 • Q-Commerce</span>
        </div>
      </div>
    </div>

    <!-- RIGHT HALF: SIMPLE LOGIN FORM (50% Width, Full Height) -->
    <div class="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto bg-slate-950">
      <!-- Container centered vertically and horizontally -->
      <div class="w-full max-w-md mx-auto my-auto flex flex-col gap-6">
        <!-- Header -->
        <div>
          <!-- Mobile Brand Logo (Visible on mobile/tablet only) -->
          <div class="flex lg:hidden items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold text-white">Sandur Fresh</span>
              <span class="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Quick Commerce</span>
            </div>
          </div>

          <h2 class="text-3xl font-extrabold tracking-tight text-white">Sign In</h2>
          <p class="mt-2 text-sm text-slate-400">Enter your account details to access the quick commerce admin portal.</p>
        </div>

        <!-- Alert Notifications -->
        <div v-if="error" class="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{{ error }}</span>
        </div>

        <!-- Simple Login Form -->
        <form @submit="submit" class="flex flex-col gap-5">
          <!-- Email Address -->
          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-semibold text-slate-300">Email Address</label>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-5 h-5 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@sandurfresh.com"
                  autocomplete="username"
                  class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
            <ErrorMessage name="email" class="text-xs text-red-400 font-medium mt-1" />
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-slate-300">Password</label>
              <a href="#forgot" @click.prevent="error = 'Password reset link has been dispatched to your email.'" class="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition">Forgot password?</a>
            </div>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-5 h-5 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <Field
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••"
                  autocomplete="current-password"
                  class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <button
                  type="button"
                  @click="togglePassword"
                  class="absolute right-3.5 text-slate-500 hover:text-slate-300 transition"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg v-if="!showPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.982-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-6.18-6.18a3 3 0 004.243 4.243M3 3l18 18"/>
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" class="text-xs text-red-400 font-medium mt-1" />
          </div>

          <!-- Remember Me -->
          <div class="flex items-center gap-2">
            <input
                id="remember"
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 accent-emerald-500 rounded border-slate-700 bg-slate-900 cursor-pointer"
            />
            <label for="remember" class="text-sm text-slate-300 cursor-pointer select-none">Remember me for 30 days</label>
          </div>

          <!-- Submit Button -->
          <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full mt-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            <span v-if="!isSubmitting">Sign In</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative flex items-center justify-center my-1">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-800"></div>
          </div>
          <span class="relative bg-slate-950 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Or continue with</span>
        </div>

        <!-- Social SSO Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
              type="button"
              class="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium py-2.5 px-4 rounded-xl text-sm transition"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </button>

          <button
              type="button"
              class="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium py-2.5 px-4 rounded-xl text-sm transition"
          >
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
            SAML SSO
          </button>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="mt-8 text-center text-xs text-slate-500">
        <p>© 2026 Sandur Fresh Quick Commerce Ltd.</p>
        <div class="flex justify-center gap-4 mt-2">
          <a href="#privacy" class="hover:text-slate-400 transition">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" class="hover:text-slate-400 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>
</template>
