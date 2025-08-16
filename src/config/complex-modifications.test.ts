import { describe, expect, test } from 'vitest'

import { BasicManipulator } from '../karabiner/karabiner-config'
import { fromOnlyKeyCodes, toOnlyKeyCodes } from '../karabiner/key-code'

import { complexModifications } from './complex-modifications'
import { mapDoubleTap } from './double-tap'
import { map } from './from'
import { rule } from './rule'
import { simlayer } from './simlayer'

describe('complexModifications()', () => {
  test('Parameters', () => {
    let result = complexModifications(
      [
        rule('test').manipulators([mapDoubleTap(1).to(2)]),
        simlayer('a', 'b').manipulators([map('a').to('b')]),
      ],
      {
        'basic.simultaneous_threshold_milliseconds': 1,
        'double_tap.delay_milliseconds': 2,
        'simlayer.threshold_milliseconds': 3,
      },
    )
    expect(result.parameters['basic.simultaneous_threshold_milliseconds']).toBe(
      1,
    )
    expect(result.rules.length).toBe(2)
    expect(result.rules[0].manipulators.length).toBe(2)

    expect(
      (result.rules[0].manipulators as BasicManipulator[]).find(
        (v) => v.parameters?.['basic.to_delayed_action_delay_milliseconds'],
      )?.parameters?.['basic.to_delayed_action_delay_milliseconds'],
    ).toBe(2)

    expect(
      (result.rules[1].manipulators as BasicManipulator[]).find(
        (v) => v.parameters?.['basic.simultaneous_threshold_milliseconds'],
      )?.parameters?.['basic.simultaneous_threshold_milliseconds'],
    ).toBe(3)
  })

  test('Throw empty errors', () => {
    expect(() => complexModifications([])).toThrow()

    expect(() =>
      complexModifications([{ manipulators: [], description: '' }]),
    ).toThrow()

    expect(() =>
      complexModifications([
        { manipulators: map(1).to(2).build(), description: '' },
        { manipulators: [], description: '' },
      ]),
    ).not.toThrow()
  })

  test('Check key', () => {
    expect(() => mapDoubleTap(fromOnlyKeyCodes[0] as any)).toThrow(
      /key.*double\s*tap/i,
    )
    expect(() => mapDoubleTap(toOnlyKeyCodes[0] as any)).toThrow(
      /key.*double\s*tap/i,
    )
  })
})
