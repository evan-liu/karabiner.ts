import { Condition, Manipulator, Rule } from '../karabiner/karabiner-config'
import { buildManipulators, ManipulatorBuilder } from './manipulator'
import { buildCondition, ConditionBuilder } from './condition'

export function rule(
  description: string,
  ...conditions: Array<Condition | ConditionBuilder>
) {
  return new BasicRuleBuilder(description, ...conditions)
}

export class BasicRuleBuilder implements RuleBuilder {
  protected readonly conditions: Array<Condition | ConditionBuilder>
  protected readonly manipulatorSources: Array<
    Manipulator | ManipulatorBuilder
  > = []

  constructor(
    protected ruleDescription: string,
    ...conditions: Array<Condition | ConditionBuilder>
  ) {
    this.conditions = conditions
  }

  manipulators(src: Array<Manipulator | ManipulatorBuilder>): this {
    src.forEach((v) => this.manipulatorSources.push(v))
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

  build(): Rule {
    const rule: Rule = {
      description: this.ruleDescription,
      manipulators: this.manipulatorSources.reduce(
        (r, v) => [...r, ...buildManipulators(v)],
        [] as Manipulator[],
      ),
    }

    if (rule.manipulators.length === 0) {
      throw new Error(`"manipulators" is empty in "${rule.description}"`)
    }

    if (this.conditions.length === 0) return rule

    const conditions = this.conditions.map(buildCondition)
    rule.manipulators = rule.manipulators.map((v) =>
      v.type === 'basic'
        ? { ...v, conditions: [...(v.conditions || []), ...conditions] }
        : { ...v },
    )
    return rule
  }
}

export interface RuleBuilder {
  build(): Rule
}

export function isRuleBuilder(src: Rule | RuleBuilder): src is RuleBuilder {
  return typeof (src as RuleBuilder).build === 'function'
}

export function buildRule(src: Rule | RuleBuilder): Rule {
  return isRuleBuilder(src) ? src.build() : src
}
