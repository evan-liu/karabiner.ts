import { rule, toApp, withModifier } from '../../src'

export const rules = () => [
  rule('Launch Apps').manipulators([
    withModifier('right_control')({
      c: toApp('Calendar'),
      f: toApp('Finder'),
    }),
  ]),
]
