import {
  BasicManipulator,
  FromKeyCodeEvent,
  Modifier,
  ToEvent,
} from '../karabiner/karabiner-config.ts'
import {
  FromAndToKeyCode,
  fromOnlyKeyCodes,
  stickyModifierKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code.ts'
import { BuildContext } from '../utils/build-context.ts'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload.ts'
import {
  getKeyWithAlias,
  KeyAlias,
  NumberKeyValue,
} from '../utils/key-alias.ts'
import { FromOptionalModifierParam } from '../utils/optional-modifiers.ts'

import { ifVar } from './condition.ts'
import { BasicManipulatorBuilder } from './manipulator.ts'
import { FromModifierParam } from './modifier.ts'
import { supportManipulator } from './support-manipulator.ts'
import { toSetVar } from './to.ts'

export let defaultDoubleTapParameters = {
  'double_tap.delay_milliseconds': 200,
}

export type DoubleTapParam = FromAndToKeyCode | KeyAlias | NumberKeyValue

/** Start a manipulator for double-tapping a key with modifiers */
export function mapDoubleTap(
  key: DoubleTapParam,
  mandatoryModifiers: FromModifierParam | '' | null,
  optionalModifiers?: FromModifierParam,
  delay?: number,
): DoubleTapManipulatorBuilder
/** Start a manipulator for double-tapping a key with modifiers */
export function mapDoubleTap(
  key: DoubleTapParam,
  modifiers: FromModifierParam | FromOptionalModifierParam,
  delay?: number,
): DoubleTapManipulatorBuilder
/** Start a manipulator for double-tapping a key */
export function mapDoubleTap(
  key: DoubleTapParam,
  delay?: number,
): DoubleTapManipulatorBuilder
/** Start a manipulator for double-tapping a key */
export function mapDoubleTap(
  key: DoubleTapParam,
  arg1?: FromModifierOverloadParam | number,
  arg2?: FromModifierParam | number,
  arg3?: number,
) {
  let keyCode = getKeyWithAlias<FromAndToKeyCode>(
    key,
    [...fromOnlyKeyCodes, ...toOnlyKeyCodes],
    'for double tap',
  )
  let builder = new DoubleTapManipulatorBuilder({ key_code: keyCode })
  if (arg3) {
    builder.delay(arg3)
    builder.from.modifiers = parseFromModifierOverload(
      arg1 as FromModifierOverloadParam,
      arg2 as FromModifierParam,
    )
  } else if (arg2) {
    if (typeof arg2 == 'number') {
      builder.delay(arg2)
      builder.from.modifiers = parseFromModifierOverload(
        arg1 as FromModifierOverloadParam,
      )
    } else {
      builder.from.modifiers = parseFromModifierOverload(
        arg1 as FromModifierOverloadParam,
        arg2 as FromModifierParam,
      )
    }
  } else if (arg1) {
    if (typeof arg1 == 'number') {
      builder.delay(arg1)
    } else {
      builder.from.modifiers = parseFromModifierOverload(
        arg1 as FromModifierOverloadParam,
      )
    }
  }
  return builder
}

export class DoubleTapManipulatorBuilder extends BasicManipulatorBuilder {
  private singleTapEvent?: ToEvent | null = undefined
  private delayParam?: number

  constructor(from: FromKeyCodeEvent & { key_code: FromAndToKeyCode }) {
    super(from)
  }

  /** Set single tap which is from key by default; null to disable */
  public singleTap(v: ToEvent | null): this {
    this.singleTapEvent = v
    return this
  }

  /** Set the delay parameter */
  public delay(v: number): this {
    this.delayParam = v
    return this
  }

  public build(context?: BuildContext): BasicManipulator[] {
    let params =
      context?.getParameters(defaultDoubleTapParameters) ??
      defaultDoubleTapParameters
    let delay = this.delayParam || params['double_tap.delay_milliseconds']

    let keyCode = (this.from as FromKeyCodeEvent).key_code as FromAndToKeyCode

    if (typeof this.singleTapEvent == 'undefined') {
      this.singleTapEvent = { key_code: keyCode }
      let modifiers = this.manipulator.from.modifiers?.mandatory as Array<
        Modifier | 'any'
      >
      if (modifiers) {
        this.singleTapEvent.modifiers = modifiers.filter(
          (v) => v != 'any',
        ) as Modifier[]
      }
    }
    let isSingleTapModifier =
      this.singleTapEvent && 'key_code' in this.singleTapEvent
        ? stickyModifierKeyCodes.includes(this.singleTapEvent.key_code as any)
        : false

    let varNameParts = ['double-tap', keyCode]
    if (this.from.modifiers) {
      ;[this.from.modifiers.mandatory, this.from.modifiers.optional]
        .map((v) => (v?.length ? v.join(',') : ''))
        .forEach((v) => v && varNameParts.push(v))
    }
    let varName = varNameParts.join('-')

    let onCondition = ifVar(varName).build()
    let offCondition = ifVar(varName).unless().build()

    let baseManipulator = supportManipulator({
      ...this.manipulator,
      conditions: [onCondition],
    })

    let toggleManipulator: BasicManipulator = {
      ...this.manipulator,
      to: [
        toSetVar(varName, 1),
        ...(isSingleTapModifier
          ? [
              {
                ...this.singleTapEvent!,
                lazy:
                  this.singleTapEvent!.lazy ||
                  typeof this.singleTapEvent!.lazy == 'undefined',
              },
            ]
          : []),
      ],
      conditions: [...(this.manipulator.conditions || []), offCondition],
      to_delayed_action: {
        to_if_invoked: [
          ...(this.singleTapEvent ? [this.singleTapEvent] : []),
          toSetVar(varName, 0),
        ],
        to_if_canceled: [toSetVar(varName, 0)],
      },
    }

    if (isSingleTapModifier && !toggleManipulator.to_if_held_down?.length) {
      toggleManipulator.to_if_held_down = [this.singleTapEvent!]
    }

    toggleManipulator.parameters = {
      'basic.to_if_held_down_threshold_milliseconds': delay,
      'basic.to_delayed_action_delay_milliseconds': delay,
      ...this.manipulator.parameters,
    }

    return [baseManipulator, toggleManipulator]
  }
}
