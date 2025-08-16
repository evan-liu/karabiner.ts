import { BasicManipulator, Manipulator } from '../karabiner/karabiner-config.ts'

let suffix = '__support__manipulator'

/** Manipulators only to support normal manipulators. */
export function supportManipulator(manipulator: BasicManipulator) {
  manipulator.description = (manipulator.description || '') + suffix
  return manipulator
}

export function isSupportManipulator(manipulator: Manipulator) {
  return (manipulator as BasicManipulator).description?.endsWith(suffix)
}
