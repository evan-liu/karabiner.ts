---
title: Intro
slug: /
---

# karabiner.ts

:::note 
This Docs site is still a work in progress 🚧
:::

[Karabiner-Elements](https://karabiner-elements.pqrs.org/) configuration file is
in JSON format as:

```json title="~/.config/karabiner/karabiner.json"
{
  "profiles": [
    {
      // highlight-next-line
      "name": "Default",                    // 1
      "complex_modifications": {
        // highlight-next-line
        "rules": [                              // 2
          {
            "description": "Demo Rule",
            // highlight-next-line
            "manipulators": [                       // 3
              {
                "type": "basic",
                // highlight-next-line
                "from": { "key_code": "caps_lock" },    // 4
                // highlight-next-line
                "to": [                                 // 5
                  {"key_code": "delete_or_backspace", "modifiers": ["command"]}
                ],
                // highlight-next-line
                "conditions": [                         // 6
                  {"type": "variable_if", "name": "test", "value": 1}
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

`karabiner.ts` allows you to write `complex_modifications` in TypeScript:

```typescript
writeToProfile('Default', [ // 1 profile to config complex_modifications
  rule('Demo Rule')             // 2 rules
    .manipulators([                 // 3 manipulators
      map('⇪')                          // 4 from
        .to('⌫', '⌘')                   // 5 to
        .condition(ifVar('test')),      // 6 conditions
    ]),
])
```
