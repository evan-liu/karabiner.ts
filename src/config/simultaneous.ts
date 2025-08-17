import {
  FromEvent,
  FromKeyType,
  SimultaneousOptions,
} from '../karabiner/karabiner-config.ts'
import { FromKeyCode, toOnlyKeyCodes } from '../karabiner/key-code.ts'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload.ts'
import { getKeyWithAlias } from '../utils/key-alias.ts'
import { FromOptionalModifierParam } from '../utils/optional-modifiers.ts'

import { FromKeyParam } from './from.ts'
import { BasicManipulatorBuilder } from './manipulator.ts'
import { FromModifierParam } from './modifier.ts'

/** Start a manipulator with from.simultaneous */
export function mapSimultaneous(
  keys: Array<FromKeyParam | FromKeyType>,
  options?: SimultaneousOptions,
  threshold?: number,
) {
  let getKeyCode = (v: FromKeyParam) =>
    getKeyWithAlias<FromKeyCode>(v, toOnlyKeyCodes, 'for from.simultaneous')
  let manipulatorBuilder = new SimultaneousManipulatorBuilder({
    simultaneous: keys.map((v) =>
      typeof v == 'object' ? v : { key_code: getKeyCode(v) },
    ),
    simultaneous_options: options,
  })
  if (threshold) {
    manipulatorBuilder.parameters({
      'basic.simultaneous_threshold_milliseconds': threshold,
    })
  }
  return manipulatorBuilder
}

export class SimultaneousManipulatorBuilder extends BasicManipulatorBuilder {
  constructor(from: FromEvent) {
    super(from)
  }

  /** Set the from.modifiers */
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this
  /** Set the from.modifiers */
  public modifiers(modifiers: FromOptionalModifierParam): this
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this {
    this.manipulator.from.modifiers =
      mandatoryModifiers || optionalModifiers
        ? parseFromModifierOverload(mandatoryModifiers, optionalModifiers)
        : undefined
    return this
  }
}
