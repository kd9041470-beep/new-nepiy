// vite.config.ts (gh-pages)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/new-nepiy/',         // مهم جداً: اسم المستودع مع الشرطتين
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',            // نخرج البناء إلى dist (مناسب للgh-pages)
    sourcemap: false,
  },
})
