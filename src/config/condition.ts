import {
  Condition,
  DeviceIdentifier,
  InputSource,
  KeyboardType,
  ToVariable,
} from '../karabiner/karabiner-config.ts'

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
  file_paths: Array<string | RegExp>
  description?: string
}): ConditionBuilder
export function ifApp(
  app:
    | string
    | RegExp
    | Array<string | RegExp>
    | { file_paths: Array<string | RegExp> },
  description?: string,
): ConditionBuilder {
  let bundle_identifiers: string[]
  if (Array.isArray(app)) {
    bundle_identifiers = app.map(formatRegExp)
  } else if (typeof app === 'string' || app instanceof RegExp) {
    bundle_identifiers = [formatRegExp(app)]
  } else {
    return new ConditionBuilder({
      type: 'frontmost_application_if',
      description,
      file_paths: app.file_paths.map(formatRegExp),
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
    identifiers: Array.isArray(identifier) ? identifier : [identifier],
    description,
  })
}

export function ifDeviceExists(
  identifier: DeviceIdentifier | DeviceIdentifier[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'device_exists_if',
    identifiers: Array.isArray(identifier) ? identifier : [identifier],
    description,
  })
}

export function ifKeyboardType(
  keyboardType: KeyboardType | KeyboardType[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'keyboard_type_if',
    keyboard_types: Array.isArray(keyboardType) ? keyboardType : [keyboardType],
    description,
  })
}

export function ifInputSource(
  inputSource: InputSource | InputSource[],
  description?: string,
) {
  return new ConditionBuilder({
    type: 'input_source_if',
    input_sources: Array.isArray(inputSource) ? inputSource : [inputSource],
    description,
  })
}

export function ifEventChanged(value = true, description?: string) {
  return new ConditionBuilder({ type: 'event_changed_if', value, description })
}

export class ConditionBuilder {
  constructor(private readonly condition: Condition) {}

  build(): Condition {
    return { ...this.condition }
  }
}

export function isConditionBuilder(
  src: Condition | ConditionBuilder,
): src is ConditionBuilder {
  return typeof (src as ConditionBuilder).build === 'function'
}

function formatRegExp(v: string | RegExp) {
  return typeof v === 'string' ? v : v.toString().slice(1, -1)
}
