import { expect, test } from 'vitest'
import { defaultDuoLayerParameters, duoLayer } from './duo-layer'
import { map } from './from'
import {
  BasicManipulator,
  FromSimultaneousEvent,
} from '../karabiner/karabiner-config'
import { toSetVar } from './to'
import { ifVar } from './condition'
import { complexModifications } from './complex-modifications'

test('duoLayer()', () => {
  const layer = duoLayer(1, 2).manipulators([map(3).to(4)])
  const rule = layer.build()
  expect(rule.description).toBe('Layer - duo-layer-1-2')
  expect(layer.description('test').build().description).toBe('test')

  const manipulators = rule.manipulators as BasicManipulator[]
  // One layer manipulator to set variable
  expect(manipulators.length).toBe(2)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: {
      simultaneous: [{ key_code: '1' }, { key_code: '2' }],
      simultaneous_options: {
        to_after_key_up: [toSetVar('duo-layer-1-2', 0)],
      },
      modifiers: { optional: ['any'] },
    },
    to: [toSetVar('duo-layer-1-2', 1)],
    parameters: {
      'basic.simultaneous_threshold_milliseconds':
        defaultDuoLayerParameters['duo_layer.threshold_milliseconds'],
    },
  })
  // Add variable condition to manipulators
  expect(manipulators[1].conditions).toEqual([ifVar('duo-layer-1-2').build()])
})

test('duoLayer() varName and values', () => {
  const rule = duoLayer(1, 2, 'var12', 2, -1).build()
  expect(rule.description).toBe(`Layer - var12`)
  const manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to).toEqual([
    { set_variable: { name: 'var12', value: 2 } },
  ])
  expect(
    (manipulator.from as FromSimultaneousEvent).simultaneous_options
      ?.to_after_key_up,
  ).toEqual([{ set_variable: { name: 'var12', value: -1 } }])
})

test('duoLayer().threshold()', () => {
  const rule = duoLayer(1, 2).threshold(100).build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].parameters).toEqual({
    'basic.simultaneous_threshold_milliseconds': 100,
  })
})

test('duoLayer().options()', () => {
  const rule = duoLayer(1, 2)
    .options({ key_up_order: 'strict_inverse' })
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(
    (manipulators[0].from as FromSimultaneousEvent).simultaneous_options
      ?.key_up_order,
  ).toEqual('strict_inverse')
})

test('duoLayer().condition()', () => {
  const rule = duoLayer(1, 2).condition(ifVar('c')).build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_if', name: 'c', value: 1 },
  ])
})

test('duoLayer() with same keys', () => {
  const { rules } = complexModifications([
    duoLayer(1, 2).manipulators([map(3).to(4)]),
    duoLayer(1, 2).manipulators([map(3).to(4)]),
    duoLayer(1, 2)
      .condition(ifVar('x'))
      .manipulators([map(3).to(4)]),
    duoLayer(1, 2)
      .condition(ifVar('x'))
      .manipulators([map(3).to(4)]),
    duoLayer(1, 2, 'v3').manipulators([map(3).to(4)]),
  ])
  expect(rules.map((v) => v.manipulators.length)).toEqual([2, 1, 2, 1, 1])

  expect(
    (rules[0].manipulators[0].from as FromSimultaneousEvent)
      .simultaneous_options?.to_after_key_up,
  ).toEqual([toSetVar('duo-layer-1-2', 0), toSetVar('v3', 0)])
  expect(
    (rules[2].manipulators[0].from as FromSimultaneousEvent)
      .simultaneous_options?.to_after_key_up,
  ).toEqual([toSetVar('duo-layer-1-2', 0)])
})
