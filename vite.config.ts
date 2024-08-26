import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import { htmlPrerender } from "vite-plugin-html-prerender";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), htmlPrerender({
    /**
     * Required: Output directory of `vite build`.
     */
    staticDir: path.join(__dirname, "dist"),

    /**
     * Required: List of routes to pre-render.
     */
    routes: ["/", "/test"],

    /**
     * Optional: Query selector to wait for. Defaults to `#root`.
     */
    selector: "main",

    /**
     * Optional: To minify html. Uses https://github.com/kangax/html-minifier.
     */
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
