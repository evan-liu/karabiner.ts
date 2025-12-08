import { map, rule } from '.'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  MockInstance,
  test,
  vi,
} from 'vitest'

import { writeContext, writeToProfile } from './output'

describe('writeToProfile', () => {
  let consoleInfoSpy: MockInstance<
    [message?: any, ...optionalParams: any[]],
    void
  >
  let writeContextReadKarabinerConfigSpy: MockInstance<
    [karabinerJsonPath?: string],
    any
  >
  let writeContextWriteKarabinerConfigSpy: MockInstance<
    [json: any, karabinerJsonPath?: string],
    any
  >

  beforeEach(() => {
    consoleInfoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined)
    writeContextReadKarabinerConfigSpy = vi
      .spyOn(writeContext, 'readKarabinerConfig')
      .mockImplementation(() => Promise.resolve())
    writeContextWriteKarabinerConfigSpy = vi
      .spyOn(writeContext, 'writeKarabinerConfig')
      .mockImplementation(() => Promise.resolve())
  })

  afterEach(() => {
    consoleInfoSpy.mockRestore()
    writeContextReadKarabinerConfigSpy.mockRestore()
    writeContextWriteKarabinerConfigSpy.mockRestore()
  })

  test('should output dry-run to console.info and not writeKarabinerConfig', () => {
    writeToProfile('--dry-run', [
      rule('a to b').manipulators([map('a').to('b')]),
    ])

    expect(writeContextReadKarabinerConfigSpy).not.toHaveBeenCalled()
    expect(writeContextWriteKarabinerConfigSpy).not.toHaveBeenCalled()
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1)

    let { profiles } = JSON.parse(consoleInfoSpy.mock.calls[0][0])
    expect(profiles.length).toEqual(1)
    expect(profiles[0].complex_modifications.rules.length).toEqual(1)
    expect(profiles[0].complex_modifications.rules[0].description).toEqual(
      'a to b',
    )
    expect(profiles[0].complex_modifications.rules[0].manipulators).toEqual([
      {
        type: 'basic',
        from: { key_code: 'a' },
        to: [{ key_code: 'b' }],
      },
    ])
  })

  test('should output wet-run to writeKarabinerConfig and not to console.info', () => {
    writeContextReadKarabinerConfigSpy.mockImplementation(() => ({
      profiles: [{ name: 'default', complex_modifications: { rules: [] } }],
    }))
    writeToProfile('default', [rule('a to b').manipulators([map('a').to('b')])])

    expect(consoleInfoSpy).not.toHaveBeenCalled()
    expect(writeContextWriteKarabinerConfigSpy).toHaveBeenCalledTimes(1)

    let { profiles } = JSON.parse(
      writeContextWriteKarabinerConfigSpy.mock.calls[0][0],
    )
    expect(profiles.length).toEqual(1)
    expect(profiles[0].complex_modifications.rules.length).toEqual(1)
    expect(profiles[0].complex_modifications.rules[0].description).toEqual(
      'a to b',
    )
    expect(profiles[0].complex_modifications.rules[0].manipulators).toEqual([
      {
        type: 'basic',
        from: { key_code: 'a' },
        to: [{ key_code: 'b' }],
      },
    ])
  })

  describe('simple_modifications', () => {
    test('should add simple_modifications if not already set', () => {
      writeContextReadKarabinerConfigSpy.mockImplementation(() => ({
        profiles: [{ name: 'default', complex_modifications: { rules: [] } }],
      }))
      writeToProfile(
        'default',
        [rule('a to b').manipulators([map('a').to('b')])],
        {},
        {
          simple_modifications: [map('1').to('2'), map('3').to('4')],
        },
      )

      let { profiles } = JSON.parse(
        writeContextWriteKarabinerConfigSpy.mock.calls[0][0],
      )
      expect(profiles.length).toEqual(1)
      expect(profiles[0].simple_modifications).toEqual([
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

    test('should overwrite simple_modifications if already set', () => {
      writeContextReadKarabinerConfigSpy.mockImplementation(() => ({
        profiles: [
          {
            name: 'default',
            complex_modifications: { rules: [] },
            simple_modifications: [
              {
                from: { key_code: 'x' },
                to: [{ key_code: 'y' }],
              },
            ],
          },
        ],
      }))
      writeToProfile(
        'default',
        [rule('a to b').manipulators([map('a').to('b')])],
        {},
        {
          simple_modifications: [map('1').to('2'), map('3').to('4')],
        },
      )

      let { profiles } = JSON.parse(
        writeContextWriteKarabinerConfigSpy.mock.calls[0][0],
      )
      expect(profiles.length).toEqual(1)
      expect(profiles[0].simple_modifications).toEqual([
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

    test('should erase simple_modifications if empty', () => {
      writeContextReadKarabinerConfigSpy.mockImplementation(() => ({
        profiles: [
          {
            name: 'default',
            complex_modifications: { rules: [] },
            simple_modifications: [
              {
                from: { key_code: 'x' },
                to: [{ key_code: 'y' }],
              },
            ],
          },
        ],
      }))
      writeToProfile(
        'default',
        [rule('a to b').manipulators([map('a').to('b')])],
        {},
        { simple_modifications: [] },
      )

      let { profiles } = JSON.parse(
        writeContextWriteKarabinerConfigSpy.mock.calls[0][0],
      )
      expect(profiles.length).toEqual(1)
      expect(profiles[0].simple_modifications.length).toEqual(0)
    })

    test('should not modify simple_modifications if not requested', () => {
      writeContextReadKarabinerConfigSpy.mockImplementation(() => ({
        profiles: [
          {
            name: 'default',
            complex_modifications: { rules: [] },
            simple_modifications: [
              {
                from: { key_code: 'x' },
                to: [{ key_code: 'y' }],
              },
            ],
          },
        ],
      }))
      writeToProfile(
        'default',
        [rule('a to b').manipulators([map('a').to('b')])],
        {},
        {},
      )

      let { profiles } = JSON.parse(
        writeContextWriteKarabinerConfigSpy.mock.calls[0][0],
      )
      expect(profiles.length).toEqual(1)
      expect(profiles[0].simple_modifications).toEqual([
        {
          from: { key_code: 'x' },
          to: [{ key_code: 'y' }],
        },
      ])
    })
  })
})
