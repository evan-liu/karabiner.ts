// prettier-ignore
import {
// rule and layers
rule, layer, simlayer, hyperLayer, modifierLayer, duoLayer,
// from / map()
map, mapConsumerKey, mapPointingButton, mapSimultaneous, mapDoubleTap,
// to
toKey, toConsumerKey, toPointingButton, toHyper, to$, toApp, toPaste,
// conditions
ifApp, ifDevice, ifVar,
// utils
withCondition, withMapper
} from 'karabiner.ts';

export const rules = () => [
  rule('Playground').manipulators([
    map('⇪').toHyper().toIfAlone('⎋'),
    { escape: toKey('caps_lock') },
  ]),
]
