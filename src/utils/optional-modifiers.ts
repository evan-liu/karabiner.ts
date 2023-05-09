import { FromModifierParam } from '../config/modifier'
import { ModifierKeyAlias, modifierKeyAliases } from './key-alias'
import { MultiModifierAlias, multiModifierAliases } from './multi-modifier'

const optionalAnyAliases = ['optionalAny', '?any', '??'] as const
export type OptionalAnyAlias = (typeof optionalAnyAliases)[number]

export type OptionalModifierAlias = `?${ModifierKeyAlias | MultiModifierAlias}`

export function isOptionalAnyAlias(src: any): src is OptionalAnyAlias {
  if (!src || typeof src !== 'string') return false
  return optionalAnyAliases.includes(src as OptionalAnyAlias)
}

export type FromOptionalModifierParam =
  | OptionalAnyAlias
  | { optional: FromModifierParam }
  | OptionalModifierAlias

const optionalModifierAliases = [
  ...Object.keys(modifierKeyAliases),
  ...Object.keys(multiModifierAliases),
].map((v) => `?${v}`)

export function isOptionalModifierAlias(
  src: string,
): src is OptionalModifierAlias {
  return optionalModifierAliases.includes(src)
}
