import { Condition, ToVariable } from '../karabiner/karabiner-config.ts'

export function ifVar(
  name: string,
  value: ToVariable['value'] = 1,
  description?: string,
) {
  return new ConditionBuilder({ type: 'variable_if', name, value, description })
}

export class ConditionBuilder {
  constructor(private readonly condition: Condition) {}

  build(): Condition {
    return { ...this.condition }
  }
}

export function isConditionBuilder(
  src: Condition | ConditionBuilder,
): src is ConditionBuilder {
  return typeof (src as ConditionBuilder).build === 'function'
}
