import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/elo-ranker',
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
  ],
})
