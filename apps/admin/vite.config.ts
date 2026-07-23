import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Sandur Fresh Admin",
        short_name: "SF Admin",
        display: "standalone",
        theme_color: "#173f35",
        background_color: "#f4f1e8",
        icons: [
          { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "/icons/maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,ico,woff2}"],
        navigateFallbackDenylist: [/^\/api/, /^\/graphql/],
        runtimeCaching: [
          { urlPattern: /^.*\/(api|graphql)(\/|\?|$)/, handler: "NetworkOnly", method: "GET" },
          { urlPattern: /^.*\/(api|graphql)(\/|\?|$)/, handler: "NetworkOnly", method: "POST" },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
      "/graphql": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
