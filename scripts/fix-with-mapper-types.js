// The new `const Type Parameters` feature in TypeScript 5.0 (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)
// is not supported by the tool(s) generate the index.d.ts file

// FIXME Delete this script once the feature is supported in the tools

import { join, resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

const typeFile = join(resolve('./dist/index.d.ts'))
const types = await readFile(typeFile, 'utf-8')
await writeFile(
  typeFile,
  types.replace(
    /export declare function withMapper<[\s\S]*?withMapper</m,
    `export function withMapper<const T>(
  src: readonly T[],
): (
  mapper: (key: T, index: number) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder

/**
 *  A high-order function to map a group of key-value pairs.
 *
 *  @example
 *    withMapper({1: 'a', 2: '⌥b})(
 *      (k, v) => map(k).to(v)
 *    )
 */
export function withMapper<const K extends string | number, const V>(
  src: Partial<Record<K, V>>,
): (
  mapper: (key: K, value: V) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder`,
  ),
)
