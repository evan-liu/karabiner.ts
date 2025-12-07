import { Rule, SimpleManipulator } from '../karabiner/karabiner-config.ts'

import { buildManipulators } from './manipulator.ts'

/**
 * Returns the given manipulators as simple manipulators, for a profile's `simple_modifications`.
 *
 * Throws if any of the manipulators isn't "simple" (i.e. "basic" type with only `to` & `from`).
 */
export function simpleModifications(
  manipulatorSources: Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
): SimpleManipulator[] {
  const manipulators = manipulatorSources.reduce(
    (r, v) => [...r, ...buildManipulators(v)],
    [] as Manipulator[],
  )

  // Verify and pare the manipulators down to "simple" fields, to & from.
  const simpleManipulators = manipulators.map((m) => {
    const { to, from, type, ...rest } = m

    if (type !== 'basic') {
      throw new Error(`simple_modifications manipulator type isn't "basic"`)
    }
    if (!to || !from) {
      throw new Error(`simple_modifications manipulator missing to/from`)
    }
    if (Object.keys(rest).length) {
      throw new Error(`simple_modifications manipulator isn't simple`)
    }

    return { to, from } as SimpleManipulator
  })

  return simpleManipulators
}
