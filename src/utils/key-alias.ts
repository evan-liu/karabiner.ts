import {
  isSideMultiModifierAlias,
  parseSideMultiModifierAlias,
  SideModifierAlias,
} from '../config/modifier.ts'
import { Modifier } from '../karabiner/karabiner-config.ts'
import {
  ArrowKeyCode,
  arrowKeyCodes,
  ControlOrSymbolKeyCode,
  controlOrSymbolKeyCodes,
  fromOnlyKeyCodes,
  functionKeyCodes,
  internationalKeyCodes,
  japaneseKeyCodes,
  KeyCode,
  keypadKeyCodes,
  letterKeyCodes,
  modifierKeyCodes,
  numberKeyCodes,
  otherKeyCodes,
  pcKeyboardKeyCodes,
  stickyModifierKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code.ts'

export let modifierKeyAliases = {
  '⌘': 'command',
  '⌥': 'option',
  '⌃': 'control',
  '⇧': 'shift',
  '⇪': 'caps_lock',
} as const /* c8 ignore next */ satisfies Record<string, Modifier>

export let arrowKeyAliases = {
  '↑': 'up_arrow',
  '↓': 'down_arrow',
  '←': 'left_arrow',
  '→': 'right_arrow',
  '⇞': 'page_up',
  '⇟': 'page_down',
  '↖︎': 'home',
  '↘︎': 'end',
} as const /* c8 ignore next */ satisfies Record<string, ArrowKeyCode>

export let controlOrSymbolKeyAliases = {
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
} as const /* c8 ignore next */ satisfies Record<string, ControlOrSymbolKeyCode>

export type ModifierKeyAlias = keyof typeof modifierKeyAliases

export type ArrowKeyAlias = keyof typeof arrowKeyAliases
export type ControlOrSymbolKeyAlias = keyof typeof controlOrSymbolKeyAliases
export type KeyAlias = ArrowKeyAlias | ControlOrSymbolKeyAlias | '⇪'
export type NumberKeyValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

let keyAliases: Record<string, string> = {
  ...arrowKeyAliases,
  ...controlOrSymbolKeyAliases,
  '⇪': modifierKeyAliases['⇪'],
} /* c8 ignore next */ satisfies Record<KeyAlias, KeyCode>

let allKeyCodes = [
  ...stickyModifierKeyCodes,
  ...modifierKeyCodes,
  ...controlOrSymbolKeyCodes,
  ...arrowKeyCodes,
  ...letterKeyCodes,
  ...numberKeyCodes,
  ...functionKeyCodes,
  ...keypadKeyCodes,
  ...pcKeyboardKeyCodes,
  ...internationalKeyCodes,
  ...japaneseKeyCodes,
  ...otherKeyCodes,
  ...fromOnlyKeyCodes,
  ...toOnlyKeyCodes,
] as const

export function getKeyWithAlias<T extends KeyCode = KeyCode>(
  key: KeyCode | KeyAlias | NumberKeyValue | SideModifierAlias,
  excludeKeys?: readonly KeyCode[],
  excludeLabel?: string,
): T {
  if (typeof key == 'number') return `${key}` as T

  if (key.length > 1 && isSideMultiModifierAlias(key)) {
    let modifiers = parseSideMultiModifierAlias(key)
    if (modifiers?.length == 1) {
      return modifiers[0] as T
    } else {
      throw new Error(`Invalid key ${key}`)
    }
  }

  if (key in keyAliases) {
    return keyAliases[key] as T
  }

  let code = key as T
  if (!allKeyCodes.includes(code)) {
    throw new Error(`${code} is not valid key_code`)
  }

  if (excludeKeys?.includes(code)) {
    throw new Error(`Key ${key} cannot be used ${excludeLabel || 'here'}`)
  }

  return code
}
