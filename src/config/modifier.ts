import { FromModifiers, Modifier } from '../karabiner/karabiner-config.ts'
import { ModifierKeyAlias, modifierKeyAliases } from '../utils/key-alias.ts'
import {
  MultiModifierAlias,
  multiModifierAliases,
  NamedMultiModifierAlias,
} from '../utils/multi-modifier.ts'

export type ModifierParam =
  | Modifier
  | ModifierKeyAlias
  | Array<Modifier | ModifierKeyAlias>
  | MultiModifierAlias
  | { left?: ModifierParam; right?: ModifierParam }
  | { l?: ModifierParam; r?: ModifierParam }
  | SideMultiModifierAlias
  | SideMultiModifierAlias[]

export function parseModifierParam(
  src?: ModifierParam,
): Modifier[] | undefined {
  if (!src) return undefined

  if (typeof src == 'string') {
    if (isSideMultiModifierAlias(src)) {
      return parseSideMultiModifierAlias(src)
    }
    if (src in modifierKeyAliases)
      return [modifierKeyAliases[src as ModifierKeyAlias]]

    if (src in multiModifierAliases) {
      return multiModifierAliases[src as MultiModifierAlias]
    }
    return [src as Modifier]
  }

  if (Array.isArray(src)) {
    if (isSideMultiModifierAliases(src)) {
      return parseSideMultiModifierAliases(src)
    }
    return src.map(getModifierWithAlias)
  }

  let left: Modifier[] | undefined = undefined
  if ('left' in src) {
    left = parseSideModifier('left', src.left)
  } else if ('l' in src) {
    left = parseSideModifier('left', src.l)
  }
  let right: Modifier[] | undefined = undefined
  if ('right' in src) {
    right = parseSideModifier('right', src.right)
  } else if ('r' in src) {
    right = parseSideModifier('right', src.r)
  }
  if (!left?.length && !right?.length) return undefined

  return [...(left || []), ...(right || [])]
}

export type LeftModifierFlag = 'left' | 'l' | '<' | '‹'
export type RightModifierFlag = 'right' | 'r' | '>' | '›'
export type SideModifierFlag = LeftModifierFlag | RightModifierFlag
export type SideModifierAlias = `${SideModifierFlag}${Exclude<
  ModifierKeyAlias,
  '⇪'
>}`
export type SideMultiModifierAlias = `${SideModifierFlag}${
  | Exclude<ModifierKeyAlias, '⇪'>
  | Exclude<MultiModifierAlias, NamedMultiModifierAlias>}`

export type FromModifierParam = ModifierParam | 'any'

let leftModifierRegExp = /^(left|l|<|‹)([⌘⌥⌃⇧]*)$/
let rightModifierRegExp = /^(right|r|>|›)([⌘⌥⌃⇧]*)$/

export function parseFromModifierParams(
  mandatoryParam?: FromModifierParam | '' | null,
  optionalParam?: FromModifierParam,
): FromModifiers | undefined {
  if (!mandatoryParam && !optionalParam) return undefined
  return {
    mandatory: parseFromModifiers(mandatoryParam),
    optional: parseFromModifiers(optionalParam),
  }
}

function parseFromModifiers(
  param?: FromModifierParam | '' | null,
): Modifier[] | ['any'] | undefined {
  if (!param) return undefined
  if (param == 'any') return ['any']
  return parseModifierParam(param)
}

let sidedModifiers = new Set<string>([
  'command',
  'option',
  'control',
  'shift',
] /* c8 ignore next */ satisfies Modifier[])

export function isSideMultiModifierAlias(
  src: string,
): src is SideMultiModifierAlias {
  return leftModifierRegExp.test(src) || rightModifierRegExp.test(src)
}

export function parseSideMultiModifierAlias(
  src: SideMultiModifierAlias,
): Modifier[] | undefined {
  let leftMatched = src.match(leftModifierRegExp)
  if (leftMatched) {
    return parseSideModifier('left', leftMatched[2] as ModifierParam)
  }
  let rightMatched = src.match(rightModifierRegExp)
  if (rightMatched) {
    return parseSideModifier('right', rightMatched[2] as ModifierParam)
  }
}

function isSideMultiModifierAliases(
  src: string[],
): src is SideMultiModifierAlias[] {
  return src.some(isSideMultiModifierAlias)
}

function parseSideMultiModifierAliases(
  src: SideMultiModifierAlias[],
): Modifier[] | undefined {
  return src.reduce(
    (r, v) => [
      ...r,
      ...(isSideMultiModifierAlias(v)
        ? parseSideMultiModifierAlias(v) || []
        : parseModifierParam(v) || []),
    ],
    [] as Modifier[],
  )
}

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
