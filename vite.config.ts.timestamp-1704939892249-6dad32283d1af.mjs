// vite.config.ts
import svgr from "file:///Users/kovalev-vxx/Code/emu-rtc-service-frontend/node_modules/@svgr/rollup/dist/index.js";
import react from "file:///Users/kovalev-vxx/Code/emu-rtc-service-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/kovalev-vxx/Code/emu-rtc-service-frontend/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///Users/kovalev-vxx/Code/emu-rtc-service-frontend/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "/Users/kovalev-vxx/Code/emu-rtc-service-frontend";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true
    }),
    svgr({
      icon: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
  //     alias: [
  //         {
  //             find: "@",
  //             replacement: fileURLToPath(new URL("./src", import.meta.url)),
  //         },
  //     ],
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva292YWxldi12eHgvQ29kZS9lbXUtcnRjLXNlcnZpY2UtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rb3ZhbGV2LXZ4eC9Db2RlL2VtdS1ydGMtc2VydmljZS1mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva292YWxldi12eHgvQ29kZS9lbXUtcnRjLXNlcnZpY2UtZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc3ZnciBmcm9tIFwiQHN2Z3Ivcm9sbHVwXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgICAgICAgIHByb3RvY29sSW1wb3J0czogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHN2Z3Ioe1xuICAgICAgICAgICAgaWNvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIC8vICAgICBhbGlhczogW1xuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGZpbmQ6IFwiQFwiLFxuICAgIC8vICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVSxPQUFPLFVBQVU7QUFDblYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLHFCQUFxQjtBQUo5QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxJQUNyQixDQUFDO0FBQUEsSUFDRCxLQUFLO0FBQUEsTUFDRCxNQUFNO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
