import { LayerKeyParam } from './layer.ts'
import {
  BasicManipulator,
  FromSimultaneousEvent,
  Rule,
  SimultaneousOptions,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import { BasicRuleBuilder } from './rule.ts'
import { buildCondition, ConditionBuilder, ifVar } from './condition.ts'
import { BuildContext } from '../utils/build-context.ts'
import { mapSimultaneous } from './simultaneous.ts'
import { toSetVar } from './to.ts'

export const defaultDuoLayerParameters = {
  'duo_layer.threshold_milliseconds': 200,
}

export function duoLayer(
  key1: LayerKeyParam,
  key2: LayerKeyParam,
  varName?: string,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new DuoLayerRuleBuilder(key1, key2, varName, onValue, offValue)
}

export class DuoLayerRuleBuilder extends BasicRuleBuilder {
  private readonly varName: string
  private readonly layerCondition: ConditionBuilder
  private readonly simultaneousOptions: SimultaneousOptions = {}
  private simultaneousThreshold?: number

  constructor(
    private readonly key1: LayerKeyParam,
    private readonly key2: LayerKeyParam,
    varName?: string,
    private readonly onValue: ToVariable['value'] = 1,
    private readonly offValue: ToVariable['value'] = 0,
  ) {
    if (!varName) {
      varName = `duo-layer-${key1}-${key2}`
    }

    super(`Layer - ${varName}`)
    this.varName = varName
    this.layerCondition = ifVar(this.varName, this.onValue)
    this.condition(this.layerCondition)
    this.allowEmptyManipulators = true
  }

  public threshold(v: number): this {
    this.simultaneousThreshold = v
    return this
  }

  public options(v: SimultaneousOptions): this {
    Object.assign(this.simultaneousOptions, v)
    return this
  }

  public build(context?: BuildContext): Rule {
    const rule = super.build(context)

    const params =
      context?.getParameters(defaultDuoLayerParameters) ??
      defaultDuoLayerParameters
    const threshold =
      this.simultaneousThreshold || params['duo_layer.threshold_milliseconds']

    const conditions = this.conditions
      .filter((v) => v !== this.layerCondition)
      .map(buildCondition)

    // Layer toggle
    const manipulator = mapSimultaneous(
      [this.key1, this.key2],
      {
        ...this.simultaneousOptions,
        to_after_key_up: [
          ...(this.simultaneousOptions.to_after_key_up || []),
          toSetVar(this.varName, this.offValue),
        ],
      },
      threshold,
    )
      .modifiers('??')
      .to(toSetVar(this.varName, this.onValue))
    if (conditions.length) {
      manipulator.condition(...conditions)
    }

    // Build context
    if (!context) {
      rule.manipulators = [...manipulator.build(), ...rule.manipulators]
      return rule
    }

    // Add variables to the existing manipulator
    const key = [
      `duo_layer_${this.key1}_${this.key2}`,
      ...conditions.map((v) => JSON.stringify(v)).sort(),
    ].join('_')
    const exiting = context.getCache<BasicManipulator>(key)
    if (exiting) {
      const sameVar = exiting.to?.find(
        (v) => 'set_variable' in v && v.set_variable.name === this.varName,
      )
      if (!sameVar) {
        exiting.to?.push(toSetVar(this.varName, this.onValue))
        const from = exiting.from as FromSimultaneousEvent
        from.simultaneous_options?.to_after_key_up?.push(
          toSetVar(this.varName, this.offValue),
        )
      }
    } else {
      const result = manipulator.build(context)[0]
      context.setCache(key, result)
      rule.manipulators = [result, ...rule.manipulators]
    }

    return rule
  }
}
