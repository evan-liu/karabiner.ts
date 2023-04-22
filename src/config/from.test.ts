import { expect, test } from 'vitest'
import { map } from './from.ts'

test('map()', () => {
  expect(map('/', '⌘⌥', '⌃').build().from).toEqual({
    key_code: 'slash',
    modifiers: { mandatory: ['command', 'option'], optional: ['control'] },
  })
})
