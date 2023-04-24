import { Condition, Manipulator } from '../karabiner/karabiner-config'
import { isManipulatorBuilder, ManipulatorBuilder } from '../config/manipulator'
import { ConditionBuilder, isConditionBuilder } from '../config/condition'

/** A high-order function to add condition to a group of manipulators */
export function withCondition(
  ...conditions: Array<Condition | ConditionBuilder>
): (manipulators: Array<Manipulator | ManipulatorBuilder>) => Manipulator[] {
  return (
    manipulators: Array<Manipulator | ManipulatorBuilder>,
  ): Manipulator[] => {
    const newConditions = conditions.map((v) =>
      isConditionBuilder(v) ? v.build() : v,
    )
    return manipulators.map((v) => {
      const manipulator = isManipulatorBuilder(v) ? v.build() : v
      if (manipulator.type !== 'basic') return manipulator
      return {
        ...manipulator,
        conditions: [...(manipulator.conditions || []), ...newConditions],
      }
    })
  }
}
