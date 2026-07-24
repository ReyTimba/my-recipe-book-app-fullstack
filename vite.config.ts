import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

const BASE = process.env.GITHUB_PAGES ? "/my-recipe-book-app-fullstack/" : "/";
const PWA_SCOPE = BASE;
const PWA_START_URL = BASE;

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [`${BASE}icon-192.svg`, `${BASE}icon-512.svg`],
      scope: PWA_SCOPE,
      manifest: {
        name: "Mi recetario",
        short_name: "Recetario",
        description: "Tu recetario personal de cocina",
        theme_color: "#c94f2d",
        background_color: "#fef6ef",
        display: "standalone",
        start_url: PWA_START_URL,
        icons: [
          { src: `${BASE}icon-192.svg`, sizes: "192x192", type: "image/svg+xml" },
          { src: `${BASE}icon-512.svg`, sizes: "512x512", type: "image/svg+xml" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
        runtimeCaching: [
          {
            urlPattern: /^\/api\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 4173,
    strictPort: true,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
