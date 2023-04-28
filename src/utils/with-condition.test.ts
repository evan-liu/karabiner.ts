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
  ])
  expect(manipulators.map((v) => (v as BasicManipulator).conditions)).toEqual([
    [ifA],
    [ifB, ifA],
  ])
  expect(manipulators.build().length).toBe(2)
})
