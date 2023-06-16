// Karabiner
export type * from './karabiner/key-code'
export type * from './karabiner/karabiner-config'

// Types
export type {
  LeftModifierFlag,
  RightModifierFlag,
  SideModifierFlag,
  SideModifierAlias,
  SideMultiModifierAlias,
  ModifierParam,
  FromModifierParam,
} from './config/modifier'
export type { MultiModifierAlias } from './utils/multi-modifier'
export type {
  ModifierKeyAlias,
  ArrowKeyAlias,
  ControlOrSymbolKeyAlias,
  KeyAlias,
  NumberKeyValue,
} from './utils/key-alias'
export type { ManipulatorMap } from './config/manipulator'

// Utils
export { withCondition } from './utils/with-condition'
export { withMapper } from './utils/with-mapper'
export { withModifier } from './utils/with-modifier'

// From
export * from './config/from'
export { mapSimultaneous } from './config/simultaneous'
export type { DoubleTapParam } from './config/double-tap'
export { mapDoubleTap } from './config/double-tap'
export { mouseMotionToScroll } from './config/mouse-motion-to-scroll'

// To
export * from './config/to'
export * from './config/to-type-sequence'

// Condition
export * from './config/condition'

// Rules
export { rule, RuleBuilder } from './config/rule'
export type { LayerKeyCode, LayerKeyParam } from './config/layer'
export { layer, hyperLayer, modifierLayer } from './config/layer'
export { simlayer } from './config/simlayer'
export { duoLayer } from './config/duo-layer'

// Configs
export type { ModificationParameters } from './config/complex-modifications'
export { defaultComplexModificationsParameters } from './config/complex-modifications'
export { defaultDoubleTapParameters } from './config/double-tap'
export { defaultSimlayerParameters } from './config/simlayer'
export { defaultDuoLayerParameters } from './config/duo-layer'

// Output
export { complexModifications } from './config/complex-modifications'
export { writeToProfile } from './output'
