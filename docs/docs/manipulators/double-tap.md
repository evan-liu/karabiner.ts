---
title: from / mapDoubleTap()
---

# mapDoubleTap()

```typescript
mapDoubleTap('↑').to('↖︎') // double tap up_arrow -> home
```

<details>
<summary>Generated JSON</summary>

```json
[
  {
    "type": "basic",
    "from": {"key_code": "up_arrow"},
    "to": [
      {"key_code": "home"}
    ],
    // highlight-next-line
    "conditions": [
      // highlight-next-line
      {"type": "variable_if", "name": "double-tap-up_arrow", "value": 1}
    ]
  },
  {
    "type": "basic",
    "from": {"key_code": "up_arrow"},
    // highlight-next-line
    "to": [
      // highlight-next-line
      {"set_variable": {"name": "double-tap-up_arrow", "value": 1}}
    ],
    "conditions": [
      {"type": "variable_unless", "name": "double-tap-up_arrow", "value": 1}
    ],
    "to_delayed_action": {
      // highlight-next-line
      "to_if_canceled": [
        // highlight-next-line
        {"set_variable": {"name": "double-tap-up_arrow", "value": 0}}
      ],
      // highlight-next-line
      "to_if_invoked": [
        // highlight-next-line
        {"set_variable": {"name": "double-tap-up_arrow", "value": 0}},
        {"key_code": "up_arrow"}
      ]
    },
    "parameters": {
      "basic.to_delayed_action_delay_milliseconds": 200
    }
  }
]
```

</details>

## How doubleTap() works

`doubleTap()` adds a `variable` condition to the `manipulator`. 

- When the key is tapped at the first time, the `variable` is set to `1`
- When the key is tapped at the second time and the `variable` is still `1`, 
  the `ToEvent` is triggered

It also uses a [to_delayed_action](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-delayed-action/)
to set a timer (`200 milliseconds` `delay` by default) when the key is tapped 
for the first time.

- If another key is pressed within the `delay` time
  - The `variable` is set back to `0`
- If no other key is pressed within the `delay` time
  - The `variable` is set back to `0`
  - The key itself is triggered, so single tap is still functional

## The single tap

By default `doubleTap` will send the from key if no another key is pressed within
the `delay` time. It can be set to another key using `singleTap()`

```typescript
mapDoubleTap('⇪').to('⎋')
  // highlight-next-line
  .singleTap(toKey('q', '⌘'))
```

<details>
<summary>Generated JSON</summary>

```json
[
  {
    "type": "basic",
    "from": {"key_code": "caps_lock"},
    "to": [
      {"key_code": "escape"}
    ],
    "conditions": [
      {"type": "variable_if", "name": "double-tap-caps_lock", "value": 1}
    ]
  },
  {
    "type": "basic",
    "from": {"key_code": "caps_lock"},
    "to": [
      {"set_variable": {"name": "double-tap-caps_lock", "value": 1}}
    ],
    "conditions": [
      {"type": "variable_unless", "name": "double-tap-caps_lock", "value": 1}
    ],
    "to_delayed_action": {
      "to_if_canceled": [
        {"set_variable": {"name": "double-tap-caps_lock", "value": 0}}
      ],
      "to_if_invoked": [
        {"set_variable": {"name": "double-tap-caps_lock", "value": 0}},
        // highlight-next-line
        {"key_code": "q", "modifiers": ["command"]}
      ]
    },
    "parameters": {
      "basic.to_delayed_action_delay_milliseconds": 200
    }
  }
]
```

</details>

Or it can be disabled with `singleTap(null)`

```typescript
mapDoubleTap('q', '⌘').to('q', '⌘')
  // highlight-next-line
  .singleTap(null) // Must pressing command-q twice to quit application
```

<details>
<summary>Generated JSON</summary>

```json
[
  {
    "type": "basic",
    "from": {"key_code": "q", "modifiers": {"mandatory": ["command"]}},
    "to": [
      {"key_code": "q", "modifiers": ["command"]}
    ],
    "conditions": [
      {"type": "variable_if", "name": "double-tap-q-command", "value": 1}
    ]
  },
  {
    "type": "basic",
    "from": {
      "key_code": "q", "modifiers": {"mandatory": ["command"]}
    },
    "to": [
      {"set_variable": {"name": "double-tap-q-command", "value": 1}}
    ],
    "conditions": [
      {"type": "variable_unless", "name": "double-tap-q-command", "value": 1}
    ],
    "to_delayed_action": {
      "to_if_canceled": [
        {"set_variable": {"name": "double-tap-q-command", "value": 0}}
      ],
      "to_if_invoked": [
        {"set_variable": {"name": "double-tap-q-command", "value": 0}}
      ]
    },
    "parameters": {
      "basic.to_delayed_action_delay_milliseconds": 200
    }
  }
]
```

</details>

## The delay time

The default `delay` time waiting for the second tap (or to trigger the single 
tap) is `200 milliseconds`. It can be set for each `doubleTap()`

```typescript
mapDoubleTap('⇪', 100) // The last parameter
  .delay(100) // Can also be set with another method
```

It can also be set at `writeToProfile()` for all `mapDoubleTap()` in the profile.

```typescript
writeToProfile(
  '--dry-run', // profile name 
  [], // rules
  { 'double_tap.delay_milliseconds': 100 }, // parameters 
)
```
