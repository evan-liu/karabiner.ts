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
  let layer = duoLayer(1, 2).manipulators([map(3).to(4)])
  let rule = layer.build()
  expect(rule.description).toBe('DuoLayer 1 2')
  expect(layer.description('test').build().description).toBe('test')

  let manipulators = rule.manipulators as BasicManipulator[]
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
  let rule = duoLayer(1, 2, 'var12', 2, -1).build()
  expect(rule.description).toBe(`DuoLayer var12`)
  let manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to).toEqual([
    { set_variable: { name: 'var12', value: 2 } },
  ])
  expect(
    (manipulator.from as FromSimultaneousEvent).simultaneous_options
      ?.to_after_key_up,
  ).toEqual([{ set_variable: { name: 'var12', value: -1 } }])
})

test('duoLayer().threshold()', () => {
  let rule = duoLayer(1, 2).threshold(100).build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].parameters).toEqual({
    'basic.simultaneous_threshold_milliseconds': 100,
  })
})

test('duoLayer().options()', () => {
  let rule = duoLayer(1, 2).options({ key_up_order: 'strict_inverse' }).build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(
    (manipulators[0].from as FromSimultaneousEvent).simultaneous_options
      ?.key_up_order,
  ).toEqual('strict_inverse')
})

test('duoLayer().condition()', () => {
  let rule = duoLayer(1, 2).condition(ifVar('c')).build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_unless', name: 'duo-layer-1-2', value: 1 },
    { type: 'variable_if', name: 'c', value: 1 },
  ])
})

test('duoLayer() with same keys', () => {
  let { rules } = complexModifications([
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
  let rule = duoLayer('a', 'b').notification(true).build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'DuoLayer a b',
    },
  })
  let from = manipulators[0].from as Extract<
    FromEvent,
    { simultaneous: FromKeyType[] }
  >
  expect(from.simultaneous_options?.to_after_key_up?.[1]).toEqual({
    set_notification_message: { id: 'duo-layer-duo-layer-a-b', text: '' },
  })

  let ruleB = duoLayer('a', 'b').notification('test-b').build()
  let manipulatorB = ruleB.manipulators[0] as BasicManipulator
  expect(manipulatorB.to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'test-b',
    },
  })
})

test('duoLayer() notification parameters', () => {
  defaultDuoLayerParameters['duo_layer.notification'] = 'ab'

  let rule = duoLayer('a', 'b').build()
  let manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'ab',
    },
  })
})

test('duoLayer() parameters in BuildContext', () => {
  let context = new BuildContext()
  context.setParameters<typeof defaultDuoLayerParameters>({
    'duo_layer.notification': 'bc',
  })
  let rule = duoLayer('a', 'b').build(context)
  let manipulator = rule.manipulators[0] as BasicManipulator
  expect(manipulator.to?.[1]).toEqual({
    set_notification_message: {
      id: 'duo-layer-duo-layer-a-b',
      text: 'bc',
    },
  })
})

test('duoLayer().toIfActivated() toIfDeactivated()', () => {
  let rule = duoLayer('a', 'b')
    .toIfActivated(toNotificationMessage('testId', 'testMsg'))
    .toIfDeactivated(toRemoveNotificationMessage('testId'))
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to?.[1]).toEqual({
    set_notification_message: { id: 'testId', text: 'testMsg' },
  })
  let from = manipulators[0].from as Extract<
    FromEvent,
    { simultaneous: FromKeyType[] }
  >
  expect(from.simultaneous_options?.to_after_key_up?.[1]).toEqual({
    set_notification_message: { id: 'testId', text: '' },
  })
})

