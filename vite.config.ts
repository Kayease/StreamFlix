import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "/streamflix/",
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  server: {
    host: "::",
    port: 8080,
    open: "/streamflix/",
    strictPort: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
