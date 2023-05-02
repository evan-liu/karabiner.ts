import { expect, test } from 'vitest'
import { layer } from './layer'
import { map } from './from'
import { BasicManipulator } from '../karabiner/karabiner-config'
import { ifVar } from './condition'

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

test('layer() conditions', () => {
  const rule = layer('a', 'b')
    .condition(ifVar('c'))
    .manipulators([map(1).to(2)])
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_if', name: 'c', value: 1 },
  ])
})

test('layer() empty manipulators error', () => {
  expect(() => layer('a', '').manipulators([]).build()).toThrow(
    /manipulators.*empty/,
  )
})
