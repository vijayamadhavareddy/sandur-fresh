<script setup lang="ts">
import { ErrorMessage, Field, useForm } from "vee-validate";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { setup } from "@/features/auth/mutations";
import { setupSchema } from "@/features/auth/validation";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();
const error = ref("");
const showSecret = ref(false);
const showPassword = ref(false);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: setupSchema,
});

const submit = handleSubmit(async (values) => {
  error.value = "";
  try {
    const result = await setup({
      secret: values.secret,
      name: values.name,
      phone: values.phone,
      email: values.email,
      password: values.password,
    });
    auth.setSession(result.adminSetup);
    await router.replace("/dashboard");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to initialize admin account.";
    if (message.includes("Invalid setup secret")) {
      error.value = "The setup secret is incorrect. Verify against your ADMIN_SETUP_SECRET environment variable.";
    } else if (message.includes("already configured")) {
      error.value = "An administrator account is already configured. Please sign in.";
      setTimeout(() => router.replace("/login"), 2000);
    } else {
      error.value = message;
    }
  }
});
</script>

<template>
  <div class="flex min-h-screen w-screen overflow-y-auto bg-slate-950 font-sans text-slate-100">
    <!-- LEFT HALF: BRANDING PANEL -->
    <div class="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-emerald-950 border-r border-emerald-900/40 sticky top-0 h-screen">
      <!-- Background Image & Gradient Overlay -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105"
        style="background-image: url('/images/sandur_quick_commerce.jpg');"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-slate-950/95"></div>

      <!-- Ambient Glows -->
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
            <p class="text-xs font-semibold tracking-widest text-emerald-400 uppercase">First-Time Setup</p>
          </div>
        </div>

        <!-- Headline & Instructions -->
        <div class="my-auto py-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-6">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Fresh Database Instance Detected
          </div>

          <h2 class="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to Sandur Fresh.<br />
            <span class="bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">Set Up Master Admin</span>
          </h2>
          <p class="mt-4 text-sm text-slate-300 max-w-md leading-relaxed">
            No administrator has been provisioned yet. Enter the <code class="text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded text-xs font-mono">ADMIN_SETUP_SECRET</code> configured in your environment to create the initial master administrator.
          </p>

          <div class="mt-8 space-y-3 max-w-md">
            <div class="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-slate-300">
              <span class="text-emerald-400 font-bold">1.</span>
              <span>Provide your secret key matching the deployment configuration.</span>
            </div>
            <div class="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-slate-300">
              <span class="text-emerald-400 font-bold">2.</span>
              <span>Register master credentials for catalog, inventory, and dispatch operations.</span>
            </div>
            <div class="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-slate-300">
              <span class="text-emerald-400 font-bold">3.</span>
              <span>Add products, categories, dark stores, and rider slots directly inside the app.</span>
            </div>
          </div>
        </div>

        <!-- Footer / Status Badge -->
        <div class="flex items-center justify-between pt-6 border-t border-white/10 text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Security Layer Active</span>
          </div>
          <span>Cloudflare Serverless Ready</span>
        </div>
      </div>
    </div>

    <!-- RIGHT HALF: SETUP FORM -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 bg-slate-950">
      <div class="w-full max-w-md mx-auto my-8 flex flex-col gap-6">
        <!-- Header -->
        <div>
          <!-- Mobile Brand Logo -->
          <div class="flex lg:hidden items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold text-white">Sandur Fresh</span>
              <span class="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Initial Setup</span>
            </div>
          </div>

          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Create Admin Account</h2>
          <p class="mt-2 text-sm text-slate-400">Configure your primary administrator credentials.</p>
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

        <!-- Setup Form -->
        <form @submit="submit" class="flex flex-col gap-4">
          <!-- Setup Secret Key -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <label for="secret" class="text-sm font-semibold text-slate-300">Setup Secret Key</label>
              <span class="text-[11px] text-slate-500 font-mono">ADMIN_SETUP_SECRET</span>
            </div>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-5 h-5 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
              <Field
                id="secret"
                name="secret"
                :type="showSecret ? 'text' : 'password'"
                placeholder="Enter deployment setup secret"
                autocomplete="off"
                class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-11 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <button
                type="button"
                @click="showSecret = !showSecret"
                class="absolute right-3.5 text-slate-500 hover:text-slate-300 transition"
                :aria-label="showSecret ? 'Hide secret' : 'Show secret'"
              >
                <svg v-if="!showSecret" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.982-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-6.18-6.18a3 3 0 004.243 4.243M3 3l18 18"/>
                </svg>
              </button>
            </div>
            <ErrorMessage name="secret" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Name & Phone Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Full Name -->
            <div class="flex flex-col gap-1.5">
              <label for="name" class="text-sm font-semibold text-slate-300">Admin Name</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Operations Lead"
                autocomplete="name"
                class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <ErrorMessage name="name" class="text-xs text-red-400 font-medium" />
            </div>

            <!-- Phone Number -->
            <div class="flex flex-col gap-1.5">
              <label for="phone" class="text-sm font-semibold text-slate-300">Phone Number</label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="+919999999999"
                autocomplete="tel"
                class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <ErrorMessage name="phone" class="text-xs text-red-400 font-medium" />
            </div>
          </div>

          <!-- Admin Email -->
          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-semibold text-slate-300">Admin Email</label>
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
                class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
            <ErrorMessage name="email" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1.5">
            <label for="password" class="text-sm font-semibold text-slate-300">Password</label>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-5 h-5 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <Field
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimum 8 characters"
                autocomplete="new-password"
                class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-11 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 text-slate-500 hover:text-slate-300 transition"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg v-if="!showPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.982-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-6.18-6.18a3 3 0 004.243 4.243M3 3l18 18"/>
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Confirm Password -->
          <div class="flex flex-col gap-1.5">
            <label for="confirmPassword" class="text-sm font-semibold text-slate-300">Confirm Password</label>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-5 h-5 text-slate-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Re-enter password"
                autocomplete="new-password"
                class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
            <ErrorMessage name="confirmPassword" class="text-xs text-red-400 font-medium" />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full mt-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            <span v-if="!isSubmitting">Complete Setup & Launch</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Provisioning Admin...
            </span>
          </button>

          <div class="text-center text-xs text-slate-400 mt-2">
            Already configured?
            <RouterLink to="/login" class="font-semibold text-emerald-400 hover:text-emerald-300 transition underline underline-offset-2 ml-1">
              Sign In Instead
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
