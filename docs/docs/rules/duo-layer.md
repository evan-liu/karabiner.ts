---
title: duoLayer()
---

Duo layer is a step further of [hyper layer](./hyper-layer) inspired by [@mxstbr's Karabiner Elements configuration](https://github.com/mxstbr/karabiner).
Instead of using hyper or any modifier(s), duo layer use any 2 keys together as the 
layer trigger, like `f + d`, which is normally easier to press than `f + hyper`.

```typescript
duoLayer('f', 'd').manipulators([
  map(1).to(2)
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "Layer - duo-layer-f-d",
  "manipulators": [
    {
      "type": "basic",
      "from": {
        "simultaneous": [
          {"key_code": "f"},
          {"key_code": "d"}
        ],
        "simultaneous_options": {
          "to_after_key_up": [
            {"set_variable": {"name": "duo-layer-f-d", "value": 0}}
          ]
        },
        "modifiers": {"optional": ["any"]}
      },
      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},
      "to": [
        {"set_variable": {"name": "duo-layer-f-d", "value": 1}}
      ]
    },
    {
      "type": "basic",
      "from": {"key_code": "1"},
      "to": [
        {"key_code": "2"}
      ],
      "conditions": [
        {"type": "variable_if", "name": "duo-layer-f-d", "value": 1}
      ]
    }
  ]
}
```

</details>

:::tip
One of the two keys can be released once the layer is activated. <br/> 
With `duoLayer('f', ';')`, only one of `f` or `;` needs to be held to keep using 
the keymaps on the layer.
:::

## How duo layer works

Duo layer is a combination of [layer](./layer) and [simlayer](./simlayer): 

- Same as simlayer, it uses [from.simultaneous](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/)
  functionality to toggle the layer variable. 
- Same as layer, it is active once the layer keys are pressed and held. 

## Problems in duo layer

The duo layer has a limitation where if the two keys are typed rapidly together, 
they may not be triggered. For instance, if the letter pair 'd' and 's' 
is assigned to a duo layer and the word 'words' is typed quickly, 
only 'wor' will be triggered. To address this issue, it is advisable to select 
letter pairs that are not adjacent in regular typing.
