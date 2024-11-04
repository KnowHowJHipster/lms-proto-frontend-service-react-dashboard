/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true, // parse css, able to use 'toBeVisible'
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'istanbul', // or v8
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: ['src/test/setup.ts', 'src/**/*.d.ts', 'src/main.tsx'],
    },
  },
});
