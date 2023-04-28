import { BasicManipulator } from '../karabiner/karabiner-config'
import { FromModifierParam, parseFromModifierParams } from '../config/modifier'
import {
  BasicManipulatorBuilder,
  buildManipulators,
  ManipulatorBuilder,
} from '../config/manipulator'

/**
 * A high-order function to add modifiers to a group of manipulators
 *
 * @example
 *   withModifier('⌘⌥')([
 *     map(1).to(2), // ⌘⌥1 => 2
 *     map(3).to(4)  // ⌘⌥3 => 4
 *   ])
 */
export function withModifier(
  mandatoryModifiers: FromModifierParam,
  optionalModifiers?: FromModifierParam,
): (
  manipulators: Array<BasicManipulator | BasicManipulatorBuilder>,
) => ManipulatorBuilder {
  return (manipulators) => {
    const sharedModifiers = parseFromModifierParams(
      mandatoryModifiers,
      optionalModifiers,
    )!
    function addSharedModifiers(src: BasicManipulator): BasicManipulator {
      const modifiers = (
        Object.keys(sharedModifiers) as Array<keyof typeof sharedModifiers>
      ).reduce(
        (r, key) => {
          if (!sharedModifiers[key]?.length) return r
          Object.assign(r, {
            [key]: Array.from(
              new Set([...(r[key] || []), ...sharedModifiers[key]!]),
            ),
          })
          return r
        },
        { ...src.from.modifiers },
      )
      return { ...src, from: { ...src.from, modifiers } }
    }

    return {
      build: () =>
        manipulators
          .map(buildManipulators)
          .reduce((r, v) => r.concat(v), [])
          .map((v) => addSharedModifiers(v as BasicManipulator)),
    }
  }
}
