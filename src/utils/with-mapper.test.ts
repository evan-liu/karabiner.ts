import { expect, test } from 'vitest'
import { withMapper } from './with-mapper'
import { map } from '../config/from'

test('withMapper([])', () => {
  expect(withMapper(['⇪'])((v, i) => map(v).to$(`echo ${i}`)).build()).toEqual([
    {
      type: 'basic',
      from: { key_code: 'caps_lock' },
      to: [{ shell_command: 'echo 0' }],
    },
  ])
})

test('withMapper({})', () => {
  expect(withMapper({ a: 'b' })((k, v) => map(k).to$(v)).build()).toEqual([
    {
      type: 'basic',
      from: { key_code: 'a' },
      to: [{ shell_command: 'b' }],
    },
  ])
})
