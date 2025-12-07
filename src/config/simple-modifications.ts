import { Manipulator, SimpleManipulator } from '../karabiner/karabiner-config'

import {
  buildManipulators,
  ManipulatorBuilder,
  ManipulatorMap,
} from './manipulator'

/**
 * Returns the given manipulators as simple manipulators, for a profile's `simple_modifications`.
 *
 * Throws if any of the manipulators isn't "simple" (i.e. "basic" type with only `to` & `from`).
 */
export function simpleModifications(
  manipulatorSources: Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
): SimpleManipulator[] {
  let manipulators = manipulatorSources.reduce(
    (acc, manipulator) => [...acc, ...buildManipulators(manipulator)],
    [] as Manipulator[],
  )

  // Verify and pare the manipulators down to "simple" fields, to & from.
  let simpleManipulators = manipulators.map((manipulator) => {
    if (
      !(
        manipulator.type == 'basic' &&
        'from' in manipulator &&
        'to' in manipulator
      )
    ) {
      throw new Error(
        `simple_modifications manipulator isn't a BasicManipulator`,
      )
    }

    let { to, from, type, ...rest } = manipulator

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
