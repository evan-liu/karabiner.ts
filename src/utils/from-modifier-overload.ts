import { FromModifierParam, parseFromModifierParams } from '../config/modifier'
import {
  FromOptionalModifierParam,
  isOptionalAnyAlias,
} from './optional-modifiers'

export type FromModifierOverloadParam =
  | FromModifierParam
  | ''
  | null
  | FromOptionalModifierParam

export function parseFromModifierOverload(
  mandatoryModifiers?: FromModifierOverloadParam,
  optionalModifiers?: FromModifierParam,
) {
  if (!mandatoryModifiers) {
    return parseFromModifierParams(mandatoryModifiers, optionalModifiers)
  } else if (isOptionalAnyAlias(mandatoryModifiers)) {
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
