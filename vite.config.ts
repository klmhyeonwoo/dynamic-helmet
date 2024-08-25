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
          launchOptions: {
            headless: true,
            args: chrome.args, // Vercel에서 필요한 args 설정
            executablePath: chrome.executablePath || puppeteer.executablePath(), // 동기적으로 처리
          },
          ignoreHTTPSErrors: true,
        },
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      })
    ] : []), // 로컬에서는 프리렌더링 비활성화
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
