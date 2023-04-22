import { Condition, Manipulator, Rule } from '../karabiner/karabiner-config'
import { isManipulatorBuilder, ManipulatorBuilder } from './manipulator'
import { ConditionBuilder, isConditionBuilder } from './condition'

export function rule(
  description: string,
  ...conditions: Array<Condition | ConditionBuilder>
) {
  return new BasicRuleBuilder(description, ...conditions)
}

export class BasicRuleBuilder implements RuleBuilder {
  protected readonly rule: Rule
  protected readonly conditions: Array<Condition | ConditionBuilder>

  constructor(
    description: string,
    ...conditions: Array<Condition | ConditionBuilder>
  ) {
    this.rule = { description, manipulators: [] }
    this.conditions = conditions
  }

  manipulators(src: Array<Manipulator | ManipulatorBuilder>): this {
    src.forEach((v) =>
      this.rule.manipulators.push(isManipulatorBuilder(v) ? v.build() : v),
    )
    return this
  }

  condition(...v: Array<Condition | ConditionBuilder>): this {
    v.forEach((c) => this.conditions.push(c))
    return this
  }

  build(): Rule {
    const rule = { ...this.rule }
    if (this.conditions.length === 0) return rule

    const conditions = this.conditions.map((condition) =>
      isConditionBuilder(condition) ? condition.build() : condition,
    )
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
