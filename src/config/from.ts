import { FromKeyCode } from '../karabiner/key-code'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { FromModifierParam, parseFromModifierParams } from './modifier'
import { BasicManipulatorBuilder } from './manipulator'
import {
  FromEvent,
  FromKeyType,
  SimultaneousOptions,
} from '../karabiner/karabiner-config'
import { FromConsumerKeyCode } from '../karabiner/consumer-key-code'
import { PointingButton } from '../karabiner/pointing-button'

export type FromKeyParam = FromKeyCode | KeyAlias | NumberKeyValue

/** Start a manipulator with a FromEvent */
export function map(from: FromEvent): BasicManipulatorBuilder
/** Start a manipulator with a from.key_code and modifiers */
export function map(
  key: FromKeyParam,
  mandatoryModifiers?: FromModifierParam | '' | null,
  optionalModifiers?: FromModifierParam,
): BasicManipulatorBuilder
/** Start a manipulator with a from.key_code and optional modifiers */
export function map(
  key: FromKeyParam,
  modifiers: 'optionalAny' | { optional: FromModifierParam },
): BasicManipulatorBuilder
export function map(
  keyOrEvent: FromKeyParam | FromEvent,
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  if (typeof keyOrEvent === 'object')
    return new BasicManipulatorBuilder(keyOrEvent)
  return new BasicManipulatorBuilder({
    key_code: getKeyWithAlias<FromKeyCode>(keyOrEvent),
    modifiers: parseModifierOverload(mandatoryModifiers, optionalModifiers),
  })
}

/** Start a manipulator with from.simultaneous */
export function mapSimultaneous(
  keys: Array<FromKeyParam | FromKeyType>,
  options?: SimultaneousOptions,
  threshold?: number,
) {
  const manipulatorBuilder = new BasicManipulatorBuilder({
    simultaneous: keys.map((v) =>
      typeof v === 'object' ? v : { key_code: getKeyWithAlias<FromKeyCode>(v) },
    ),
    simultaneous_options: options,
  })
  return threshold
    ? manipulatorBuilder.parameters({
        'basic.simultaneous_threshold_milliseconds': threshold,
      })
    : manipulatorBuilder
}

/** Start a manipulator with from.consumer_key_code and modifiers */
export function mapConsumerKey(
  code: FromConsumerKeyCode,
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  return new BasicManipulatorBuilder({
    consumer_key_code: code,
    modifiers: parseModifierOverload(mandatoryModifiers, optionalModifiers),
  })
}

/**
 * Start a manipulator with from.pointing_button and modifiers
 *
 * **Caution**
 * Be careful using "pointing_button": "button1" and "any": "pointing_button".
 * You may lose the left click button and system will be unusable.
 */
export function mapPointingButton(
  button: PointingButton,
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  return new BasicManipulatorBuilder({
    pointing_button: button,
    modifiers: parseModifierOverload(mandatoryModifiers, optionalModifiers),
  })
}

type FromModifierOverloadParam =
  | FromModifierParam
  | ''
  | null
  | 'optionalAny'
  | { optional: FromModifierParam }

function parseModifierOverload(
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  if (!mandatoryModifiers) {
    return parseFromModifierParams(mandatoryModifiers, optionalModifiers)
  } else if (mandatoryModifiers === 'optionalAny') {
    return parseFromModifierParams('', 'any')
  } else if (
    typeof mandatoryModifiers === 'object' &&
    'optional' in mandatoryModifiers
  ) {
    return parseFromModifierParams('', mandatoryModifiers.optional)
  } else {
    return parseFromModifierParams(mandatoryModifiers, optionalModifiers)
  }
}
