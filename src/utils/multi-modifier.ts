import { Modifier } from '../karabiner/karabiner-config.ts'

export let namedMultiModifierAliases = {
  Meh: ['option', 'control', 'shift'],
  Hyper: ['command', 'option', 'control', 'shift'],
  SuperHyper: ['command', 'option', 'control', 'shift', 'fn'],
} as const /* c8 ignore next */ satisfies Record<string, Modifier[]>
export type NamedMultiModifierAlias = keyof typeof namedMultiModifierAliases

export let multiModifierAliases = {
  '⌘⇧': ['command', 'shift'],
  '⌥⇧': ['option', 'shift'],
  '⌃⇧': ['control', 'shift'],
  '⌘⌥': ['command', 'option'],
  '⌘⌃': ['command', 'control'],
  '⌥⌃': ['option', 'control'],
  '⌘⌥⌃': ['command', 'option', 'control'],
  '⌘⌥⇧': ['command', 'option', 'shift'],
  '⌘⌃⇧': ['command', 'control', 'shift'],
  '⌥⌃⇧': ['option', 'control', 'shift'],
  '⌘⌥⌃⇧': ['command', 'option', 'control', 'shift'],
  ...namedMultiModifierAliases,
} as const /* c8 ignore next */ satisfies Record<string, Modifier[]>

export type MultiModifierAlias = keyof typeof multiModifierAliases
