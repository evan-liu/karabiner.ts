import { expect, test } from 'vitest'

import { Condition } from '../karabiner/karabiner-config'

import {
  ConditionBuilder,
  ifApp,
  ifDevice,
  ifDeviceExists,
  ifEventChanged,
  ifInputSource,
  ifKeyboardType,
  ifVar,
  isConditionBuilder,
} from './condition'

test('ifVar()', () => {
  expect(ifVar('test-mode', 2).build()).toEqual({
    type: 'variable_if',
    name: 'test-mode',
    value: 2,
  })
})

test('ifApp()', () => {
  expect(ifApp('test').build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['test'],
  })

  expect(ifApp(/^test\.app$/).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['^test\\.app$'],
  })

  expect(ifApp(['a', /b/]).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['a', 'b'],
  })

  expect(ifApp({ bundle_identifiers: ['a', /b/] }).build()).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['a', 'b'],
  })
  expect(ifApp({ file_paths: ['a', /b/] }).build()).toEqual({
    type: 'frontmost_application_if',
    file_paths: ['a', 'b'],
  })
  expect(
    ifApp({ bundle_identifiers: ['a', /b/], file_paths: ['c', /d/] }).build(),
  ).toEqual({
    type: 'frontmost_application_if',
    bundle_identifiers: ['a', 'b'],
    file_paths: ['c', 'd'],
  })
})

test('ifDevice()', () => {
  expect(ifDevice({ vendor_id: 1 }).build()).toEqual({
    type: 'device_if',
    identifiers: [{ vendor_id: 1 }],
  })

  expect(
    ifDevice([{ vendor_id: 1, product_id: 2 }, { location_id: 3 }]).build(),
  ).toEqual({
    type: 'device_if',
    identifiers: [{ vendor_id: 1, product_id: 2 }, { location_id: 3 }],
  })
})

test('ifDeviceExists()', () => {
  expect(ifDeviceExists({ vendor_id: 1 }).build()).toEqual({
    type: 'device_exists_if',
    identifiers: [{ vendor_id: 1 }],
  })

  expect(
    ifDeviceExists([
      { vendor_id: 1, product_id: 2 },
      { location_id: 3 },
    ]).build(),
  ).toEqual({
    type: 'device_exists_if',
    identifiers: [{ vendor_id: 1, product_id: 2 }, { location_id: 3 }],
  })
})

test('ifKeyboardType()', () => {
  expect(ifKeyboardType('iso').build()).toEqual({
    type: 'keyboard_type_if',
    keyboard_types: ['iso'],
  })
  expect(ifKeyboardType(['jis', 'ansi']).build()).toEqual({
    type: 'keyboard_type_if',
    keyboard_types: ['jis', 'ansi'],
  })
})

test('ifInputSource()', () => {
  expect(ifInputSource({ language: 'en' }).build()).toEqual({
    type: 'input_source_if',
    input_sources: [{ language: 'en' }],
  })
  expect(
    ifInputSource([
      { language: 'en' },
      { language: 'cn', input_mode_id: 'zh' },
    ]).build(),
  ).toEqual({
    type: 'input_source_if',
    input_sources: [
      { language: 'en' },
      { language: 'cn', input_mode_id: 'zh' },
    ],
  })
})

test('ifEventChanged()', () => {
  expect(ifEventChanged(true).build()).toEqual({
    type: 'event_changed_if',
    value: true,
  })
  expect(ifEventChanged(false).build()).toEqual({
    type: 'event_changed_if',
    value: false,
  })
})

test('unless()', () => {
  let appUnless = ifApp('a').unless()
  expect(appUnless.build().type).toBe('frontmost_application_unless')
  expect(appUnless.build()).toEqual(appUnless.unless().unless().build())

  let deviceUnless = ifDevice({ vendor_id: 1 }).unless()
  expect(deviceUnless.build().type).toBe('device_unless')
  expect(deviceUnless.build()).toEqual(deviceUnless.unless().unless().build())

  let deviceExistsUnless = ifDeviceExists({ vendor_id: 1 }).unless()
  expect(deviceExistsUnless.build().type).toBe('device_exists_unless')
  expect(deviceExistsUnless.build()).toEqual(
    deviceExistsUnless.unless().unless().build(),
  )

  let keyboardTypeUnless = ifKeyboardType('iso').unless()
  expect(keyboardTypeUnless.build().type).toBe('keyboard_type_unless')
  expect(keyboardTypeUnless.build()).toEqual(
    keyboardTypeUnless.unless().unless().build(),
  )

  let inputSourceUnless = ifInputSource({ language: 'en' }).unless()
  expect(inputSourceUnless.build().type).toBe('input_source_unless')
  expect(inputSourceUnless.build()).toEqual(
    inputSourceUnless.unless().unless().build(),
  )

  let variableUnless = ifVar('a').unless()
  expect(variableUnless.build().type).toBe('variable_unless')
  expect(variableUnless.build()).toEqual(
    variableUnless.unless().unless().build(),
  )

  let eventChangedUnless = ifEventChanged().unless()
  expect(eventChangedUnless.build().type).toBe('event_changed_unless')
  expect(eventChangedUnless.build()).toEqual(
    eventChangedUnless.unless().unless().build(),
  )
})

test('isConditionBuilder()', () => {
  let condition: Condition = { type: 'event_changed_if', value: false }
  expect(isConditionBuilder(condition)).toBe(false)
  expect(isConditionBuilder(new ConditionBuilder(condition))).toBe(true)
})
