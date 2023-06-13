import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
const apiRoutes = [
  "/api/v1/all",
  "/api/v1/predict",
  "^/api/v1/validate/*",
  "/api/v1/chat/*",
  "/api/v1/version",
  "^/api/v1/build/*",
  "/health",
];

// Use environment variable to determine the target.
const target = process.env.VITE_PROXY_TARGET || "http://127.0.0.1:7860";

const proxyTargets = apiRoutes.reduce((proxyObj, route) => {
  proxyObj[route] = {
    target: target,
    changeOrigin: true,
    secure: false,
    ws: true,
  };
  return proxyObj;
}, {});
export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), svgr()],
    server: {
      port: 3000,
      proxy: {
        ...proxyTargets,
      },
    },
  };
});
