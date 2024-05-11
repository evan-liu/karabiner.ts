import { describe, expect, test } from 'vitest'

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
  toKey,
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
    conditions: [{ type: 'variable_unless', name: 'duo-layer-1-2', value: 1 }],
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
    { type: 'variable_unless', name: 'duo-layer-1-2', value: 1 },
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

describe('duoLayer().leaderMode()', () => {
  test('leader() with defaults', () => {
    const rule = duoLayer('a', 'b')
      .leaderMode()
      .manipulators({ 1: toKey(2), 3: toKey(4) })
      .build()

    const manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(5)

    // layer toggle
    const from = manipulators[0].from as FromSimultaneousEvent
    expect(from.simultaneous_options?.to_after_key_up).toEqual([])

    const ifOn = ifVar('duo-layer-a-b', 1).build()
    const toOff = toSetVar('duo-layer-a-b', 0)

    // layer keys
    expect(manipulators[1].to?.[1]).toEqual(toOff)
    expect(manipulators[2].to?.[1]).toEqual(toOff)
    // escape keys
    expect(manipulators[3].from).toEqual({ key_code: 'escape' })
    expect(manipulators[3].to?.[0]).toEqual(toOff)
    expect(manipulators[3].conditions).toEqual([ifOn])
    expect(manipulators[4].from).toEqual({ key_code: 'caps_lock' })
    expect(manipulators[4].to?.[0]).toEqual(toOff)
    expect(manipulators[4].conditions).toEqual([ifOn])
  })

  test('leader() set escape keys', () => {
    const rule = duoLayer('a', 'b').leaderMode({ escape: 'spacebar' }).build()
    const manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators[1].from).toEqual({ key_code: 'spacebar' })
    expect(manipulators[1].to?.[0]).toEqual(toSetVar('duo-layer-a-b', 0))
    expect(manipulators[1].conditions).toEqual([
      ifVar('duo-layer-a-b', 1).build(),
    ])

    const rule2 = duoLayer('c', 'd')
      .leaderMode({ escape: ['spacebar', { pointing_button: 2 }] })
      .build()
    const manipulators2 = rule2.manipulators as BasicManipulator[]
    expect(manipulators2[1].from).toEqual({ key_code: 'spacebar' })
    expect(manipulators2[1].to?.[0]).toEqual(toSetVar('duo-layer-c-d', 0))
    expect(manipulators2[1].conditions).toEqual([
      ifVar('duo-layer-c-d', 1).build(),
    ])
    expect(manipulators2[2].from).toEqual({ pointing_button: 2 })
    expect(manipulators2[2].to?.[0]).toEqual(toSetVar('duo-layer-c-d', 0))
    expect(manipulators2[2].conditions).toEqual([
      ifVar('duo-layer-c-d', 1).build(),
    ])
  })

  test('leader() with notification()', () => {
    const rule = duoLayer('a', 'b', 'v')
      .leaderMode()
      .notification()
      .manipulators({ 1: toKey(2) })
      .build()
    const manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(4)

    // layer toggle
    const from = manipulators[0].from as FromSimultaneousEvent
    expect(from.simultaneous_options?.to_after_key_up).toEqual([])
    expect(manipulators[0].to?.[1]).toEqual(
      toNotificationMessage('duo-layer-v', 'DuoLayer v'),
    )

    const remove = toRemoveNotificationMessage('duo-layer-v')
    // layer key
    expect(manipulators[1].to?.[2]).toEqual(remove)
    // escape keys
    expect(manipulators[2].to?.[1]).toEqual(remove)
    expect(manipulators[3].to?.[1]).toEqual(remove)

    const rule2 = duoLayer('c', 'd').notification('Test CD').build()
    const manipulators2 = rule2.manipulators as BasicManipulator[]
    expect(manipulators2[0].to?.[1]).toEqual(
      toNotificationMessage('duo-layer-duo-layer-c-d', 'Test CD'),
    )
  })

  test('leader() with sticky', () => {
    const rule = duoLayer('a', 'b')
      .leaderMode({ sticky: true })
      .notification()
      .manipulators({ 1: toKey(2) })
      .build()
    const manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(4)

    const ifOn = ifVar('duo-layer-a-b', 1).build()
    const toOff = toSetVar('duo-layer-a-b', 0)
    const remove = toRemoveNotificationMessage('duo-layer-duo-layer-a-b')

    // layer key
    expect(manipulators[1].to?.length).toEqual(1)
    expect(manipulators[1].conditions).toEqual([ifOn])
    // escape keys
    expect(manipulators[2].conditions).toEqual([ifOn])
    expect(manipulators[2].to?.[0]).toEqual(toOff)
    expect(manipulators[2].to?.[1]).toEqual(remove)
    expect(manipulators[3].conditions).toEqual([ifOn])
    expect(manipulators[3].to?.[0]).toEqual(toOff)
    expect(manipulators[3].to?.[1]).toEqual(remove)
  })
})
