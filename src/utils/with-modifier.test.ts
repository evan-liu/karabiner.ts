import { describe, expect, test } from 'vitest'
import { withModifier } from './with-modifier'
import { map } from '../config/from'
import { BasicManipulator } from '../karabiner/karabiner-config'

describe('withModifier()', () => {
  test('Add the shared modifiers to `from` but not `to`', () => {
    const manipulators = withModifier('⌘⌥')([
      map(1, '⌃').to('a'),
      map(2, undefined, '⌃').to('b'),
    ]).build() as BasicManipulator[]

    // Add the shared modifiers
    expect(manipulators.map((v) => v.from.modifiers)).toEqual([
      { mandatory: ['control', 'command', 'option'] },
      { mandatory: ['command', 'option'], optional: ['control'] },
    ])

    // Keep `to` unchanged
    expect(manipulators.map((v) => v.to)).toEqual([
      [{ key_code: 'a' }],
      [{ key_code: 'b' }],
    ])
  })

  test('Optional modifier', () => {
    expect(withModifier('⌘', '⌥')([map(1).to('a')]).build()).toEqual([
      {
        type: 'basic',
        from: {
          key_code: '1',
          modifiers: { mandatory: ['command'], optional: ['option'] },
        },
        to: [{ key_code: 'a' }],
      },
    ])
  })

  test('Remove duplicated modifier', () => {
    expect(
      withModifier('⌘')([map(1, '⌘').to('a')]).build()[0].from?.modifiers,
    ).toEqual({ mandatory: ['command'] })
  })

  test('any modifier', () => {
    expect(
      withModifier('⌘')([map(1, 'any').to('a')]).build()[0].from?.modifiers,
    ).toEqual({ mandatory: ['any'] })
  })
})
