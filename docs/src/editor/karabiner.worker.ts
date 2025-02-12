import * as esbuild from 'esbuild-wasm'
import { format } from 'prettier'
import prettierBabelPlugin from 'prettier/plugins/babel'
import prettierEstreePlugin from 'prettier/plugins/estree'

import * as lib from '../../../dist/index'

Object.assign(self, lib)

let initEsbuild = esbuild.initialize({
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.25.0/esbuild.wasm',
})

self.onmessage = async (event) => {
  let input = event.data
  try {
    await initEsbuild
    let { code } = await esbuild.transform(
      input.replace(/import[\s\S]*'karabiner\.ts'/, ''),
      { loader: 'ts' },
    )
    let fn = new Function(`${code};\nreturn complexModifications(rules)`)
    let config = fn().rules.reduce(
      (r: any, v: any) => ({
        description: r.description
          ? `${r.description}; ${v.description}`
          : v.description,
        manipulators: r.manipulators.concat(v.manipulators),
      }),
      { description: '', manipulators: [] },
    )
    format(JSON.stringify(config), {
      parser: 'json',
      plugins: [prettierBabelPlugin, prettierEstreePlugin],
    }).then(
      (output) => self.postMessage({ input, output }),
      (error) => self.postMessage({ input, output: error?.message }),
    )
  } catch (e) {
    self.postMessage({
      input,
      output: (e as Error)?.message || 'Unknown Error',
    })
  }
}
