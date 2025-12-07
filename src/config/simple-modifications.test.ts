import { describe, expect, test } from 'vitest'

import { map } from './from'
import { simpleModifications } from './simple-modifications'

describe('simpleModifications', () => {
  test('should return empty if empty given', () => {
    let result = simpleModifications([])

    expect(result).toEqual([])
  })

  test('should return simple manipulators', () => {
    let result = simpleModifications([map('1').to('2'), map('3').to('4')])

    expect(result).toEqual([
      {
        from: { key_code: '1' },
        to: [{ key_code: '2' }],
      },
      {
        from: { key_code: '3' },
        to: [{ key_code: '4' }],
      },
    ])
  })

  test('should throw if not simple', () => {
    expect(() => simpleModifications([map('1').to('2')])).not.toThrow()

    expect(() => simpleModifications([map('1')])).toThrow()
    expect(() => simpleModifications([map('1').toIfAlone('2')])).toThrow()
    expect(() => simpleModifications([map('1').toIfHeldDown('2')])).toThrow()
    expect(() => simpleModifications([map('1').toAfterKeyUp('2')])).toThrow()
    expect(() =>
      simpleModifications([map('1').to('2').description('description')]),
    ).toThrow()
    expect(() =>
      simpleModifications([
        map('1').to('2').parameters({
          'basic.to_if_alone_timeout_milliseconds': 1000,
        }),
      ]),
    ).toThrow()
  })
})
