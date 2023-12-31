import { layer, toApp } from '../../src'

export const rules = () => [
  layer('l', 'launch-app').manipulators({
    c: toApp('Calendar'),
    f: toApp('Finder'),
  }),
]
