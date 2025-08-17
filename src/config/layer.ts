import {
  BasicManipulator,
  Condition,
  FromModifiers,
  Manipulator,
  Rule,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import {
  FromKeyCode,
  FromOnlyKeyCode,
  fromOnlyKeyCodes,
  StickyModifierKeyCode,
  stickyModifierKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code.ts'
import { BuildContext } from '../utils/build-context.ts'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload.ts'
import { getKeyWithAlias, ModifierKeyAlias } from '../utils/key-alias.ts'
import {
  defaultLeaderModeOptions,
  leaderModeEscape,
  LeaderModeOptions,
} from '../utils/leader-mode.ts'
import { FromOptionalModifierParam } from '../utils/optional-modifiers.ts'
import { toArray } from '../utils/to-array.ts'

import { buildCondition, ConditionBuilder, ifVar } from './condition.ts'
import { FromKeyParam, map } from './from.ts'
import { BasicManipulatorBuilder } from './manipulator.ts'
import {
  FromModifierParam,
  ModifierParam,
  SideModifierAlias,
} from './modifier.ts'
import { BasicRuleBuilder } from './rule.ts'
import { isSupportManipulator } from './support-manipulator.ts'
import {
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
} from './to.ts'

export let defaultLayerParameters = {
  'layer.delay_by_default': false,
  'layer.delay_milliseconds': 200,
}

export type LayerKeyCode = Exclude<
  FromKeyCode,
  FromOnlyKeyCode | StickyModifierKeyCode
>
export type LayerKeyParam =
  | Exclude<
      FromKeyParam,
      | FromOnlyKeyCode
      | StickyModifierKeyCode
      | ModifierKeyAlias
      | SideModifierAlias
    >
  | '⇪'

export let excludeFromLayerKeys = [
  ...toOnlyKeyCodes,
  ...fromOnlyKeyCodes,
  ...stickyModifierKeyCodes,
]

/** @see https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md#advance3 */
export function layer(
  key: LayerKeyParam | LayerKeyParam[],
  varName?: string,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new LayerRuleBuilder(key, varName, onValue, offValue)
}

export function modifierLayer(
  modifiers: ModifierParam,
  key: LayerKeyParam | LayerKeyParam[],
  varName?: string,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return layer(key, varName, onValue, offValue).modifiers(modifiers)
}

export function hyperLayer(
  key: LayerKeyParam | LayerKeyParam[],
  varName?: string,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return modifierLayer('Hyper', key, varName, onValue, offValue)
}

let layerVarName = '__layer' // Shared by all layers, one layer at a time
let delayValue = '__delay' // Supporting var value for delay() mode

export class LayerRuleBuilder extends BasicRuleBuilder {
  private readonly keys: LayerKeyCode[]
  private readonly varName: string
  private readonly layerCondition: ConditionBuilder
  private layerKeyManipulator?: BasicManipulatorBuilder
  private replaceLayerKeyToIfAlone = false

  private layerModifiers?: FromModifiers

  private layerNotification?: boolean | string

  private leaderModeOptions?: LeaderModeOptions

  private delayed: boolean | number | undefined = undefined

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    varName?: string,
    private readonly onValue: ToVariable['value'] = 1,
    private readonly offValue: ToVariable['value'] = 0,
  ) {
    let keys = toArray(key).map((v) =>
      getKeyWithAlias<LayerKeyCode>(v, excludeFromLayerKeys, 'as layer key'),
    )
    if (!varName) {
      varName = `layer-${keys.join('-')}`
    }

    super(`Layer - ${varName}`)
    this.keys = keys
    this.varName = varName
    this.layerCondition = ifVar(this.varName, this.onValue)
    this.condition(this.layerCondition)
    this.allowEmptyManipulators = true
  }

  /** Set the layer modifiers. */
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this
  /** Set the layer modifiers to { optional: [...]} */
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

  /** Config the layer key. */
  public configKey(
    config: (
      manipulator: Omit<
        BasicManipulatorBuilder,
        'description' | 'condition' | 'parameters' | 'build'
      >,
    ) => void,
    replaceToIfAlone = false,
  ): this {
    if (!this.layerKeyManipulator) {
      this.layerKeyManipulator = map('fn')
    }
    config(this.layerKeyManipulator)
    this.replaceLayerKeyToIfAlone = replaceToIfAlone
    return this
  }

  /** Set the notification when the layer is active. */
  public notification(v: boolean | string = true) {
    this.layerNotification = v
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

    // Leader mode
    if (this.leaderModeOptions) {
      let toOff = [
        toSetVar(this.varName, this.offValue),
        toSetVar(layerVarName, 0),
      ]
      if (this.layerNotification) {
        toOff.push(toRemoveNotificationMessage(notificationId(this.varName)))
      }
      if (!this.leaderModeOptions.sticky) {
        rule.manipulators.forEach(
          (v) =>
            v.type == 'basic' &&
            !isSupportManipulator(v) &&
            (v.to = (v.to || []).concat(toOff)),
        )
      }
      rule.manipulators.push(
        ...leaderModeEscape(
          this.leaderModeOptions.escape,
          ifVar(this.varName, this.onValue),
          toOff,
        ),
      )
    }

    // Modifier optional any
    if (
      this.layerModifiers?.mandatory?.length ||
      this.layerModifiers?.optional?.length
    ) {
      let isOptionalAny = isModifiersAny(this.layerModifiers) == 'optional'
      rule.manipulators.forEach((v) =>
        this.addModifierAnyToManipulator(v, isOptionalAny),
      )
    }

    // Layer toggle keys
    let conditions = this.conditions
      .filter((v) => v != this.layerCondition)
      .map(buildCondition)
    for (let key_code of this.keys) {
      rule.manipulators = [
        ...layerToggleManipulator(
          key_code,
          this.varName,
          this.onValue,
          this.offValue,
          this.layerModifiers,
          conditions,
          context,
          this.layerKeyManipulator,
          this.replaceLayerKeyToIfAlone,
          typeof this.layerNotification == 'boolean' && this.layerNotification
            ? this.ruleDescription
            : this.layerNotification || undefined,
          this.leaderModeOptions,
          this.delayed,
        ),
        ...rule.manipulators,
      ]
    }

    return rule
  }

  // If the layer has modifiers, set manipulator modifiers to { mandatory: ['any'] }
  private addModifierAnyToManipulator(
    manipulator: Manipulator,
    // If layer modifiers is optional any:
    //   - If manipulator has modifiers - keep them - https://github.com/evan-liu/karabiner.ts/issues/171
    //   - Otherwise - Set manipulator modifier to optional any - https://github.com/evan-liu/karabiner.ts/discussions/116
    isOptionalAny: boolean,
  ) {
    if (manipulator.type != 'basic') return
    if (manipulator.from.modifiers) {
      let { mandatory, optional } = manipulator.from.modifiers
      if (optional?.length || mandatory?.length) {
        let isAny = isModifiersAny(manipulator.from.modifiers)
        if (isAny == 'mandatory') {
          manipulator.from.modifiers = { mandatory: ['any'] }
        } else if (isAny == 'optional') {
          manipulator.from.modifiers = { optional: ['any'] }
        } else if (!isOptionalAny) {
          throw new Error(
            'Layers with modifiers cannot have modifiers on manipulators',
          )
        }
        return
      }
    }
    manipulator.from.modifiers = isOptionalAny
      ? { optional: ['any'] }
      : { mandatory: ['any'] }
  }
}

export function layerToggleManipulator(
  key_code: LayerKeyCode,
  varName: string,
  onValue: ToVariable['value'],
  offValue: ToVariable['value'],
  modifiers?: FromModifiers,
  conditions?: Condition[],
  context?: BuildContext,
  layerKeyManipulator?: BasicManipulatorBuilder,
  replaceLayerKeyToIfAlone?: boolean,
  notification?: string,
  leaderMode?: LeaderModeOptions,
  delayed?: boolean | number,
) {
  function mergeManipulator<T extends BasicManipulator | BasicManipulator[]>(
    to: T,
  ): T {
    if (!layerKeyManipulator) return to
    let fromItem = layerKeyManipulator.build()[0]
    let toItem = toArray(to)[0]

    let keys = [
      'to',
      'to_if_alone',
      'to_if_held_down',
      'to_after_key_up',
    ] as const satisfies Array<keyof BasicManipulator>
    keys.forEach(
      (key) =>
        fromItem[key]?.forEach(
          (v) => (toItem[key] = [...(toItem[key] || []), v]),
        ),
    )
    if (fromItem.to_delayed_action) {
      toItem.to_delayed_action = toItem.to_delayed_action || {
        to_if_invoked: [],
        to_if_canceled: [],
      }
      for (let key of ['to_if_invoked', 'to_if_canceled'] as const) {
        fromItem.to_delayed_action[key].forEach(
          (v) => toItem.to_delayed_action?.[key].push(v),
        )
      }
    }

    if (replaceLayerKeyToIfAlone) {
      toItem.to_if_alone = toItem.to_if_alone?.filter(
        (v) => !('key_code' in v && v.key_code == key_code),
      )
    }

    return to
  }

  let delay = layerDelay(delayed, context)
  let manipulator = map({ key_code, modifiers })
    .toVar(varName, delay > 0 ? delayValue : onValue)
    .toVar(layerVarName)
    .condition(
      delay > 0 ? ifVar(varName, offValue) : ifVar(varName, onValue).unless(),
      ifVar(layerVarName).unless(),
    )
  if (!modifiers?.mandatory?.length && !leaderMode) {
    manipulator.toIfAlone({ key_code })
  }
  if (!leaderMode) {
    manipulator
      .toAfterKeyUp(toSetVar(varName, offValue))
      .toAfterKeyUp(toSetVar(layerVarName, 0))
  }
  let ifDelaying = ifVar(varName, delayValue).build()
  if (delay > 0) {
    manipulator
      .toIfAlone(toSetVar(varName, offValue))
      .toIfHeldDown(toSetVar(varName, onValue))
      .toDelayedAction(
        [],
        [
          { key_code, conditions: [ifDelaying] },
          {
            set_variable: { name: varName, value: offValue },
            conditions: [ifDelaying],
          },
        ],
      )
      .parameters({
        'basic.to_if_held_down_threshold_milliseconds': delay,
        'basic.to_delayed_action_delay_milliseconds': delay,
        'basic.to_if_alone_timeout_milliseconds': delay,
      })
  }

  if (conditions?.length) {
    manipulator.condition(...conditions)
  }
  if (notification) {
    let id = notificationId(varName)
    if (delay > 0) {
      manipulator.toIfHeldDown(toNotificationMessage(id, notification))
      manipulator.toDelayedAction([], {
        ...toRemoveNotificationMessage(id),
        conditions: [ifDelaying],
      })
    } else {
      manipulator.toNotificationMessage(id, notification)
    }
    if (!leaderMode) manipulator.toAfterKeyUp(toRemoveNotificationMessage(id))
  }
  if (!context) {
    return mergeManipulator(manipulator.build())
  }

  let key = [
    `layer_${key_code}`,
    ...(modifiers ? [JSON.stringify(modifiers)] : []),
    ...(conditions || []).map((v) => JSON.stringify(v)).sort(),
  ].join('_')
  let exiting = context.getCache<BasicManipulator>(key)
  if (exiting?.to && exiting.to_after_key_up) {
    let sameVar = exiting.to.find(
      (v) => 'set_variable' in v && v.set_variable.name == varName,
    )
    if (!sameVar) {
      exiting.to.push(toSetVar(varName, onValue))
      exiting.to_after_key_up.push(toSetVar(varName, offValue))
    }
    mergeManipulator(exiting)
    return [] // Already added
  }

  let result = manipulator.build(context)
  context.setCache(key, result[0])
  return mergeManipulator(result)
}

function isModifiersAny({
  mandatory,
  optional,
}: FromModifiers): keyof FromModifiers | null {
  if (mandatory?.length == 1 && mandatory[0] == 'any') return 'mandatory'
  if (optional?.length == 1 && optional[0] == 'any') return 'optional'
  return null
}

function notificationId(varName: string) {
  return `layer-${varName}`
}

function layerDelay(
  delayed?: boolean | number,
  context?: BuildContext,
): number {
  if (typeof delayed == 'number') return delayed
  if (delayed == false) return 0

  let params =
    context?.getParameters(defaultLayerParameters) ?? defaultLayerParameters
  if (delayed || params['layer.delay_by_default'])
    return params['layer.delay_milliseconds']
  return 0
}
