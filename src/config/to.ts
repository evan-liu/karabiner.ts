import { ToConsumerKeyCode } from '../karabiner/consumer-key-code.ts'
import {
  ToEvent,
  ToEventOptions,
  ToInputSource,
  ToMouseCursorPosition,
  ToMouseKey,
  ToVariable,
} from '../karabiner/karabiner-config.ts'
import {
  fromOnlyKeyCodes,
  StickyModifierKeyCode,
  ToKeyCode,
} from '../karabiner/key-code.ts'
import { PointingButton } from '../karabiner/pointing-button.ts'
import {
  getKeyWithAlias,
  KeyAlias,
  NumberKeyValue,
} from '../utils/key-alias.ts'

import {
  ModifierParam,
  parseModifierParam,
  SideModifierAlias,
} from './modifier.ts'

export type ToKeyParam =
  | ToKeyCode
  | KeyAlias
  | NumberKeyValue
  | SideModifierAlias

/** Create ToEvent with key_code */
export function toKey(
  key: ToKeyParam,
  modifiers?: ModifierParam,
  options?: ToEventOptions,
): ToEvent {
  let keyCode = getKeyWithAlias<ToKeyCode>(
    key,
    fromOnlyKeyCodes,
    'as to.key_code',
  )
  return {
    ...options,
    key_code: keyCode,
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

/** Create ToEvent with key_code ⌘⌥⌃⇧fn */
export function toSuperHyper(options?: ToEventOptions): ToEvent {
  return toKey('fn', '⌘⌥⌃⇧', options)
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

/** Create ToEvent with generic_desktop code */
export function toGenericDesktop(
  code: number,
  modifiers?: ModifierParam,
  options?: ToEventOptions,
): ToEvent {
  return {
    ...options,
    generic_desktop: code,
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
  let matched = app.match(/^"?(.*?)(.app)?"?$/)
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

export let systemSounds = [
  'Tink',
  'Submarine',
  'Sosumi',
  'Morse',
  'Ping',
  'Pop',
  'Purr',
  'Glass',
  'Hero',
  'Frog',
  'Funk',
  'Blow',
  'Bottle',
  'Basso',
] as const
export type SystemSounds = (typeof systemSounds)[number]

/** Play a system sound from /System/Library/Sounds/ */
export function toPlaySound(systemSound: SystemSounds): ToEvent
/** Play a sound file with afplay. */
export function toPlaySound(soundFile: string): ToEvent
export function toPlaySound(sound: SystemSounds | string) {
  let file = systemSounds.includes(sound as SystemSounds)
    ? `/System/Library/Sounds/${sound}.aiff`
    : sound
  return to$(`afplay ${file}`)
}

/** Create ToEvent with select_input_source */
export function toInputSource(inputSource: ToInputSource): ToEvent {
  return { select_input_source: inputSource }
}

/** Create ToEvent with set_variable */
export function toSetVar(
  name: string,
  value: ToVariable['value'] = 1,
  key_up_value?: ToVariable['key_up_value'],
  type?: ToVariable['type'],
): ToEvent {
  return { set_variable: { name, value, key_up_value, type } }
}

/** Create ToEvent with set_variable: { type: 'unset' } */
export function toUnsetVar(name: string): ToEvent {
  return { set_variable: { name, type: 'unset' } }
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
