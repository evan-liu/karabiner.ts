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
      buildManipulators(v).forEach((m) => this.rule.manipulators.push(m)),
    )
    return this
  }

  condition(...v: Array<Condition | ConditionBuilder>): this {
    v.forEach((c) => this.conditions.push(c))
    return this
  }

  build(): Rule {
    const rule = { ...this.rule }
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
