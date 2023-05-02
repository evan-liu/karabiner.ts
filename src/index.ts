// Karabiner
export type * from './karabiner/key-code'
export type * from './karabiner/karabiner-config'

// Types
export type { ModifierParam, FromModifierParam } from './config/modifier'
export type { ModificationParameters } from './config/complex-modifications'
export type { MultiModifierAlias } from './utils/multi-modifier'
export type {
  ModifierKeyAlias,
  ArrowKeyAlias,
  ControlOrSymbolKeyAlias,
  KeyAlias,
  NumberKeyValue,
} from './utils/key-alias'

// Utils
export { withCondition } from './utils/with-condition'
export { withMapper } from './utils/with-mapper'
export { withModifier } from './utils/with-modifier'

// From
export * from './config/from'
export type { DoubleTapParam } from './config/double-tap'
export { mapDoubleTap } from './config/double-tap'
export { mouseMotionToScroll } from './config/mouse-motion-to-scroll'

// To
export * from './config/to'

// Condition
export * from './config/condition'

// Rules
export { rule } from './config/rule'
export type { LayerKeyCode, LayerKeyParam } from './config/layer'
export { layer } from './config/layer'
export { simlayer } from './config/simlayer'

// Output
export { writeToProfile } from './output'
