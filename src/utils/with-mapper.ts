import { buildManipulators, ManipulatorBuilder } from '../config/manipulator.ts'
import { Manipulator } from '../karabiner/karabiner-config.ts'

/**
 *  A higher-order function to map an array of keys.
 *
 *  @example
 *    withMapper([1, 2, 3])(
 *      (key) => map(key).to(key, '⌘⌥')
 *    )
 */
export function withMapper<const T>(
  src: readonly T[],
): (
  mapper: (key: T, index: number) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder

/**
 *  A higher-order function to map a group of key-value pairs.
 *
 *  @example
 *    withMapper({1: 'a', 2: 'b'})(
 *      (k, v) => map(k).to(v)
 *    )
 */
export function withMapper<const K extends string | number, const V>(
  src: Partial<Record<K, V>>,
): (
  mapper: (key: K, value: V) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder

export function withMapper(
  src: any[] | Partial<Record<any, any>>,
): (
  mapper: (key: any, value?: any) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder {
  return (mapper) => ({
    build: () => {
      let entries = Array.isArray(src)
        ? src.map((v, i) => [v, i])
        : Object.entries(src)
      return entries.reduce(
        (r, [k, v]) => [...r, ...buildManipulators(mapper(k, v))],
        [] as Manipulator[],
      )
    },
  })
}
