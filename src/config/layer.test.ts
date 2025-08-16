import { describe, expect, test } from 'vitest'

import { BasicManipulator } from '../karabiner/karabiner-config'
import {
  fromOnlyKeyCodes,
  stickyModifierKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code'

import { complexModifications } from './complex-modifications'
import { ifVar } from './condition'
import { mapDoubleTap } from './double-tap.ts'
import { map } from './from'
import { hyperLayer, layer, LayerRuleBuilder } from './layer'
import { mouseMotionToScroll } from './mouse-motion-to-scroll'
import { simlayer } from './simlayer'
import {
  toKey,
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
} from './to'

test('layer()', () => {
  let rule = layer('a', 'b-mode', 2, -1)
    .manipulators([map('c').to('d')])
    .build()
  expect(rule.description).toBe(`Layer - b-mode`)

  let manipulators = rule.manipulators as BasicManipulator[]
  // One layer manipulator to set variable
  expect(manipulators.length).toBe(2)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'a' },
    to: [
      { set_variable: { name: 'b-mode', value: 2 } },
      { set_variable: { name: '__layer', value: 1 } },
    ],
    to_after_key_up: [
      { set_variable: { name: 'b-mode', value: -1 } },
      { set_variable: { name: '__layer', value: 0 } },
    ],
    to_if_alone: [{ key_code: 'a' }],
    conditions: [
      { type: 'variable_unless', name: 'b-mode', value: 2 },
      { type: 'variable_unless', name: '__layer', value: 1 },
    ],
  } as BasicManipulator)
  // Add variable condition to manipulators
  expect(manipulators[1].conditions).toEqual([
    { type: 'variable_if', name: 'b-mode', value: 2 },
  ])
})

test('layer() default varName', () => {
  let rule = layer('a')
    .manipulators([map('c').to('d')])
    .build()
  expect(rule.description).toBe(`Layer - layer-a`)

  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[1].conditions).toEqual([
    { type: 'variable_if', name: 'layer-a', value: 1 },
  ])
})

test('layer() with invalid key', () => {
  expect(() => layer('' as any, '')).toThrow('key_code')
  expect(() => layer(toOnlyKeyCodes[0] as any, '')).toThrow('layer key')
  expect(() => layer(fromOnlyKeyCodes[0] as any, '')).toThrow('layer key')
  expect(() => layer(stickyModifierKeyCodes[0] as any, '')).toThrow('layer key')
})

test('layer() with multiple keys', () => {
  let rule = layer(['a', 'b'], 'c')
    .manipulators([map(1).to(2)])
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(3)
  let { from: fromB, to_if_alone: aloneB, ...restB } = manipulators[0]
  let { from: fromA, to_if_alone: aloneA, ...restA } = manipulators[1]
  expect(fromB).toEqual({ key_code: 'b' })
  expect(aloneB).toEqual([{ key_code: 'b' }])
  expect(fromA).toEqual({ key_code: 'a' })
  expect(aloneA).toEqual([{ key_code: 'a' }])
  expect(restB).toEqual(restA)
})

test('layer() conditions', () => {
  let rule = layer('a', 'b')
    .condition(ifVar('c'))
    .manipulators([map(1).to(2)])
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_unless', name: 'b', value: 1 },
    { type: 'variable_unless', name: '__layer', value: 1 },
    { type: 'variable_if', name: 'c', value: 1 },
  ])
})

test('layer() allows empty manipulators', () => {
  expect(() => layer('a', '').manipulators([]).build()).not.toThrow(
    /manipulators.*empty/,
  )
})

