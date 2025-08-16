import { expect, test } from 'vitest'

import {
  BasicManipulator,
  FromEvent,
  FromKeyType,
  FromSimultaneousEvent,
} from '../karabiner/karabiner-config'
import {
  fromOnlyKeyCodes,
  stickyModifierKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code'

import { ifVar } from './condition'
import { map } from './from'
import { simlayer } from './simlayer'
import {
  toKey,
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
} from './to'

test('simlayer()', () => {
  let layer = simlayer('a', 'b-mode', 1, true, false).manipulators([
    map('c').to('d'),
    map('e'),
  ])
  let rule = layer.build()
  expect(rule.description).toBe(`Simlayer - b-mode`)
  expect(layer.description('test').build().description).toBe('test')

  let manipulators = rule.manipulators as BasicManipulator[]
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
      modifiers: { optional: ['any'] },
    },
  })

  // Add variable condition to manipulators
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_if', name: 'b-mode', value: true },
  ])
  expect(manipulators[0].from.modifiers).toEqual({ optional: ['any'] })
})

test('simlayer() default varName', () => {
  let rule = simlayer('a')
    .manipulators([map('c').to('d')])
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[0].conditions).toEqual([
    { type: 'variable_if', name: 'simlayer-a', value: 1 },
  ])
})

test('simlayer() with multiple key', () => {
  let rule = simlayer(['a', 'b'], 'c')
    .manipulators([map(1).to(2)])
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(3)

  let from = manipulators.map((v) => v.from) as any[]
  from[1].simultaneous[0].key_code = from[2].simultaneous[0].key_code
  expect(manipulators[1]).toEqual(manipulators[2])
})

test('simlayer() with conditions', () => {
  let rule = simlayer('a', 'b')
    .condition(ifVar('c'))
    .manipulators([map(1).to(2)])
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators[1].conditions).toEqual([
    { type: 'variable_if', name: 'c', value: 1 },
  ])
})

test('simlayer() validation errors', () => {
  expect(() => simlayer('a', '').manipulators([]).build()).toThrow(
    /manipulators.*empty/,
  )

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

test('simlayer().enableLayer()', () => {
  expect(() => simlayer('a', 'b').enableLayer('a')).toThrowError()
  expect(() =>
    simlayer('a', 'b').enableLayer('c', 'd').enableLayer('c'),
  ).toThrowError()

  let rule = simlayer('a', 'b')
    .enableLayer('c')
    .condition(ifVar('d'))
    .manipulators([map(1).to(2)])
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(3)
  expect(manipulators[0]).toEqual({
    type: 'basic',
    from: { key_code: 'c', modifiers: { optional: ['any'] } },
    to: [
      { set_variable: { name: 'b', value: 1 } },
      { set_variable: { name: '__layer', value: 1 } },
    ],
    to_after_key_up: [
      { set_variable: { name: 'b', value: 0 } },
      { set_variable: { name: '__layer', value: 0 } },
    ],
    to_if_alone: [{ key_code: 'c' }],
    conditions: [
      { type: 'variable_unless', name: 'b', value: 1 },
      { type: 'variable_unless', name: '__layer', value: 1 },
      { type: 'variable_if', name: 'd', value: 1 },
    ],
  })
})

test('simlayer().modifiers()', () => {
  expect(
    simlayer('a', 'b')
      .modifiers('›⌘')
      .manipulators([map(1).to(2)])
      .build().manipulators[1].from?.modifiers,
  ).toEqual({ mandatory: ['right_command'] })

  expect(
    simlayer('a', 'b')
      .modifiers({ optional: '⇪' })
      .manipulators([map(1).to(2)])
      .build().manipulators[1].from?.modifiers,
  ).toEqual({ optional: ['caps_lock'] })

  expect(
    simlayer('a', 'b')
      .modifiers('?⇪')
      .manipulators([map(1).to(2)])
      .build().manipulators[1].from?.modifiers,
  ).toEqual({ optional: ['caps_lock'] })

  expect(
    simlayer('a', 'b')
      .modifiers(null)
      .manipulators([map(1).to(2)])
      .build().manipulators[1].from?.modifiers,
  ).toBeUndefined()
})

test('simlayer().options()', () => {
  expect(
    (
      simlayer('a', 'b')
        .options({ to_after_key_up: [toKey('x')] })
        .manipulators([map(1).to(2)])
        .build().manipulators[1].from as FromSimultaneousEvent
    ).simultaneous_options?.to_after_key_up?.[0],
  ).toEqual({ key_code: 'x' })
})

test('simlayer() invalid key', () => {
  expect(() => simlayer('' as any, '')).toThrow('key_code')
  expect(() => simlayer(toOnlyKeyCodes[0] as any, '')).toThrow('layer key')
  expect(() => simlayer(fromOnlyKeyCodes[0] as any, '')).toThrow('layer key')
  expect(() => simlayer(stickyModifierKeyCodes[0] as any, '')).toThrow(
    'layer key',
  )
  expect(() => simlayer(1, '').enableLayer('' as any)).toThrow('key_code')
  expect(() => simlayer(1, '').enableLayer(toOnlyKeyCodes[0] as any)).toThrow(
    'layer key',
  )
  expect(() => simlayer(1, '').enableLayer(fromOnlyKeyCodes[0] as any)).toThrow(
    'layer key',
  )
  expect(() =>
    simlayer(1, '').enableLayer(stickyModifierKeyCodes[0] as any),
  ).toThrow('layer key')
})

test('simlayer().toIfActivated() toIfDeactivated()', () => {
  let rule = simlayer('a', 'b')
    .manipulators([map(1).to(2)])
    .toIfActivated(toNotificationMessage('testId', 'testMsg'))
    .toIfDeactivated(toRemoveNotificationMessage('testId'))
    .build()
  let manipulators = rule.manipulators as BasicManipulator[]
  expect(manipulators.length).toBe(2)
  expect(manipulators[1].to?.[2]).toEqual({
    set_notification_message: { id: 'testId', text: 'testMsg' },
  })
  let from = manipulators[1].from as Extract<
    FromEvent,
    { simultaneous: FromKeyType[] }
  >
  expect(from.simultaneous_options?.to_after_key_up?.[1]).toEqual({
    set_notification_message: { id: 'testId', text: '' },
  })
})
