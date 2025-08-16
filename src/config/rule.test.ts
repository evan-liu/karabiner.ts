import { expect, test } from 'vitest'

import { ifVar } from './condition'
import { map } from './from'
import { BasicRuleBuilder, isRuleBuilder, rule } from './rule'
import { toKey } from './to'

test('rule()', () => {
  let condition1 = ifVar('v1').build()
  let condition2 = ifVar('v2').build()
  let condition3 = ifVar('v3').build()
  let manipulator1 = map('a').to('b').build()[0]
  let manipulator2 = map('c').to('d').condition(condition3).build()[0]
  expect(
    rule('test1', condition1)
      .description('test2')
      .condition(condition2)
      .manipulators([manipulator1, manipulator2])
      .build(),
  ).toEqual({
    description: 'test2',
    manipulators: [
      { ...manipulator1, conditions: [condition1, condition2] },
      { ...manipulator2, conditions: [condition3, condition1, condition2] },
    ],
  })
})

test('Empty manipulators error', () => {
  expect(() => new BasicRuleBuilder('test').build()).toThrow(
    /manipulators.*empty/,
  )
})

test('isRuleBuilder()', () => {
  expect(isRuleBuilder({ description: 'a', manipulators: [] })).toBe(false)
  expect(isRuleBuilder(new BasicRuleBuilder('b'))).toBe(true)
})

test('manipulators map', () => {
  expect(
    rule('')
      .manipulators({ '›⌘': toKey('b') })
      .build(),
  ).toEqual({
    description: '',
    manipulators: [
      {
        type: 'basic',
        from: { key_code: 'right_command' },
        to: [{ key_code: 'b' }],
      },
    ],
  })

  expect(() =>
    rule('')
      .manipulators({ xyz: toKey(1) })
      .build(),
  ).toThrow(/key_code/)
})
