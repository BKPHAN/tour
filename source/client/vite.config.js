import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const clientRoot = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig({
  root: clientRoot,
  envDir: '..',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