test('multiple layer() by same key ', () => {
  let { rules } = complexModifications([
    layer('a', 'v1').manipulators([map(1).to(2)]),
    layer(['a', 'b'], 'v2').manipulators([map(1).to(2)]),
    layer('a', 'v3')
      .condition(ifVar('x'))
      .manipulators([map(1).to(2)]),
    layer('a', 'v4')
      .condition(ifVar('x'))
      .manipulators([map(1).to(2)]),
    simlayer('x', 'v2')
      .enableLayer('a')
      .manipulators([map(1).to(2)]),
  ])
  expect(rules[0].manipulators.length).toBe(2)
  expect(rules[1].manipulators.length).toBe(2)

  let manipulator = rules[0].manipulators[0] as BasicManipulator
  expect(manipulator.to).toEqual([
    { set_variable: { name: 'v1', value: 1 } },
    { set_variable: { name: '__layer', value: 1 } },
    { set_variable: { name: 'v2', value: 1 } },
  ])
  expect(manipulator.to_after_key_up).toEqual([
    { set_variable: { name: 'v1', value: 0 } },
    { set_variable: { name: '__layer', value: 0 } },
    { set_variable: { name: 'v2', value: 0 } },
  ])

  expect(rules[2].manipulators.length).toBe(2)
  expect(rules[3].manipulators.length).toBe(1)
})

test('layer().configKey()', () => {
  let rule = layer('a', 'v1')
    .configKey((v) =>
      v.to('b').toIfHeldDown('c').toDelayedAction(toKey('x'), toKey('y')),
    )
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'a' },
    to: [
      { set_variable: { name: 'v1', value: 1 } },
      { set_variable: { name: '__layer', value: 1 } },
      { key_code: 'b' },
    ],
    to_after_key_up: [
      { set_variable: { name: 'v1', value: 0 } },
      { set_variable: { name: '__layer', value: 0 } },
    ],
    to_if_alone: [{ key_code: 'a' }],
    to_if_held_down: [{ key_code: 'c' }],
    to_delayed_action: {
      to_if_invoked: [{ key_code: 'x' }],
      to_if_canceled: [{ key_code: 'y' }],
    },
    conditions: [
      { type: 'variable_unless', name: 'v1', value: 1 },
      { type: 'variable_unless', name: '__layer', value: 1 },
    ],
  })
})

test('layer().configKey() replaceToIfAlone', () => {
  let rule = layer('⇪', 'v1')
    .configKey((v) => v.toIfAlone('b', '⌘'), true)
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'caps_lock' },
    to: [
      { set_variable: { name: 'v1', value: 1 } },
      { set_variable: { name: '__layer', value: 1 } },
    ],
    to_after_key_up: [
      { set_variable: { name: 'v1', value: 0 } },
      { set_variable: { name: '__layer', value: 0 } },
    ],
    to_if_alone: [{ key_code: 'b', modifiers: ['command'] }],
    conditions: [
      { type: 'variable_unless', name: 'v1', value: 1 },
      { type: 'variable_unless', name: '__layer', value: 1 },
    ],
  })
})

