import { expect, test } from 'vitest'
import { toSetVar, toKey } from './to'

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
  expect(toSetVar('test')).toEqual({ set_variable: { name: 'test', value: 1 } })
  expect(toSetVar('test', true)).toEqual({
    set_variable: { name: 'test', value: true },
  })
})
