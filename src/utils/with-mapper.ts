import { FromKeyParam } from '../config/from'
import { buildManipulators, ManipulatorBuilder } from '../config/manipulator'
import { Manipulator } from '../karabiner/karabiner-config'
import { FromKeyCode } from '../karabiner/key-code'
import { getKeyWithAlias } from './key-alias'

/**
 *  A high-order function to map an array of keys.
 *
 *  @example
 *    withMapper([1, 2, 3])(
 *      (key) => map(key).to(key, '⌘⌥')
 *    )
 */
export function withMapper(
  src: FromKeyParam[],
): (
  mapper: (key: FromKeyCode) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder

/**
 *  A high-order function to map a group of key-value pairs.
 *
 *  @example
 *    withMapper({1: 'a', 2: '⌥b})(
 *      (k, v) => map(k).to(v)
 *    )
 */
export function withMapper<T = string>(
  src: Partial<Record<FromKeyParam, T>>,
): (
  mapper: (key: FromKeyCode, value: any) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder

export function withMapper(
  src: FromKeyParam[] | Partial<Record<FromKeyParam, any>>,
): (
  mapper: (key: FromKeyCode, value?: any) => Manipulator | ManipulatorBuilder,
) => ManipulatorBuilder {
  return (mapper) => ({
    build: () => {
      const entries = (
        Array.isArray(src) ? src.map((v) => [v]) : Object.entries(src)
      ) as Array<[FromKeyParam, any]>
      return entries.reduce(
        (r, [k, v]) => [
          ...r,
          ...buildManipulators(mapper(getKeyWithAlias(k) as FromKeyCode, v)),
        ],
        [] as Manipulator[],
      )
    },
  })
}
