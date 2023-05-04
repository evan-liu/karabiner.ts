---
title: simlayer()
---

```typescript
simlayer('a', 'a-mode').manipulators([
  map(1).to(2), // Only when key 'a' is pressed then key '1' right after 
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
      "from": {"key_code": "1"},
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
        }
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

Simlayer sets the variable is only set to 1 if the simlayer key is pressed, 
then any key on the simlayer is pressed within the threshold time (`200 milliseconds` 
by default). Then the variable remains 1 until the simlayer key is released. 

For example, 

```typescript
simlayer('a', 'a-mode').manipulators([
  map(',').to('<'),
  map('.').to('>')
])
```

If key 'a' is pressed and held for longer than the threshold time, 'a' starts to repeat.

If key 'a' is pressed and held, and key ',' is also pressed within the threshold time,
the simlayer variable is set to 1, and '<' is triggered. As long as key 'a' is not released, 
'<' and '>' will be triggered when ',' or '.' is pressed.

Once key 'a' is released the simlayer variable is set back to 0. 

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
