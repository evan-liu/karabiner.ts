import { expect, test } from 'vitest'

import { toOnlyKeyCodes } from '../karabiner/key-code'

import { mapSimultaneous } from './simultaneous'

test('mapSimultaneous()', () => {
  let { from, parameters } = mapSimultaneous(
    ['a', '←', 2, { any: 'pointing_button' }],
    { key_up_order: 'strict' },
    123,
  ).build()[0]
  expect(from).toEqual({
    simultaneous: [
      { key_code: 'a' },
      { key_code: 'left_arrow' },
      { key_code: '2' },
      { any: 'pointing_button' },
    ],
    simultaneous_options: { key_up_order: 'strict' },
  })

  expect(parameters).toEqual({
    'basic.simultaneous_threshold_milliseconds': 123,
  })

  expect(mapSimultaneous([1, 2]).build()[0].parameters).toBeUndefined()

  expect(
    mapSimultaneous([1, 2]).modifiers(null).build()[0].from.modifiers,
  ).toBeUndefined()
  expect(
    mapSimultaneous([1, 2]).modifiers('⌘').build()[0].from.modifiers,
  ).toEqual({ mandatory: ['command'] })

  expect(() => mapSimultaneous([''] as any)).toThrow('key_code')
  expect(() => mapSimultaneous([toOnlyKeyCodes[0]] as any)).toThrow(
    'simultaneous',
  )
})
