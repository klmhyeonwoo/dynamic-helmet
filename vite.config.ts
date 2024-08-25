import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    ...(process.env.VERCEL ? [
      prerender({
        routes: ["/", "/test"],
        renderer: "@prerenderer/renderer-puppeteer",
        server: {
          port: 3000,
          host: "localhost",
        },
        rendererOptions: {
          headless: true,
          args: chrome.args,
          executablePath: async () => {
            const executablePath = await chrome.executablePath;
            if (!executablePath) {
              return puppeteer.executablePath();
            }
            return executablePath;
          },
          ignoreHTTPSErrors: true,
        },
        // 명시적으로 타입 캐스팅
        maxConcurrentRoutes: 1 as number,
        renderAfterTime: 500 as number,
      } as any)
    ] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
