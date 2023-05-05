import { expect, test } from 'vitest'
import { map, mapConsumerKey, mapPointingButton, mapSimultaneous } from './from'

test('map()', () => {
  expect(map('/', '⌘⌥', '⌃').build()[0].from).toEqual({
    key_code: 'slash',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })

  expect(map({ key_code: 33 }).build()[0].from).toEqual({ key_code: 33 })

  expect(map(1, '', '⌘').to(2).build()[0].from).toEqual({
    key_code: '1',
    modifiers: { optional: ['command'] },
  })

  expect(map(1, 'optionalAny').to(2).build()[0].from).toEqual({
    key_code: '1',
    modifiers: { optional: ['any'] },
  })

  expect(map(1, { optional: 'any' }).to(2).build()[0].from).toEqual({
    key_code: '1',
    modifiers: { optional: ['any'] },
  })

  expect(map(1, { optional: '⌘⌥' }).to(2).build()[0].from).toEqual({
    key_code: '1',
    modifiers: { optional: ['command', 'option'] },
  })
})

test('mapSimultaneous()', () => {
  const { from, parameters } = mapSimultaneous(
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
})

test('mapConsumerKey()', () => {
  expect(mapConsumerKey('menu', '⌘⌥', '⌃').build()[0].from).toEqual({
    consumer_key_code: 'menu',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })
})

test('mapPointingButton()', () => {
  expect(mapPointingButton('button2', '⌘⌥', '⌃').build()[0].from).toEqual({
    pointing_button: 'button2',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })
})
