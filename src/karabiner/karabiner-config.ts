import { FromConsumerKeyCode, ToConsumerKeyCode } from './consumer-key-code.ts'
import {
  FromKeyCode,
  ModifierKeyCode,
  StickyModifierKeyCode,
  ToKeyCode,
} from './key-code.ts'
import { PointingButton } from './pointing-button.ts'

export type Modifier =
  | ModifierKeyCode
  | 'command'
  | 'control'
  | 'option'
  | 'shift'

export type SimultaneousOptions = {
  detect_key_down_uninterruptedly?: boolean
  key_down_order?: 'insensitive' | 'strict' | 'strict_inverse'
  key_up_order?: 'insensitive' | 'strict' | 'strict_inverse'
  key_up_when?: 'any' | 'all'
  to_after_key_up?: ToEvent[]
}

export type FromKeyType =
  | { key_code: FromKeyCode | number }
  | { consumer_key_code: FromConsumerKeyCode | number }
  | { pointing_button: PointingButton | number }
  | { any: 'key_code' | 'consumer_key_code' | 'pointing_button' }

export type FromModifiers = {
  mandatory?: Modifier[] | ['any']
  optional?: Modifier[] | ['any']
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/ */
export type FromEvent = (
  | FromKeyType
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/ */
      simultaneous: FromKeyType[]
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous-options/ */
      simultaneous_options?: SimultaneousOptions
    }
) & {
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/modifiers/ */
  modifiers?: FromModifiers
}
export type FromKeyCodeEvent = Extract<
  FromEvent,
  { key_code: FromKeyCode | number }
>
export type FromConsumerKeyCodeEvent = Extract<
  FromEvent,
  { consumer_key_code: string | number }
>
export type FromPointingButtonEvent = Extract<
  FromEvent,
  { pointing_button: string | number }
>
export type FromAnyKeyEvent = Extract<
  FromEvent,
  { any: 'key_code' | 'consumer_key_code' | 'pointing_button' }
>
export type FromSimultaneousEvent = Extract<
  FromEvent,
  { simultaneous: FromKeyType[] }
