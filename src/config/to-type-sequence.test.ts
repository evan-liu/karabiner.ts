import { expect, test } from 'vitest'
import { map } from './from'
import { toTypeSequence } from './to-type-sequence'
import { toKey } from './to'

test('toTypeSequence()', () => {
  expect(map(1).toTypeSequence('1!aA>←').build()).toEqual([
    {
      type: 'basic',
      from: { key_code: '1' },
      to: [
        { key_code: '1' },
        { key_code: '1', modifiers: ['shift'] },
        { key_code: 'a' },
        { key_code: 'a', modifiers: ['shift'] },
        { key_code: 'period', modifiers: ['shift'] },
        { key_code: 'left_arrow' },
      ],
    },
  ])

  expect(toTypeSequence('12', { 2: toKey(3) })).toEqual([
    { key_code: '1' },
    { key_code: '3' },
  ])

  expect(() => toTypeSequence('⚠️')).toThrow()
})
