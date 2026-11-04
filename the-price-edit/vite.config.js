import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' keeps every asset path relative, so the built site works
// from any folder or host (Vercel, Netlify, GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
