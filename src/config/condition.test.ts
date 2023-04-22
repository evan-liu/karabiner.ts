import { expect, test } from 'vitest'
import { ConditionBuilder, ifVar, isConditionBuilder } from './condition.ts'
import { Condition } from '../karabiner/karabiner-config.ts'

test('ifVar()', () => {
  expect(ifVar('test-mode', 2).build()).toEqual({
    type: 'variable_if',
    name: 'test-mode',
    value: 2,
  })
})

test('isConditionBuilder()', () => {
  const condition: Condition = { type: 'event_changed_if', value: false }
  expect(isConditionBuilder(condition)).toBe(false)
  expect(isConditionBuilder(new ConditionBuilder(condition))).toBe(true)
})
