import { map, rule } from '../../src'

export const rules = () => [
  rule('Caps Lock → Hyper').manipulators([
    map('caps_lock').toHyper().toIfAlone('caps_lock'),
  ]),
]
