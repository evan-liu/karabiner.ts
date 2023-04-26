import { FromKeyCode } from '../karabiner/key-code'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { FromModifierParam, parseFromModifierParams } from './modifier'
import { ManipulatorBuilder } from './manipulator'
import { SimultaneousOptions } from '../karabiner/karabiner-config'
import { FromConsumerKeyCode } from '../karabiner/consumer-key-code'
import { PointingButton } from '../karabiner/pointing-button'

export type FromKeyParam = FromKeyCode | KeyAlias | NumberKeyValue

export function map(
  key: FromKeyParam,
  mandatoryModifiers?: FromModifierParam,
  optionalModifiers?: FromModifierParam,
) {
  return new ManipulatorBuilder({
    key_code: getKeyWithAlias(key) as FromKeyCode,
    modifiers: parseFromModifierParams(mandatoryModifiers, optionalModifiers),
  })
}

export function mapSimultaneous(
  keys: FromKeyParam[],
  options?: SimultaneousOptions,
  threshold?: number,
) {
  const manipulatorBuilder = new ManipulatorBuilder({
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
  return new ManipulatorBuilder({
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
  return new ManipulatorBuilder({
    pointing_button: button,
    modifiers: parseFromModifierParams(mandatoryModifiers, optionalModifiers),
  })
}
