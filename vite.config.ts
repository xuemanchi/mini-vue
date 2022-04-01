import { defineConfig } from 'vite'
export default defineConfig({
  resolve: {
    alias: [
      { find: /@vue\/(.*)/, replacement: 'packages/$1' },
    ],
  },
})
