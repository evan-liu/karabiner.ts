---
title: simlayer()
---

```typescript
simlayer('a', 'a-mode').manipulators([
  map(1).to(2), // Only when key 'a' is pressed and held, then key '1' right after 
])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Simlayer - a-mode",
  "manipulators": [
    {
      "type": "basic",
      "from": {"key_code": "1", "modifiers": {"optional": ["any"]}},
      "to": [{"key_code": "2"}],
      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]
    },
    {
      "type": "basic",
      "from": {
        // highlight-next-line
        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],
        "simultaneous_options": {
          "detect_key_down_uninterruptedly": true,
          "key_down_order": "strict",
          "key_up_order": "strict_inverse",
          "key_up_when": "any",
          // highlight-next-line
          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]
        },
        "modifiers": {"optional": ["any"]}
      },
      // highlight-next-line
      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "2"}],
      // highlight-next-line
      "parameters": {"basic.simultaneous_threshold_milliseconds": 200}
    }
  ]
}
```
</details>

## How simlayer works

Simlayer is similar to [layer](./layer), which add a variable on a group of `manipulators`.
The difference is how the variable is toggled. 

Layer sets the variable to 1 
when the layer key is pressed down and set it back to 0 when the key is released.
Simlayer uses [from.simultaneous](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/)
functionality instead. 

Simlayer sets the variable to 1 only if the simlayer key is pressed and held, 
then any key on the simlayer is pressed within the threshold time (`200 milliseconds` 
by default). Then the variable remains 1 until the simlayer key is released. 

For example, 

```typescript
simlayer('a', 'a-mode').manipulators([
  map(1).to(','),
  map(2).to('.'),
])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Simlayer - a-mode",
  "manipulators": [
    {
      "type": "basic",
      "from": {"key_code": "1", "modifiers": {"optional": ["any"]}},
      "to": [{"key_code": "comma"}],
      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]
    },
    {
      "type": "basic",
      "from": {"key_code": "2", "modifiers": {"optional": ["any"]}},
      "to": [{"key_code": "period"}],
      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]
    },
    {
      "type": "basic",
      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},
      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "comma"}],
      "from": {
        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],
        "simultaneous_options": {
          "detect_key_down_uninterruptedly": true,
          "key_down_order": "strict",
          "key_up_order": "strict_inverse",
          "key_up_when": "any",
          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]
        }, 
        "modifiers": {"optional": ["any"]}
      }
    },
    {
      "type": "basic",
      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},
      "to": [
        {"set_variable": {"name": "a-mode", "value": 1}}, 
        {"key_code": "period"}
      ],
      "from": {
        "simultaneous": [{"key_code": "a"}, {"key_code": "2"}],
        "simultaneous_options": {
          "detect_key_down_uninterruptedly": true,
          "key_down_order": "strict",
          "key_up_order": "strict_inverse",
          "key_up_when": "any",
          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]
        },
        "modifiers": {"optional": ["any"]}
      }
    }
  ]
}

```
</details>

If key 'a' is pressed and held for longer than the threshold time, 'a' starts to 
repeat.

If key 'a' is pressed and held, and key '1' (or '2') is also pressed within the 
threshold time, the simlayer variable is set to 1, and ',' (or '.' for '2') is 
triggered. As long as key 'a' is not released, ',' and '.' will be triggered 
when '1' or '2' is pressed.

Once key 'a' is released the simlayer variable is set back to 0. 

## Modifiers

The `simlayer` by default set `from.modifiers` to `{ optional: ["any"] }`. It can be 
changed by `modifiers()` method.

```typescript
simlayer('a', 'a-mode')
  // highlight-next-line
  .modifiers({ optional: '⇪' })
  .manipulators([
    map(1).to(2), 
  ])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Simlayer - a-mode",
  "manipulators": [
    {
      "type": "basic",
      // highlight-next-line
      "from": {"key_code": "1", "modifiers": {"optional": ["caps_lock"]}},
      "to": [{"key_code": "2"}],
      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]
    },
    {
      "type": "basic",
      "from": {
        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],
        "simultaneous_options": {
          "detect_key_down_uninterruptedly": true,
          "key_down_order": "strict",
          "key_up_order": "strict_inverse",
          "key_up_when": "any",
          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]
        },
        // highlight-next-line
        "modifiers": {"optional": ["caps_lock"]}
      },
      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "2"}],
      "parameters": {"basic.simultaneous_threshold_milliseconds": 200}
    }
  ]
}
```
</details>

## The simultaneous_options

The default [`simultaneous_options`](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous-options/) set by `simlayer`:

```typescript
{
  detect_key_down_uninterruptedly: true,
  key_down_order: 'strict',
  key_up_order: 'strict_inverse',
  key_up_when: 'any',
}
```

You can override them using `simlayer().options({/* ... */})`

## The threshold time 

The default threshold time is `200 milliseconds`. It can be set on each layer

```typescript
simlayer('a', 'a-mode', 100) // The third parameter `threshold` in milliseconds
```

It can also be set at `writeToProfile()` for all simlayer in the profile. 

```typescript
writeToProfile(
  '--dry-run', // profile name 
  [], // rules
  { 'simlayer.threshold_milliseconds': 100 }, // parameters 
)
```

## Problems in simlayer

The other key(s) on the simlayer must be quickly pressed after the layer key,
otherwise the simlayer key is triggered. 
