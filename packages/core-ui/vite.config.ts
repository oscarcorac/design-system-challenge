import path from 'path';
import vue from '@vitejs/plugin-vue';
import builtinModules from 'builtin-modules';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import localPkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...new Set([
          ...Object.keys(localPkg.peerDependencies),
          ...builtinModules,
        ]),
      ],

      input: {
        main: path.resolve(__dirname, 'src/index.ts'),
      },
      output: {
        format: 'es',
        dir: 'dist',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        exports: 'named',
      },
      preserveEntrySignatures: 'strict',
    },
  },
  css: {
    postcss: path.resolve(__dirname, '../../postcss.config.js'),
  },
});
