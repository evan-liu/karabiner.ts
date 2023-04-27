import {
  BasicManipulator,
  BasicParameters,
  Condition,
  FromEvent,
  Manipulator,
  ToEvent,
  ToEventOptions,
  ToMouseCursorPosition,
  ToMouseKey,
  ToVariable,
} from '../karabiner/karabiner-config'
import { ModifierParam, parseModifierParam } from './modifier'
import { toKey, ToKeyParam } from './to'
import { buildCondition, ConditionBuilder } from './condition'
import { ToConsumerKeyCode } from '../karabiner/consumer-key-code'
import { PointingButton } from '../karabiner/pointing-button'

export interface ManipulatorBuilder {
  build(): Manipulator[]
}

export class BasicManipulatorBuilder implements ManipulatorBuilder {
  private readonly manipulator: BasicManipulator

  constructor(from: FromEvent) {
    this.manipulator = { type: 'basic', from }
  }

  to(event: ToEvent): this
  to(key: ToKeyParam, modifiers?: ModifierParam, options?: ToEventOptions): this
  to(
    keyOrEvent: ToEvent | ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this {
    this.addToEvent(
      typeof keyOrEvent === 'string' || typeof keyOrEvent === 'number'
        ? toKey(keyOrEvent, modifiers, options)
        : keyOrEvent,
    )
    return this
  }

  /** To Hyper key ⌘⌥⌃⇧ */
  toHyper(options?: ToEventOptions): this {
    this.addToEvent(toKey('left_command', '⌥⌃⇧', options))
    return this
  }

  /** To Meh key ⌥⌃⇧ */
  toMeh(options?: ToEventOptions): this {
    this.addToEvent(toKey('left_option', '⌃⇧', options))
    return this
  }

  /** To { consumer_key_code } */
  toConsumerKey(
    code: ToConsumerKeyCode,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this {
    this.addToEvent({
      ...options,
      consumer_key_code: code,
      modifiers: modifiers ? parseModifierParam(modifiers) : undefined,
    })
    return this
  }

  /** Map to mouse button */
  toPointingButton(
    button: PointingButton,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this {
    this.addToEvent({
      ...options,
      pointing_button: button,
      modifiers: modifiers ? parseModifierParam(modifiers) : undefined,
    })
    return this
  }

  /** Move mouse cursor by delta */
  toMouseKey(mouse_key: ToMouseKey): this {
    this.addToEvent({ mouse_key })
    return this
  }

  /** Map to shell command */
  to$(shell_command: string): this {
    this.addToEvent({ shell_command })
    return this
  }

  /** Map to `$ open -a {app}.app` */
  toApp(app: string) {
    const matched = app.match(/^"?(.*?)(.app)?"?$/)
    return this.to$(`open -a "${matched?.[1] || app}".app`)
  }

  /** Map to paste {text} via clipboard */
  toPaste(text: string) {
    return this.to$(`osascript -e '
set prev to the clipboard
set the clipboard to "${text}"
tell application "System Events"
  keystroke "v" using command down
  delay 0.1
end tell
set the clipboard to prev'`)
  }

  /** Map to setting a variable */
  toVar(name: string, value: ToVariable['value'] = 1): this {
    this.addToEvent({ set_variable: { name, value } })
    return this
  }

  /** Set mouse cursor position */
  toMouseCursorPosition(p: ToMouseCursorPosition): this {
    this.addToEvent({ software_function: { set_mouse_cursor_position: p } })
    return this
  }

  toIfAlone(event: ToEvent): this
  toIfAlone(
    key: ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this
  toIfAlone(
    keyOrEvent: ToEvent | ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this {
    this.pushOrCreateList(
      this.manipulator,
      'to_if_alone',
      typeof keyOrEvent === 'string'
        ? toKey(keyOrEvent, modifiers, options)
        : keyOrEvent,
    )
    return this
  }

  toIfHeldDown(event: ToEvent): this
  toIfHeldDown(
    key: ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this
  toIfHeldDown(
    keyOrEvent: ToEvent | ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this {
    this.pushOrCreateList(
      this.manipulator,
      'to_if_held_down',
      typeof keyOrEvent === 'string'
        ? toKey(keyOrEvent, modifiers, options)
        : keyOrEvent,
    )
    return this
  }

  toAfterKeyUp(event: ToEvent): this
  toAfterKeyUp(
    key: ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this
  toAfterKeyUp(
    keyOrEvent: ToEvent | ToKeyParam,
    modifiers?: ModifierParam,
    options?: ToEventOptions,
  ): this {
    this.pushOrCreateList(
      this.manipulator,
      'to_after_key_up',
      typeof keyOrEvent === 'string'
        ? toKey(keyOrEvent, modifiers, options)
        : keyOrEvent,
    )
    return this
  }

  toDelayedAction(to_if_invoked: ToEvent[], to_if_canceled: ToEvent[]): this {
    if (this.manipulator.to_delayed_action) {
      this.manipulator.to_delayed_action.to_if_invoked.push(...to_if_invoked)
      this.manipulator.to_delayed_action.to_if_canceled.push(...to_if_canceled)
    } else {
      this.manipulator.to_delayed_action = {
        to_if_invoked,
        to_if_canceled,
      }
    }
    return this
  }

  description(v: string): this {
    this.manipulator.description = v
    return this
  }

  condition(...v: Array<Condition | ConditionBuilder>): this {
    const { conditions = [] } = this.manipulator
    this.manipulator.conditions = [...conditions, ...v.map(buildCondition)]
    return this
  }

  parameters(v: BasicParameters): this {
    this.manipulator.parameters = { ...this.manipulator.parameters, ...v }
    return this
  }

  build(): BasicManipulator[] {
    return [{ ...this.manipulator }]
  }

  private addToEvent(event: ToEvent) {
    this.pushOrCreateList(this.manipulator, 'to', event)
  }

  private pushOrCreateList<T extends {}>(obj: T, key: keyof T, item: any) {
    const list = (obj[key] || []) as any[]
    list.push(item)
    Object.assign(obj, { [key]: list })
  }
}

export function isManipulatorBuilder(
  src: Manipulator | ManipulatorBuilder,
): src is ManipulatorBuilder {
  return typeof (src as ManipulatorBuilder).build === 'function'
}

export function buildManipulators(
  src: Manipulator | ManipulatorBuilder,
): Manipulator[] {
  return isManipulatorBuilder(src) ? src.build() : [src]
}
