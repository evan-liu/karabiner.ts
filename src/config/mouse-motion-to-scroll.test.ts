import { expect, test } from 'vitest'

import { ifVar } from './condition'
import { mouseMotionToScroll } from './mouse-motion-to-scroll'

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

  expect(
    mouseMotionToScroll().modifiers('›⌘⌥', '⌃').build()[0].from?.modifiers,
  ).toEqual({
    mandatory: ['right_command', 'right_option'],
    optional: ['control'],
  })

  expect(
    mouseMotionToScroll().modifiers('?›⌥').build()[0].from?.modifiers,
  ).toEqual({
    optional: ['right_option'],
  })
})
