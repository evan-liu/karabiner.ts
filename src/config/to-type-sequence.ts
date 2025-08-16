import { ToEvent } from '../karabiner/karabiner-config.ts'
import { LetterKeyCode } from '../karabiner/key-code.ts'
import {
  arrowKeyAliases,
  controlOrSymbolKeyAliases,
  KeyAlias,
  NumberKeyValue,
} from '../utils/key-alias.ts'

import { toKey, ToKeyParam } from './to.ts'

let defaultMap: Record<string, ToEvent> = {}
for (let i = 0; i <= 9; i++) {
  defaultMap[i] = toKey(i as NumberKeyValue)
}

let letterKeys = 'abcdefghijklmnopqrstuvwxyz'.split('') as LetterKeyCode[]
for (let k of letterKeys) {
  defaultMap[k] = toKey(k)
  defaultMap[k.toUpperCase()] = toKey(k, '⇧')
}

let keyAliases = [
  ...Object.keys(arrowKeyAliases),
  ...Object.keys(controlOrSymbolKeyAliases),
]
for (let k of keyAliases) {
  defaultMap[k] = toKey(k as KeyAlias)
}

let shiftKeys = {
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&',
  8: '*',
  9: '(',
  0: ')',
  "'": '"',
  '=': '+',
  ';': ':',
  ',': '<',
  '.': '>',
  '/': '?',
  '-': '_',
  '[': '{',
  '\\': '|',
  ']': '}',
  '`': '~',
} as const
for (let [key, shiftKey] of Object.entries(shiftKeys)) {
  defaultMap[shiftKey] = toKey(key as ToKeyParam, '⇧')
}

/** Create an array of ToEvent to type a string of keys */
export function toTypeSequence(
  src: string,
  map?: Record<string, ToEvent>,
): ToEvent[] {
  return src.split('').map((k) => {
    let event = map?.[k] || defaultMap[k]
    if (!event)
      throw new Error(
        `${k} is unknown. Please provide a map with { ${k}: {ToEvent} }`,
      )
    return event
  })
}
