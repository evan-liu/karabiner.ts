import {
  ifVar,
  map,
  rule,
  toRemoveNotificationMessage,
  toUnsetVar,
  withCondition,
  withMapper,
} from '../../src'

let raycastEmoji = 'raycast/emoji-symbols/search-emoji-symbols'
let escape = [toUnsetVar('leader'), toRemoveNotificationMessage('leader')]

let rules = [
  rule('Leader Key').manipulators([
    map('l', 'Hyper') // Or mapSimultaneous(['l', ';']) ...
      .toVar('leader')
      .toNotificationMessage('leader', 'Leader Key: Open, Raycast, ...'),

    withCondition(ifVar('leader', 0).unless())([
      // Escape key(s)
      map('escape').to(escape),

      // Nested leader keys
      withMapper(['o', 'r'])((x) =>
        map(x)
          .toVar('leader', x)
          .toNotificationMessage('leader', `leader ${x}`),
      ),

      // o - Open
      withCondition(ifVar('leader', 'o'))(
        [
          map('f').toApp('Finder'),
          // f - Finder, ...
        ].map((x) => x.to(escape)),
      ),

      // r - Raycast
      withCondition(ifVar('leader', 'r'))(
        [
          map('e').to$(`open raycast://extensions/${raycastEmoji}`),
          // e - Emoji, ...
        ].map((x) => x.to(escape)),
      ),
    ]),
  ]),
]
