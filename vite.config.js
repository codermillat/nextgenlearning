import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'analytics': ['@vercel/analytics', '@vercel/speed-insights']
        }
      }
    },
    cssCodeSplit: true,
    minify: 'esbuild' // Use esbuild instead of terser (faster and no extra dependency)
  },
  server: {
    port: 5173
  }
})
