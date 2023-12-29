import { map, rule } from '../../src'

export const rules = () => [
  rule('Caps Lock → Hyper').manipulators([
    // ⇪ -> ⌘⌥⌃⇧, or ⇪ if alone
    map('caps_lock').toHyper().toIfAlone('caps_lock'),

    // Or to ⎋ if alone
    // map('caps_lock').toHyper().toIfAlone('escape'),
  ]),
]
