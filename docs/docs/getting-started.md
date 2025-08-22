---
title: Getting Started
---

# Getting Started with karabiner.ts

Welcome to karabiner.ts! This guide will walk you through setting up and creating your first keyboard configuration.

## What is karabiner.ts?

karabiner.ts allows you to write [Karabiner-Elements](https://karabiner-elements.pqrs.org/) configuration using TypeScript instead of complex JSON. This provides:

- **Better readability** - TypeScript syntax is easier to understand than nested JSON
- **IDE support** - Auto-completion, type checking, and error detection
- **Modular organization** - Split configurations into multiple files
- **Advanced abstractions** - Powerful concepts like layers, leader modes, and more

## Prerequisites

Before you start, you'll need:

1. **macOS** - Karabiner-Elements only works on macOS
2. **[Karabiner-Elements](https://karabiner-elements.pqrs.org/)** - Download and install from their website
3. **Node.js 18+** or **Deno** (for local development) OR use the **[Online Editor](https://karabiner.ts.evanliu.dev/editor)**

## Quick Start Options

Choose the method that works best for you:

### Option 1: Online Editor (Recommended for beginners)

1. Visit the [online editor](https://karabiner.ts.evanliu.dev/editor)
2. Write your configuration in the left panel
3. Copy the generated JSON from the right panel
4. [Import the JSON into Karabiner-Elements](https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/)

### Option 2: Create New Project (Recommended for regular use)

```bash
npx create-karabiner-config@latest my-config
cd my-config
npm run build
```

### Option 3: Download Starter Template

1. [Download the examples repository](https://github.com/evan-liu/karabiner.ts.examples/archive/refs/heads/main.zip)
2. Extract and run `npm install`
3. Edit `src/index.ts` and run `npm run build`

## Your First Configuration

Let's create a simple configuration that maps Caps Lock to Escape when tapped, and acts as Hyper (⌘⌥⌃⇧) when held.

### Step 1: Write the Configuration

```typescript
import { map, rule, writeToProfile } from 'karabiner.ts'

writeToProfile('Default', [
  rule('Caps Lock → Escape / Hyper').manipulators([
    map('⇪') // Caps Lock
      .toIfAlone('⎋') // Escape when tapped alone
      .toIfHeldDown(toHyper()), // Hyper when held
  ]),
])
```

### Step 2: Understanding the Code

- `writeToProfile('Default', [...])` - Writes rules to the "Default" profile in Karabiner-Elements
- `rule('...')` - Creates a group of key mappings with a description
- `map('⇪')` - Maps the Caps Lock key (⇪ is the symbol alias)
- `.toIfAlone('⎋')` - When tapped alone, send Escape
- `.toIfHeldDown(toHyper())` - When held down, act as Hyper key

### Step 3: Test Your Configuration

1. Save and run your configuration
2. Open Karabiner-Elements
3. Go to Complex Modifications → Rules
4. You should see "Caps Lock → Escape / Hyper" listed
5. Test by tapping Caps Lock (should send Escape) and holding it with another key

## Key Concepts

### 1. Rules and Manipulators

```typescript
rule('My Rule Name').manipulators([
  map('a').to('b'), // When 'a' is pressed, send 'b'
  map('c').to('d'), // When 'c' is pressed, send 'd'
])
```

### 2. Key Aliases

Instead of writing `"caps_lock"`, you can use symbols:

```typescript
map('⇪').to('⎋') // Caps Lock → Escape
map('⌘', 'a').to('⌘', 'c') // Cmd+A → Cmd+C
```

Common aliases:

- `⌘` Command, `⌥` Option, `⌃` Control, `⇧` Shift, `⇪` Caps Lock
- `←` `→` `↑` `↓` Arrow keys
- `⎋` Escape, `⌫` Backspace, `⏎` Enter, `⇥` Tab

### 3. Layers

Layers let you create temporary key mappings when a key is held:

```typescript
layer('a', 'navigation').manipulators([
  map('h').to('←'), // When 'a' is held, 'h' becomes left arrow
  map('j').to('↓'), // 'j' becomes down arrow
  map('k').to('↑'), // 'k' becomes up arrow
  map('l').to('→'), // 'l' becomes right arrow
])
```

## Next Steps

Now that you have the basics:

1. **Explore Examples** - Check out the [Examples](/examples) section for inspiration
2. **Learn about Layers** - Read about [layers](/rules/layer) and [simlayers](/rules/simlayer)
3. **Advanced Features** - Discover [hyperLayer](/rules/hyper-layer), [duoLayer](/rules/duo-layer), and [leader modes](/rules/leader-mode)
4. **Join the Community** - See [real-world configurations](https://github.com/evan-liu/karabiner.ts/network/dependents)

## Common Patterns

Here are some popular configuration patterns to get you started:

### Vim-style Navigation Layer

```typescript
layer('semicolon', 'nav').manipulators([
  map('h').to('←'),
  map('j').to('↓'),
  map('k').to('↑'),
  map('l').to('→'),
  map('u').to('⇞'), // Page Up
  map('d').to('⇟'), // Page Down
])
```

### Quick App Launcher

```typescript
layer('space', 'apps')
  .modifiers('⌘')
  .manipulators([
    map('f').toApp('Finder'),
    map('s').toApp('Safari'),
    map('t').toApp('Terminal'),
    map('c').toApp('Code'),
  ])
```

### Text Expansions

```typescript
rule('Text Shortcuts').manipulators([
  map('1', '⌘⌥⌃⇧').toPaste('your.email@example.com'),
  map('2', '⌘⌥⌃⇧').toPaste('Your Name'),
  map('3', '⌘⌥⌃⇧').to$('date "+%Y-%m-%d"'), // Current date
])
```

## Need Help?

- **Documentation** - Browse the full [documentation](/)
- **Examples** - See practical [examples](/examples)
- **Troubleshooting** - Check the [FAQ](/faq) and [troubleshooting guide](/troubleshooting)
- **Community** - Look at [configurations from other users](https://github.com/evan-liu/karabiner.ts/network/dependents)

Ready to dive deeper? Continue to the [Rules](/rules/rule) section to learn about the building blocks of karabiner.ts configurations.
