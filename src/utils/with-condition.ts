import { Condition, Manipulator } from '../karabiner/karabiner-config'
import { buildManipulators, ManipulatorBuilder } from '../config/manipulator'
import { ConditionBuilder, isConditionBuilder } from '../config/condition'

/** A high-order function to add condition to a group of manipulators */
export function withCondition(
  ...conditions: Array<Condition | ConditionBuilder>
): (manipulators: Array<Manipulator | ManipulatorBuilder>) => Manipulator[] {
  return (
    manipulators: Array<Manipulator | ManipulatorBuilder>,
  ): Manipulator[] => {
    const sharedConditions = conditions.map((v) =>
      isConditionBuilder(v) ? v.build() : v,
    )

    function addSharedConditions(manipulator: Manipulator) {
      if (manipulator.type !== 'basic') return manipulator
      return {
        ...manipulator,
        conditions: [...(manipulator.conditions || []), ...sharedConditions],
      }
    }

    return manipulators.reduce(
      (r, v) => [...r, ...buildManipulators(v).map(addSharedConditions)],
      [] as Manipulator[],
    )
  }
}
