import { ModifierParam, parseModifierParam } from './modifier'
import {
  ToEvent,
  ToEventOptions,
  ToInputSource,
  ToMouseCursorPosition,
  ToMouseKey,
  ToVariable,
} from '../karabiner/karabiner-config'
import { getKeyWithAlias, KeyAlias, NumberKeyValue } from '../utils/key-alias'
import { StickyModifierKeyCode, ToKeyCode } from '../karabiner/key-code'
import { ToConsumerKeyCode } from '../karabiner/consumer-key-code'
import { PointingButton } from '../karabiner/pointing-button'

export type ToKeyParam = ToKeyCode | KeyAlias | NumberKeyValue

/** Create ToEvent with key_code */
export function toKey(
  key: ToKeyParam,
  modifiers?: ModifierParam,
  options?: ToEventOptions,
): ToEvent {
  return {
    ...options,
    key_code: getKeyWithAlias(key) as ToKeyCode,
    modifiers: modifiers ? parseModifierParam(modifiers) : undefined,
  }
}

/** Create ToEvent with key_code ⌘⌥⌃⇧ */
export function toHyper(options?: ToEventOptions): ToEvent {
  return toKey('left_command', '⌥⌃⇧', options)
}

/** Create ToEvent with key_code ⌥⌃⇧ */
export function toMeh(options?: ToEventOptions): ToEvent {
  return toKey('left_option', '⌃⇧', options)
}

/** Create ToEvent with key_code vk_none (Disable this key) */
export function toNone(options?: ToEventOptions): ToEvent {
  return toKey('vk_none', undefined, options)
}

/** Create ToEvent with consumer_key_code */
export function toConsumerKey(
  code: ToConsumerKeyCode,
  modifiers?: ModifierParam,
  options?: ToEventOptions,
): ToEvent {
  return {
    ...options,
    consumer_key_code: code,
    modifiers: modifiers ? parseModifierParam(modifiers) : undefined,
  }
}

/** Create ToEvent with pointing_button */
export function toPointingButton(
  button: PointingButton,
  modifiers?: ModifierParam,
  options?: ToEventOptions,
): ToEvent {
  return {
    ...options,
    pointing_button: button,
    modifiers: modifiers ? parseModifierParam(modifiers) : undefined,
  }
}

/** Create ToEvent with shell_command */
export function to$(shell_command: string): ToEvent {
  return { shell_command }
}

/** Create ToEvent with shell_command `open -a {app}.app` */
export function toApp(app: string): ToEvent {
  const matched = app.match(/^"?(.*?)(.app)?"?$/)
  return to$(`open -a "${matched?.[1] || app}".app`)
}

/** Create ToEvent with shell_command to paste {text} */
export function toPaste(text: string): ToEvent {
  return to$(`osascript -e '
set prev to the clipboard
set the clipboard to "${text}"
tell application "System Events"
  keystroke "v" using command down
  delay 0.1
end tell
set the clipboard to prev'`)
}

/** Create ToEvent with select_input_source */
export function toInputSource(inputSource: ToInputSource): ToEvent {
  return { select_input_source: inputSource }
}

/** Create ToEvent with set_variable */
export function toSetVar(
  name: string,
  value: ToVariable['value'] = 1,
): ToEvent {
  return { set_variable: { name, value } }
}

/** Create ToEvent with set_notification_message */
export function toNotificationMessage(id: string, text: string): ToEvent {
  return { set_notification_message: { id, text } }
}

/** Create ToEvent with set_notification_message text:'' */
export function toRemoveNotificationMessage(id: string): ToEvent {
  return { set_notification_message: { id, text: '' } }
}

/** Create ToEvent with mouse_key */
export function toMouseKey(mouse_key: ToMouseKey): ToEvent {
  return { mouse_key }
}

/** Create ToEvent with sticky_modifier */
export function toStickyModifier(
  key: StickyModifierKeyCode,
  value: 'on' | 'off' | 'toggle' = 'toggle',
): ToEvent {
  return { sticky_modifier: { [key]: value } }
}

/** Create ToEvent with software_function.cg_event_double_click */
export function toCgEventDoubleClick(button: number): ToEvent {
  return {
    software_function: { cg_event_double_click: { button } },
  }
}

/** Create ToEvent with software_function.set_mouse_cursor_position */
export function toMouseCursorPosition(p: ToMouseCursorPosition): ToEvent {
  return { software_function: { set_mouse_cursor_position: p } }
}

/** Create ToEvent with software_function.iokit_power_management_sleep_system */
export function toSleepSystem(delay?: number): ToEvent {
  return {
    software_function: {
      iokit_power_management_sleep_system: { delay_milliseconds: delay },
    },
  }
}
