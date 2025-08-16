import { describe, expect, test } from 'vitest'

import { mapDoubleTap } from './double-tap'
import { toKey } from './to'

describe('mapDoubleTap()', () => {
  test('to_delayed_action', () => {
    expect(mapDoubleTap(1).to(2).build()).toEqual([
      {
        type: 'basic',
        from: { key_code: '1' },
        to: [{ key_code: '2' }],
        conditions: [{ name: 'double-tap-1', type: 'variable_if', value: 1 }],
        description: '__support__manipulator',
      },
      {
        type: 'basic',
        from: { key_code: '1' },
        to: [{ set_variable: { name: 'double-tap-1', value: 1 } }],
        conditions: [
          {
            description: undefined,
            name: 'double-tap-1',
            type: 'variable_unless',
            value: 1,
          },
        ],
        to_delayed_action: {
          to_if_invoked: [
            { key_code: '1' },
            { set_variable: { name: 'double-tap-1', value: 0 } },
          ],
          to_if_canceled: [
            { set_variable: { name: 'double-tap-1', value: 0 } },
          ],
        },
        parameters: {
          'basic.to_delayed_action_delay_milliseconds': 200,
          'basic.to_if_held_down_threshold_milliseconds': 200,
        },
      },
    ])
  })

  test('parameters', () => {
    expect(mapDoubleTap(1, 11).to(2).build()[1].parameters).toEqual({
      'basic.to_delayed_action_delay_milliseconds': 11,
      'basic.to_if_held_down_threshold_milliseconds': 11,
    })
  })

  test('toSingleTap()', () => {
    expect(
      mapDoubleTap(1).singleTap(toKey(0)).to(2).build()[1].to_delayed_action
        ?.to_if_invoked[0],
    ).toEqual({ key_code: '0' })

    expect(mapDoubleTap(1).singleTap(null).delay(11).to(2).build()).toEqual([
      {
        type: 'basic',
        from: { key_code: '1' },
        to: [{ key_code: '2' }],
        conditions: [{ name: 'double-tap-1', type: 'variable_if', value: 1 }],
        description: '__support__manipulator',
      },
      {
        type: 'basic',
        from: { key_code: '1' },
        to: [{ set_variable: { name: 'double-tap-1', value: 1 } }],
        conditions: [
          {
            description: undefined,
            name: 'double-tap-1',
            type: 'variable_unless',
            value: 1,
          },
        ],
        to_delayed_action: {
          to_if_invoked: [{ set_variable: { name: 'double-tap-1', value: 0 } }],
          to_if_canceled: [
            { set_variable: { name: 'double-tap-1', value: 0 } },
          ],
        },
        parameters: {
          'basic.to_delayed_action_delay_milliseconds': 11,
          'basic.to_if_held_down_threshold_milliseconds': 11,
        },
      },
    ])
  })

  test('with modifiers', () => {
    expect(
      mapDoubleTap(1, '⌘').to(2).build()[1].to_delayed_action?.to_if_invoked[0],
    ).toEqual({ key_code: '1', modifiers: ['command'] })

    expect(mapDoubleTap(1).to(2).build()[1].from).toEqual({ key_code: '1' })
    expect(mapDoubleTap(1, '⌘').to(2).build()[1].from).toEqual({
      key_code: '1',
      modifiers: { mandatory: ['command'] },
    })
    expect(mapDoubleTap(1, '⌘', '⌥').to(2).build()[1].from).toEqual({
      key_code: '1',
      modifiers: { mandatory: ['command'], optional: ['option'] },
    })
    expect(mapDoubleTap(1, 'optionalAny').to(2).build()[1].from).toEqual({
      key_code: '1',
      modifiers: { optional: ['any'] },
    })
    expect(mapDoubleTap(1, '‹⌘', '›⌥').to(2).build()[1].from).toEqual({
      key_code: '1',
      modifiers: { mandatory: ['left_command'], optional: ['right_option'] },
    })
    expect(mapDoubleTap(1, '?>⌘').to(2).build()[1].from).toEqual({
      key_code: '1',
      modifiers: { optional: ['right_command'] },
    })

    expect(
      [
        mapDoubleTap(1, 11),
        mapDoubleTap(1, '⌘', 22),
        mapDoubleTap(1, '⌘', '⌥', 33),
        mapDoubleTap(1, 'optionalAny', 44),
      ].map((v) => {
        let { from, parameters } = v.to(2).build()[1]
        return [
          from.modifiers,
          parameters?.['basic.to_delayed_action_delay_milliseconds'],
        ]
      }),
    ).toEqual([
      [undefined, 11],
      [{ mandatory: ['command'] }, 22],
      [{ mandatory: ['command'], optional: ['option'] }, 33],
      [{ optional: ['any'] }, 44],
    ])
  })

  test('on modifiers', () => {
    expect(mapDoubleTap('left_shift').to(1).build()).toEqual([
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [{ key_code: '1' }],
        conditions: [
          { name: 'double-tap-left_shift', type: 'variable_if', value: 1 },
        ],
        description: '__support__manipulator',
      },
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [
          { set_variable: { name: 'double-tap-left_shift', value: 1 } },
          { key_code: 'left_shift', lazy: true },
        ],
        to_if_held_down: [{ key_code: 'left_shift' }],
        conditions: [
          {
            description: undefined,
            name: 'double-tap-left_shift',
            type: 'variable_unless',
            value: 1,
          },
        ],
        to_delayed_action: {
          to_if_invoked: [
            { key_code: 'left_shift' },
            { set_variable: { name: 'double-tap-left_shift', value: 0 } },
          ],
          to_if_canceled: [
            { set_variable: { name: 'double-tap-left_shift', value: 0 } },
          ],
        },
        parameters: {
          'basic.to_delayed_action_delay_milliseconds': 200,
          'basic.to_if_held_down_threshold_milliseconds': 200,
        },
      },
    ])

    expect(
      mapDoubleTap('left_shift').to(1).singleTap(toKey(2)).build(),
    ).toEqual([
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [{ key_code: '1' }],
        conditions: [
          { name: 'double-tap-left_shift', type: 'variable_if', value: 1 },
        ],
        description: '__support__manipulator',
      },
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [{ set_variable: { name: 'double-tap-left_shift', value: 1 } }],
        conditions: [
          {
            description: undefined,
            name: 'double-tap-left_shift',
            type: 'variable_unless',
            value: 1,
          },
        ],
        to_delayed_action: {
          to_if_invoked: [
            { key_code: '2' },
            { set_variable: { name: 'double-tap-left_shift', value: 0 } },
          ],
          to_if_canceled: [
            { set_variable: { name: 'double-tap-left_shift', value: 0 } },
          ],
        },
        parameters: {
          'basic.to_delayed_action_delay_milliseconds': 200,
          'basic.to_if_held_down_threshold_milliseconds': 200,
        },
      },
    ])

    expect(mapDoubleTap('left_shift').to(1).singleTap(null).build()).toEqual([
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [{ key_code: '1' }],
        conditions: [
          { name: 'double-tap-left_shift', type: 'variable_if', value: 1 },
        ],
        description: '__support__manipulator',
      },
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [{ set_variable: { name: 'double-tap-left_shift', value: 1 } }],
        conditions: [
          {
            description: undefined,
            name: 'double-tap-left_shift',
            type: 'variable_unless',
            value: 1,
          },
        ],
        to_delayed_action: {
          to_if_invoked: [
            { set_variable: { name: 'double-tap-left_shift', value: 0 } },
          ],
          to_if_canceled: [
            { set_variable: { name: 'double-tap-left_shift', value: 0 } },
          ],
        },
        parameters: {
          'basic.to_delayed_action_delay_milliseconds': 200,
          'basic.to_if_held_down_threshold_milliseconds': 200,
        },
      },
    ])
  })
})
