import { Condition, Manipulator } from '../karabiner/karabiner-config'
import { buildManipulators, ManipulatorBuilder } from '../config/manipulator'
import { buildCondition, ConditionBuilder } from '../config/condition'

/**
 * A high-order function to add condition to a group of manipulators
 * Note: The `Manipulator[]` return type is deprecated and will be removed in v2.
 *       Please use the ManipulatorBuilder return type.
 */
export function withCondition(
  ...conditions: Array<Condition | ConditionBuilder>
): (
  manipulators: Array<Manipulator | ManipulatorBuilder>,
) => Manipulator[] & ManipulatorBuilder {
  return (manipulators: Array<Manipulator | ManipulatorBuilder>) => {
    const sharedConditions = conditions.map(buildCondition)
    function addSharedConditions(manipulator: Manipulator) {
      if (manipulator.type !== 'basic') return manipulator
      return {
        ...manipulator,
        conditions: [...(manipulator.conditions || []), ...sharedConditions],
      }
    }

    const result = manipulators.reduce(
      (r, v) => [...r, ...buildManipulators(v).map(addSharedConditions)],
      [] as Manipulator[],
    )
    return Object.assign(result, { build: () => result })
  }
}
