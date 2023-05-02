import {
  FromKeyCode,
  FromOnlyKeyCode,
  ModifierKeyCode,
} from '../karabiner/key-code'
import { Condition, Rule, ToVariable } from '../karabiner/karabiner-config'
import { getKeyWithAlias, ModifierKeyAlias } from '../utils/key-alias'
import { FromKeyParam, map } from './from'
import { toSetVar } from './to'
import { ConditionBuilder, ifVar } from './condition'
import { BasicRuleBuilder } from './rule'
import { toArray } from '../utils/to-array'
import { BuildContext } from '../utils/build-context'

export type LayerKeyCode = Exclude<
  FromKeyCode,
  FromOnlyKeyCode | ModifierKeyCode
>
export type LayerKeyParam = Exclude<
  FromKeyParam,
  FromOnlyKeyCode | ModifierKeyCode | ModifierKeyAlias
>

/** @see https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md#advance3 */
export function layer(
  key: LayerKeyParam | LayerKeyParam[],
  varName: string,
  onValue: ToVariable['value'] = 1,
  offValue: ToVariable['value'] = 0,
) {
  return new LayerRuleBuilder(key, varName, onValue, offValue)
}

export class LayerRuleBuilder extends BasicRuleBuilder {
  protected readonly keys: LayerKeyCode[]
  protected layerCondition = ifVar(this.varName, this.onValue)

  constructor(
    key: LayerKeyParam | LayerKeyParam[],
    protected readonly varName: string,
    protected readonly onValue: ToVariable['value'] = 1,
    protected readonly offValue: ToVariable['value'] = 0,
  ) {
    super(`Layer - ${varName}`)
    this.keys = toArray(key).map((v) => getKeyWithAlias(v) as LayerKeyCode)
    this.condition(this.layerCondition)
  }

  public build(context?: BuildContext): Rule {
    const rule = super.build(context)

    const conditions = this.conditions.filter((v) => v !== this.layerCondition)
    for (const key_code of this.keys) {
      rule.manipulators = [
        ...layerToggleManipulator(
          key_code,
          this.varName,
          this.onValue,
          this.offValue,
          conditions,
          context,
        ),
        ...rule.manipulators,
      ]
    }

    return rule
  }
}

export function layerToggleManipulator(
  key_code: LayerKeyCode,
  varName: string,
  onValue: ToVariable['value'],
  offValue: ToVariable['value'],
  conditions?: Array<Condition | ConditionBuilder>,
  context?: BuildContext,
) {
  const manipulator = map(key_code)
    .toVar(varName, onValue)
    .toAfterKeyUp(toSetVar(varName, offValue))
    .toIfAlone({ key_code })
  if (conditions?.length) manipulator.condition(...conditions)
  return manipulator.build(context)
}
