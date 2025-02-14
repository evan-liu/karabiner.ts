import {
  KeyAlias,
  LetterKeyCode,
  mapSimultaneous,
  ModifierKeyAlias,
  modifierKeyAliases,
  MultiModifierAlias,
  multiModifierAliases,
  rule,
  toRemoveNotificationMessage,
} from '../../src'

let rules = [
  rule('duo-modifiers').manipulators(
    duoModifiers({
      '⌘': ['fd', 'jk'], // ⌘ first as used the most
      '⌃': ['fs', 'jl'], // ⌃ second as Vim uses it
      '⌥': ['fa', 'j;'], // ⌥ last as used the least

      '⇧': ['ds', 'kl'],

      '⌘⇧': ['gd', 'hk'],
      '⌃⇧': ['gs', 'hl'],
      '⌥⇧': ['ga', 'h;'],

      '⌘⌥': ['vc', 'm,'],
      '⌘⌃': ['vx', 'm.'],
      '⌥⌃': ['cx', ',.'],

      '⌘⌥⌃': ['vz', 'm/'],
    }),
  ),
]

function duoModifiers(
  v: Partial<
    Record<
      '⌘' | '⌥' | '⌃' | '⇧' | MultiModifierAlias,
      `${LetterKeyCode | KeyAlias}${LetterKeyCode | KeyAlias}`[]
    >
  >,
) {
  let result = []

  for (let [m, k] of Object.entries(v)) {
    for (let keys of k) {
      let id = k + m
      let [firstMod, ...restMods] = (
        m in modifierKeyAliases
          ? [modifierKeyAliases[m as ModifierKeyAlias]]
          : multiModifierAliases[m as MultiModifierAlias]
      ) as Array<'command' | 'control' | 'option' | 'shift'>

      let to_after_key_up = [toRemoveNotificationMessage(id)]
      result.push(
        mapSimultaneous(keys.split('') as (LetterKeyCode | KeyAlias)[], {
          to_after_key_up,
        })
          .toNotificationMessage(id, m) // Must go first or to() doesn't work
          .to(`left_${firstMod}`, restMods),
      )
    }
  }

  return result
}
