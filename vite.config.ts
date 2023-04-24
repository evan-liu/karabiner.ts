/// <reference types="vitest" />

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'karabiner-config.',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['node:os', 'node:path', 'node:fs/promises'],
      output: {
        globals: {
          'node:os': 'os',
          'node:path': 'path',
          'node:fs/promises': 'fs',
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['lcov'],
    },
  },
})
