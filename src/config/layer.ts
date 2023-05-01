import {
  FromKeyCode,
  FromOnlyKeyCode,
  ModifierKeyCode,
} from '../karabiner/key-code'
import { Rule, ToVariable } from '../karabiner/karabiner-config'
import { getKeyWithAlias, ModifierKeyAlias } from '../utils/key-alias'
import { FromKeyParam, map } from './from'
import { toSetVar } from './to'
import { buildCondition, ifVar } from './condition'
import { BasicRuleBuilder } from './rule'

export const defaultSimlayerThreshold = 200
export const simlayerParameters = {
  'simlayer.threshold_milliseconds': defaultSimlayerThreshold,
}

type LayerKeyCode = Exclude<FromKeyCode, FromOnlyKeyCode | ModifierKeyCode>
type LayerKeyParam = Exclude<
  FromKeyParam,
  FromOnlyKeyCode | ModifierKeyCode | ModifierKeyAlias
>

/** @see https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md#advance3 */
export function layer(
  key: LayerKeyParam | LayerKeyParam[],
  varName: string,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new LayerRuleBuilder(key, varName, onValue, offValue)
}

export class LayerRuleBuilder extends BasicRuleBuilder {
  protected layerCondition = ifVar(this.varName, this.onValue)

  constructor(
    protected readonly key: LayerKeyParam | LayerKeyParam[],
    protected readonly varName: string,
    protected readonly onValue: ToVariable['value'] = 1,
    protected readonly offValue: ToVariable['value'] = 0,
  ) {
    super(`Layer - ${varName}`)
    this.condition(this.layerCondition)
  }

  public build(): Rule {
    const rule = super.build()

    const conditions = this.conditions.filter((v) => v !== this.layerCondition)
    const layerKeyCodes = (Array.isArray(this.key) ? this.key : [this.key]).map(
      (v) => getKeyWithAlias(v) as LayerKeyCode,
    )
    for (const key_code of layerKeyCodes) {
      const manipulator = map(key_code)
        .toVar(this.varName, this.onValue)
        .toAfterKeyUp(toSetVar(this.varName, this.offValue))
        .toIfAlone({ key_code })
      if (conditions.length > 0) manipulator.condition(...conditions)
      rule.manipulators = [...manipulator.build(), ...rule.manipulators]
    }

    return rule
  }
}

/** @see https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md#advance3 */
export function simlayer(
  key: LayerKeyParam | LayerKeyParam[],
  varName: string,
  threshold?: number,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new SimlayerRuleBuilder(key, varName, threshold, onValue, offValue)
}

export class SimlayerRuleBuilder extends BasicRuleBuilder {
  protected layerCondition = ifVar(this.varName, this.onValue)

  constructor(
    protected readonly key: LayerKeyParam | LayerKeyParam[],
    protected readonly varName: string,
    protected readonly threshold?: number,
    protected readonly onValue: ToVariable['value'] = 1,
    protected readonly offValue: ToVariable['value'] = 0,
  ) {
    super(`Simlayer - ${varName}`)
    this.condition(this.layerCondition)
  }

  public build(): Rule {
    const rule = super.build()

    const conditions =
      this.conditions.length > 1
        ? this.conditions
            .filter((v) => v !== this.layerCondition)
            .map(buildCondition)
        : undefined

    const setVarOn = toSetVar(this.varName, this.onValue)
    const setVarOff = toSetVar(this.varName, this.offValue)
    const layerKeys = (Array.isArray(this.key) ? this.key : [this.key]).map(
      (v) => getKeyWithAlias(v) as LayerKeyCode,
    )
    rule.manipulators.concat().forEach((v) => {
      if (v.type !== 'basic') {
        throw new Error(
          `Unsupported manipulator type ${v.type} in simlayer ${this.ruleDescription}`,
        )
      }

      const fromKey = (v.from as { key_code: FromKeyCode })?.key_code
      if (!fromKey) {
        throw new Error(
          `Missing from.key_code in simlayer ${this.ruleDescription}`,
        )
      }

      for (const layerKey of layerKeys) {
        rule.manipulators.push({
          type: 'basic',
          parameters: {
            'basic.simultaneous_threshold_milliseconds':
              this.threshold ||
              simlayerParameters['simlayer.threshold_milliseconds'],
          },
          to: [setVarOn, ...(v.to || [])],
          from: {
            simultaneous: [{ key_code: layerKey }, { key_code: fromKey }],
            simultaneous_options: {
              detect_key_down_uninterruptedly: true,
              key_down_order: 'strict',
              key_up_order: 'strict_inverse',
              key_up_when: 'any',
              to_after_key_up: [setVarOff],
            },
          },
          conditions,
        })
      }
    })

    return rule
  }
}
