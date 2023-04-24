import { FromEvent, Modifier } from '../karabiner/karabiner-config'
import { ModifierKeyAlias, modifierKeyAliases } from '../utils/key-alias'
import {
  MultiModifierAlias,
  multiModifierAliases,
} from '../utils/multi-modifier'

export type ModifierParam =
  | Modifier
  | ModifierKeyAlias
  | Array<Modifier | ModifierKeyAlias>
  | MultiModifierAlias

export function parseModifierParam(
  src?: ModifierParam,
): Modifier[] | undefined {
  if (!src) return undefined

  if (typeof src !== 'string') return src.map(getModifierWithAlias)

  if (src in modifierKeyAliases)
    return [modifierKeyAliases[src as ModifierKeyAlias]]

  if (src in multiModifierAliases) {
    return multiModifierAliases[src as MultiModifierAlias]
  }

  return [src as Modifier]
}

export type FromModifierParam =
  | ModifierParam
  | { left?: ModifierParam; right?: ModifierParam }
  | 'any'

export function parseFromModifierParams(
  mandatoryParam?: FromModifierParam,
  optionalParam?: FromModifierParam,
): FromEvent['modifiers'] {
  if (!mandatoryParam && !optionalParam) return undefined
  return {
    mandatory: parseFromModifiers(mandatoryParam),
    optional: parseFromModifiers(optionalParam),
  }
}

function parseFromModifiers(
  param?: FromModifierParam,
): Modifier[] | ['any'] | undefined {
  if (!param) return undefined
  if (param === 'any') return ['any']

  if (typeof param === 'string' || Array.isArray(param)) {
    return parseModifierParam(param)
  }

  const left = parseSideModifier('left', param.left)
  const right = parseSideModifier('right', param.right)
  if (!left?.length && !right?.length) return undefined

  return [...(left || []), ...(right || [])]
}

const sidedModifiers = new Set<string>([
  'command',
  'option',
  'control',
  'shift',
] /* c8 ignore next */ satisfies Modifier[])

function parseSideModifier(
  side: 'left' | 'right',
  src?: ModifierParam,
): Modifier[] | undefined {
  if (!src) return undefined
  return parseModifierParam(src)?.map((v) =>
    sidedModifiers.has(v) ? (`${side}_${v}` as Modifier) : v,
  )
}

function getModifierWithAlias(src: Modifier | ModifierKeyAlias): Modifier {
  if (src in modifierKeyAliases)
    return modifierKeyAliases[src as ModifierKeyAlias]
  return src as Modifier
}
