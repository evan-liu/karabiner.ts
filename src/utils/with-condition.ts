import { buildCondition, ConditionBuilder } from '../config/condition.ts'
import {
  buildManipulators,
  ManipulatorBuilder,
  ManipulatorMap,
} from '../config/manipulator.ts'
import { Condition, Manipulator } from '../karabiner/karabiner-config.ts'

/**
 * A higher-order function to add condition to a group of manipulators
 * Note: The `Manipulator[]` return type is deprecated and will be removed in v2.
 *       Please use the ManipulatorBuilder return type.
 *
 * @example
 * withCondition(ifVar('v1'), ifVar('v2'))([
 *  //...
 * ])
 */
export function withCondition(
  ...conditions: Array<Condition | ConditionBuilder>
): (
  manipulators:
    | ManipulatorMap
    | Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
) => Manipulator[] & ManipulatorBuilder {
  return (manipulators) => {
    let sharedConditions = conditions.map(buildCondition)
    function addSharedConditions(manipulator: Manipulator) {
      if (manipulator.type != 'basic') return manipulator
      return {
        ...manipulator,
        conditions: [...(manipulator.conditions || []), ...sharedConditions],
      }
    }

    let src = Array.isArray(manipulators)
      ? manipulators
      : buildManipulators(manipulators)
    let result = src.reduce(
      (r, v) => [...r, ...buildManipulators(v).map(addSharedConditions)],
      [] as Manipulator[],
    )
    return Object.assign(result, { build: () => result })
  }
}
