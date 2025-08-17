import {
  ComplexModifications,
  ComplexModificationsParameters,
  Rule,
} from '../karabiner/karabiner-config.ts'
import { BuildContext } from '../utils/build-context.ts'

import { defaultDoubleTapParameters } from './double-tap.ts'
import { defaultDuoLayerParameters } from './duo-layer.ts'
import { defaultLayerParameters } from './layer.ts'
import { buildRule, RuleBuilder } from './rule.ts'
import { defaultSimlayerParameters } from './simlayer.ts'

export let defaultComplexModificationsParameters: ComplexModificationsParameters =
  {
    'basic.to_if_alone_timeout_milliseconds': 1000,
    'basic.to_if_held_down_threshold_milliseconds': 500,
    'basic.to_delayed_action_delay_milliseconds': 500,
    'basic.simultaneous_threshold_milliseconds': 50,
    'mouse_motion_to_scroll.speed': 100,
  }

export type ModificationParameters = ComplexModificationsParameters &
  Partial<typeof defaultDoubleTapParameters> &
  Partial<typeof defaultLayerParameters> &
  Partial<typeof defaultSimlayerParameters> &
  Partial<typeof defaultDuoLayerParameters>

export function complexModifications(
  rules: Array<Rule | RuleBuilder>,
  parameters: ModificationParameters = {},
): ComplexModifications {
  let {
    'double_tap.delay_milliseconds': doubleTapDelay,
    'layer.delay_by_default': layerDelayByDefault,
    'layer.delay_milliseconds': layerDelayDuration,
    'simlayer.threshold_milliseconds': simlayerThreshold,
    'duo_layer.threshold_milliseconds': duoLayerThreshold,
    'duo_layer.notification': duoLayerNotification,
    'duo_layer.delay_by_default': duoLayerDelayByDefault,
    'duo_layer.delay_milliseconds': duoLayerDelayDuration,

    ...complexModificationsParameters
  } = parameters

  let context = new BuildContext()
  context.setParameters<typeof defaultDoubleTapParameters>({
    'double_tap.delay_milliseconds': doubleTapDelay,
  })
  context.setParameters<typeof defaultLayerParameters>({
    'layer.delay_by_default': layerDelayByDefault,
    'layer.delay_milliseconds': layerDelayDuration,
  })
  context.setParameters<typeof defaultSimlayerParameters>({
    'simlayer.threshold_milliseconds': simlayerThreshold,
  })
  context.setParameters<typeof defaultDuoLayerParameters>({
    'duo_layer.threshold_milliseconds': duoLayerThreshold,
    'duo_layer.notification': duoLayerNotification,
    'duo_layer.delay_by_default': duoLayerDelayByDefault,
    'duo_layer.delay_milliseconds': duoLayerDelayDuration,
  })

  let builtRules = rules.map((v) => buildRule(v, context))
  let modifications: ComplexModifications = {
    rules: builtRules.filter((v) => v.manipulators.length),
    parameters: {
      ...defaultComplexModificationsParameters,
      ...complexModificationsParameters,
    },
  }

  if (modifications.rules.length == 0) {
    throw new Error(`complex_modifications "rules" is empty `)
  }

  if (modifications.rules.length < builtRules.length) {
    console.warn(`Rules with empty manipulators are ignored: 
${builtRules
  .filter((v) => v.manipulators.length == 0)
  .map((v) => '- ' + v.description)
  .join('\n')}
`)
  }

  return modifications
}
