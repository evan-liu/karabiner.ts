import { describe, expect, test } from 'vitest'
import { FromEvent, ToEvent } from '../karabiner/karabiner-config.ts'
import { isManipulatorBuilder, ManipulatorBuilder } from './manipulator.ts'

describe('ManipulatorBuilder', () => {
  const from: FromEvent = { key_code: 'a' }

  test('type and from', () => {
    expect(new ManipulatorBuilder(from).build()).toEqual({
      type: 'basic',
      from,
    })
  })

  test('to()', () => {
    const event: ToEvent = { key_code: 'b', modifiers: ['command'], lazy: true }
    expect(
      new ManipulatorBuilder(from)
        .to(event)
        .to('b', '⌘', { lazy: true })
        .build().to,
    ).toEqual([event, event])
  })

  test('to$(), toApp(), toPaste()', () => {
    const to = new ManipulatorBuilder(from)
      .to$('cd')
      .toApp('Finder')
      .toPaste('test')
      .build().to as Array<{ shell_command: string }>
    expect(to[0]).toEqual({ shell_command: 'cd' })
    expect(to[1]).toEqual({ shell_command: 'open -a Finder.app' })
    expect(to[2].shell_command).toMatch('"test"')
  })

  test('toVar()', () => {
    expect(
      new ManipulatorBuilder(from).toVar('a', 1).toVar('b', true).build().to,
    ).toEqual([
      { set_variable: { name: 'a', value: 1 } },
      { set_variable: { name: 'b', value: true } },
    ])
  })
})

test('isManipulatorBuilder()', () => {
  const from: FromEvent = { key_code: 'a' }
  expect(isManipulatorBuilder({ type: 'basic', from })).toBe(false)
  expect(isManipulatorBuilder(new ManipulatorBuilder(from))).toBe(true)
})
