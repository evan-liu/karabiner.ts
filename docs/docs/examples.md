---
title: Examples Overview
slug: /examples
---

# Configuration Examples

Practical examples of karabiner.ts configurations demonstrating specific features that can be used as building blocks.

## Example Categories

**🔧 Modifier Keys** - Caps Lock to Hyper, duo modifiers
**⌨️ Vim** - Leader keys, HJKL navigation  
**📝 Text Input** - Text expansions, symbols, emojis
**🚀 OS Functionality** - App launchers, system controls

## Quick Start Patterns

**Caps Lock → Escape/Hyper:**

```typescript
rule('Caps Lock → Escape / Hyper').manipulators([
  map('⇪').toIfAlone('⎋').toIfHeldDown(toHyper()),
])
```

**Navigation Layer:**

```typescript
layer('semicolon', 'nav').manipulators([
  map('h').to('←'),
  map('j').to('↓'),
  map('k').to('↑'),
  map('l').to('→'),
])
```

**App Launcher:**

```typescript
layer('space', 'apps')
  .modifiers('⌘')
  .manipulators([
    map('f').toApp('Finder'),
    map('s').toApp('Safari'),
    map('t').toApp('Terminal'),
  ])
```

**Text Shortcuts:**

```typescript
rule('Text shortcuts').manipulators([
  map('1', '⌘⌥⌃⇧').toPaste('your.email@example.com'),
  map('2', '⌘⌥⌃⇧').toPaste('Your Name'),
])
```

## Building Your Configuration

1. **Start simple** - Begin with one example that solves your immediate need
2. **Test safely** - Use `writeToProfile('--dry-run', [...])` or a test profile
3. **Add gradually** - Expand your configuration over time
4. **Organize** - Split large configs into modules

## More Resources

- **Examples** - See practical examples in the repository
- **[Community configs](https://github.com/evan-liu/karabiner.ts/network/dependents)** - Real-world configurations
- **[Online editor](https://karabiner.ts.evanliu.dev/editor)** - Test examples interactively
