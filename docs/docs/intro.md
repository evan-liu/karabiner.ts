---
title: Intro
slug: /
---

# karabiner.ts

Write [Karabiner-Elements](https://karabiner-elements.pqrs.org/) configuration in TypeScript/JavaScript instead of complex JSON.

## Why karabiner.ts?

[Karabiner-Elements](https://karabiner-elements.pqrs.org/) is powerful but its JSON configuration can be complex and hard to maintain. **karabiner.ts** makes it easier:

### 🎯 **Readable Syntax**

Instead of deeply nested JSON, write intuitive TypeScript:

```typescript
// karabiner.ts - Easy to read and understand
writeToProfile('Default', [
  rule('Caps Lock → Escape / Hyper').manipulators([
    map('⇪').toIfAlone('⎋').toIfHeldDown(toHyper()),
  ]),
])
```

<details>
<summary>Compare with equivalent JSON (click to expand)</summary>

```json
{
  "profiles": [
    {
      "name": "Default",
      "complex_modifications": {
        "rules": [
          {
            "description": "Caps Lock → Escape / Hyper",
            "manipulators": [
              {
                "type": "basic",
                "from": { "key_code": "caps_lock" },
                "to_if_alone": [{ "key_code": "escape" }],
                "to_if_held_down": [
                  {
                    "key_code": "left_command",
                    "modifiers": ["option", "control", "shift"]
                  }
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

### 🔧 **IDE Support**

Get auto-completion, type checking, and error detection as you write:

- **Auto-completion** for all available keys and functions
- **Type safety** prevents common configuration errors
- **IntelliSense** shows documentation while you code
- **Instant feedback** on syntax errors

### 📦 **Powerful Abstractions**

Built-in concepts that would require complex JSON:

- **[Layers](/rules/layer)** - Temporary key mappings when a key is held
- **[SimLayers](/rules/simlayer)** - Simultaneous key activation
- **[HyperLayer](/rules/hyper-layer)** - Use Hyper key for shortcuts
- **[Leader Mode](/rules/leader-mode)** - Vim-style sequential key combinations
- **[DuoLayer](/rules/duo-layer)** - Different behavior for tap vs hold

### 🛠 **Modular Organization**

Split large configurations across multiple files:

```typescript
// index.ts
import { appShortcuts } from './apps'
import { layers } from './layers'

writeToProfile('Default', [...layers, ...appShortcuts])
```

## Quick Start

Choose your preferred way to get started:

### 🌐 **[Try the Online Editor](/editor)**

- No installation required
- Write code in your browser
- See generated JSON instantly
- Perfect for experimenting

### 🚀 **[Create a New Project](/getting-started#option-2-create-new-project-recommended-for-regular-use)**

```bash
npx create-karabiner-config@latest my-config
cd my-config
npm run build
```

### 📚 **[Follow the Getting Started Guide](/getting-started)**

Step-by-step tutorial to build your first configuration

## Example: From JSON to TypeScript

Here's how karabiner.ts transforms complex JSON into readable code:

**Traditional JSON approach:**

**Traditional JSON approach:**

<details>
<summary>~/.config/karabiner/karabiner.json</summary>

```json
{
  "profiles": [
    {
      // highlight-next-line
      "name": "Default", // 1
      "complex_modifications": {
        // highlight-next-line
        "rules": [
          // 2
          {
            "description": "Demo Rule",
            // highlight-next-line
            "manipulators": [
              // 3
              {
                "type": "basic",
                // highlight-next-line
                "from": { "key_code": "caps_lock" }, // 4
                // highlight-next-line
                "to": [
                  // 5
                  {
                    "key_code": "delete_or_backspace",
                    "modifiers": ["command"]
                  }
                ],
                // highlight-next-line
                "conditions": [
                  // 6
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
  // 1 profile to config complex_modifications
  rule('Demo Rule') // 2 rules
    .manipulators([
      // 3 manipulators
      map('⇪') // 4 from
        .to('⌫', '⌘') // 5 to
        .condition(ifVar('test')), // 6 conditions
    ]),
])
```

Ready to start? Here are your next steps:

1. **🚀 [Get Started](/getting-started)** - Complete setup guide with your first configuration
2. **📖 [Learn Rules](/rules/rule)** - Understand the building blocks
3. **💡 [Browse Examples](/examples)** - See real-world configurations
4. **❓ [Need Help?](/faq)** - Check the FAQ and troubleshooting guide

## Community & Support

- **📂 [Real-world configs](https://github.com/evan-liu/karabiner.ts/network/dependents)** - See how others use karabiner.ts
- **🐛 [Report issues](https://github.com/evan-liu/karabiner.ts/issues)** - Found a bug or have a feature request?
- **💰 [Support the project](https://www.buymeacoffee.com/evanliu.dev)** - Help keep development going

---

_Inspired by [Goku](https://github.com/yqrashawn/GokuRakuJoudo) but with TypeScript's power and IDE support._

Ready to continue? Head to the [Getting Started guide](/getting-started) to build your first configuration.
