/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/official-website',

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      "@vctrl/hooks": path.resolve(__dirname, "../../packages/hooks"),
      "@vctrl/viewer": path.resolve(__dirname, "../../packages/viewer"),
    },
  },

  build: {
    chunkSizeWarningLimit: 700, // three lib is always around 680kb
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'three-loaders': [
            'three/examples/jsm/loaders/GLTFLoader',
            'three/examples/jsm/loaders/DRACOLoader',
            'three/examples/jsm/loaders/KTX2Loader',
            'three/examples/jsm/loaders/USDZLoader',
          ],
          'gltf-transform': [
            '@gltf-transform/extensions',
            '@gltf-transform/functions',
            '@gltf-transform/core',
          ],
          'react-three-fiber': ['@react-three/fiber'],
          'react-three-drei': ['@react-three/drei'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-icons',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-progress',
            '@radix-ui/react-slot',
            'sonner',
            'tailwind-merge',
          ],
        },
      },
    },

    outDir: '../../dist/apps/official-website',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
