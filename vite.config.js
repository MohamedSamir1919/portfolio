import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSitemap } from 'sitemap-ts' // Added this import

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'generate-sitemap',
      closeBundle() {
        const pagesDir = path.resolve(__dirname, 'src/pages');
        
        // Check if directory exists to prevent errors
        if (!fs.existsSync(pagesDir)) return;

        const pageFiles = fs.readdirSync(pagesDir);
        const dynamicRoutes = pageFiles
          .filter(file => path.extname(file) === '.jsx')
          .map(file => {
            const route = '/' + path.basename(file, '.jsx');
            return route === '/home' ? '/' : route;
          });

        generateSitemap({
          hostname: 'https://mohamedsamir1919.github.io/portfolio',
          // Note: GitHub Pages usually expects files in 'dist', 
          // but I'll keep 'static' as per your build config.
          outDir: path.resolve(__dirname, 'static'), 
          readable: true,
          dynamicRoutes,
        });
      },
    },
  ],
  build: {
    outDir: './static', // Your output directory
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})