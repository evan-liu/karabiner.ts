import { expect, test } from 'vitest'
import {
  ConditionBuilder,
  ifApp,
  ifVar,
  isConditionBuilder,
} from './condition.ts'
import { Condition } from '../karabiner/karabiner-config.ts'

test('ifVar()', () => {
  expect(ifVar('test-mode', 2).build()).toEqual({
    type: 'variable_if',
    name: 'test-mode',
    value: 2,
  })
})

test('ifApp()', () => {
  expect(ifApp('test').build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['test'],
  })

  expect(ifApp(/^test\.app$/).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['^test\\.app$'],
  })

  expect(ifApp(['a', /b/]).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['a', 'b'],
  })

  expect(ifApp({ file_paths: ['a', /b/] }).build()).toEqual({
    type: 'frontmost_application_if',
    file_paths: ['a', 'b'],
  })
})

test('isConditionBuilder()', () => {
  const condition: Condition = { type: 'event_changed_if', value: false }
  expect(isConditionBuilder(condition)).toBe(false)
  expect(isConditionBuilder(new ConditionBuilder(condition))).toBe(true)
})
