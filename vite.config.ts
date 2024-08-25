import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import chrome from 'chrome-aws-lambda'; // chrome-aws-lambda 가져오기
import puppeteer from 'puppeteer-core'; // puppeteer-core 사용

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
            args: chrome.args, // chrome-aws-lambda의 args 사용
            executablePath: async () => {
              const executablePath = await chrome.executablePath;
              if (!executablePath) {
                return puppeteer.executablePath(); // Puppeteer의 기본 경로 사용
              }
              return executablePath;
            },
          },
          ignoreHTTPSErrors: true,
        },
        maxConcurrentRoutes: 1 as any, // 타입 오류 무시
        renderAfterTime: 500 as any, // 타입 오류 무시
      } as any)
    ] : []), // 로컬에서는 프리렌더링 비활성화
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
