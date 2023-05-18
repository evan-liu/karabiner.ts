---
title: hyperLayer() / modifierLayer()
---

# hyperLayer()

Hyper layer is inspired by [@mxstbr's Karabiner Elements configuration](https://github.com/mxstbr/karabiner).
It requires the hyper key (`⌘⌥⌃⇧`) be pressed with the layer key to trigger the 
layer, which avoids the 2 problems from layer/simlayer: 

- Layer: Typing fast may accidentally trigger layers.
- Simlayer: The layer key is triggered if the other key is not pressed quickly enough.

```typescript
hyperLayer('a', 'hyper-a').manipulators([
  map(1).to(2)
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "Layer - hyper-a",
  "manipulators": [
    {
      "type": "basic",
      "from": {
        "key_code": "a",
        // highlight-next-line
        "modifiers": {"mandatory": ["command", "option", "control", "shift"]}
      },
      "to": [
        {"set_variable": {"name": "hyper-a", "value": 1}}
      ],
      "to_after_key_up": [
        {"set_variable": {"name": "hyper-a", "value": 0}}
      ],
      "to_if_alone": [
        {"key_code": "a"}
      ]
    },
    {
      "type": "basic",
      "from": {
        "key_code": "1", "modifiers": {"mandatory": ["any"]}
      },
      "to": [
        {"key_code": "2"}
      ],
      "conditions": [
        {"type": "variable_if", "name": "hyper-a", "value": 1}
      ]
    }
  ]
}
```

</details>

The Modifier layer allows any modifier(s) to be used in the same way.

```typescript
modifierLayer('⌃⇧', 'a', 't-s-a').manipulators([
  map(1).to(2)
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "Layer - t-s-a",
  "manipulators": [
    {
      "type": "basic",
      "from": {
        "key_code": "a",
        // highlight-next-line
        "modifiers": {"mandatory": ["control", "shift"]}
      },
      "to": [
        {"set_variable": {"name": "t-s-a", "value": 1}}
      ],
      "to_after_key_up": [
        {"set_variable": {"name": "t-s-a", "value": 0}}
      ],
      "to_if_alone": [
        {"key_code": "a"}
      ]
    },
    {
      "type": "basic",
      "from": {
        "key_code": "1",
        "modifiers": {"mandatory": ["any"]}
      },
      "to": [
        {"key_code": "2"}
      ],
      "conditions": [
        {"type": "variable_if", "name": "t-s-a", "value": 1}
      ]
    }
  ]
}

```

</details>
