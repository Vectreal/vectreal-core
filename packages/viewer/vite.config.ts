/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

// Import PostCSS plugins.
import autoprefixer from 'autoprefixer';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/@vctrl/viewer',

  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  resolve: {
    alias: {
      '@vctrl/shared': path.resolve(__dirname, '../../shared/src'),
      '@vctrl/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
    },
  },

  css: {
    postcss: {
      plugins: [autoprefixer, postcssNested, postcssMixins],
    },
  },
  build: {
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    lib: {
      entry: 'src/index.ts',
      name: '@vctrl/viewer',
      fileName: 'index',
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into the library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        '@vctrl/hooks',
        'react-loader-spinner',
        '@gltf-transform/core',
        '@gltf-transform/extensions',
        '@gltf-transform/functions',
        'meshoptimizer',
      ],
    },
  },
});
