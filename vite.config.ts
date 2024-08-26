import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import { htmlPrerender } from "vite-plugin-html-prerender";

export default defineConfig({
  plugins: [svgr(), htmlPrerender({
    staticDir: path.join(__dirname, "dist"),
    routes: ["/", "/test"],
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
