import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Bundle analyzer - only included when ANALYZE=true
// Run: npm install -D rollup-plugin-visualizer
// Then: ANALYZE=true npm run build
// eslint-disable-next-line no-undef
const analyzeBundle = process.env.ANALYZE === 'true'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react()]
  
  // Conditionally add bundle analyzer
  if (analyzeBundle) {
    try {
      const { visualizer } = await import('rollup-plugin-visualizer')
      plugins.push(
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        })
      )
    } catch {
      console.warn('rollup-plugin-visualizer not installed. Run: npm install -D rollup-plugin-visualizer')
    }
  }
  
  return {
    plugins,
  server: {
    port: 5173,
    host: true, // Allow external connections
    open: false, // Don't auto-open browser
  },
  build: {
    // Explicitly enable minification for production builds only
    minify: 'esbuild',
    
    // Ensure static generation
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    // Optimize build output
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for smaller files
    reportCompressedSize: true, // Report compressed sizes
    chunkSizeWarningLimit: 1000, // Warn if chunk exceeds 1MB
  },
  
  // esbuild options - only applied during build, not dev
  esbuild: {
    legalComments: 'none', // Remove all comments including license comments
    minifyIdentifiers: true, // Minify variable and function names
    minifySyntax: true, // Minify syntax
    minifyWhitespace: true, // Remove whitespace
  },
  // Ensure proper base path for static deployment
  base: '/',
  }
})

