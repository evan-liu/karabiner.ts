import { ManipulatorBuilder } from './manipulator'
import {
  Condition,
  Manipulator,
  MouseMotionToScrollManipulator,
  MouseMotionToScrollOptions,
} from '../karabiner/karabiner-config'
import { FromModifierParam } from './modifier'
import { buildCondition, ConditionBuilder } from './condition'
import { BuildContext } from '../utils/build-context'
import {
  FromModifierOverloadParam,
  parseFromModifierOverload,
} from '../utils/from-modifier-overload'
import { FromOptionalModifierParam } from '../utils/optional-modifiers'

export function mouseMotionToScroll() {
  return new MouseMotionToScrollManipulatorBuilder()
}

export class MouseMotionToScrollManipulatorBuilder
  implements ManipulatorBuilder
{
  private readonly manipulator: MouseMotionToScrollManipulator = {
    type: 'mouse_motion_to_scroll',
  }

  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this
  public modifiers(modifiers: FromOptionalModifierParam): this
  public modifiers(
    mandatoryModifiers?: FromModifierOverloadParam,
    optionalModifiers?: FromModifierParam,
  ): this {
    this.manipulator.from = {
      modifiers: parseFromModifierOverload(
        mandatoryModifiers,
        optionalModifiers,
      ),
    }
    return this
  }

  condition(...v: Array<Condition | ConditionBuilder>): this {
    const { conditions = [] } = this.manipulator
    this.manipulator.conditions = [...conditions, ...v.map(buildCondition)]
    return this
  }

  options(v: MouseMotionToScrollOptions): this {
    this.manipulator.options = { ...this.manipulator.options, ...v }
    return this
  }

  public build(_?: BuildContext): Manipulator[] {
    return [{ ...this.manipulator }]
  }
}