describe('duoLayer().leaderMode()', () => {
  test('leader() with defaults', () => {
    let rule = duoLayer('a', 'b')
      .leaderMode()
      .manipulators({ 1: toKey(2), 3: toKey(4) })
      .build()

    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(5)

    // layer toggle
    let from = manipulators[0].from as FromSimultaneousEvent
    expect(from.simultaneous_options?.to_after_key_up).toEqual([])

    let ifOn = ifVar('duo-layer-a-b', 1).build()
    let toOff = toSetVar('duo-layer-a-b', 0)

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
    let rule = duoLayer('a', 'b').leaderMode({ escape: 'spacebar' }).build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators[1].from).toEqual({ key_code: 'spacebar' })
    expect(manipulators[1].to?.[0]).toEqual(toSetVar('duo-layer-a-b', 0))
    expect(manipulators[1].conditions).toEqual([
      ifVar('duo-layer-a-b', 1).build(),
    ])

    let rule2 = duoLayer('c', 'd')
      .leaderMode({ escape: ['spacebar', { pointing_button: 2 }] })
      .build()
    let manipulators2 = rule2.manipulators as BasicManipulator[]
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
    let rule = duoLayer('a', 'b', 'v')
      .leaderMode()
      .notification()
      .manipulators({ 1: toKey(2) })
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(4)

    // layer toggle
    let from = manipulators[0].from as FromSimultaneousEvent
    expect(from.simultaneous_options?.to_after_key_up).toEqual([])
    expect(manipulators[0].to?.[1]).toEqual(
      toNotificationMessage('duo-layer-v', 'DuoLayer v'),
    )

    let remove = toRemoveNotificationMessage('duo-layer-v')
    // layer key
    expect(manipulators[1].to?.[2]).toEqual(remove)
    // escape keys
    expect(manipulators[2].to?.[1]).toEqual(remove)
    expect(manipulators[3].to?.[1]).toEqual(remove)

    let rule2 = duoLayer('c', 'd').notification('Test CD').build()
    let manipulators2 = rule2.manipulators as BasicManipulator[]
    expect(manipulators2[0].to?.[1]).toEqual(
      toNotificationMessage('duo-layer-duo-layer-c-d', 'Test CD'),
    )
  })

  test('leader() with sticky', () => {
    let rule = duoLayer('a', 'b')
      .leaderMode({ sticky: true })
      .notification()
      .manipulators({ 1: toKey(2) })
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(4)

    let ifOn = ifVar('duo-layer-a-b', 1).build()
    let toOff = toSetVar('duo-layer-a-b', 0)
    let remove = toRemoveNotificationMessage('duo-layer-duo-layer-a-b')

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

describe('duoLayer().delay()', () => {
  test('delay() creates two manipulators with roll-over protection', () => {
    let rule = duoLayer('x', 'y').delay().build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(2)

    // Both manipulators should have roll-over protection
    manipulators.forEach((manipulator) => {
      expect(manipulator.to_if_alone).toBeDefined()
      expect(manipulator.to_if_held_down).toBeDefined()
      expect(manipulator.parameters).toEqual(
        expect.objectContaining({
          'basic.to_if_held_down_threshold_milliseconds': 200,
          'basic.to_if_alone_timeout_milliseconds': 200,
        }),
      )
    })
  })

  test('delay() with custom delay value', () => {
    let rule = duoLayer('x', 'y').delay(150).build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(2)
    manipulators.forEach((manipulator) => {
      expect(manipulator.parameters).toEqual(
        expect.objectContaining({
          'basic.to_if_held_down_threshold_milliseconds': 150,
          'basic.to_if_alone_timeout_milliseconds': 150,
        }),
      )
    })
  })

  test('delay() with notification shows on hold, clears on release', () => {
    let rule = duoLayer('x', 'y').delay().notification('Test').build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(2)

    // Both manipulators should have notification in to_if_held_down
    manipulators.forEach((manipulator) => {
      expect(manipulator.to_if_held_down).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            set_notification_message: expect.objectContaining({ text: 'Test' }),
          }),
        ]),
      )
    })
  })

  test('delay() handles both key orders for roll-over protection', () => {
    let rule = duoLayer('j', 'k').delay().build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(2)

    // Check that both key orders are created
    let keyArrays = manipulators.map((m) => {
      let from = m.from as { simultaneous: Array<{ key_code: string }> }
      return from.simultaneous.map((k) => k.key_code).join(',')
    })
    expect(keyArrays).toEqual(['j,k', 'k,j'])

    // Both should use strict key_down_order
    manipulators.forEach((x) => {
      let from = x.from as FromSimultaneousEvent
      expect(from.simultaneous_options?.key_down_order).toBe('strict')
    })

    // toIfAlone should output keys matching their respective arrays
    expect(manipulators[0].to_if_alone).toEqual([
      { key_code: 'j' },
      { key_code: 'k' },
    ])
    expect(manipulators[1].to_if_alone).toEqual([
      { key_code: 'k' },
      { key_code: 'j' },
    ])
  })

  test('delay() respects global defaults and explicit overrides', () => {
    let originalDelayByDefault =
      defaultDuoLayerParameters['duo_layer.delay_by_default']
    let originalDelayMs =
      defaultDuoLayerParameters['duo_layer.delay_milliseconds']

    defaultDuoLayerParameters['duo_layer.delay_by_default'] = true
    defaultDuoLayerParameters['duo_layer.delay_milliseconds'] = 150

    // Global default enables delay
    expect(duoLayer('x', 'y').build().manipulators.length).toBe(2)

    // Explicit false overrides global default
    expect(duoLayer('x', 'y').delay(false).build().manipulators.length).toBe(1)

    // Custom timing works
    let rule = duoLayer('x', 'y').delay(300).build()
    expect((rule.manipulators[0] as BasicManipulator).parameters).toEqual(
      expect.objectContaining({
        'basic.to_if_held_down_threshold_milliseconds': 300,
      }),
    )

    // Restore original values
    defaultDuoLayerParameters['duo_layer.delay_by_default'] =
      originalDelayByDefault
    defaultDuoLayerParameters['duo_layer.delay_milliseconds'] = originalDelayMs
  })
})
