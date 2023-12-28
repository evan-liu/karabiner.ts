---
title: layer()
---

Layer is a group of `manipulators` which are only active when a key is pressed and held. 

```typescript
layer('a', 'a-mode').manipulators([
  map(1).to(2), // Only when key 'a' is pressed and held
])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Layer - a-mode",
  "manipulators": [
    {
      "type": "basic",
      // highlight-start
      "from": { "key_code": "a" },
      "to": [ {"set_variable": {"name": "a-mode", "value": 1}} ],
      "to_after_key_up": [ {"set_variable": {"name": "a-mode", "value": 0}} ],
      "to_if_alone": [ {"key_code": "a"} ]
      // highlight-end
    },
    {
      "type": "basic",
      "from": {"key_code": "1"},
      "to": [{"key_code": "2"}],
      // highlight-next-line
      "conditions": [ { "type": "variable_if", "name": "a-mode", "value": 1 } ]
    }
  ]
}
```
</details>

## How layer works

`layer()` add a `variable_if` `condition` to all `manipulators` in the group

```json
{ "type": "variable_if", "name": "a-mode", "value": 1 }
```

And set the variable to `1` when the layer key is pressed

```json
"from": { "key_code": "a" },
"to": [ { "set_variable": {"name": "a-mode", "value": 1} } ],
```

The variable is set back to `0` on `to_after_key_up`, so once the layer key is 
released the layer `manipulators` are disabled.

```typescript
"to_after_key_up": [ {"set_variable": {"name": "a-mode", "value": 0}} ]
```

The layer key is still functional if it is tapped alone

```json
"to_if_alone": [ {"key_code": "a"} ]
```

## Layer modifiers

Layers can have modifiers, so that the layer is only active when the key and the
modifiers are all pressed and held. 

```typescript
layer('a', 'a-mode')
  // highlight-next-line
  .modifiers('⌘')
  .manipulators([
    map(1).to(2),
  ])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Layer - a-mode",
  "manipulators": [
    {
      "type": "basic",
      "from": {
        "key_code": "a", 
        // highlight-next-line
        "modifiers": {"mandatory": ["command"]}
      },
      "to": [
        {"set_variable": {"name": "a-mode", "value": 1}}
      ],
      "to_after_key_up": [
        {"set_variable": {"name": "a-mode", "value": 0}}
      ],
      "to_if_alone": [
        {"key_code": "a"}
      ]
    },
    {
      "type": "basic",
      "from": {
        "key_code": "1",
        // highlight-next-line
        "modifiers": {"mandatory": ["any"]}
      },
      "to": [
        {"key_code": "2"}
      ],
      "conditions": [
        {"type": "variable_if", "name": "a-mode", "value": 1}
      ]
    }
  ]
}
```
</details>

`from.modifiers` is set to `{"mandatory": ["any"]}` for all manipulators on the 
layer, so that the layer modifiers are not sent to manipulators to events. So 
the manipulators on the layer cannot have other modifiers. 

:::tip modifiers('??')
`layer().modifiers('optionalAny')` (or `'??'`) passes modifiers to the layer. <br/>
with `layer(';').modifiers('??').manipulators({ l: toKey('→') })` <br/>
`⌘ ; + l` triggers `⌘ →`
:::

## Config the layer key

The layer key can also be mapped to something else by `layer().configKey()`

```typescript
layer('a', 'a-mode')
    // highlight-next-line
    .configKey((v) => v.toIfAlone('b', '⌘'), true)
    .manipulators([
      map(1).to(2),
    ])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Layer - a-mode",
  "manipulators": [
    {
      "type": "basic",
      "from": { "key_code": "a" },
      "to": [ { "set_variable": {"name": "a-mode", "value": 1} } ],
      "to_after_key_up": [ { "set_variable": {"name": "a-mode", "value": 0} } ],
      // highlight-next-line
      "to_if_alone": [ { "key_code": "b", "modifiers": ["command"] } ]
    },
    {
      "type": "basic",
      "from": {"key_code": "1"},
      "to": [ {"key_code": "2"} ],
      "conditions": [ { "type": "variable_if", "name": "a-mode", "value": 1 } ]
    }
  ]
}
```
</details>

:::warning
The second parameter `replaceToIfAlone`, of `configKey(, true)`, makes sure only 
the new `toIfAlone()` is used. The layer key will otherwise still be triggered, 
sending `[a, b⌘]` instead of only `b⌘`.
:::

## Multiple layer keys

`layer()` can have multiple trigger keys 

```typescript
layer(['a', ';'], 'a-mode').manipulators([
  map(1).to(2), // When either 'a' or ';' is pressed and held
])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Layer - a-mode",
  "manipulators": [
    {
      // highlight-start
      "type": "basic",
      "from": { "key_code": "semicolon" },
      "to": [ { "set_variable": { "name": "a-mode", "value": 1 } } ],
      "to_after_key_up": [ { "set_variable": { "name": "a-mode", "value": 0 } } ],
      "to_if_alone": [ { "key_code": "semicolon" } ]
      // highlight-end
    },
    {
      "type": "basic",
      "from": { "key_code": "a" },
      "to": [ { "set_variable": { "name": "a-mode", "value": 1 } } ],
      "to_after_key_up": [ { "set_variable": { "name": "a-mode", "value": 0 } } ],
      "to_if_alone": [ { "key_code": "a" } ]
    },
    {
      "type": "basic",
      "from": { "key_code": "1" },
      "to": [ { "key_code": "2" } ],
      "conditions": [ { "type": "variable_if", "name": "a-mode", "value": 1 } ]
    }
  ]
}
```
</details>

The same key can also trigger multiple layers

```typescript
layer('a', 'a-mode').manipulators([
  map(1).to(2),
])
layer('a', 'b-mode').manipulators([
  map(3).to(4),
])
```

<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
[
  {
    "description": "Layer - a-mode",
    "manipulators": [
      {
        "type": "basic",
        "from": {"key_code": "a"},
        "to": [
          {"set_variable": {"name": "a-mode", "value": 1}}, 
          // highlight-next-line
          {"set_variable": {"name": "b-mode", "value": 1}}
        ],
        "to_after_key_up": [
          {"set_variable": {"name": "a-mode", "value": 0}},
          // highlight-next-line
          {"set_variable": {"name": "b-mode", "value": 0}}
        ],
        "to_if_alone": [{"key_code": "a"}]
      },
      {
        "type": "basic",
        "from": {"key_code": "1"},
        "to": [{"key_code": "2"}],
        "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]
      }
    ]
  },
  {
    "description": "Layer - b-mode",
    "manipulators": [
      {
        "type": "basic",
        "from": {"key_code": "3"},
        "to": [{"key_code": "4"}],
        // highlight-next-line
        "conditions": [{"type": "variable_if", "name": "b-mode", "value": 1}]
      }
    ]
]
```
</details>

:::info
Both variables are set by one manipulator as 
> if there are multiple manipulators which change the same key, 
> the manipulator placed at the top is applied and other manipulators are 
> ignored - [Karabiner-Elements](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-evaluation-priority/)
:::

## Problems in layer

> There're two problems in old layer. When we type "w1" really fast, 
> we trigger the "1" in w layer rather than insert "w1". 
> When we keep press w key down, the w key won't repeat. 
> There won't be a "wwwwwwwwwwwwwwwwwwww". - [Goku](https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md#simlayers)
