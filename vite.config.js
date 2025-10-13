import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // 匹配请求路径中包含 /api 的请求
      '/api': {
        target: 'http://c.xiaoqiang.xyz', // 后端接口的基础域名
        changeOrigin: true, // 开启跨域（将请求头中的 host 改为 target 的值）
        rewrite: (path) => path.replace(/^\/api/, '') // 移除请求路径中的 /api 前缀
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
