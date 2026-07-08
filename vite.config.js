import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,

    allowedHosts: [
      "vervalpd.developerin.my.id",
      ".trycloudflare.com",
    ],

    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["**/node_modules/**", "**/dist/**"],
    },

    hmr: false,
  },
});