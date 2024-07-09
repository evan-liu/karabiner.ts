import { expect, test } from 'vitest'

import { toKey, toPlaySound, toSetVar, toUnsetVar } from './to'

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

  expect(toKey('r')).toEqual({ key_code: 'r' })
  expect(toKey('r⌘')).toEqual({ key_code: 'right_command' })
})

test('setVar()', () => {
  expect(toSetVar('test')).toEqual({ set_variable: { name: 'test', value: 1 } })
  expect(toSetVar('test', true)).toEqual({
    set_variable: { name: 'test', value: true },
  })
  expect(toSetVar('test', true, false)).toEqual({
    set_variable: { name: 'test', value: true, key_up_value: false },
  })
  expect(toSetVar('test', true, false, 'unset')).toEqual({
    set_variable: {
      name: 'test',
      value: true,
      key_up_value: false,
      type: 'unset',
    },
  })
})

test('toUnsetVar()', () => {
  expect(toUnsetVar('test')).toEqual({
    set_variable: { name: 'test', type: 'unset' },
  })
})

test('toPlaySound()', () => {
  expect(toPlaySound('Blow')).toEqual({
    shell_command: 'afplay /System/Library/Sounds/Blow.aiff',
  })

  expect(toPlaySound('/test/sound.mp3')).toEqual({
    shell_command: 'afplay /test/sound.mp3',
  })
})
