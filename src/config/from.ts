import { FromKeyCode } from '../karabiner/key-code'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { FromModifierParam, parseFromModifierParams } from './modifier'
import { ManipulatorBuilder } from './manipulator'

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
