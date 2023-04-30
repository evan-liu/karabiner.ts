import {
  ComplexModifications,
  ComplexModificationsParameters,
  Rule,
} from '../karabiner/karabiner-config'
import { buildRule, RuleBuilder } from './rule'
import { defaultDoubleTapDelay, doubleTapParameters } from './double-tap'
import { defaultSimlayerThreshold, simlayerParameters } from './layer'

export const defaultComplexModificationsParameters: ComplexModificationsParameters =
  {
    'basic.to_if_alone_timeout_milliseconds': 1000,
    'basic.to_if_held_down_threshold_milliseconds': 500,
    'basic.to_delayed_action_delay_milliseconds': 500,
    'basic.simultaneous_threshold_milliseconds': 50,
    'mouse_motion_to_scroll.speed': 100,
  }

export type ModificationParameters = ComplexModificationsParameters &
  Partial<typeof doubleTapParameters> &
  Partial<typeof simlayerParameters>

export function complexModifications(
  rules: Array<Rule | RuleBuilder>,
  parameters: ModificationParameters = {},
): ComplexModifications {
  const {
    'double_tap.delay_milliseconds': doubleTapDelay,
    'simlayer.threshold_milliseconds': simlayerThreshold,
    ...complexModificationsParameters
  } = parameters

  doubleTapParameters['double_tap.delay_milliseconds'] =
    doubleTapDelay || defaultDoubleTapDelay
  simlayerParameters['simlayer.threshold_milliseconds'] =
    simlayerThreshold || defaultSimlayerThreshold

  const modifications: ComplexModifications = {
    rules: rules.map(buildRule),
    parameters: {
      ...defaultComplexModificationsParameters,
      ...complexModificationsParameters,
    },
  }

  if (modifications.rules.length === 0) {
    throw new Error(`complex_modifications "rules" is empty `)
  }

  for (const rule of modifications.rules) {
    if (!rule.manipulators.length) {
      throw new Error(`"manipulators" is empty in "${rule.description}"`)
    }
  }

  return modifications
}
