import { Manipulator, Modifier } from '../karabiner/karabiner-config'
import { FromModifierParam } from '../config/modifier'
import { buildManipulators, ManipulatorBuilder } from '../config/manipulator'
import { BuildContext } from './build-context'
import { parseFromModifierOverload } from './from-modifier-overload'
import { FromOptionalModifierParam } from './optional-modifiers'

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
): (manipulators: Array<Manipulator | ManipulatorBuilder>) => ManipulatorBuilder
/**
 * A high-order function to add optional modifiers to a group of manipulators
 *
 * @example
 *   withModifier('optionalAny')([
 *     map(1).to(2), // 1+{optional:['any']} => 2+{}
 *     map(3).to(4)  // 3+{optional:['any']} => 4+{}
 *   ])
 */
export function withModifier(
  modifiers: FromOptionalModifierParam,
): (manipulators: Array<Manipulator | ManipulatorBuilder>) => ManipulatorBuilder
export function withModifier(
  mandatoryModifiers: FromModifierParam | FromOptionalModifierParam,
  optionalModifiers?: FromModifierParam,
): (
  manipulators: Array<Manipulator | ManipulatorBuilder>,
) => ManipulatorBuilder {
  return (manipulators) => ({
    build: (context?: BuildContext) => {
      const sharedModifiers = parseFromModifierOverload(
        mandatoryModifiers,
        optionalModifiers,
      )!
      return manipulators
        .map((v) => buildManipulators(v, context))
        .reduce((result, manipulator) => result.concat(manipulator), [])
        .map((src) => {
          const modifiers = (
            Object.keys(sharedModifiers) as Array<keyof typeof sharedModifiers>
          ).reduce(
            (result, key) => {
              if (!sharedModifiers[key]?.length) return result
              const modifierSet = new Set([
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
