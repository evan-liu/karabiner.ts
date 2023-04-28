import { expect, test } from 'vitest'
import { withMapper } from './with-mapper'
import { map } from '../config/from'

test('withMapper([])', () => {
  expect(withMapper(['a'])((v) => map(v).to(1)).build()).toEqual([
    {
      type: 'basic',
      from: { key_code: 'a' },
      to: [{ key_code: '1' }],
    },
  ])
})

test('withMapper({})', () => {
  expect(withMapper({ a: 'b' })((k, v) => map(k).to(v)).build()).toEqual([
    {
      type: 'basic',
      from: { key_code: 'a' },
      to: [{ key_code: 'b' }],
    },
  ])
})
