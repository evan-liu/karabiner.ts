import { resolve } from 'node:path'
import { defineConfig } from 'vite'

let monaco = 'node_modules/monaco-editor/esm/vs/'

export default defineConfig({
  build: {
    outDir: 'static/workers',
    rollupOptions: {
      input: {
        karabiner: resolve(__dirname, 'src/editor/karabiner.worker.ts'),
        editor: resolve(__dirname, monaco, 'editor/editor.worker.js'),
        ts: resolve(__dirname, monaco, 'language/typescript/ts.worker.js'),
        json: resolve(__dirname, monaco, 'language/json/json.worker.js'),
      },
      output: {
        entryFileNames: '[name].worker.js',
      },
    },
    chunkSizeWarningLimit: 10_000,
  },
})
