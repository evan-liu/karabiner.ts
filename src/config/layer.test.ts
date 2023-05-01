import { expect, test } from 'vitest'
import { layer, simlayer } from './layer'
import { map } from './from'
import { BasicManipulator } from '../karabiner/karabiner-config'
import { toKey, toSetVar } from './to'

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

test('layer() with multiple keys', () => {
  const rule = layer(['a', 'b'], 'c')
    .manipulators([map(1).to(2)])
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(3)
  const { from: fromB, to_if_alone: aloneB, ...restB } = manipulators[0]
  const { from: fromA, to_if_alone: aloneA, ...restA } = manipulators[1]
  expect(fromB).toEqual({ key_code: 'b' })
  expect(aloneB).toEqual([{ key_code: 'b' }])
  expect(fromA).toEqual({ key_code: 'a' })
  expect(aloneA).toEqual([{ key_code: 'a' }])
  expect(restB).toEqual(restA)
})

test('simlayer()', () => {
  const layer = simlayer('a', 'b-mode', 1, true, false).manipulators([
    map('c').to('d'),
    map('e'),
  ])
  const rule = layer.build()
  expect(rule.description).toBe(`Simlayer - b-mode`)
  expect(layer.description('test').build().description).toBe('test')

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

test('simlayer() with multiple key', () => {
  const rule = simlayer(['a', 'b'], 'c')
    .manipulators([map(1).to(2)])
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(3)

  const from = manipulators.map((v) => v.from) as any[]
  from[1].simultaneous[0].key_code = from[2].simultaneous[0].key_code
  expect(manipulators[1]).toEqual(manipulators[2])
})

test('Empty manipulators error', () => {
  expect(() => layer('a', '').manipulators([]).build()).toThrow(
    /manipulators.*empty/,
  )
  expect(() => simlayer('a', '').manipulators([]).build()).toThrow(
    /manipulators.*empty/,
  )
})

test('simlayer() validation errors', () => {
  expect(() =>
    simlayer('a', 'b')
      .manipulators([{ type: 'mouse_motion_to_scroll' }])
      .build(),
  ).toThrow('type')

  expect(() =>
    simlayer('a', 'b')
      .manipulators([{ type: 'basic' } as any])
      .build(),
  ).toThrow('key_code')
})
