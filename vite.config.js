import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "images/apple-touch-icon-180x180.png",
        "images/apple-touch-icon-152x152.png",
        "images/apple-touch-icon-120x120.png",
        "images/apple-touch-icon-76x76.png",
      ],
      manifest: {
        name: "Al-jeed Transport Dashboard",
        short_name: "Al-jeed",
        description:
          "Dashboard for Aljeed Transport management and operations.",
        icons: [
          {
            src: "/images/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#DD7E1F",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
