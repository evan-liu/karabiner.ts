import { expect, test } from 'vitest'

import {
  BasicManipulator,
  FromEvent,
  FromKeyType,
  FromSimultaneousEvent,
} from '../karabiner/karabiner-config'
import { BuildContext } from '../utils/build-context.ts'

import { complexModifications } from './complex-modifications'
import { ifVar } from './condition'
import { defaultDuoLayerParameters, duoLayer } from './duo-layer'
import { map } from './from'
import {
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
} from './to'

test('duoLayer()', () => {
  const layer = duoLayer(1, 2).manipulators([map(3).to(4)])
  const rule = layer.build()
  expect(rule.description).toBe('DuoLayer 1 2')
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
  expect(rule.description).toBe(`DuoLayer var12`)
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

test('duoLayer() notification', () => {
  const rule = duoLayer('a', 'b').notification(true).build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'DuoLayer a b',
    },
  })
  const from = manipulators[0].from as Extract<
    FromEvent,
    { simultaneous: FromKeyType[] }
  >
  expect(from.simultaneous_options?.to_after_key_up?.[1]).toEqual({
    set_notification_message: { id: 'duo-layer-duo-layer-a-b', text: '' },
  })

  const ruleB = duoLayer('a', 'b').notification('test-b').build()
  const manipulatorB = ruleB.manipulators[0] as BasicManipulator
  expect(manipulatorB.to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'test-b',
    },
  })
})

test('duoLayer() notification parameters', () => {
  defaultDuoLayerParameters['duo_layer.notification'] = 'ab'

  const rule = duoLayer('a', 'b').build()
  const manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'ab',
    },
  })
})

test('duoLayer() parameters in BuildContext', () => {
  const context = new BuildContext()
  context.setParameters<typeof defaultDuoLayerParameters>({
    'duo_layer.notification': 'bc',
  })
  const rule = duoLayer('a', 'b').build(context)
  const manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'bc',
    },
  })
})

test('duoLayer().toIfActivated() toIfDeactivated()', () => {
  const rule = duoLayer('a', 'b')
    .toIfActivated(toNotificationMessage('testId', 'testMsg'))
    .toIfDeactivated(toRemoveNotificationMessage('testId'))
    .build()
  const manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to?.[1]).toEqual({
    set_notification_message: { id: 'testId', text: 'testMsg' },
  })
  const from = manipulators[0].from as Extract<
    FromEvent,
    { simultaneous: FromKeyType[] }
  >
  expect(from.simultaneous_options?.to_after_key_up?.[1]).toEqual({
    set_notification_message: { id: 'testId', text: '' },
  })
})
