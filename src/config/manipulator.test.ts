import { describe, expect, test } from 'vitest'

import { FromEvent, ToEvent } from '../karabiner/karabiner-config'

import { ifEventChanged } from './condition'
import {
  BasicManipulatorBuilder,
  buildManipulators,
  isManipulatorBuilder,
} from './manipulator'
import { toKey } from './to.ts'

describe('ManipulatorBuilder', () => {
  let from: FromEvent = { key_code: 'a' }
  let toEvent: ToEvent = { key_code: 'b', modifiers: ['command'], lazy: true }

  test('type and from', () => {
    let builder = new BasicManipulatorBuilder(from)
    expect(builder.from).toEqual(from)
    expect(builder.build()[0]).toEqual({ type: 'basic', from })
  })

  test('to()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .to(toEvent)
        .to('b', '⌘', { lazy: true })
        .build()[0].to,
    ).toEqual([toEvent, toEvent])
  })

  test('to([])', () => {
    expect(new BasicManipulatorBuilder(from).to([]).build()[0].to).toEqual([])
  })

  test('toHyper(), toMeh(), toSuperHyper()', () => {
    expect(new BasicManipulatorBuilder(from).toHyper().build()[0].to).toEqual([
      { key_code: 'left_command', modifiers: ['option', 'control', 'shift'] },
    ])
    expect(new BasicManipulatorBuilder(from).toMeh().build()[0].to).toEqual([
      { key_code: 'left_option', modifiers: ['control', 'shift'] },
    ])
    expect(
      new BasicManipulatorBuilder(from).toSuperHyper().build()[0].to,
    ).toEqual([
      { key_code: 'fn', modifiers: ['command', 'option', 'control', 'shift'] },
    ])
  })

  test('toNone()', () => {
    expect(new BasicManipulatorBuilder(from).toNone().build()[0].to).toEqual([
      { key_code: 'vk_none' },
    ])
  })

  test('toConsumerKey()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toConsumerKey('rewind')
        .toConsumerKey('mute', '⌘', { lazy: true })
        .build()[0].to,
    ).toEqual([
      { consumer_key_code: 'rewind' },
      { consumer_key_code: 'mute', modifiers: ['command'], lazy: true },
    ])
  })

  test('toPointingButton()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toPointingButton('button2')
        .toPointingButton('button3', '⌘', { lazy: true })
        .build()[0].to,
    ).toEqual([
      { pointing_button: 'button2' },
      { pointing_button: 'button3', modifiers: ['command'], lazy: true },
    ])
  })

  test('to$(), toApp(), toPaste()', () => {
    let to = new BasicManipulatorBuilder(from)
      .to$('cd')
      .toApp('Finder')
      .toApp('Xcode.app')
      .toPaste('test')
      .build()[0].to as Array<{ shell_command: string }>
    expect(to[0]).toEqual({ shell_command: 'cd' })
    expect(to[1]).toEqual({ shell_command: 'open -a "Finder".app' })
    expect(to[2]).toEqual({ shell_command: 'open -a "Xcode".app' })
    expect(to[3].shell_command).toMatch('"test"')
  })

  test('toApp() with space in name', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toApp('System Settings')
        .toApp('System Settings.app')
        .toApp('"System Settings"')
        .toApp('"System Settings.app"')
        .toApp('\n')
        .build()[0].to as Array<{ shell_command: string }>,
    ).toEqual([
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "\n".app' },
    ])
  })

  test('toInputSource()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toInputSource({ language: 'en' })
        .build()[0].to,
    ).toEqual([{ select_input_source: { language: 'en' } }])
  })

  test('toVar()', () => {
    expect(
      new BasicManipulatorBuilder(from).toVar('a', 1).toVar('b', 2).build()[0]
        .to,
    ).toEqual([
      { set_variable: { name: 'a', value: 1 } },
      { set_variable: { name: 'b', value: 2 } },
    ])
    expect(
      new BasicManipulatorBuilder(from).toVar('a', 1, 2).build()[0].to,
    ).toEqual([{ set_variable: { name: 'a', value: 1, key_up_value: 2 } }])
    expect(
      new BasicManipulatorBuilder(from).toVar('a', 1, 2, 'unset').build()[0].to,
    ).toEqual([
      { set_variable: { name: 'a', value: 1, key_up_value: 2, type: 'unset' } },
    ])
  })

  test('toUnsetVar()', () => {
    expect(
      new BasicManipulatorBuilder(from).toUnsetVar('a').build()[0].to,
    ).toEqual([{ set_variable: { name: 'a', type: 'unset' } }])
  })

  test('toNotificationMessage()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toNotificationMessage('a', 'b')
        .build()[0].to,
    ).toEqual([{ set_notification_message: { id: 'a', text: 'b' } }])
  })

  test('toRemoveNotificationMessage()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toRemoveNotificationMessage('a')
        .build()[0].to,
    ).toEqual([{ set_notification_message: { id: 'a', text: '' } }])
  })

  test('toMouseKey()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toMouseKey({ x: 100, y: -100 })
        .toMouseKey({ horizontal_wheel: -100 })
        .toMouseKey({ speed_multiplier: 2 })
        .build()[0].to,
    ).toEqual([
      { mouse_key: { x: 100, y: -100 } },
      { mouse_key: { horizontal_wheel: -100 } },
      { mouse_key: { speed_multiplier: 2 } },
    ])
  })

  test('toStickyModifier()', () => {
    let manipulator = new BasicManipulatorBuilder(from)
      .toStickyModifier('fn')
      .build()[0]
    expect(manipulator.to).toEqual([{ sticky_modifier: { fn: 'toggle' } }])
  })

  test('toCgEventDoubleClick()', () => {
    let manipulator = new BasicManipulatorBuilder(from)
      .toCgEventDoubleClick(1)
      .build()[0]
    expect(manipulator.to).toEqual([
      { software_function: { cg_event_double_click: { button: 1 } } },
    ])
  })

  test('toMouseCursorPosition()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toMouseCursorPosition({ x: 0, y: 0 })
        .toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 })
        .build()[0].to,
    ).toEqual([
      { software_function: { set_mouse_cursor_position: { x: 0, y: 0 } } },
      {
        software_function: {
          set_mouse_cursor_position: { x: '50%', y: '50%', screen: 1 },
        },
      },
    ])
  })

  test('toSleepSystem()', () => {
    expect(
      new BasicManipulatorBuilder(from).toSleepSystem().build()[0].to,
    ).toEqual([
      { software_function: { iokit_power_management_sleep_system: {} } },
    ])
  })

  test('toIfAlone()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toIfAlone(toEvent)
        .toIfAlone('b', '⌘', { lazy: true })
        .build()[0].to_if_alone,
    ).toEqual([toEvent, toEvent])
    expect(
      new BasicManipulatorBuilder(from).toIfAlone([toEvent, toEvent]).build()[0]
        .to_if_alone,
    ).toEqual([toEvent, toEvent])
  })

  test('toIfHeldDown()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toIfHeldDown(toEvent)
        .toIfHeldDown('b', '⌘', { lazy: true })
        .build()[0].to_if_held_down,
    ).toEqual([toEvent, toEvent])
    expect(
      new BasicManipulatorBuilder(from)
        .toIfHeldDown([toEvent, toEvent])
        .build()[0].to_if_held_down,
    ).toEqual([toEvent, toEvent])
  })

  test('toAfterKeyUp()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toAfterKeyUp(toEvent)
        .toAfterKeyUp('b', '⌘', { lazy: true })
        .build()[0].to_after_key_up,
    ).toEqual([toEvent, toEvent])
    expect(
      new BasicManipulatorBuilder(from)
        .toAfterKeyUp([toEvent, toEvent])
        .build()[0].to_after_key_up,
    ).toEqual([toEvent, toEvent])
  })

  test('toDelayedAction()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .toDelayedAction([{ key_code: 'a' }], [{ key_code: 'b' }])
        .toDelayedAction([{ key_code: 'c' }], { key_code: 'd' })
        .build()[0].to_delayed_action,
    ).toEqual({
      to_if_invoked: [{ key_code: 'a' }, { key_code: 'c' }],
      to_if_canceled: [{ key_code: 'b' }, { key_code: 'd' }],
    })
  })

  test('description()', () => {
    let manipulatorBuilder = new BasicManipulatorBuilder(from)
    expect(manipulatorBuilder.build()[0].description).toBeUndefined()
    manipulatorBuilder.description('a')
    expect(manipulatorBuilder.build()[0].description).toBe('a')
    manipulatorBuilder.description('b')
    expect(manipulatorBuilder.build()[0].description).toBe('b')
  })

  test('condition()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .condition(ifEventChanged())
        .condition(ifEventChanged(false), ifEventChanged())
        .build()[0].conditions,
    ).toEqual([
      { type: 'event_changed_if', value: true },
      { type: 'event_changed_if', value: false },
      { type: 'event_changed_if', value: true },
    ])
  })

  test('parameters()', () => {
    expect(
      new BasicManipulatorBuilder(from)
        .parameters({
          'basic.simultaneous_threshold_milliseconds': 1,
          'basic.to_if_alone_timeout_milliseconds': 2,
        })
        .parameters({
          'basic.simultaneous_threshold_milliseconds': 3,
        })
        .build()[0].parameters,
    ).toEqual({
      'basic.simultaneous_threshold_milliseconds': 3,
      'basic.to_if_alone_timeout_milliseconds': 2,
    })
  })
})

test('isManipulatorBuilder()', () => {
  let from: FromEvent = { key_code: 'a' }
  expect(isManipulatorBuilder({ type: 'basic', from })).toBe(false)
  expect(isManipulatorBuilder(new BasicManipulatorBuilder(from))).toBe(true)
})

test('buildManipulators(ManipulatorMap)', () => {
  let manipulators = buildManipulators({
    1: toKey(2),
    3: [toKey(4), toKey(5)],
  })
  expect(manipulators).toEqual([
    { type: 'basic', from: { key_code: '1' }, to: [{ key_code: '2' }] },
    {
      type: 'basic',
      from: { key_code: '3' },
      to: [{ key_code: '4' }, { key_code: '5' }],
    },
  ])
})
