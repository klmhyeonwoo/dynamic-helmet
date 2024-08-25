import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import chrome from 'chrome-aws-lambda'; // chrome-aws-lambda 가져오기

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
          args: chrome.args, // chrome-aws-lambda의 args 사용
          executablePath: async () => {
            return await chrome.executablePath; // chrome-aws-lambda의 executablePath 사용
          },
          ignoreHTTPSErrors: true,
        },
      })
    ] : []), // 로컬에서는 프리렌더링 비활성화
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
