import { expect, test } from 'vitest'
import { map, mapSimultaneous } from './from'

test('map()', () => {
  expect(map('/', '⌘⌥', '⌃').build().from).toEqual({
    key_code: 'slash',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })
})

test('mapSimultaneous()', () => {
  const { from, parameters } = mapSimultaneous(
    ['a', '←', 2],
    { key_up_order: 'strict' },
    123,
  ).build()
  expect(from).toEqual({
    simultaneous: [
      { key_code: 'a' },
      { key_code: 'left_arrow' },
      { key_code: '2' },
    ],
    simultaneous_options: { key_up_order: 'strict' },
  })
  expect(parameters).toEqual({
    'basic.simultaneous_threshold_milliseconds': 123,
  })
})
