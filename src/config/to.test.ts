import { expect, test } from 'vitest'
import { setVar, toKey } from './to.ts'

test('toKey()', () => {
  // ToKeyCode
  expect(toKey('slash', '⌘', { lazy: true })).toEqual({
    key_code: 'slash',
    modifiers: ['command'],
    lazy: true,
  })
  // KeyAlias
  expect(toKey('/')).toEqual({ key_code: 'slash' })
  // NumberKeyValue
  expect(toKey(1)).toEqual({ key_code: '1' })
})

test('setVar()', () => {
  expect(setVar('test')).toEqual({ set_variable: { name: 'test', value: 1 } })
  expect(setVar('test', true)).toEqual({
    set_variable: { name: 'test', value: true },
  })
})
