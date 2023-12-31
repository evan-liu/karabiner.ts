import { layer, toPaste } from '../../src'

export const rules = () => [
  layer('z', 'emoji').manipulators({
    j: toPaste('😂'), // joy
  }),
]
