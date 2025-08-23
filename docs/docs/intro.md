---
title: Intro
slug: /
---

# karabiner.ts

Write [Karabiner-Elements](https://karabiner-elements.pqrs.org/) configuration in TypeScript/JavaScript instead of complex JSON.

## Why karabiner.ts?

[Karabiner-Elements](https://karabiner-elements.pqrs.org/) is powerful but its JSON configuration can be complex and hard to maintain. **karabiner.ts** makes it easier:

- **🎯 Readable Syntax** - TypeScript instead of deeply nested JSON
- **🔧 IDE Support** - Auto-completion, type checking, and error detection
- **📦 Powerful Abstractions** - Built-in layers, leader modes, and more
- **🛠 Modular Organization** - Split configurations across multiple files

## Quick Start

- **🌐 [Try Online Editor](/editor)** - No installation required
- **🚀 [Create Project](/getting-started#option-2-create-new-project-recommended-for-regular-use)** - `npx create-karabiner-config@latest`
- **📚 [Getting Started Guide](/getting-started)** - Step-by-step tutorial

## Example: JSON vs TypeScript

**Traditional JSON approach:**

<details>
<summary>~/.config/karabiner/karabiner.json</summary>

```json
{
  "profiles": [
    {
      "name": "Default",
      "complex_modifications": {
        "rules": [
          {
            "description": "Demo Rule",
            "manipulators": [
              {
                "type": "basic",
                "from": { "key_code": "caps_lock" },
                "to": [
                  {
                    "key_code": "delete_or_backspace",
                    "modifiers": ["command"]
                  }
                ],
                "conditions": [
                  { "type": "variable_if", "name": "test", "value": 1 }
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

</details>

**karabiner.ts approach:**

```typescript
writeToProfile('Default', [
  rule('Demo Rule').manipulators([
    map('⇪').to('⌫', '⌘').condition(ifVar('test')),
  ]),
])
```

## Next Steps

1. **[Get Started](/getting-started)** - Complete setup guide
2. **[Learn Rules](/rules/rule)** - Understand the building blocks
3. **[Browse Examples](/examples)** - See real-world configurations
4. **[Need Help?](/faq)** - Check FAQ and troubleshooting

---

_Inspired by [Goku](https://github.com/yqrashawn/GokuRakuJoudo) but with TypeScript's power and IDE support._
