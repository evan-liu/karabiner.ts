import {
  FromKeyCode,
  ModifierKeyCode,
  StickyModifierKeyCode,
  ToKeyCode,
} from './key-code'

export type Modifier =
  | ModifierKeyCode
  | 'command'
  | 'control'
  | 'option'
  | 'shift'

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/ */
export type FromEvent = (
  | { key_code: FromKeyCode }
  | { consumer_key_code: string }
  | { pointing_button: string }
  | { any: 'key_code' | 'consumer_key_code' | 'pointing_button' }
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/ */
      simultaneous?: Array<{ key_code: string }>
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous-options/ */
      simultaneous_options?: {
        detect_key_down_uninterruptedly?: boolean
        key_down_order?: 'insensitive' | 'strict' | 'strict_inverse'
        key_up_order?: 'insensitive' | 'strict' | 'strict_inverse'
        key_up_when?: 'any' | 'all'
        to_after_key_up?: ToEvent[]
      }
    }
) & {
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/modifiers/ */
  modifiers?: {
    mandatory?: Modifier[] | ['any']
    optional?: Modifier[] | ['any']
  }
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/ */
export type ToInputSource = {
  language: string
  input_source_id?: string
  input_mode_id?: string
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/set-variable/ */
export type ToVariable = {
  name: string
  value: number | boolean | string
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/mouse-key/ */
export type ToMouseKey = {
  x: number
  y: number
  vertical_wheel: number
  horizontal_wheel: number
  speed_multiplier: number
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/sticky-modifier/ */
export type ToStickyModifier = Partial<
  Record<StickyModifierKeyCode, 'on' | 'off' | 'toggle'>
>

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/software_function/cg_event_double_click/ */
type ToCgEventDoubleClick = { button: number }

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/software_function/set_mouse_cursor_position/ */
export type ToMouseCursorPosition = {
  x: number | `${number}%`
  y: number | `${number}%`
  screen?: number
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/software_function/iokit_power_management_sleep_system/ */
export type ToSleepSystem = { delay_milliseconds?: number }

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/set-notification-message/ */
export type ToNotificationMessage = { id: string; text: string }

export type ToSoftwareFunction =
  | { cg_event_double_click: ToCgEventDoubleClick }
  | { set_mouse_cursor_position: ToMouseCursorPosition }
  | { iokit_power_management_sleep_system: ToSleepSystem }

export type ToEventOptions = {
  set_notification_message?: ToNotificationMessage
  modifiers?: Modifier[]
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/lazy/ */
  lazy?: boolean
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/repeat/ */
  repeat?: boolean
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/halt/ */
  halt?: boolean
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/hold-down-milliseconds/ */
  hold_down_milliseconds?: number
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/ */
export type ToEvent = (
  | { key_code: ToKeyCode }
  | { consumer_key_code: string }
  | { pointing_button: string }
  | { shell_command: string }
  | { select_input_source: ToInputSource }
  | { set_variable: ToVariable }
  | { mouse_key: ToMouseKey }
  | { sticky_modifier: ToStickyModifier }
  | { software_function: ToSoftwareFunction }
) &
  ToEventOptions

export type DeviceIdentifier = {
  vendor_id?: string
  product_id?: string
  location_id?: string
  is_keyboard?: boolean
  is_pointing_device?: boolean
  is_touch_bar?: boolean
  is_built_in_keyboard?: boolean
}

export type KeyboardType = 'ansi' | 'iso' | 'jis'

export type InputSource = {
  language?: string
  input_source_id?: string
  input_mode_id?: string
}

export type Condition =
  | ({
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/frontmost-application/ */
      type: 'frontmost_application_if' | 'frontmost_application_unless'
      description?: string
    } & ({ bundle_identifiers: string[] } | { file_paths: string[] }))
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/device/ */
      type:
        | 'device_if'
        | 'device_unless'
        | 'device_exists_if'
        | 'device_exists_unless'
      identifiers: DeviceIdentifier[]
      description?: string
    }
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/keyboard-type/ */
      type: 'keyboard_type_if' | 'keyboard_type_unless'
      keyboard_types: KeyboardType[]
      description?: string
    }
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/input-source/ */
      type: 'input_source_if' | 'input_source_unless'
      input_sources: InputSource[]
      description?: string
    }
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/variable/ */
      type: 'variable_if' | 'variable_unless'
      name: string
      value: number | boolean | string
      description?: string
    }
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/event-changed/ */
      type: 'event_changed_if' | 'event_changed_unless'
      value: boolean
      description?: string
    }

export type BasicParameters = {
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/#change-threshold-milliseconds */
  'basic.simultaneous_threshold_milliseconds'?: number
  'basic.to_if_alone_timeout_milliseconds'?: number
  'basic.to_if_held_down_threshold_milliseconds'?: number
  'basic.to_delayed_action_delay_milliseconds'?: number
}

export type BasicManipulator = {
  type: 'basic'
  from: FromEvent
  to?: ToEvent[]
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-if-alone/ */
  to_if_alone?: ToEvent[]
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-if-held-down/ */
  to_if_held_down?: ToEvent[]
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-after-key-up/ */
  to_after_key_up?: ToEvent[]
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-delayed-action/ */
  to_delayed_action?: {
    to_if_invoked: ToEvent[]
    to_if_canceled: ToEvent[]
  }
  parameters?: BasicParameters
  conditions?: Condition[]
  description?: string
}

export type MouseMotionToScrollParameters = {
  'mouse_motion_to_scroll.speed'?: number
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/other-types/mouse-motion-to-scroll/ */
export type MouseMotionToScrollManipulator = {
  type: 'mouse_motion_to_scroll'
  options?: {
    momentum_scroll_enabled: boolean
    speed_multiplier: number
  }
} & (
  | { from: Pick<BasicManipulator['from'], 'modifiers'> }
  | { conditions: BasicManipulator['conditions'] }
)

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/ */
export type Manipulator = BasicManipulator | MouseMotionToScrollManipulator

export type Rule = {
  description: string
  manipulators: Manipulator[]
}

export type ComplexModificationsParameters = BasicParameters &
  MouseMotionToScrollParameters

export type ComplexModifications = {
  parameters: ComplexModificationsParameters
  rules: Rule[]
}

export type KarabinerProfile = {
  name: string
  selected: boolean
  complex_modifications: ComplexModifications
}

export type KarabinerConfig = { profiles: [KarabinerProfile] }
