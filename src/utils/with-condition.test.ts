import { expect, test } from 'vitest'
import { withCondition } from './with-condition'
import { ifVar } from '../config/condition'
import { map } from '../config/from'
import { BasicManipulator } from '../karabiner/karabiner-config'

test('withCondition()', () => {
  const ifA = ifVar('a').build()
  const ifB = ifVar('b').build()
  const manipulators = withCondition(ifA)([
    map(1).to(2),
    map(3).to(4).condition(ifB),
    { type: 'mouse_motion_to_scroll' },
  ])

  expect(
    manipulators.build().map((v) => (v as BasicManipulator).conditions),
  ).toEqual([[ifA], [ifB, ifA], undefined])

  // FIXME Cleanup in 2.0 after remove the array return type
  expect(manipulators.length).toBe(3)
})
