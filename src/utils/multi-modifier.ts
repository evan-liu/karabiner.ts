import { Modifier } from '../karabiner/karabiner-config'

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
  Meh: ['option', 'control', 'shift'],
  Hyper: ['command', 'option', 'control', 'shift'],
} satisfies Record<string, Modifier[]>

export type MultiModifierAlias = keyof typeof multiModifierAliases
