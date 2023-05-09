import { FromModifierParam } from '../config/modifier'

const optionalAnyAliases = ['optionalAny', '?any', '??'] as const
export type OptionalAnyAlias = (typeof optionalAnyAliases)[number]

export function isOptionalAnyAlias(src: any): src is OptionalAnyAlias {
  if (!src || typeof src !== 'string') return false
  return optionalAnyAliases.includes(src as OptionalAnyAlias)
}

export type FromOptionalModifierParam =
  | OptionalAnyAlias
  | { optional: FromModifierParam }
