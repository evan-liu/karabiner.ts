---
title: rule()
---

Use `rule()` to create a group of `manipulators`.

```typescript
rule('Demo').manipulators([
  map(1).to(2),
])
```
<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Demo",
  "manipulators": [
    {
      "type": "basic",
      "from": { "key_code": "1" },
      "to": [ { "key_code": "2" } ]
    }
  ]
}
```

</details>

Conditions added to `rule()` will be added to all `manipulators` in the group.

```typescript
rule('Demo', ifVar('test')).manipulators([
  map(1).to(2),
]) // or rule().condition()
```
<details>
<summary>Generated JSON in profiles.complex_modifications.rules</summary>

```json
{
  "description": "Demo",
  "manipulators": [
    {
      "type": "basic",
      "from": { "key_code": "1" },
      "to": [ { "key_code": "2" } ],
      // highlight-start
      "conditions": [
        { "type": "variable_if", "name": "test", "value": 1 }
      ]
      // highlight-end
    }
  ]
}
```

</details>

:::warning
manipulators() cannot be empty in a rule. 
:::
