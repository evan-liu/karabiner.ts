import { map, rule } from '../../src'

let rules = [
  rule('Caps Lock → Hyper').manipulators([
    map('caps_lock').toHyper().toIfAlone('caps_lock'),
  ]),
]
