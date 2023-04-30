import { BasicManipulatorBuilder } from './manipulator'
import { BasicManipulator } from '../karabiner/karabiner-config'
import { FromKeyParam } from './from'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { FromAndToKeyCode } from '../karabiner/key-code'
import { ifVar } from './condition'
import { toSetVar } from './to'

export const defaultDoubleTapDelay = 200
export const doubleTapParameters = {
  'double_tap.delay_milliseconds': defaultDoubleTapDelay,
}

export type DoubleTapParam = FromAndToKeyCode | KeyAlias | NumberKeyValue

export function mapDoubleTap(key: DoubleTapParam, delay?: number) {
  return new DoubleTapManipulatorBuilder(key, delay)
}

export class DoubleTapManipulatorBuilder extends BasicManipulatorBuilder {
  private readonly keyCode: FromAndToKeyCode
  private readonly varName: string

  constructor(key: FromKeyParam, private readonly delay?: number) {
    const keyCode = getKeyWithAlias(key) as FromAndToKeyCode
    super({ key_code: keyCode })

    this.keyCode = keyCode
    this.varName = `double-tap-${keyCode}`
  }

  public build(): BasicManipulator[] {
    const onCondition = ifVar(this.varName).build()
    const offCondition = ifVar(this.varName).unless().build()

    const baseManipulator: BasicManipulator = {
      ...this.manipulator,
      conditions: [...(this.manipulator.conditions || []), onCondition],
      to: [...(this.manipulator.to || []), toSetVar(this.varName)],
    }

    const toggleManipulator: BasicManipulator = {
      type: 'basic',
      from: { key_code: this.keyCode },
      to: [toSetVar(this.varName, 1)],
      conditions: [offCondition],
      to_delayed_action: {
        to_if_invoked: [{ key_code: this.keyCode }, toSetVar(this.varName, 0)],
        to_if_canceled: [toSetVar(this.varName, 0)],
      },
    }
    toggleManipulator.parameters = {
      'basic.to_delayed_action_delay_milliseconds':
        this.delay || doubleTapParameters['double_tap.delay_milliseconds'],
    }

    return [baseManipulator, toggleManipulator]
  }
}
