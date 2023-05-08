import {
  FromEvent,
  FromKeyType,
  SimultaneousOptions,
} from '../karabiner/karabiner-config'
import { BasicManipulatorBuilder } from './manipulator'
import { getKeyWithAlias } from '../utils/key-alias'
import { FromKeyCode } from '../karabiner/key-code'
import { FromKeyParam } from './from'
import {
  FromModifierOverloadParam,
  FromOptionalModifierParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload'
import { FromModifierParam } from './modifier'

/** Start a manipulator with from.simultaneous */
export function mapSimultaneous(
  keys: Array<FromKeyParam | FromKeyType>,
  options?: SimultaneousOptions,
  threshold?: number,
) {
  const manipulatorBuilder = new SimultaneousManipulatorBuilder({
    simultaneous: keys.map((v) =>
      typeof v === 'object' ? v : { key_code: getKeyWithAlias<FromKeyCode>(v) },
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
