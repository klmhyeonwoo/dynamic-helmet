import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import vitePrerender from 'vite-plugin-prerender-k'

export default defineConfig({
  plugins: [svgr(), vitePrerender({
    // Required - The path to the vite-outputted app to prerender.
    staticDir: path.join(__dirname, 'dist'),
    // Required - Routes to render.
    routes: ['/', '/test'],
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
