import { ModifierParam, parseModifierParam } from './modifier'
import {
  ToEvent,
  ToEventOptions,
  ToVariable,
} from '../karabiner/karabiner-config'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { ToKeyCode } from '../karabiner/key-code'

export type ToKeyParam = ToKeyCode | KeyAlias | NumberKeyValue

/** Create ToEvent with key_code  */
export function toKey(
  key: ToKeyParam,
  modifiers?: ModifierParam,
  options?: ToEventOptions,
): ToEvent {
  return {
    ...options,
    key_code: getKeyWithAlias(key) as ToKeyCode,
    modifiers: modifiers ? parseModifierParam(modifiers) : undefined,
  }
}

/** Create ToEvent with set_variable */
export function setVar(name: string, value: ToVariable['value'] = 1): ToEvent {
  return { set_variable: { name, value } }
}
