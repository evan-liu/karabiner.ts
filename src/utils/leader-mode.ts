import { ConditionBuilder } from '../config/condition.ts'
import { FromKeyParam, map } from '../config/from.ts'
import {
  FromEvent,
  Manipulator,
  ToEvent,
} from '../karabiner/karabiner-config.ts'

export type LeaderModeOptions = {
  /** Default ['escape', 'caps_lock']. */
  escape?: FromKeyParam | FromEvent | Array<FromKeyParam | FromEvent>
  /** Keep layer on until one of the `escape` keys pressed. */
  sticky?: boolean
}

export let defaultLeaderModeOptions: LeaderModeOptions = {
  escape: ['escape', 'caps_lock'],
}

export function leaderModeEscape(
  keys: LeaderModeOptions['escape'],
  ifOn: ConditionBuilder,
  toOff: ToEvent[],
): Manipulator[] {
  let result: Manipulator[] = []
  if (!keys) return result

  for (let key of Array.isArray(keys) ? keys : [keys]) {
    let builder = typeof key == 'object' ? map(key) : map(key) // For TS fn overloads
    result.push(...builder.condition(ifOn).to(toOff).build())
  }

  return result
}
