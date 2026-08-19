import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// `base` is '/' rather than the './' used on mreneedesigns: nick.codes is an
// apex-domain user site, and absolute asset paths let GitHub Pages serve the
// SPA fallback (dist/404.html, written by tools/post-build.mjs) directly at a
// deep URL like /posts/left-turn-to-go without a client-side redirect hop.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
