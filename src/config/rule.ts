import { Condition, Manipulator, Rule } from '../karabiner/karabiner-config.ts'
import { BuildContext } from '../utils/build-context.ts'

import { buildCondition, ConditionBuilder } from './condition.ts'
import {
  buildManipulators,
  ManipulatorBuilder,
  ManipulatorMap,
} from './manipulator.ts'
import { isSupportManipulator } from './support-manipulator.ts'

export function rule(
  description: string,
  ...conditions: Array<Condition | ConditionBuilder>
) {
  return new BasicRuleBuilder(description, ...conditions)
}

export class BasicRuleBuilder implements RuleBuilder {
  protected readonly conditions: Array<Condition | ConditionBuilder>
  protected readonly manipulatorSources: Array<
    Manipulator | ManipulatorBuilder | ManipulatorMap
  > = []
  protected allowEmptyManipulators = false

  constructor(
    protected ruleDescription: string,
    ...conditions: Array<Condition | ConditionBuilder>
  ) {
    this.conditions = conditions
  }

  manipulators(
    src:
      | ManipulatorMap
      | Array<Manipulator | ManipulatorBuilder | ManipulatorMap>,
  ): this {
    if (Array.isArray(src)) {
      src.forEach((v) => this.manipulatorSources.push(v))
    } else {
      this.manipulatorSources.push(src)
    }
    return this
  }

  condition(...v: Array<Condition | ConditionBuilder>): this {
    v.forEach((c) => this.conditions.push(c))
    return this
  }

  description(v: string): this {
    this.ruleDescription = v
    return this
  }

  build(context?: BuildContext): Rule {
    let rule: Rule = {
      description: this.ruleDescription,
      manipulators: this.manipulatorSources.reduce(
        (r, v) => [...r, ...buildManipulators(v, context)],
        [] as Manipulator[],
      ),
    }

    if (!this.allowEmptyManipulators && rule.manipulators.length == 0) {
      throw new Error(`"manipulators" is empty in "${rule.description}"`)
    }

    if (this.conditions.length == 0) return rule

    let conditions = this.conditions.map(buildCondition)
    rule.manipulators = rule.manipulators.map((v) =>
      v.type == 'basic' && !isSupportManipulator(v)
        ? { ...v, conditions: [...(v.conditions || []), ...conditions] }
        : { ...v },
    )
    return rule
  }
}

export interface RuleBuilder {
  build(context?: BuildContext): Rule
}

export function isRuleBuilder(src: Rule | RuleBuilder): src is RuleBuilder {
  return typeof (src as RuleBuilder).build == 'function'
}

export function buildRule(
  src: Rule | RuleBuilder,
  context?: BuildContext,
): Rule {
  return isRuleBuilder(src) ? src.build(context) : src
}