>

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/ */
export type ToInputSource = {
  language?: string
  input_source_id?: string
  input_mode_id?: string
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/set-variable/ */
export type ToVariable = {
  name: string
  value?: number | boolean | string
  key_up_value?: number | boolean | string
  type?: 'set' | 'unset'
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/mouse-key/ */
export type ToMouseKey = {
  x?: number
  y?: number
  vertical_wheel?: number
  horizontal_wheel?: number
  speed_multiplier?: number
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

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/software_function/open_application/ */
export type ToOpenApplication =
  | { bundle_identifier: string }
  | { file_path: string }
  | { frontmost_application_history_index: number }

export type ToSoftwareFunction =
  | { cg_event_double_click: ToCgEventDoubleClick }
  | { set_mouse_cursor_position: ToMouseCursorPosition }
  | { iokit_power_management_sleep_system: ToSleepSystem }
  | { open_application: ToOpenApplication }

export type ToEventOptions = {
  modifiers?: Modifier[]
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/lazy/ */
  lazy?: boolean
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/repeat/ */
  repeat?: boolean
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/halt/ */
  halt?: boolean
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/hold-down-milliseconds/ */
  hold_down_milliseconds?: number
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/to-conditions/ */
  conditions?: Condition[]
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/ */
export type ToEvent = (
  | { key_code: ToKeyCode | number }
  | { consumer_key_code: ToConsumerKeyCode | number }
  | { pointing_button: PointingButton | number }
  | { shell_command: string }
  | { select_input_source: ToInputSource }
  | { set_variable: ToVariable }
  | { set_notification_message: ToNotificationMessage }
  | { mouse_key: ToMouseKey }
  | { sticky_modifier: ToStickyModifier }
  | { software_function: ToSoftwareFunction }
  | { generic_desktop: number }
) &
  ToEventOptions

export type ToKeyCodeEvent = Extract<ToEvent, { key_code: ToKeyCode }>
export type ToConsumerKeyCodeEvent = Extract<
  ToEvent,
  { consumer_key_code: string }
>
export type ToPointingButtonEvent = Extract<
  ToEvent,
  { pointing_button: string }
>
export type ToShellCommandEvent = Extract<ToEvent, { shell_command: string }>
export type ToSelectInputSourceEvent = Extract<
  ToEvent,
  { select_input_source: ToInputSource }
>
export type ToSetVariableEvent = Extract<ToEvent, { set_variable: ToVariable }>
export type ToSetNotificationMessageEvent = Extract<
  ToEvent,
  { set_notification_message: ToNotificationMessage }
>
export type ToMouseKeyEvent = Extract<ToEvent, { mouse_key: ToMouseKey }>
export type ToStickyModifierEvent = Extract<
  ToEvent,
  { sticky_modifier: ToStickyModifier }
>
export type ToSoftwareFunctionEvent = Extract<
  ToEvent,
  { software_function: ToSoftwareFunction }
>

export type DeviceIdentifier = {
  vendor_id?: number
  product_id?: number
  location_id?: number
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
  | {
      /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/frontmost-application/ */
      type: 'frontmost_application_if' | 'frontmost_application_unless'
      description?: string
      bundle_identifiers?: string[]
      file_paths?: string[]
    }
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

export type FrontmostApplicationCondition = Extract<
  Condition,
  { type: 'frontmost_application_if' | 'frontmost_application_unless' }
>
export type KeyboardTypeCondition = Extract<
  Condition,
  {
    type:
      | 'device_if'
      | 'device_unless'
      | 'device_exists_if'
      | 'device_exists_unless'
  }
>
export type InputSourceCondition = Extract<
  Condition,
  { type: 'keyboard_type_if' | 'keyboard_type_unless' }
>
export type VariableCondition = Extract<
  Condition,
  { type: 'input_source_if' | 'input_source_unless' }
>
export type EventChangedCondition = Extract<
  Condition,
  { type: 'variable_if' | 'variable_unless' }
>

export type BasicParameters = {
  /** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/#change-threshold-milliseconds */
  'basic.simultaneous_threshold_milliseconds'?: number
  'basic.to_if_alone_timeout_milliseconds'?: number
  'basic.to_if_held_down_threshold_milliseconds'?: number
  'basic.to_delayed_action_delay_milliseconds'?: number
}

type ToDelayedAction = {
  to_if_invoked: ToEvent[]
  to_if_canceled: ToEvent[]
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
  to_delayed_action?: ToDelayedAction
  parameters?: BasicParameters
  conditions?: Condition[]
  description?: string
}

export type MouseMotionToScrollParameters = {
  'mouse_motion_to_scroll.speed'?: number
}

export type MouseMotionToScrollOptions = {
  momentum_scroll_enabled?: boolean
  speed_multiplier?: number
}

/** @see https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/other-types/mouse-motion-to-scroll/ */
export type MouseMotionToScrollManipulator = {
  type: 'mouse_motion_to_scroll'
  from?: { modifiers?: FromModifiers }
  conditions?: BasicManipulator['conditions']
  options?: MouseMotionToScrollOptions
}

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

// In practice, SimpleManipulator is merely "from a key_code, to a single key_code."
// But they're parsed by Karabiner Elements as a pared down basic manipulator of "from" and "to":
// https://github.com/pqrs-org/Karabiner-Elements/blob/7c96d997ca448a9c3d3b6b7466e5159fda2d9e52/src/share/manipulator/manipulators/basic/basic.hpp#L133
export type SimpleManipulator = Pick<BasicManipulator, 'from' | 'to'>

export type KarabinerProfile = {
  name: string
  selected: boolean
  complex_modifications: ComplexModifications
  simple_modifications?: SimpleManipulator[]
}

export type KarabinerConfig = {
  global?: {
    check_for_updates_on_startup?: boolean
    show_in_menu_bar?: boolean
    show_profile_name_in_menu_bar?: boolean
  }
  profiles: [KarabinerProfile]
}
