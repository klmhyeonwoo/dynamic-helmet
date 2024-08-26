import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import { htmlPrerender } from "vite-plugin-html-prerender";
import vitePrerender from 'vite-plugin-prerender-k'

export default defineConfig({
  plugins: [svgr(), vitePrerender({
    // Required - The path to the vite-outputted app to prerender.
    staticDir: path.join(__dirname, 'dist'),
    // Required - Routes to render.
    routes: ['/', '/about', '/some/deep/nested/route'],
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
