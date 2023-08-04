import { expect, test } from 'vitest'

import { toOnlyKeyCodes } from '../karabiner/key-code'

import { getKeyWithAlias } from './key-alias'

test('getKeyWithAlias()', () => {
  // KeyCode
  expect(getKeyWithAlias('left_command')).toBe('left_command')

  // KeyAlias
  expect(getKeyWithAlias('→')).toBe('right_arrow')

  // NumberKeyValue
  expect(getKeyWithAlias(1)).toBe('1')

  // Invalid keys
  expect(() => getKeyWithAlias('' as any)).toThrow('key_code')
  expect(() => getKeyWithAlias(toOnlyKeyCodes[0], toOnlyKeyCodes)).toThrow(
    'here',
  )
})
