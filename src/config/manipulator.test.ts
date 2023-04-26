import { describe, expect, test } from 'vitest'
import { FromEvent, ToEvent } from '../karabiner/karabiner-config'
import { isManipulatorBuilder, ManipulatorBuilder } from './manipulator'
import { ifEventChanged } from './condition'

describe('ManipulatorBuilder', () => {
  const from: FromEvent = { key_code: 'a' }
  const toEvent: ToEvent = { key_code: 'b', modifiers: ['command'], lazy: true }

  test('type and from', () => {
    expect(new ManipulatorBuilder(from).build()).toEqual({
      type: 'basic',
      from,
    })
  })

  test('to()', () => {
    expect(
      new ManipulatorBuilder(from)
        .to(toEvent)
        .to('b', '⌘', { lazy: true })
        .build().to,
    ).toEqual([toEvent, toEvent])
  })

  test('toHyper(), toMeh()', () => {
    expect(new ManipulatorBuilder(from).toHyper().build().to).toEqual([
      { key_code: 'left_command', modifiers: ['option', 'control', 'shift'] },
    ])
    expect(new ManipulatorBuilder(from).toMeh().build().to).toEqual([
      { key_code: 'left_option', modifiers: ['control', 'shift'] },
    ])
  })

  test('toConsumerKey()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toConsumerKey('rewind')
        .toConsumerKey('mute', '⌘', { lazy: true })
        .build().to,
    ).toEqual([
      { consumer_key_code: 'rewind' },
      { consumer_key_code: 'mute', modifiers: ['command'], lazy: true },
    ])
  })

  test('toPointingButton()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toPointingButton('button2')
        .toPointingButton('button3', '⌘', { lazy: true })
        .build().to,
    ).toEqual([
      { pointing_button: 'button2' },
      { pointing_button: 'button3', modifiers: ['command'], lazy: true },
    ])
  })

  test('to$(), toApp(), toPaste()', () => {
    const to = new ManipulatorBuilder(from)
      .to$('cd')
      .toApp('Finder')
      .toApp('Xcode.app')
      .toPaste('test')
      .build().to as Array<{ shell_command: string }>
    expect(to[0]).toEqual({ shell_command: 'cd' })
    expect(to[1]).toEqual({ shell_command: 'open -a "Finder".app' })
    expect(to[2]).toEqual({ shell_command: 'open -a "Xcode".app' })
    expect(to[3].shell_command).toMatch('"test"')
  })

  test('toApp() with space in name', () => {
    expect(
      new ManipulatorBuilder(from)
        .toApp('System Settings')
        .toApp('System Settings.app')
        .toApp('"System Settings"')
        .toApp('"System Settings.app"')
        .build().to as Array<{ shell_command: string }>,
    ).toEqual([
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "System Settings".app' },
      { shell_command: 'open -a "System Settings".app' },
    ])
  })

  test('toVar()', () => {
    expect(
      new ManipulatorBuilder(from).toVar('a', 1).toVar('b', true).build().to,
    ).toEqual([
      { set_variable: { name: 'a', value: 1 } },
      { set_variable: { name: 'b', value: true } },
    ])
  })

  test('toMouseCursorPosition()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toMouseCursorPosition({ x: 0, y: 0 })
        .toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 })
        .build().to,
    ).toEqual([
      { software_function: { set_mouse_cursor_position: { x: 0, y: 0 } } },
      {
        software_function: {
          set_mouse_cursor_position: { x: '50%', y: '50%', screen: 1 },
        },
      },
    ])
  })

  test('toIfAlone()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toIfAlone(toEvent)
        .toIfAlone('b', '⌘', { lazy: true })
        .build().to_if_alone,
    ).toEqual([toEvent, toEvent])
  })

  test('toIfHeldDown()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toIfHeldDown(toEvent)
        .toIfHeldDown('b', '⌘', { lazy: true })
        .build().to_if_held_down,
    ).toEqual([toEvent, toEvent])
  })

  test('toAfterKeyUp()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toAfterKeyUp(toEvent)
        .toAfterKeyUp('b', '⌘', { lazy: true })
        .build().to_after_key_up,
    ).toEqual([toEvent, toEvent])
  })

  test('toDelayedAction()', () => {
    expect(
      new ManipulatorBuilder(from)
        .toDelayedAction([{ key_code: 'a' }], [{ key_code: 'b' }])
        .toDelayedAction([{ key_code: 'c' }], [{ key_code: 'd' }])
        .build().to_delayed_action,
    ).toEqual({
      to_if_invoked: [{ key_code: 'a' }, { key_code: 'c' }],
      to_if_canceled: [{ key_code: 'b' }, { key_code: 'd' }],
    })
  })

  test('description()', () => {
    const manipulatorBuilder = new ManipulatorBuilder(from)
    expect(manipulatorBuilder.build().description).toBeUndefined()
    manipulatorBuilder.description('a')
    expect(manipulatorBuilder.build().description).toBe('a')
    manipulatorBuilder.description('b')
    expect(manipulatorBuilder.build().description).toBe('b')
  })

  test('condition()', () => {
    expect(
      new ManipulatorBuilder(from)
        .condition(ifEventChanged())
        .condition(ifEventChanged(false), ifEventChanged())
        .build().conditions,
    ).toEqual([
      { type: 'event_changed_if', value: true },
      { type: 'event_changed_if', value: false },
      { type: 'event_changed_if', value: true },
    ])
  })

  test('parameters()', () => {
    expect(
      new ManipulatorBuilder(from)
        .parameters({
          'basic.simultaneous_threshold_milliseconds': 1,
          'basic.to_if_alone_timeout_milliseconds': 2,
        })
        .parameters({
          'basic.simultaneous_threshold_milliseconds': 3,
        })
        .build().parameters,
    ).toEqual({
      'basic.simultaneous_threshold_milliseconds': 3,
      'basic.to_if_alone_timeout_milliseconds': 2,
    })
  })
})

test('isManipulatorBuilder()', () => {
  const from: FromEvent = { key_code: 'a' }
  expect(isManipulatorBuilder({ type: 'basic', from })).toBe(false)
  expect(isManipulatorBuilder(new ManipulatorBuilder(from))).toBe(true)
})
