import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'; // Add this line

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
     {      name: 'generate-sitemap',
            closeBundle() {        const pagesDir = path.resolve(__dirname, 'src/pages');
            const pageFiles = fs.readdirSync(pagesDir);
        const dynamicRoutes = pageFiles          .filter(file => path.extname(file) === '.jsx')
        .map(file => {            const route = '/' + path.basename(file, '.jsx');
        return route === '/home' ? '/' : route;          });
        generateSitemap({          hostname: 'https://MohamedSamir1919.github.io/portfolio',
        outDir: path.resolve(__dirname, 'static'),
        readable: true,          dynamicRoutes,        });
            }, 
             },  ],
             
             
          build: {    outDir: './static',    emptyOutDir: true,    sourcemap: true,  },
          resolve: {    alias: {      '@': path.resolve(__dirname, './src'),

              },  },
})
