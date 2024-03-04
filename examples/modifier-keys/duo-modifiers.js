import {
  mapSimultaneous,
  modifierKeyAliases,
  multiModifierAliases,
  rule,
} from '../../src'

function duoModifier(keys, modifier) {
  const [firstMod, ...restMods] =
    modifier in modifierKeyAliases
      ? [modifierKeyAliases[modifier]]
      : multiModifierAliases[modifier]
  return mapSimultaneous(keys.split('')).to(`left_${firstMod}`, restMods)
}

export const rules = () => [
  rule('duo-modifiers').manipulators([
    duoModifier('fd', '⌘'),
    duoModifier('fs', '⌃'),
    duoModifier('fa', '⌥'),

    duoModifier('ds', '⇧'),

    duoModifier('gd', '⌘⇧'),
    duoModifier('gs', '⌃⇧'),
    duoModifier('ga', '⌥⇧'),

    duoModifier('vc', '⌘⌥'),
    duoModifier('vx', '⌘⌃'),
    duoModifier('cx', '⌥⌃'),

    duoModifier('vz', '⌘⌥⌃'),

    duoModifier('jk', '⌘'),
    duoModifier('jl', '⌃'),
    duoModifier('j;', '⌥'),

    duoModifier('kl', '⇧'),

    duoModifier('hk', '⌘⇧'),
    duoModifier('hl', '⌃⇧'),
    duoModifier('h;', '⌥⇧'),

    duoModifier('m,', '⌘⌥'),
    duoModifier('m.', '⌘⌃'),
    duoModifier(',.', '⌥⌃'),

    duoModifier('m/', '⌘⌥⌃'),
  ]),
]
