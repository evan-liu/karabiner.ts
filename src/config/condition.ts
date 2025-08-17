import {
  Condition,
  DeviceIdentifier,
  InputSource,
  KeyboardType,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import { toArray } from '../utils/to-array.ts'

export function ifVar(
  name: string,
  value: ToVariable['value'] = 1,
  description?: string,
) {
  return new ConditionBuilder({ type: 'variable_if', name, value, description })
}

export function ifApp(
  bundleId: string | RegExp | Array<string | RegExp>,
  description?: string,
): ConditionBuilder
export function ifApp(app: {
  file_paths?: Array<string | RegExp>
  bundle_identifiers?: Array<string | RegExp>
  description?: string
}): ConditionBuilder
export function ifApp(
  app:
    | string
    | RegExp
    | Array<string | RegExp>
    | {
        file_paths?: Array<string | RegExp>
        bundle_identifiers?: Array<string | RegExp>
      },
  description?: string,
): ConditionBuilder {
  let bundle_identifiers: string[]
  if (Array.isArray(app)) {
    bundle_identifiers = app.map(formatRegExp)
  } else if (typeof app == 'string' || app instanceof RegExp) {
    bundle_identifiers = [formatRegExp(app)]
  } else {
    return new ConditionBuilder({
      type: 'frontmost_application_if',
      description,
      file_paths: app.file_paths?.map(formatRegExp),
      bundle_identifiers: app.bundle_identifiers?.map(formatRegExp),
    })
  }
  return new ConditionBuilder({
    type: 'frontmost_application_if',
    description,
    bundle_identifiers,
  })
}

export function ifDevice(
  identifier: DeviceIdentifier | DeviceIdentifier[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'device_if',
    identifiers: toArray(identifier),
    description,
  })
}

export function ifDeviceExists(
  identifier: DeviceIdentifier | DeviceIdentifier[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'device_exists_if',
    identifiers: toArray(identifier),
    description,
  })
}

export function ifKeyboardType(
  keyboardType: KeyboardType | KeyboardType[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'keyboard_type_if',
    keyboard_types: toArray(keyboardType),
    description,
  })
}

export function ifInputSource(
  inputSource: InputSource | InputSource[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'input_source_if',
    input_sources: toArray(inputSource),
    description,
  })
}

export function ifEventChanged(value = true, description?: string) {
  return new ConditionBuilder({ type: 'event_changed_if', value, description })
}

let unlessTypes = flipUnlessTypes({
  frontmost_application_if: 'frontmost_application_unless',
  device_if: 'device_unless',
  device_exists_if: 'device_exists_unless',
  keyboard_type_if: 'keyboard_type_unless',
  input_source_if: 'input_source_unless',
  variable_if: 'variable_unless',
  event_changed_if: 'event_changed_unless',
})

export class ConditionBuilder {
  constructor(private readonly condition: Condition) {}

  /** Switch type {condition}_if to {condition}_unless, and vice versa */
  unless(): ConditionBuilder {
    return new ConditionBuilder({
      ...this.condition,
      type: unlessTypes[this.condition.type],
    } as Condition)
  }

  build(): Condition {
    return { ...this.condition }
  }
}

export function isConditionBuilder(
  src: Condition | ConditionBuilder,
): src is ConditionBuilder {
  return typeof (src as ConditionBuilder).build == 'function'
}

export function buildCondition(src: Condition | ConditionBuilder): Condition {
  return isConditionBuilder(src) ? src.build() : src
}

function formatRegExp(v: string | RegExp) {
  return typeof v == 'string' ? v : v.toString().slice(1, -1)
}

function flipUnlessTypes(
  types: Partial<Record<Condition['type'], Condition['type']>>,
): Record<Condition['type'], Condition['type']> {
  return Object.keys(types).reduce(
    (result, type) => {
      return { ...result, [result[type as Condition['type']]]: type }
    },
    types as Record<Condition['type'], Condition['type']>,
  )
}
