import {
  BasicManipulator,
  FromSimultaneousEvent,
  Rule,
  SimultaneousOptions,
  ToEvent,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import { BuildContext } from '../utils/build-context.ts'
import {
  defaultLeaderModeOptions,
  leaderModeEscape,
  LeaderModeOptions,
} from '../utils/leader-mode.ts'

import { buildCondition, ConditionBuilder, ifVar } from './condition.ts'
import { LayerKeyParam } from './layer.ts'
import { BasicRuleBuilder } from './rule.ts'
import { mapSimultaneous } from './simultaneous.ts'
import { isSupportManipulator } from './support-manipulator.ts'
import {
  toKey,
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
} from './to.ts'

export let defaultDuoLayerParameters = {
  'duo_layer.threshold_milliseconds': 200,
  'duo_layer.notification': false as boolean | string,
  'duo_layer.delay_by_default': false,
  'duo_layer.delay_milliseconds': 200,
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

  private layerNotification?: boolean | string

  private ifActivated = [] as ToEvent[]
  private ifDeactivated = [] as ToEvent[]

  private leaderModeOptions?: LeaderModeOptions

  private delayed: boolean | number | undefined = undefined

  constructor(
    private readonly key1: LayerKeyParam,
    private readonly key2: LayerKeyParam,
    varName?: string,
    private readonly onValue: ToVariable['value'] = 1,
    private readonly offValue: ToVariable['value'] = 0,
  ) {
    let desc = `DuoLayer ${varName || `${key1} ${key2}`}`
    if (!varName) {
      varName = `duo-layer-${key1}-${key2}`
    }

    super(desc)
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

  /** Set the notification when the layer is active. */
  public notification(v: boolean | string = true) {
    this.layerNotification = v
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

  /** Set leader mode. Default escape keys: ['escape', 'caps_lock']. */
  public leaderMode(v: boolean | LeaderModeOptions = true) {
    if (typeof v == 'boolean') {
      this.leaderModeOptions = v ? defaultLeaderModeOptions : undefined
    } else {
      this.leaderModeOptions = { ...defaultLeaderModeOptions, ...v }
    }
    return this
  }

  /** Set delay mode (and delay_milliseconds). */
  public delay(v: boolean | number = true) {
    this.delayed = v
    return this
  }

  public build(context?: BuildContext): Rule {
    let rule = super.build(context)

    let params =
      context?.getParameters(defaultDuoLayerParameters) ??
      defaultDuoLayerParameters
    let threshold =
      this.simultaneousThreshold || params['duo_layer.threshold_milliseconds']
    let notification =
      this.layerNotification ?? params['duo_layer.notification']
    let delay =
      typeof this.delayed == 'number'
        ? this.delayed
        : this.delayed == false
        ? 0
        : this.delayed == true || params['duo_layer.delay_by_default']
        ? params['duo_layer.delay_milliseconds']
        : 0

    let conditions = this.conditions
      .filter((v) => v != this.layerCondition)
      .map(buildCondition)

    let activate = [toSetVar(this.varName, this.onValue), ...this.ifActivated]
    let deactivate = [
      toSetVar(this.varName, this.offValue),
      ...this.ifDeactivated,
    ]

    if (notification) {
      let id = `duo-layer-${this.varName}`
      let message =
        typeof notification == 'boolean' ? this.ruleDescription : notification
      activate.push(toNotificationMessage(id, message))
      deactivate.push(toRemoveNotificationMessage(id))
    }

    // Leader mode
    if (this.leaderModeOptions) {
      if (!this.leaderModeOptions.sticky) {
        rule.manipulators.forEach(
          (v) =>
            v.type == 'basic' &&
            !isSupportManipulator(v) &&
            (v.to = (v.to || []).concat(deactivate)),
        )
      }
      rule.manipulators.push(
        ...leaderModeEscape(
          this.leaderModeOptions.escape,
          ifVar(this.varName, this.onValue),
          deactivate,
        ),
      )
    }

    // Layer toggle
    let toAfterKeyUp = this.simultaneousOptions.to_after_key_up || []
    if (!this.leaderModeOptions) {
      toAfterKeyUp.push(...deactivate)
    }

    let manipulators = [
      [this.key1, this.key2],
      ...(delay > 0 ? [[this.key2, this.key1]] : []),
    ].map((keys) => {
      let manipulator = mapSimultaneous(
        keys,
        {
          ...this.simultaneousOptions,
          ...(delay > 0 ? { key_down_order: 'strict' } : {}),
          to_after_key_up: toAfterKeyUp,
        },
        threshold,
      )
        .modifiers('??')
        .condition(ifVar(this.varName, this.onValue).unless())
      if (conditions.length) {
        manipulator.condition(...conditions)
      }
      if (delay > 0) {
        manipulator
          .toIfHeldDown(activate)
          .toIfAlone(keys.map((x) => toKey(x)))
          .parameters({
            'basic.to_if_held_down_threshold_milliseconds': delay,
            'basic.to_if_alone_timeout_milliseconds': delay,
          })
      } else {
        manipulator.to(activate)
      }
      return manipulator
    })

    // Build context
    if (!context) {
      rule.manipulators = [
        ...manipulators.flatMap((x) => x.build()),
        ...rule.manipulators,
      ]
      return rule
    }

    // Add variables to the existing manipulator
    let key = [
      'duo_layer',
      ...[this.key1, this.key2].sort(),
      ...conditions.map((v) => JSON.stringify(v)).sort(),
    ].join('_')
    let existing = context.getCache<BasicManipulator[]>(key)
    if (existing) {
      existing.forEach((manipulator) => {
        let sameVar = manipulator.to?.find(
          (v) => 'set_variable' in v && v.set_variable.name == this.varName,
        )
        if (!sameVar) {
          manipulator.to?.push(toSetVar(this.varName, this.onValue))
          let from = manipulator.from as FromSimultaneousEvent
          from.simultaneous_options?.to_after_key_up?.push(
            toSetVar(this.varName, this.offValue),
          )
        }
      })
    } else {
      let result = manipulators.flatMap((x) => x.build(context))
      context.setCache(key, result)
      rule.manipulators = [...result, ...rule.manipulators]
    }

    return rule
  }
}
