import { expect, test } from 'vitest'
import { map, mapConsumerKey, mapPointingButton, mapSimultaneous } from './from'

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

  expect(mapSimultaneous([1, 2]).build().parameters).toBeUndefined()
})

test('mapConsumerKey()', () => {
  expect(mapConsumerKey('menu', '⌘⌥', '⌃').build().from).toEqual({
    consumer_key_code: 'menu',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })
})

test('mapPointingButton()', () => {
  expect(mapPointingButton('button2', '⌘⌥', '⌃').build().from).toEqual({
    pointing_button: 'button2',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })
})
