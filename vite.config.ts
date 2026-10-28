/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

const rootDir = import.meta.dirname;

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['stories'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
  build: {
    lib: {
      entry: path.resolve(rootDir, 'src/index.ts'),
      name: 'LibreriaComponentes',
      fileName: format => (format === 'es' ? 'index.mjs' : 'index.cjs'),
      formats: ['es', 'cjs'],
      cssFileName: 'index',
    },
    rollupOptions: {
      external: id => {
        if (id === 'react' || id === 'react-dom' || id === 'yup') return true;
        if (id.startsWith('@radix-ui/')) return true;
        if (id === 'cmdk') return true;
        if (id === 'date-fns' || id.startsWith('date-fns/')) return true;
        if (id === 'react-day-picker') return true;
        if (id.startsWith('embla-carousel')) return true;
        if (id === 'lucide-react') return true;
        if (id === 'clsx' || id === 'tailwind-merge' || id === 'class-variance-authority')
          return true;
        return false;
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          yup: 'yup',
          'class-variance-authority': 'classVarianceAuthority',
          clsx: 'clsx',
          'tailwind-merge': 'tailwindMerge',
          'lucide-react': 'lucideReact',
          cmdk: 'cmdk',
          'date-fns': 'dateFns',
          'react-day-picker': 'reactDayPicker',
          'embla-carousel-react': 'emblaCarouselReact',
          'embla-carousel-autoplay': 'emblaCarouselAutoplay',
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
});
