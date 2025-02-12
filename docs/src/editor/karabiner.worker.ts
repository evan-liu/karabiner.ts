import * as esbuild from 'esbuild-wasm'

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
    self.postMessage({ input, output: JSON.stringify(config, null, 2) })
  } catch (e) {
    let error = (e as Error)?.message || 'Unknown Error'
    self.postMessage({ input, output: JSON.stringify({ error }, null, 2) })
  }
}
