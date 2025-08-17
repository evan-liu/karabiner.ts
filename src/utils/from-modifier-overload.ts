import {
  FromModifierParam,
  ModifierParam,
  parseFromModifierParams,
  parseModifierParam,
} from '../config/modifier.ts'

import {
  FromOptionalModifierParam,
  isOptionalAnyAlias,
  isOptionalModifierAlias,
} from './optional-modifiers.ts'

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
  }

  if (isOptionalAnyAlias(mandatoryModifiers)) {
    return parseFromModifierParams('', 'any')
  }

  if (typeof mandatoryModifiers == 'string') {
    if (isOptionalModifierAlias(mandatoryModifiers)) {
      return parseFromModifierParams(
        '',
        parseModifierParam(mandatoryModifiers.slice(1) as ModifierParam),
      )
    } else if (mandatoryModifiers.startsWith('?')) {
      throw new Error(`${mandatoryModifiers} is not valid optional alias`)
    }
  }

  if (
    typeof mandatoryModifiers == 'object' &&
    'optional' in mandatoryModifiers
  ) {
    return parseFromModifierParams('', mandatoryModifiers.optional)
  }

  return parseFromModifierParams(mandatoryModifiers, optionalModifiers)
}
