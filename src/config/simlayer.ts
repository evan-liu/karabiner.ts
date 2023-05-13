import { BasicRuleBuilder } from './rule'
import { buildCondition, ConditionBuilder, ifVar } from './condition'
import {
  FromEvent,
  Rule,
  SimultaneousOptions,
  ToVariable,
} from '../karabiner/karabiner-config'
import { toArray } from '../utils/to-array'
import { getKeyWithAlias } from '../utils/key-alias'
import { toSetVar } from './to'
import { FromKeyCode } from '../karabiner/key-code'
import {
  excludeFromLayerKeys,
  LayerKeyCode,
  LayerKeyParam,
  layerToggleManipulator,
} from './layer'
import { BuildContext } from '../utils/build-context'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload'
import { FromModifierParam } from './modifier'
import { FromOptionalModifierParam } from '../utils/optional-modifiers'

export const defaultSimlayerParameters = {
  'simlayer.threshold_milliseconds': 200,
}

/** @see https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md#advance3 */
export function simlayer(
  key: LayerKeyParam | LayerKeyParam[],
  varName?: string,
  threshold?: number,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new SimlayerRuleBuilder(key, varName, threshold, onValue, offValue)
}

export class SimlayerRuleBuilder extends BasicRuleBuilder {
  protected readonly keys: LayerKeyCode[]
  protected varName: string
  protected readonly layerCondition: ConditionBuilder
  protected readonly sharedLayerKeys: LayerKeyCode[] = []
  protected readonly simultaneousOptions: SimultaneousOptions = {
    detect_key_down_uninterruptedly: true,
    key_down_order: 'strict',
    key_up_order: 'strict_inverse',
    key_up_when: 'any',
  }
  protected layerModifiers: FromEvent['modifiers'] = { optional: ['any'] }

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    varName?: string,
    protected readonly threshold?: number,
    protected readonly onValue: ToVariable['value'] = 1,
    protected readonly offValue: ToVariable['value'] = 0,
  ) {
    const keys = toArray(key).map((v) =>
      getKeyWithAlias<LayerKeyCode>(v, excludeFromLayerKeys, 'as simlayer key'),
    )
    if (!varName) {
      varName = `simlayer-${keys.join('-')}`
    }

    super(`Simlayer - ${varName}`)
    this.keys = keys
    this.varName = varName
    this.layerCondition = ifVar(this.varName, this.onValue)
    this.condition(this.layerCondition)
  }

  /** Set the simlayer modifiers. Default optionalAny. Set to null to remove. */
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this
  /** Set the simlayer modifiers to { optional: [...]} (default optionalAny) */
  public modifiers(modifiers: FromOptionalModifierParam): this
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this {
    this.layerModifiers =
      mandatoryModifiers || optionalModifiers
        ? parseFromModifierOverload(mandatoryModifiers, optionalModifiers)
        : undefined
    return this
  }

  /** Set simultaneous_options on the simlayer toggle manipulator */
  public options(v: Partial<SimultaneousOptions>): this {
    Object.assign(this.simultaneousOptions, v)
    return this
  }

  /** Enable layer with the same variable and manipulators with this simlayer */
  public enableLayer(...key: LayerKeyParam[]): this {
    key
      .map((v) =>
        getKeyWithAlias<LayerKeyCode>(v, excludeFromLayerKeys, 'as layer key'),
      )
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

  public build(context?: BuildContext): Rule {
    const rule = super.build(context)
    const params =
      context?.getParameters(defaultSimlayerParameters) ??
      defaultSimlayerParameters
    const threshold =
      this.threshold || params['simlayer.threshold_milliseconds']

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

      if (this.layerModifiers) {
        v.from.modifiers = {
          ...v.from.modifiers,
          ...this.layerModifiers,
        }
      }

      for (const layerKey of this.keys) {
        rule.manipulators.push({
          type: 'basic',
          parameters: {
            'basic.simultaneous_threshold_milliseconds': threshold,
          },
          to: [setVarOn, ...(v.to || [])],
          from: {
            simultaneous: [{ key_code: layerKey }, { key_code: fromKey }],
            simultaneous_options: {
              ...this.simultaneousOptions,
              to_after_key_up: [
                ...(this.simultaneousOptions.to_after_key_up || []),
                setVarOff,
              ],
            },
            modifiers: this.layerModifiers,
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
          this.layerModifiers,
          conditions,
          context,
        ),
        ...rule.manipulators,
      ]
    }

    return rule
  }
}
