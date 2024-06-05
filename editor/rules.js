// prettier-ignore
import {
// rule and layers
rule, layer, simlayer, hyperLayer, modifierLayer, duoLayer,
// from / map()
map, mapConsumerKey, mapPointingButton, mapSimultaneous, mapDoubleTap, mouseMotionToScroll,
// to
toKey, toConsumerKey, toPointingButton, toHyper, toSuperHyper, toMeh, to$, toApp, toNewApp, toPaste, toTypeSequence, toNone, toNotificationMessage, toRemoveNotificationMessage, toInputSource, toSetVar, toMouseKey, toMouseCursorPosition, toStickyModifier, toCgEventDoubleClick, toSleepSystem,
// conditions
ifApp, ifDevice, ifVar, ifDeviceExists, ifInputSource, ifKeyboardType, ifEventChanged,
// utils
withCondition, withMapper, withModifier, modifierKeyAliases, multiModifierAliases
} from 'karabiner.ts'

// ↓ ↓ ↓ Add support code if needed.  ↑ ↑ ↑ Do not delete `import ...` ↑

// ↑ ↑ ↑ Add support code if needed.  ↓ ↓ ↓ Do not modify `export const rules` ↓
export const rules = () => [
  // ↓ ↓ ↓ Add rules and/or layers.   ↑ ↑ ↑ Do not modify `export const rules` ↑

  rule('Playground').manipulators([
    map('⇪').toHyper().toIfAlone('⎋'),
    { escape: toKey('caps_lock') },
  ]),

  // ↑ ↑ ↑ Add rules and/or layers.   ↓ ↓ ↓ Do not delete `]` below ↓
]
