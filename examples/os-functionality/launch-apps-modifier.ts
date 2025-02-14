import { rule, toApp, withModifier } from '../../src'

let rules = [
  rule('Launch Apps').manipulators([
    withModifier('right_control')({
      c: toApp('Calendar'),
      f: toApp('Finder'),
    }),
  ]),
]
