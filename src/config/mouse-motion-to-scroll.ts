import { ManipulatorBuilder } from './manipulator'
import {
  Condition,
  Manipulator,
  MouseMotionToScrollManipulator,
  MouseMotionToScrollOptions,
} from '../karabiner/karabiner-config'
import { FromModifierParam, parseFromModifierParams } from './modifier'
import { buildCondition, ConditionBuilder } from './condition'

export function mouseMotionToScroll() {
  return new MouseMotionToScrollManipulatorBuilder()
}

export class MouseMotionToScrollManipulatorBuilder
  implements ManipulatorBuilder
{
  private readonly manipulator: MouseMotionToScrollManipulator = {
    type: 'mouse_motion_to_scroll',
  }

  modifiers(
    mandatoryModifiers?: FromModifierParam,
    optionalModifiers?: FromModifierParam,
  ): this {
    this.manipulator.from = {
      modifiers: parseFromModifierParams(mandatoryModifiers, optionalModifiers),
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

  public build(): Manipulator[] {
    return [{ ...this.manipulator }]
  }
}
