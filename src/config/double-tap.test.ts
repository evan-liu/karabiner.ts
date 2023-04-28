import { expect, test } from 'vitest'
import { mapDoubleTap } from './double-tap'

test('mapDoubleTap()', () => {
  expect(mapDoubleTap(1).to(2).build()).toEqual([
    {
      type: 'basic',
      from: { key_code: '1' },
      to: [
        { key_code: '2' },
        { set_variable: { name: 'double-tap-1', value: 1 } },
      ],
      conditions: [{ name: 'double-tap-1', type: 'variable_if', value: 1 }],
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
        to_if_canceled: [{ set_variable: { name: 'double-tap-1', value: 0 } }],
      },
      parameters: { 'basic.to_delayed_action_delay_milliseconds': 200 },
    },
  ])

  expect(mapDoubleTap(1, 11).to(2).build()[1].parameters).toEqual({
    'basic.to_delayed_action_delay_milliseconds': 11,
  })
})
