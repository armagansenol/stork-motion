import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import sass from "sass"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": "src",
      replacement: path.resolve(__dirname, "src"),
    },
  },
  build: {
    manifest: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        additionalData: `@import './src/assets/scss/_functions.scss';`,
      },
    },
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      exclude: /\.(gif)$/i, // add this line to exclude .gif files
    }),
    tsconfigPaths(),
  ],
})
