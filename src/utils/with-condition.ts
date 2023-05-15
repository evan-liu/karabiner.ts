import { Condition, Manipulator } from '../karabiner/karabiner-config'
import {
  buildManipulators,
  ManipulatorBuilder,
  ManipulatorMap,
} from '../config/manipulator'
import { buildCondition, ConditionBuilder } from '../config/condition'

/**
 * A high-order function to add condition to a group of manipulators
 * Note: The `Manipulator[]` return type is deprecated and will be removed in v2.
 *       Please use the ManipulatorBuilder return type.
 */
export function withCondition(
  ...conditions: Array<Condition | ConditionBuilder>
): (
  manipulators:
    | ManipulatorMap
    | Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
) => Manipulator[] & ManipulatorBuilder {
  return (manipulators) => {
    const sharedConditions = conditions.map(buildCondition)
    function addSharedConditions(manipulator: Manipulator) {
      if (manipulator.type !== 'basic') return manipulator
      return {
        ...manipulator,
        conditions: [...(manipulator.conditions || []), ...sharedConditions],
      }
    }

    const src = Array.isArray(manipulators)
      ? manipulators
      : buildManipulators(manipulators)
    const result = src.reduce(
      (r, v) => [...r, ...buildManipulators(v).map(addSharedConditions)],
      [] as Manipulator[],
    )
    return Object.assign(result, { build: () => result })
  }
}
