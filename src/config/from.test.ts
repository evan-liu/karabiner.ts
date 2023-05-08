import { expect, test } from 'vitest'
import { map, mapConsumerKey, mapPointingButton } from './from'

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
