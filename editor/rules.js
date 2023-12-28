// prettier-ignore
import {
// rule and layers
rule, layer, simlayer, hyperLayer, modifierLayer, duoLayer,
// from / map()
map, mapConsumerKey, mapPointingButton, mapSimultaneous, mapDoubleTap, mouseMotionToScroll,
// to
toKey, toConsumerKey, toPointingButton, toHyper, toSuperHyper, toMeh, to$, toApp, toPaste, toTypeSequence, toNone, toNotificationMessage, toRemoveNotificationMessage, toInputSource, toSetVar, toMouseKey, toMouseCursorPosition, toStickyModifier, toCgEventDoubleClick, toSleepSystem,
// conditions
ifApp, ifDevice, ifVar, ifDeviceExists, ifInputSource, ifKeyboardType, ifEventChanged,
// utils
withCondition, withMapper, withModifier
} from 'karabiner.ts';

export const rules = () => [
  rule('Playground').manipulators([
    map('⇪').toHyper().toIfAlone('⎋'),
    { escape: toKey('caps_lock') },
  ]),
]
