import { FromConsumerKeyCode } from '../karabiner/consumer-key-code.ts'
import { FromEvent } from '../karabiner/karabiner-config.ts'
import { FromKeyCode, toOnlyKeyCodes } from '../karabiner/key-code.ts'
import { PointingButton } from '../karabiner/pointing-button.ts'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload.ts'
import {
  getKeyWithAlias,
  KeyAlias,
  NumberKeyValue,
} from '../utils/key-alias.ts'
import { FromOptionalModifierParam } from '../utils/optional-modifiers.ts'

import { BasicManipulatorBuilder } from './manipulator.ts'
import { FromModifierParam, SideModifierAlias } from './modifier.ts'

export type FromKeyParam =
  | FromKeyCode
  | KeyAlias
  | NumberKeyValue
  | SideModifierAlias

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
  modifiers: FromOptionalModifierParam,
): BasicManipulatorBuilder
export function map(
  keyOrEvent: FromKeyParam | FromEvent,
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  if (typeof keyOrEvent == 'object')
    return new BasicManipulatorBuilder(keyOrEvent)

  let keyCode = getKeyWithAlias<FromKeyCode>(
    keyOrEvent,
    toOnlyKeyCodes,
    'for from.key_code',
  )
  return new BasicManipulatorBuilder({
    key_code: keyCode,
    modifiers: parseFromModifierOverload(mandatoryModifiers, optionalModifiers),
  })
}

/** Start a manipulator with from.consumer_key_code and modifiers */
export function mapConsumerKey(
  code: FromConsumerKeyCode,
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  return new BasicManipulatorBuilder({
    consumer_key_code: code,
    modifiers: parseFromModifierOverload(mandatoryModifiers, optionalModifiers),
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
    modifiers: parseFromModifierOverload(mandatoryModifiers, optionalModifiers),
  })
}
