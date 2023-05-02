import {
  FromKeyCode,
  FromOnlyKeyCode,
  ModifierKeyCode,
} from '../karabiner/key-code'
import { Condition, Rule, ToVariable } from '../karabiner/karabiner-config'
import { getKeyWithAlias, ModifierKeyAlias } from '../utils/key-alias'
import { FromKeyParam, map } from './from'
import { toSetVar } from './to'
import { buildCondition, ConditionBuilder, ifVar } from './condition'
import { BasicRuleBuilder } from './rule'
import { toArray } from '../utils/to-array'

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
  protected readonly keys: LayerKeyCode[]
  protected layerCondition = ifVar(this.varName, this.onValue)

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    protected readonly varName: string,
    protected readonly onValue: ToVariable['value'] = 1,
    protected readonly offValue: ToVariable['value'] = 0,
  ) {
    super(`Layer - ${varName}`)
    this.keys = toArray(key).map((v) => getKeyWithAlias(v) as LayerKeyCode)
    this.condition(this.layerCondition)
  }

  public build(): Rule {
    const rule = super.build()

    const conditions = this.conditions.filter((v) => v !== this.layerCondition)
    for (const key_code of this.keys) {
      rule.manipulators = [
        ...layerToggleManipulator(
          key_code,
          this.varName,
          this.onValue,
          this.offValue,
          conditions,
        ),
        ...rule.manipulators,
      ]
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
  protected readonly keys: LayerKeyCode[]
  protected readonly layerCondition = ifVar(this.varName, this.onValue)
  protected readonly sharedLayerKeys: LayerKeyCode[] = []

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    protected readonly varName: string,
    protected readonly threshold?: number,
    protected readonly onValue: ToVariable['value'] = 1,
    protected readonly offValue: ToVariable['value'] = 0,
  ) {
    super(`Simlayer - ${varName}`)
    this.keys = toArray(key).map((v) => getKeyWithAlias(v) as LayerKeyCode)
    this.condition(this.layerCondition)
  }

  /** Enable layer with the same variable and manipulators with this simlayer */
  public enableLayer(...key: LayerKeyParam[]): this {
    key
      .map((v) => getKeyWithAlias(v) as LayerKeyCode)
      .forEach((v) => {
        if (this.keys.includes(v))
          throw new Error(`Key ${v} is already used in ${this.ruleDescription}`)

        if (this.sharedLayerKeys.includes(v))
          throw new Error(
            `Key ${v} is already used as shared layer key in  ${this.ruleDescription}`,
          )

        this.sharedLayerKeys.push(v)
      })
    return this
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

      for (const layerKey of this.keys) {
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

    for (const key_code of this.sharedLayerKeys) {
      rule.manipulators = [
        ...layerToggleManipulator(
          key_code,
          this.varName,
          this.onValue,
          this.offValue,
          conditions,
        ),
        ...rule.manipulators,
      ]
    }

    return rule
  }
}

function layerToggleManipulator(
  key_code: LayerKeyCode,
  varName: string,
  onValue: ToVariable['value'],
  offValue: ToVariable['value'],
  conditions?: Array<Condition | ConditionBuilder>,
) {
  const manipulator = map(key_code)
    .toVar(varName, onValue)
    .toAfterKeyUp(toSetVar(varName, offValue))
    .toIfAlone({ key_code })
  if (conditions?.length) manipulator.condition(...conditions)
  return manipulator.build()
}
