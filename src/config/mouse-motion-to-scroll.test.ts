import { expect, test } from 'vitest'
import { mouseMotionToScroll } from './mouse-motion-to-scroll'
import { ifVar } from './condition'

test('mouseMotionToScroll()', () => {
  expect(
    mouseMotionToScroll()
      .modifiers('⌘⌥', '⌃')
      .condition(ifVar('a'))
      .options({ speed_multiplier: 2 })
      .build()[0],
  ).toEqual({
    type: 'mouse_motion_to_scroll',
    from: {
      modifiers: {
        mandatory: ['command', 'option'],
        optional: ['control'],
      },
    },
    conditions: [{ type: 'variable_if', name: 'a', value: 1 }],
    options: {
      speed_multiplier: 2,
    },
  })
})
