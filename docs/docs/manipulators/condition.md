---
title: condition / if*()
---

# condition 

Most of the features are implemented by adding `variable` conditions to 
manipulators. There are a few other types of conditions too.

<details>
<summary>Condition type</summary>

```typescript
type Condition =
  | ({
      type: 'frontmost_application_if' | 'frontmost_application_unless'
      description?: string
    } & ({ bundle_identifiers: string[] } | { file_paths: string[] }))
  | {
      type:
        | 'device_if'
        | 'device_unless'
        | 'device_exists_if'
        | 'device_exists_unless'
      identifiers: DeviceIdentifier[]
      description?: string
    }
  | {
      type: 'keyboard_type_if' | 'keyboard_type_unless'
      keyboard_types: KeyboardType[]
      description?: string
    }
  | {
      type: 'input_source_if' | 'input_source_unless'
      input_sources: InputSource[]
      description?: string
    }
  | {
      type: 'variable_if' | 'variable_unless'
      name: string
      value: number | boolean | string
      description?: string
    }
  | {
      type: 'event_changed_if' | 'event_changed_unless'
      value: boolean
      description?: string
    }
```

</details>

They can be created with `if*()` methods.

```typescript
ifApp() // frontmost_application_if 
ifDevice() // device_if 
ifDeviceExists() // device_exists_if 
ifKeyboardType() // keyboard_type_if 
ifInputSource() // input_source_if 
ifVar() // variable_if 
ifEventChanged() // event_changed_if 
```

And use `unless()` method to create the corresponding `_unless` condition.

```typescript
ifApp('Finder').unless()
```

<details>
<summary>Generated JSON</summary>

```json
{
  "type": "frontmost_application_unless",
  "bundle_identifiers": [ "Finder" ]
}
```

</details>

It can be added to `rule()` (`layer()`, `simlayer()`), or to each manipulators. 

```typescript
rule('Finder', ifApp('Finder')).manipulators([
  map(1).to(2).condition(ifInputSource({ language: 'en' }).unless())
])
```

<details>
<summary>Generated JSON</summary>

```json
{
  "description": "Finder",
  "manipulators": [
    {
      "type": "basic",
      "from": {"key_code": "1"},
      "to": [{"key_code": "2"}],
      "conditions": [
        {"type": "input_source_unless", "input_sources": [{"language": "en"}]},
        {"type": "frontmost_application_if", "bundle_identifiers": ["Finder"]}
      ]
    }
  ]
}
```

</details>
