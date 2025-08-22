import { expect, test } from 'vitest'

import { ifVar } from './condition'

test('flipUnlessTypes() creates bidirectional mapping correctly', () => {
  // Test that the .unless() method works correctly after our flipUnlessTypes improvement
  let condition = ifVar('test_var', 1)
  let unlessCondition = condition.unless()
  let backToOriginal = unlessCondition.unless()
  
  expect(condition.build().type).toBe('variable_if')
  expect(unlessCondition.build().type).toBe('variable_unless')
  expect(backToOriginal.build().type).toBe('variable_if')
  
  // Ensure the condition properties are preserved using type assertion
  let builtCondition = condition.build() as any
  let builtUnlessCondition = unlessCondition.build() as any
  let builtBackToOriginal = backToOriginal.build() as any
  
  expect(builtCondition.name).toBe('test_var')
  expect(builtUnlessCondition.name).toBe('test_var')
  expect(builtBackToOriginal.name).toBe('test_var')
})