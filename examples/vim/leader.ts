import {
  hyperLayer,
  ifVar,
  map,
  toUnsetVar,
  withCondition,
  withMapper,
} from '../../src'

let escapeLeader = ['__layer', 'leader', 'leader--'].map(toUnsetVar)
let raycastEmoji = 'emoji-symbols/search-emoji-symbols'

let rules = [
  hyperLayer('l', 'leader')
    .leaderMode({ sticky: true, escape: [] })
    .manipulators([
      map('escape').to(escapeLeader),

      map('o').toVar('leader--', 'o'), // Open
      withCondition(ifVar('leader--', 'o'))([
        withMapper([
          map('f').toApp('Finder'), // Open Finder
        ])((x) => x.to(escapeLeader)),
      ]),

      map('r').toVar('leader--', 'r'), // Raycast
      withCondition(ifVar('leader--', 'r'))([
        withMapper([
          map('e').to$(`open raycast://extensions/raycast/${raycastEmoji}`),
        ])((x) => x.to(escapeLeader)),
      ]),
    ]),
]
