import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/elo-ranker/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
  ],
})
