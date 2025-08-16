import {
  buildManipulators,
  ManipulatorBuilder,
  ManipulatorMap,
} from '../config/manipulator.ts'
import { FromModifierParam } from '../config/modifier.ts'
import { Manipulator, Modifier } from '../karabiner/karabiner-config.ts'

import { BuildContext } from './build-context.ts'
import { parseFromModifierOverload } from './from-modifier-overload.ts'
import { FromOptionalModifierParam } from './optional-modifiers.ts'

/**
 * A higher-order function to add modifiers to a group of manipulators
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
  manipulators:
    | ManipulatorMap
    | Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
) => ManipulatorBuilder
/**
 * A higher-order function to add optional modifiers to a group of manipulators
 *
 * @example
 *   withModifier('optionalAny')([
 *     map(1).to(2), // 1+{optional:['any']} => 2+{}
 *     map(3).to(4)  // 3+{optional:['any']} => 4+{}
 *   ])
 */
export function withModifier(
  modifiers: FromOptionalModifierParam,
): (
  manipulators:
    | ManipulatorMap
    | Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
) => ManipulatorBuilder
export function withModifier(
  mandatoryModifiers: FromModifierParam | FromOptionalModifierParam,
  optionalModifiers?: FromModifierParam,
): (
  manipulators:
    | ManipulatorMap
    | Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
) => ManipulatorBuilder {
  return (manipulators) => ({
    build: (context?: BuildContext) => {
      let sharedModifiers = parseFromModifierOverload(
        mandatoryModifiers,
        optionalModifiers,
      )!

      let src = Array.isArray(manipulators)
        ? manipulators
        : buildManipulators(manipulators)
      return src
        .map((v) => buildManipulators(v, context))
        .reduce((result, manipulator) => result.concat(manipulator), [])
        .map((src) => {
          let modifiers = (
            Object.keys(sharedModifiers) as Array<keyof typeof sharedModifiers>
          ).reduce(
            (result, key) => {
              if (!sharedModifiers[key]?.length) return result
              let modifierSet = new Set([
                ...(result[key] || []),
                ...sharedModifiers[key]!,
              ])
              result[key] = modifierSet.has('any')
                ? ['any']
                : (Array.from(modifierSet) as Modifier[])
              return result
            },
            { ...src.from?.modifiers },
          )
          src.from = { ...src.from, modifiers }
          return src
        })
    },
  })
}
