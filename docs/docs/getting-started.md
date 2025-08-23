---
title: Getting Started
---

# Getting Started with karabiner.ts

This guide will walk you through setting up and creating your first keyboard configuration.

## Prerequisites

- **macOS** - Karabiner-Elements only works on macOS
- **[Karabiner-Elements](https://karabiner-elements.pqrs.org/)** - Download and install first
- **Node.js 18+** or **Deno** (for local development) OR use the **[Online Editor](https://karabiner.ts.evanliu.dev/editor)**

## Installation Options

### Option 1: Online Editor (Recommended for beginners)

1. Visit the [online editor](https://karabiner.ts.evanliu.dev/editor)
2. Write your configuration and copy the generated JSON
3. [Import into Karabiner-Elements](https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/)

### Option 2: Create New Project (Recommended for regular use)

```bash
npx create-karabiner-config@latest my-config
cd my-config
npm run build
```

### Option 3: Download Starter Template

1. [Download examples repository](https://github.com/evan-liu/karabiner.ts.examples/archive/refs/heads/main.zip)
2. Extract, run `npm install`, edit `src/index.ts`, and run `npm run build`

## Your First Configuration

Let's create a simple configuration that maps Caps Lock to Escape when tapped, and acts as Hyper (⌘⌥⌃⇧) when held.

```typescript
import { map, rule, writeToProfile } from 'karabiner.ts'

writeToProfile('Default', [
  rule('Caps Lock → Escape / Hyper').manipulators([
    map('⇪').toIfAlone('⎋').toIfHeldDown(toHyper()),
  ]),
])
```

**Understanding the code:**

- `writeToProfile('Default', [...])` - Writes rules to the "Default" profile
- `rule('...')` - Creates a group of key mappings with a description
- `map('⇪')` - Maps Caps Lock key (⇪ is the symbol alias)
- `.toIfAlone('⎋')` - When tapped alone, send Escape
- `.toIfHeldDown(toHyper())` - When held down, act as Hyper key

Save, build, and test in Karabiner-Elements → Complex Modifications → Rules.

## Key Concepts

**Rules and Manipulators:**

```typescript
rule('My Rule').manipulators([
  map('a').to('b'), // When 'a' is pressed, send 'b'
])
```

**Key Aliases:** Use symbols instead of strings

```typescript
map('⇪').to('⎋') // Caps Lock → Escape
map('⌘', 'a').to('⌘', 'c') // Cmd+A → Cmd+C
```

**Layers:** Temporary mappings when a key is held

```typescript
layer('a', 'navigation').manipulators([
  map('h').to('←'),
  map('j').to('↓'), // Vim-style navigation
])
```

## Next Steps

- **[Explore Examples](/examples)** - See practical patterns and use cases
- **[Learn Rules](/rules/rule)** - Understand rule building blocks
- **[Advanced Features](/rules/layer)** - Layers, leader modes, and more
- **[Need Help?](/faq)** - FAQ and troubleshooting guide
