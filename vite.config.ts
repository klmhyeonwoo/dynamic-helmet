import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    svgr(),
    ...(process.env.PRE_RENDER === "true" ? [
      prerender({
        routes: ["/", "/test"],
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          headless: true,
          renderAfterTime: 500,
        },
      }),
    ] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
