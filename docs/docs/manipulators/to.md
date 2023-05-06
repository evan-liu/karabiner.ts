---
title: to*()
---

# ToEvent

`ToEvent` type models Karabiner [to event definition](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/). 

<details>
<summary>ToEvent type</summary>

```typescript
export type ToEvent = (
  | { key_code: string | number }
  | { consumer_key_code: string | number }
  | { pointing_button: string | number }
  | { shell_command: string }
  | {
      select_input_source: {
        language?: string
        input_source_id?: string
        input_mode_id?: string
      }
    }
  | {
      set_variable: {
        name: string
        value: number | boolean | string
      }
    }
  | { set_notification_message: { id: string; text: string } }
  | {
      mouse_key: {
        x?: number
        y?: number
        vertical_wheel?: number
        horizontal_wheel?: number
        speed_multiplier?: number
      }
    }
  | {
      sticky_modifier: Partial<
        Record<
          | 'left_control'
          | 'left_shift'
          | 'left_option'
          | 'left_command'
          | 'right_control'
          | 'right_shift'
          | 'right_option'
          | 'right_command'
          | 'fn',
          'on' | 'off' | 'toggle'
        >
      >
    }
  | {
      software_function:
        | { cg_event_double_click: { button: number } }
        | {
            set_mouse_cursor_position: {
              x: number | `${number}%`
              y: number | `${number}%`
              screen?: number
            }
          }
        | {
            iokit_power_management_sleep_system: { delay_milliseconds?: number }
          }
    }
) & {
  modifiers?: Array<
    | 'left_control'
    | 'left_shift'
    | 'left_option'
    | 'left_command'
    | 'right_control'
    | 'right_shift'
    | 'right_option'
    | 'right_command'
    | 'fn'
    | 'caps_lock'
    | 'command'
    | 'control'
    | 'option'
    | 'shift'
  >
  lazy?: boolean
  repeat?: boolean
  halt?: boolean
  hold_down_milliseconds?: number
}
```

</details>

## Create ToEvent

There are a few ways to create a `ToEvent`:

### toKey()

The most common `ToEvent` is `key_code` by `toKey()`.

```typescript
toKey('a', '⌘⇧')
```

<details>
<summary>Generated JSON</summary>

```json
{
  "key_code": "a",
  "modifiers": ["command", "shift"]
}
```

</details>

And there are a few methods to create common used cases: 

```typescript
toHyper() // ⌘⌥⌃⇧
toMeh() // ⌥⌃⇧
toSuperHyper() // ⌘⌥⌃⇧fn
toNone() // vk_none
```

<details>
<summary>Generated JSON</summary>

```json
// toHyper() ⌘⌥⌃⇧
{
  "key_code": "left_command", 
  "modifiers": ["option", "control", "shift"]
}
// toMeh() ⌥⌃⇧
{
  "key_code": "left_option", 
  "modifiers": ["control", "shift"]
}
// toSuperHyper() ⌘⌥⌃⇧fn
{
  "key_code": "fn", 
  "modifiers": ["command", "option", "control", "shift"]
}
// toNone() vk_none
{ "key_code": "vk_none" }
```

</details>

### to$()

Another common used `ToEvent` is `shell_command` by `to$()`.

```typescript
to$('rm ~/temp') // {"shell_command": "rm ~/temp"}
```

There are a few methods to create common used commands: 

```typescript
toApp() // open -a {}.app
toPaste() // Paste text via clipboard 
```

<details>
<summary>Generated JSON</summary>

```json
// toApp('Finder')
{ "shell_command": "open -a \"Finder\".app" }
// toPaste('✨')
{ "shell_command": "osascript -e '\nset prev to the clipboard\nset the clipboard to \"✨\"\ntell application \"System Events\"\n  keystroke \"v\" using command down\n  delay 0.1\nend tell\nset the clipboard to prev'" }
```

</details>

### to*()

The other `to*()` methods to create `ToEvent`:

```typescript
toInputSource()
toSetVar()
toNotificationMessage()
toRemoveNotificationMessage()
toMouseKey()
toStickyModifier()
toCgEventDoubleClick()
toMouseCursorPosition()
toSleepSystem()
```

### map().to*()

To write shorter code, all `map*()` methods can chain with `to*()` methods

```typescript
map(1).to('a').toApp('Arc').toConsumerKey('play_or_pause')
```

<details>
<summary>Generated JSON</summary>

```json
{
  "type": "basic",
  "from": { "key_code": "1" },
  "to": [
    { "key_code": "a" },
    { "shell_command": "open -a \"Arc\".app" },
    { "consumer_key_code": "play_or_pause" }
  ]
}
```

</details>

## Use ToEvent

`ToEvent` is mostly used with `map().to()`. It can also be used in other places:

```typescript
map().toIfAlone(/* to*() */)
map().toIfHeldDown(/* to*() */)
map().toAfterKeyUp(/* to*() */)
map().toDelayedAction(/* to*(),  to*() */)
mapDoubleTap().singleTap(/* to*() */)
mapSimultaneous([], { to_after_key_up: [/* to*() */] })
```
