import { expect, test } from 'vitest'
import { getKeyWithAlias } from './key-alias'

test('getKeyWithAlias()', () => {
  // KeyCode
  expect(getKeyWithAlias('left_command')).toBe('left_command')

  // KeyAlias
  expect(getKeyWithAlias('→')).toBe('right_arrow')

  // NumberKeyValue
  expect(getKeyWithAlias(1)).toBe('1')
})
