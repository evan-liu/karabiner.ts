import { expect, test } from 'vitest'

import { ifVar } from '../config/condition'
import { map } from '../config/from'
import { rule } from '../config/rule'
import { toKey } from '../config/to'
import { BasicManipulator } from '../karabiner/karabiner-config'

import { withCondition } from './with-condition'

test('withCondition()', () => {
  let ifA = ifVar('a').build()
  let ifB = ifVar('b').build()
  let manipulators = withCondition(ifA)([
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

test('manipulators map', () => {
  expect(
    rule('')
      .manipulators([withCondition(ifVar('b'))({ a: toKey('b') })])
      .build(),
  ).toEqual({
    description: '',
    manipulators: [
      {
        type: 'basic',
        from: { key_code: 'a' },
        to: [{ key_code: 'b' }],
        conditions: [{ name: 'b', type: 'variable_if', value: 1 }],
      },
    ],
  })
})
