import { FromKeyCode } from '../karabiner/key-code'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { FromModifierParam, parseFromModifierParams } from './modifier'
import { BasicManipulatorBuilder } from './manipulator'
import { FromEvent, SimultaneousOptions } from '../karabiner/karabiner-config'
import { FromConsumerKeyCode } from '../karabiner/consumer-key-code'
import { PointingButton } from '../karabiner/pointing-button'

export type FromKeyParam = FromKeyCode | KeyAlias | NumberKeyValue

export function map(from: FromEvent): BasicManipulatorBuilder
export function map(
  key: FromKeyParam,
  mandatoryModifiers?: FromModifierParam,
  optionalModifiers?: FromModifierParam,
): BasicManipulatorBuilder
export function map(
  keyOrEvent: FromKeyParam | FromEvent,
  mandatoryModifiers?: FromModifierParam,
  optionalModifiers?: FromModifierParam,
) {
  if (typeof keyOrEvent === 'object')
    return new BasicManipulatorBuilder(keyOrEvent)

  return new BasicManipulatorBuilder({
    key_code: getKeyWithAlias(keyOrEvent) as FromKeyCode,
    modifiers: parseFromModifierParams(mandatoryModifiers, optionalModifiers),
  })
}

export function mapSimultaneous(
  keys: FromKeyParam[],
  options?: SimultaneousOptions,
  threshold?: number,
) {
  const manipulatorBuilder = new BasicManipulatorBuilder({
    simultaneous: keys.map((v) => ({ key_code: getKeyWithAlias(v) })),
    simultaneous_options: options,
  })
  return threshold
    ? manipulatorBuilder.parameters({
        'basic.simultaneous_threshold_milliseconds': threshold,
      })
    : manipulatorBuilder
}

export function mapConsumerKey(
  code: FromConsumerKeyCode,
  mandatoryModifiers?: FromModifierParam,
  optionalModifiers?: FromModifierParam,
) {
  return new BasicManipulatorBuilder({
    consumer_key_code: code,
    modifiers: parseFromModifierParams(mandatoryModifiers, optionalModifiers),
  })
}

/**
 * **Caution**
 * Be careful using "pointing_button": "button1" and "any": "pointing_button".
 * You may lose the left click button and system will be unusable.
 */
export function mapPointingButton(
  button: PointingButton,
  mandatoryModifiers?: FromModifierParam,
  optionalModifiers?: FromModifierParam,
) {
  return new BasicManipulatorBuilder({
    pointing_button: button,
    modifiers: parseFromModifierParams(mandatoryModifiers, optionalModifiers),
  })
}
