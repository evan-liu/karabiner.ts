import { Modifier } from '../karabiner/karabiner-config'

export const namedMultiModifierAliases = {
  Meh: ['option', 'control', 'shift'],
  Hyper: ['command', 'option', 'control', 'shift'],
  SuperHyper: ['command', 'option', 'control', 'shift', 'fn'],
} /* c8 ignore next */ satisfies Record<string, Modifier[]>
export type NamedMultiModifierAlias = keyof typeof namedMultiModifierAliases

export const multiModifierAliases = {
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
} /* c8 ignore next */ satisfies Record<string, Modifier[]>

export type MultiModifierAlias = keyof typeof multiModifierAliases
