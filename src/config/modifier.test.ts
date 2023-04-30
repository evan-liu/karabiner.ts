import { expect, test } from 'vitest'
import { parseFromModifierParams, parseModifierParam } from './modifier'

test('parseModifierParam()', () => {
  expect(parseModifierParam()).toBeUndefined()
  // Modifier
  expect(parseModifierParam('left_command')).toEqual(['left_command'])
  // ModifierKeyAlias
  expect(parseModifierParam('⌥')).toEqual(['option'])
  // Array<Modifier | ModifierKeyAlias>
  expect(parseModifierParam(['right_command', '⌥'])).toEqual([
    'right_command',
    'option',
  ])
  // MultiModifierAlias
  expect(parseModifierParam('⌃⇧')).toEqual(['control', 'shift'])
})

test('parseFromModifierParams()', () => {
  expect(parseFromModifierParams()).toBeUndefined()
  expect(parseFromModifierParams({})).toEqual({})

  expect(parseFromModifierParams('⌘')).toEqual({ mandatory: ['command'] })
  expect(parseFromModifierParams({ left: '⌥' })).toEqual({
    mandatory: ['left_option'],
  })
  expect(parseFromModifierParams({ left: '⌥', right: '⌃⇧' })).toEqual({
    mandatory: ['left_option', 'right_control', 'right_shift'],
  })
  expect(
    parseFromModifierParams('left_option', ['right_command', 'right_shift']),
  ).toEqual({
    mandatory: ['left_option'],
    optional: ['right_command', 'right_shift'],
  })
  expect(parseFromModifierParams(undefined, { right: '⌥' })).toEqual({
    optional: ['right_option'],
  })

  expect(parseFromModifierParams({ left: 'win' as any })).toEqual({
    mandatory: ['win'],
  })
})
