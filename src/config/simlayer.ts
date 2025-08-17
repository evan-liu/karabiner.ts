import {
  FromModifiers,
  Rule,
  SimultaneousOptions,
  ToEvent,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import { FromKeyCode } from '../karabiner/key-code.ts'
import { BuildContext } from '../utils/build-context.ts'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload.ts'
import { getKeyWithAlias } from '../utils/key-alias.ts'
import { FromOptionalModifierParam } from '../utils/optional-modifiers.ts'
import { toArray } from '../utils/to-array.ts'

import { buildCondition, ConditionBuilder, ifVar } from './condition.ts'
import {
  excludeFromLayerKeys,
  LayerKeyCode,
  LayerKeyParam,
  layerToggleManipulator,
} from './layer.ts'
import { FromModifierParam } from './modifier.ts'
import { BasicRuleBuilder } from './rule.ts'
import { toSetVar } from './to.ts'

export let defaultSimlayerParameters = {
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
  private readonly keys: LayerKeyCode[]
  private readonly varName: string
  private readonly layerCondition: ConditionBuilder
  private readonly sharedLayerKeys: LayerKeyCode[] = []
  private readonly simultaneousOptions: SimultaneousOptions = {
    detect_key_down_uninterruptedly: true,
    key_down_order: 'strict',
    key_up_order: 'strict_inverse',
    key_up_when: 'any',
  }
  private layerModifiers?: FromModifiers = { optional: ['any'] }

  private ifActivated = [] as ToEvent[]
  private ifDeactivated = [] as ToEvent[]

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    varName?: string,
    private readonly threshold?: number,
    private readonly onValue: ToVariable['value'] = 1,
    private readonly offValue: ToVariable['value'] = 0,
  ) {
    let keys = toArray(key).map((v) =>
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

  /** The ToEvents to trigger when the layer is activated */
  public toIfActivated(event: ToEvent) {
    this.ifActivated.push(event)
    return this
  }

  /** The ToEvents to trigger when the layer is deactivated */
  public toIfDeactivated(event: ToEvent) {
    this.ifDeactivated.push(event)
    return this
  }

  public build(context?: BuildContext): Rule {
    let rule = super.build(context)
    let params =
      context?.getParameters(defaultSimlayerParameters) ??
      defaultSimlayerParameters
    let threshold = this.threshold || params['simlayer.threshold_milliseconds']

    let conditions =
      this.conditions.length > 1
        ? this.conditions
            .filter((v) => v != this.layerCondition)
            .map(buildCondition)
        : undefined

    let setVarOn = toSetVar(this.varName, this.onValue)
    let setVarOff = toSetVar(this.varName, this.offValue)
    rule.manipulators.concat().forEach((v) => {
      if (v.type != 'basic') {
        throw new Error(
          `Unsupported manipulator type ${v.type} in simlayer ${this.ruleDescription}`,
        )
      }

      let fromKey = (v.from as { key_code: FromKeyCode })?.key_code
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

      for (let layerKey of this.keys) {
        rule.manipulators.push({
          type: 'basic',
          parameters: {
            'basic.simultaneous_threshold_milliseconds': threshold,
          },
          to: [setVarOn, ...(v.to || []), ...this.ifActivated],
          from: {
            simultaneous: [{ key_code: layerKey }, { key_code: fromKey }],
            simultaneous_options: {
              ...this.simultaneousOptions,
              to_after_key_up: [
                ...(this.simultaneousOptions.to_after_key_up || []),
                setVarOff,
                ...this.ifDeactivated,
              ],
            },
            modifiers: this.layerModifiers,
          },
          conditions,
        })
      }
    })

    for (let key_code of this.sharedLayerKeys) {
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
