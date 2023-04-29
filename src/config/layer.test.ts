import { expect, test } from 'vitest'
import { layer, simlayer } from './layer'
import { map } from './from'
import { BasicManipulator } from '../karabiner/karabiner-config'
import { toSetVar, toKey } from './to'

test('layer()', () => {
  const rule = layer('a', 'b-mode', 2, -1)
    .manipulators([map('c').to('d')])
    .build()
  expect(rule.description).toBe(`Layer - b-mode`)

  const manipulators = rule.manipulators as BasicManipulator[]
  // One layer manipulator to set variable
  expect(manipulators.length).toBe(2)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'a' },
    to: [{ set_variable: { name: 'b-mode', value: 2 } }],
    to_after_key_up: [{ set_variable: { name: 'b-mode', value: -1 } }],
    to_if_alone: [{ key_code: 'a' }],
  })
  // Add variable condition to manipulators
  expect(manipulators[1].conditions).toEqual([
    { type: 'variable_if', name: 'b-mode', value: 2 },
  ])
})

test('simlayer()', () => {
  const rule = simlayer('a', 'b-mode', 1, true, false)
    .manipulators([map('c').to('d'), map('e').to('f')])
    .build()
  expect(rule.description).toBe(`Simlayer - b-mode`)

  const manipulators = rule.manipulators as BasicManipulator[]
  // Layer manipulator to set variable for each manipulator
  expect(manipulators.length).toBe(4)
  expect(manipulators[2]).toEqual({
    type: 'basic',
    parameters: {
      'basic.simultaneous_threshold_milliseconds': 1,
    },
    to: [toSetVar('b-mode', true), toKey('d')],
    from: {
      simultaneous: [{ key_code: 'a' }, { key_code: 'c' }],
      simultaneous_options: {
        detect_key_down_uninterruptedly: true,
        key_down_order: 'strict',
        key_up_order: 'strict_inverse',
        key_up_when: 'any',
        to_after_key_up: [toSetVar('b-mode', false)],
      },
    },
  })

  // Add variable condition to manipulators
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_if', name: 'b-mode', value: true },
  ])
})

test('Empty manipulators error', () => {
  expect(() => layer('a', '').manipulators([]).build()).toThrow(
    /manipulators.*empty/,
  )
  expect(() => simlayer('a', '').manipulators([]).build()).toThrow(
    /manipulators.*empty/,
  )
})
