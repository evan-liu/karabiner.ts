---
title: Utilities
---

There are a few util methods for reducing code duplication. 

- [withMapper()](#with-mapper)
- [withCondition()](#with-condition)
- [withModifier()](#with-modifier)

## withMapper() {#with-mapper}

`withMapper()` takes either an array or a object, and a mapper function to 
create manipulators with each item.

```typescript
rule('mappers').manipulators([
  //           1    2    3    4    5
  withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
    map((i + 1) as NumberKeyValue).toPaste(k),
  ),
  withMapper({
    c: 'Calendar',
    f: 'Finder',
  })((k, v) => map(k, 'Meh').toApp(v)),
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "mappers",
  "manipulators": [
    {
      "type": "basic",
      "from": {"key_code": "1"},
      "to": [{"shell_command": "osascript -e '\nset prev to the clipboard\nset the clipboard to \"⌘\"\ntell application \"System Events\"\n  keystroke \"v\" using command down\n  delay 0.1\nend tell\nset the clipboard to prev'"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "2"},
      "to": [{"shell_command": "osascript -e '\nset prev to the clipboard\nset the clipboard to \"⌥\"\ntell application \"System Events\"\n  keystroke \"v\" using command down\n  delay 0.1\nend tell\nset the clipboard to prev'"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "3"},
      "to": [{"shell_command": "osascript -e '\nset prev to the clipboard\nset the clipboard to \"⌃\"\ntell application \"System Events\"\n  keystroke \"v\" using command down\n  delay 0.1\nend tell\nset the clipboard to prev'"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "4"},
      "to": [{"shell_command": "osascript -e '\nset prev to the clipboard\nset the clipboard to \"⇧\"\ntell application \"System Events\"\n  keystroke \"v\" using command down\n  delay 0.1\nend tell\nset the clipboard to prev'"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "5"},
      "to": [{"shell_command": "osascript -e '\nset prev to the clipboard\nset the clipboard to \"⇪\"\ntell application \"System Events\"\n  keystroke \"v\" using command down\n  delay 0.1\nend tell\nset the clipboard to prev'"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "c", "modifiers": {"mandatory": ["option", "control", "shift"]}},
      "to": [{"shell_command": "open -a \"Calendar\".app"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "f", "modifiers": {"mandatory": ["option", "control", "shift"]}},
      "to": [{"shell_command": "open -a \"Finder\".app"}]
    }
  ]
}
```

</details>

Most of the time `withMapper()` method can infer the type from the array or object.
However it only infer the object value as generic types like `string`, which is 
sometimes not enough for  the mappers. To solve this you can either manually add
the types to the method call, or add `as const` on the object. 

```typescript
withMapper<FromKeyParam, ToKeyParam>({})(/* ... */)
withMapper({} as const)(/* ... */)
```

`as const` is simpler to add; the benefit of adding types to the method is code
completion when writing the object. 

## withCondition() {#with-condition}

`withCondition()` is useful when a subset of manipulators inside a rule or 
layer/simlayer share the same condition(s). 

```typescript
rule('conditions').manipulators([
  withCondition(ifDevice({ product_id: 1 }))([
    map('a').to('x'), 
  ]),
  withCondition(ifDevice({ product_id: 2 }))([
    map('a').to('y'), 
  ]),
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "conditions",
  "manipulators": [
    {
      "type": "basic",
      "from": {"key_code": "a"},
      "to": [{"key_code": "x"}],
      "conditions": [{"type": "device_if", "identifiers": [{"product_id": 1}]}]
    },
    {
      "type": "basic",
      "from": {"key_code": "a"},
      "to": [{"key_code": "y"}],
      "conditions": [{"type": "device_if", "identifiers": [{"product_id": 2}]}]
    }
  ]
}
```

</details>

## withModifier() {#with-modifier}

`withModifier()`add the same modifiers to a group of manipulators. 

```typescript
rule('modifiers').manipulators([
  withModifier('optionalAny')([
    map(1, '⌘').to('a'),
    map(1, '⌥').to('b'),
  ]),
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "modifiers",
  "manipulators": [
    {
      "type": "basic",
      "from": {"key_code": "1", "modifiers": {"mandatory": ["command"], "optional": ["any"]}},
      "to": [{"key_code": "a"}]
    },
    {
      "type": "basic",
      "from": {"key_code": "1", "modifiers": {"mandatory": ["option"], "optional": ["any"]}},
      "to": [{"key_code": "b"}]
    }
  ]
}
```

</details>
