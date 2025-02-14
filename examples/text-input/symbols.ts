import { layer, map, toPaste, withMapper } from '../../src'

let rules = [
  layer('z', 'symbols').manipulators([
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⌫', '⌦'])((k) =>
      map(k).toPaste(k),
    ),

    { ',': toPaste('‹'), '.': toPaste('›') },

    withMapper({ 4: '⇥', 5: '⎋', 6: '⌘', 7: '⌥', 8: '⌃', 9: '⇧', 0: '⇪' })(
      (k, v) => map(k).toPaste(v),
    ),
  ]),
]
