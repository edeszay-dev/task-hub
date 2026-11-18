import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    tailwindcss(), // 1. 必须保留：激活 Tailwind v4 样式引擎
    viteCompression({ // 2. 第10步：Gzip 压缩配置
      threshold: 10240, // 超过 10kb 的文件才压缩
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 3. 第10步：分包策略（兼容 Vite 8 的函数写法，效果与文档一致）
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia')) {
              return 'vue-vendor'
            }
          }
        }
      }
    }
  }
})