test('layer().modifier()', () => {
  expect(
    (
      layer('a', 'v')
        .manipulators([map(1).to(2)])
        .build().manipulators[0] as BasicManipulator
    ).from.modifiers,
  ).toBeUndefined()

  expect(
    (
      layer('a', 'v')
        .modifiers()
        .manipulators([map(1).to(2)])
        .build().manipulators[0] as BasicManipulator
    ).from.modifiers,
  ).toBeUndefined()

  expect(
    (
      layer('a', 'v')
        .modifiers('', '›⌥')
        .manipulators([map(1).to(2)])
        .build().manipulators[0] as BasicManipulator
    ).from.modifiers,
  ).toEqual({ optional: ['right_option'] })

  expect(
    layer('a', 'v')
      .modifiers('Hyper')
      .manipulators([map(1).to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([
    { mandatory: ['command', 'option', 'control', 'shift'] },
    { mandatory: ['any'] },
  ])

  expect(
    hyperLayer('a')
      .manipulators([map(1).to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([
    { mandatory: ['command', 'option', 'control', 'shift'] },
    { mandatory: ['any'] },
  ])

  expect(
    layer('a', 'v')
      .modifiers('⌘')
      .manipulators([
        map(1, {}).to(2),
        map(1, {}, {}).to(2),
        map(1, 'any').to(2),
        mouseMotionToScroll().modifiers('⌘'),
      ])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([
    { mandatory: ['command'] },
    { mandatory: ['any'] },
    { mandatory: ['any'] },
    { mandatory: ['any'] },
    { mandatory: ['command'] },
  ])

  expect(() =>
    layer('a', 'v')
      .modifiers('⌘')
      .manipulators([map(1, '⌥').to(2)])
      .build(),
  ).toThrow()

  expect(() =>
    layer('a', 'v')
      .modifiers('⌘')
      .manipulators([map(1, '?⌘').to(2)])
      .build(),
  ).toThrow()
})

test('layer().modifier() to_if_alone', () => {
  expect(toIfAlone(layer('a'))).toEqual([{ key_code: 'a' }])
  expect(toIfAlone(layer('a').modifiers('??'))).toEqual([{ key_code: 'a' }])
  expect(toIfAlone(layer('a').modifiers('⌘'))).toBeUndefined()
  expect(toIfAlone(layer('a').modifiers('Hyper'))).toBeUndefined()

  function toIfAlone(builder: LayerRuleBuilder) {
    let rule = builder.manipulators({ 1: toKey(2) }).build()
    return (rule.manipulators[0] as BasicManipulator).to_if_alone
  }
})

// https://github.com/evan-liu/karabiner.ts/issues/89
test('layer().modifier(??)', () => {
  expect(
    layer('a', 'v')
      .modifiers('??')
      .manipulators([map(1).to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { optional: ['any'] }])

  expect(
    layer('a', 'v')
      .modifiers('??')
      .manipulators([map(1, '??').to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { optional: ['any'] }])

  expect(
    layer('a', 'v')
      .modifiers('??')
      .manipulators([map(1, 'any').to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { mandatory: ['any'] }])

  // Allow mixing optional layer modifiers and mandatory manipulator modifiers.
  expect(
    layer('a', 'v')
      .modifiers('??')
      .manipulators([map(1, 'r⌘').to(2)])
      .build()
      .manipulators.map((v) => v.from?.modifiers),
  ).toEqual([{ optional: ['any'] }, { mandatory: ['right_command'] }])

  expect(() =>
    layer('a', 'v')
      .modifiers('r⇧')
      .manipulators([map(1, '⌘').to(2)])
      .build(),
  ).toThrow()
})

test('layer() notification', () => {
  let rule = layer('a').notification().build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(1)
  expect(manipulators[0].to?.[2]).toEqual({
    set_notification_message: {
      id: 'layer-layer-a',
      text: 'Layer - layer-a',
    },
  })
  expect(manipulators[0].to_after_key_up?.[2]).toEqual({
    set_notification_message: { id: 'layer-layer-a', text: '' },
  })

  let ruleB = layer('a').notification('test-b').build()
  let manipulatorB = ruleB.manipulators[0] as BasicManipulator
  expect(manipulatorB.to?.[2]).toEqual({
    set_notification_message: {
      id: 'layer-layer-a',
      text: 'test-b',
    },
  })
})

describe('layer() leader mode', () => {
  test('leader() with defaults', () => {
    let rule = layer('a')
      .leaderMode()
      .manipulators({ 1: toKey(2), 3: toKey(4) })
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(5)

    // layer toggle
    expect(manipulators[0].to_after_key_up).toBeUndefined()
    expect(manipulators[0].to_if_alone).toBeUndefined()

    let ifOn = ifVar('layer-a', 1).build()
    let toOff = toSetVar('layer-a', 0)
    let toLayerVarOff = toSetVar('__layer', 0)
    // layer keys
    expect(manipulators[1].to?.slice(1)).toEqual([toOff, toLayerVarOff])
    expect(manipulators[2].to?.slice(1)).toEqual([toOff, toLayerVarOff])
    // escape keys
    expect(manipulators[3].from).toEqual({ key_code: 'escape' })
    expect(manipulators[3].to).toEqual([toOff, toLayerVarOff])
    expect(manipulators[3].conditions).toEqual([ifOn])
    expect(manipulators[4].from).toEqual({ key_code: 'caps_lock' })
    expect(manipulators[4].to).toEqual([toOff, toLayerVarOff])
    expect(manipulators[4].conditions).toEqual([ifOn])
  })

  test('leader() set escape keys', () => {
    let rule = layer('a').leaderMode({ escape: 'spacebar' }).build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators[1].from).toEqual({ key_code: 'spacebar' })
    expect(manipulators[1].to?.[0]).toEqual(toSetVar('layer-a', 0))
    expect(manipulators[1].conditions).toEqual([ifVar('layer-a', 1).build()])

    let rule2 = layer('b')
      .leaderMode({ escape: ['spacebar', { pointing_button: 2 }] })
      .build()
    let manipulators2 = rule2.manipulators as BasicManipulator[]
    expect(manipulators2[1].from).toEqual({ key_code: 'spacebar' })
    expect(manipulators2[1].to?.[0]).toEqual(toSetVar('layer-b', 0))
    expect(manipulators2[1].conditions).toEqual([ifVar('layer-b', 1).build()])
    expect(manipulators2[2].from).toEqual({ pointing_button: 2 })
    expect(manipulators2[2].to?.[0]).toEqual(toSetVar('layer-b', 0))
    expect(manipulators2[2].conditions).toEqual([ifVar('layer-b', 1).build()])
  })

  test('leader() with notification()', () => {
    let rule = layer('a', 'v')
      .leaderMode()
      .notification()
      .manipulators({ 1: toKey(2) })
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(4)

    // layer toggle
    expect(manipulators[0].to_after_key_up).toBeUndefined()
    expect(manipulators[0].to?.[2]).toEqual(
      toNotificationMessage('layer-v', 'Layer - v'),
    )

    let remove = toRemoveNotificationMessage('layer-v')
    // layer key
    expect(manipulators[1].to?.[3]).toEqual(remove)
    // escape keys
    expect(manipulators[2].to?.[2]).toEqual(remove)
    expect(manipulators[3].to?.[2]).toEqual(remove)

    let rule2 = layer('b').notification('Test B').build()
    let manipulators2 = rule2.manipulators as BasicManipulator[]
    expect(manipulators2[0].to?.[2]).toEqual(
      toNotificationMessage('layer-layer-b', 'Test B'),
    )
  })

  test('leader() with sticky', () => {
    let rule = layer('a')
      .leaderMode({ sticky: true })
      .notification()
      .manipulators({ 1: toKey(2) })
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(4)

    let ifOn = ifVar('layer-a', 1).build()
    let toOff = toSetVar('layer-a', 0)
    let toLayerVarOff = toSetVar('__layer', 0)
    let remove = toRemoveNotificationMessage('layer-layer-a')

    // layer key
    expect(manipulators[1].to?.length).toEqual(1)
    expect(manipulators[1].conditions).toEqual([ifOn])
    // escape keys
    expect(manipulators[2].conditions).toEqual([ifOn])
    expect(manipulators[2].to).toEqual([toOff, toLayerVarOff, remove])
    expect(manipulators[3].conditions).toEqual([ifOn])
    expect(manipulators[3].to).toEqual([toOff, toLayerVarOff, remove])
  })

  test('leader() and mapDoubleTap()', () => {
    let rule = layer('a')
      .leaderMode({ sticky: true })
      .notification()
      .manipulators([mapDoubleTap(1).to(2).singleTap(toKey(3))])
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(5)

    let ifOn = ifVar('layer-a', 1).build()
    let toOff = toSetVar('layer-a', 0)
    let toLayerVarOff = toSetVar('__layer', 0)
    let remove = toRemoveNotificationMessage('layer-layer-a')

    // the second tap
    expect(manipulators[1].to).toEqual([{ key_code: '2' }])
    expect(manipulators[1].conditions).toEqual([
      { name: 'double-tap-1', type: 'variable_if', value: 1 },
    ])

    // the first tap
    expect(manipulators[2].to).toEqual([
      { set_variable: { name: 'double-tap-1', value: 1 } },
    ])
    expect(manipulators[2].conditions).toEqual([
      { name: 'double-tap-1', type: 'variable_unless', value: 1 },
      ifOn,
    ])

    // escape keys
    expect(manipulators[3].conditions).toEqual([ifOn])
    expect(manipulators[3].to).toEqual([toOff, toLayerVarOff, remove])
    expect(manipulators[4].conditions).toEqual([ifOn])
    expect(manipulators[4].to).toEqual([toOff, toLayerVarOff, remove])
  })
})

describe('layer().delay()', () => {
  test('delay() with defaults', () => {
    let rule = layer('a')
      .delay()
      .manipulators({ 1: toKey(2) })
      .build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(2)
    expect(manipulators[0]).toEqual({
      type: 'basic',
      from: { key_code: 'a' },

      conditions: [
        { type: 'variable_if', name: 'layer-a', value: 0 },
        { type: 'variable_unless', name: '__layer', value: 1 },
      ],

      to: [
        { set_variable: { name: 'layer-a', value: '__delay' } },
        { set_variable: { name: '__layer', value: 1 } },
      ],

      to_if_alone: [
        { key_code: 'a' },
        { set_variable: { name: 'layer-a', value: 0 } },
      ],

      to_after_key_up: [
        { set_variable: { name: 'layer-a', value: 0 } },
        { set_variable: { name: '__layer', value: 0 } },
      ],

      to_if_held_down: [
        { set_variable: { name: 'layer-a', value: 1 } }, //
      ],

      to_delayed_action: {
        to_if_invoked: [],
        to_if_canceled: [
          {
            key_code: 'a',
            conditions: [
              { type: 'variable_if', name: 'layer-a', value: '__delay' },
            ],
          },
          {
            set_variable: { name: 'layer-a', value: 0 },
            conditions: [
              { type: 'variable_if', name: 'layer-a', value: '__delay' },
            ],
          },
        ],
      },

      parameters: {
        'basic.to_if_held_down_threshold_milliseconds': 200,
        'basic.to_delayed_action_delay_milliseconds': 200,
        'basic.to_if_alone_timeout_milliseconds': 200,
      },
    } as BasicManipulator)
    expect(manipulators[1].conditions).toEqual([
      { type: 'variable_if', name: 'layer-a', value: 1 },
    ])
  })

  test('delay() with delay param', () => {
    let rule = layer('a').delay(100).build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators[0].parameters).toEqual({
      'basic.to_if_held_down_threshold_milliseconds': 100,
      'basic.to_delayed_action_delay_milliseconds': 100,
      'basic.to_if_alone_timeout_milliseconds': 100,
    })
  })

  test('delay() with notification', () => {
    let rule = layer('a').delay().notification().build()
    let manipulators = rule.manipulators as BasicManipulator[]
    expect(manipulators.length).toBe(1)
    expect(manipulators[0].to_if_held_down?.[1]).toEqual({
      set_notification_message: {
        id: 'layer-layer-a',
        text: 'Layer - layer-a',
      },
    })
    expect(manipulators[0].to_after_key_up?.[2]).toEqual({
      set_notification_message: { id: 'layer-layer-a', text: '' },
    })
    expect(manipulators[0].to_delayed_action?.to_if_canceled?.[2]).toEqual({
      set_notification_message: { id: 'layer-layer-a', text: '' },
      conditions: [{ type: 'variable_if', name: 'layer-a', value: '__delay' }],
    })

    let ruleB = layer('a').delay().notification('test-b').build()
    let manipulatorB = ruleB.manipulators[0] as BasicManipulator
    expect(manipulatorB.to_if_held_down?.[1]).toEqual({
      set_notification_message: {
        id: 'layer-layer-a',
        text: 'test-b',
      },
    })
  })
})
