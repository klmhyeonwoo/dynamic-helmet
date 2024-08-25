import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(),prerender({
    routes: ["/", "/test"],
    renderer: "@prerenderer/renderer-puppeteer",
    server: {
      port: 3000,
      host: "localhost",
    },
    rendererOptions: {
      maxConcurrentRoutes: 1,
      renderAfterTime: 500,
    },
    postProcess(renderedRoute) {
      renderedRoute.html = renderedRoute.html
          .replace(/http:/i, "https:")
          .replace(
              /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
              "https://dynamic-helmet.vercel.app/"
          );
    },
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
