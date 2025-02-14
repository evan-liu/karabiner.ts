import { layer, toApp } from '../../src'

let rules = [
  layer('l', 'launch-app').manipulators({
    c: toApp('Calendar'),
    f: toApp('Finder'),
  }),
]
