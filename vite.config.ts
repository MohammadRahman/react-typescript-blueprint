import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createRequire } from 'node:module';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);
const cMapsDir = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  viteStaticCopy({
    targets: [
      {
        src: cMapsDir,
        dest: ''
      }
    ]
  })],
  resolve: {
    alias: {
      '@apis': path.resolve(__dirname, './src/apis'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
    }
  }
})
