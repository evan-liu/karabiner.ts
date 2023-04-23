import {
  ArrowKeyCode,
  ControlOrSymbolKeyCode,
  KeyCode,
} from '../karabiner/key-code'
import { Modifier } from '../karabiner/karabiner-config'

export const modifierKeyAliases = {
  '⌘': 'command',
  '⌥': 'option',
  '⌃': 'control',
  '⇧': 'shift',
  '⇪': 'caps_lock',
} satisfies Record<string, Modifier>

export const arrowKeyAliases = {
  '↑': 'up_arrow',
  '↓': 'down_arrow',
  '←': 'left_arrow',
  '→': 'right_arrow',
  '⇞': 'page_up',
  '⇟': 'page_down',
  '↖︎': 'home',
  '↘︎': 'end',
} satisfies Record<string, ArrowKeyCode>

export const controlOrSymbolKeyAliases = {
  '⏎': 'return_or_enter',
  '⎋': 'escape',
  '⌫': 'delete_or_backspace',
  '⌦': 'delete_forward',
  '⇥': 'tab',
  '␣': 'spacebar',
  '-': 'hyphen',
  '=': 'equal_sign',
  '[': 'open_bracket',
  ']': 'close_bracket',
  '\\': 'backslash',
  ';': 'semicolon',
  "'": 'quote',
  '`': 'grave_accent_and_tilde',
  ',': 'comma',
  '.': 'period',
  '/': 'slash',
} satisfies Record<string, ControlOrSymbolKeyCode>

export type NumberKeyValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ArrowKeyAlias = keyof typeof arrowKeyAliases
export type ControlOrSymbolKeyAlias = keyof typeof controlOrSymbolKeyAliases
export type KeyAlias = ArrowKeyAlias | ControlOrSymbolKeyAlias

const keyAliases = {
  ...arrowKeyAliases,
  ...controlOrSymbolKeyAliases,
} as Record<string, string>

export function getKeyWithAlias(
  key: KeyCode | KeyAlias | NumberKeyValue,
): KeyCode {
  return (keyAliases[key] || '' + key) as KeyCode
}
