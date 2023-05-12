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

  expect(toKey(1).modifiers).toBeUndefined()
  expect(toKey(1, '⌘⌥').modifiers).toEqual(['command', 'option'])
  expect(toKey(1, { left: '⌘', right: '⌥' }).modifiers).toEqual([
    'left_command',
    'right_option',
  ])
  expect(toKey(1, ['‹⌘', '›⌥']).modifiers).toEqual([
    'left_command',
    'right_option',
  ])
  expect(toKey(1, '›⌘⇧').modifiers).toEqual(['right_command', 'right_shift'])
})

test('setVar()', () => {
  expect(toSetVar('test')).toEqual({ set_variable: { name: 'test', value: 1 } })
  expect(toSetVar('test', true)).toEqual({
    set_variable: { name: 'test', value: true },
  })
})
