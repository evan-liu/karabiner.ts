---
title: from / map*()
---

# FromEvent and map*()

`map()` takes any valid full [from event definition](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/).

```typescript
map({ key_code: 'a', modifiers: { mandatory: ['left_command'] } })
```

<details>
<summary>FromEvent type</summary>

```typescript
export type FromEvent = (
  | { key_code: string | number }
  | { consumer_key_code: string | number }
  | { pointing_button: string | number }
  | { any: 'key_code' | 'consumer_key_code' | 'pointing_button' }
  | { simultaneous: Array</*...*/>, simultaneous_options?: {/*...*/} }
) & {
  modifiers?: { mandatory?: [/*...*/], optional?: [/*...*/] }
}
```

</details>

There are some useful methods to help create `FromEvent` easier:

- [map(key)](#map-key)
- [mapConsumerKey()](#map-consumer-key)
- [mapPointingButton()](#map-pointing-button)
- [mapSimultaneous()](#map-simultaneous)

## map(key) {#map-key}

The most common `FromEvent` is with `key_code`. `map(key)` also supports alias 
for some `key_code` and modifiers, like `←`, `⌘`, etc. 

The list of supported `key_code` can be found [here](https://github.com/evan-liu/karabiner.ts/blob/main/src/karabiner/key-code.ts).

```typescript
map('a') // map(key_code)
map(',', 'left_command') // map(key_alias, mandatoryModifiers)
map(1, '⌘', '⇪') // map(number_key_value, modifier_alias, modifier_alias)
map('←', { right: '⌘⌥' }) // map (key_alias, { left/right: modifier_alias})
map('left_command', { optional: '⇧' }) // map(key_code, { optional: modifiers })
map('keypad_asterisk', 'optionalAny') // map(key_code, 'optionalAny')
```

<details>
<summary>Generated JSON</summary>

```json
// map('a')
{ "key_code": "a" }
// map(',', 'left_command')
{ "key_code": "comma", "modifiers": { "mandatory": [ "left_command"] } }
// map(1, '⌘', '⇪')
{ "key_code": "1", "modifiers": { "mandatory": [ "command"], "optional": [ "caps_lock"] } }
// map('←', { right: '⌘⌥' })
{ "key_code": "left_arrow", "modifiers": { "mandatory": [ "right_command", "right_option"] } }
// map('left_command', { optional: '⇧' })
{ "key_code": "left_command", "modifiers": { "optional": [ "shift"] } }
// map('keypad_asterisk', 'optionalAny')
{ "key_code": "keypad_asterisk", "modifiers": { "optional": [ "any"] } }
```

</details>

### Key alias

The list of supported key alias can be found [here](https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts),

<details>
<summary>Key alias</summary>

```
⌘  command
⌥  option
⌃  control
⇧  shift
⇪  caps_lock

↑  up_arrow
↓  down_arrow
←  left_arrow
→  right_arrow
⇞  page_up
⇟  page_down
↖  home
↘  end

⏎  return_or_enter
⎋  escape
⌫  delete_or_backspace
⌦  delete_forward
⇥  tab
␣  spacebar
-  hyphen
=  equal_sign
[  open_bracket
]  close_bracket
\  backslash
;  semicolon
'  quote
`  grave_accent_and_tilde
,  comma
.  period
/  slash
```

</details>

It is recommended to put the alias on a layer/simlayer to use them. 

<details>
<summary>Example of key alias on a layer</summary>

```typescript
layer(['z', '/'], 'emoji-mode').manipulators([
  //           1    2    3    4    5
  withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
    map((i + 1) as NumberKeyValue).toPaste(k),
  ),
  //           Paste the symbols instead of triggering the key
  withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
    map(k).toPaste(k),
  ),
  map(',').toPaste('‹'), // left_{modifier}
  map('.').toPaste('›'), // right_{modifier}
])
```

</details>

:::tip
- `map('‹⌘')`, `‹⌘` is `left_command`, can also be `<⌘`, `l⌘`, `left⌘`
- `map(1, '??')`, `??` is `optionalAny`, can also be`?any`, `{ optional: 'any' }`
- `map(1, '?›⌘⌥')`, `?›⌘⌥` is `{ optional: ['right_command', 'right_option'] }`
:::

## mapConsumerKey() {#map-consumer-key}

`mapConsumerKey()` is similar to `map(key)` but with `consumer_key_code` instead
of `key_code`.

The list of supported `consumer_key_code` can be found [here](https://github.com/evan-liu/karabiner.ts/blob/main/src/karabiner/consumer-key-code.ts).

```typescript
mapConsumerKey('menu', '⌘', 'any')
```

<details>
<summary>Generated JSON</summary>

```json
{
  "consumer_key_code": "menu",
  "modifiers": { "mandatory": ["command"], "optional": ["any"] }
}
```

</details>

## mapPointingButton() {#map-pointing-button}

`mapPointingButton()` is similar to `map(key)` but with `pointing_button` instead
of `key_code`.

The list of supported `pointing_button` can be found [here](https://github.com/evan-liu/karabiner.ts/blob/main/src/karabiner/pointing-button.ts).

```typescript
mapPointingButton('button1', '⌘')
```

<details>
<summary>Generated JSON</summary>

```json
{
  "pointing_button": "button1",
  "modifiers": { "mandatory": ["command"] }
}
```

</details>

## mapSimultaneous() {#map-simultaneous}

`mapSimultaneous()` creates [`from.simultaneous`](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/) 
with (optional) options and threshold parameter.

```typescript
mapSimultaneous(
  ['a', { pointing_button: 'button1' }], // keys
  { key_down_order: 'strict' }, // options?
  100, // threshold?, default 50
)
```

<details>
<summary>Generated JSON</summary>

```json
{
  "type": "basic",
  "from": {
    "simultaneous": [ 
      {"key_code": "a"}, 
      {"pointing_button": "button1"} 
    ],
    "simultaneous_options": {
      "key_down_order": "strict"
    }
  },
  "parameters": { 
    "basic.simultaneous_threshold_milliseconds": 100
  }
}
```

</details>

### Modifiers

To set `from.modifiers` use `mapSimultaneous().modifiers(/* ... */)`.

### Threshold

The threshold parameter can also be set at `writeToProfile()` for the profile. 

```typescript
writeToProfile(
  '--dry-run', // profile name 
  [], // rules
  { 'basic.simultaneous_threshold_milliseconds': 100 }, // parameters 
)
```
