import { layer, toPaste } from '../../src'

let rules = [
  layer('z', 'emoji').manipulators({
    j: toPaste('😂'), // joy
  }),
]
