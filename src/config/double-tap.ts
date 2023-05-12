import { BasicManipulatorBuilder } from './manipulator'
import {
  BasicManipulator,
  FromKeyCodeEvent,
  Modifier,
  ToEvent,
} from '../karabiner/karabiner-config'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import {
  FromAndToKeyCode,
  fromOnlyKeyCodes,
  toOnlyKeyCodes,
} from '../karabiner/key-code'
import { ifVar } from './condition'
import { toSetVar } from './to'
import { BuildContext } from '../utils/build-context'
import { FromModifierParam } from './modifier'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload'
import { FromOptionalModifierParam } from '../utils/optional-modifiers'

export const defaultDoubleTapParameters = {
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
  const keyCode = getKeyWithAlias<FromAndToKeyCode>(
    key,
    [...fromOnlyKeyCodes, ...toOnlyKeyCodes],
    'for double tap',
  )
  const builder = new DoubleTapManipulatorBuilder({ key_code: keyCode })
  if (arg3) {
    builder.delay(arg3)
    builder.from.modifiers = parseFromModifierOverload(
      arg1 as FromModifierOverloadParam,
      arg2 as FromModifierParam,
    )
  } else if (arg2) {
    if (typeof arg2 === 'number') {
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
    if (typeof arg1 === 'number') {
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
    const params =
      context?.getParameters(defaultDoubleTapParameters) ??
      defaultDoubleTapParameters
    const delay = this.delayParam || params['double_tap.delay_milliseconds']

    const keyCode = (this.from as FromKeyCodeEvent).key_code as FromAndToKeyCode

    if (this.singleTapEvent === undefined) {
      this.singleTapEvent = { key_code: keyCode }
      const modifiers = this.manipulator.from.modifiers?.mandatory as Array<
        Modifier | 'any'
      >
      if (modifiers) {
        this.singleTapEvent.modifiers = modifiers.filter(
          (v) => v !== 'any',
        ) as Modifier[]
      }
    }

    const varNameParts = ['double-tap', keyCode]
    if (this.from.modifiers) {
      ;[this.from.modifiers.mandatory, this.from.modifiers.optional]
        .map((v) => (v?.length ? v.join(',') : ''))
        .forEach((v) => v && varNameParts.push(v))
    }
    const varName = varNameParts.join('-')

    const onCondition = ifVar(varName).build()
    const offCondition = ifVar(varName).unless().build()

    const baseManipulator: BasicManipulator = {
      ...this.manipulator,
      conditions: [...(this.manipulator.conditions || []), onCondition],
    }

    const toggleManipulator: BasicManipulator = {
      ...this.manipulator,
      to: [toSetVar(varName, 1)],
      conditions: [offCondition],
      to_delayed_action: {
        to_if_invoked: [
          ...(this.singleTapEvent ? [this.singleTapEvent] : []),
          toSetVar(varName, 0),
        ],
        to_if_canceled: [toSetVar(varName, 0)],
      },
    }
    toggleManipulator.parameters = {
      'basic.to_delayed_action_delay_milliseconds': delay,
    }

    return [baseManipulator, toggleManipulator]
  }
}
