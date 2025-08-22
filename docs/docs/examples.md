---
title: Examples Overview
slug: /examples
---

# Configuration Examples

This section provides practical examples of karabiner.ts configurations. Each example demonstrates specific features and can be used as building blocks for your own configuration.

## How to Use Examples

### 📋 Copy and Paste

Each example shows complete, working code that you can copy into your configuration.

### 🔗 Try in Online Editor

Many examples have "Open in Editor" links that load the example in the [online editor](https://karabiner.ts.evanliu.dev/editor) for immediate testing.

### 🧩 Mix and Match

Examples are designed to be combined. Pick the features you need and merge them into your configuration.

## Example Categories

### 🔧 **[Modifier Keys](/examples/modifier-keys/caps_lock-to-hyper)**

_Customizing modifier key behavior_

- **Caps Lock to Hyper** - Transform Caps Lock into a powerful modifier
- **Duo Modifiers** - Different behavior for tap vs hold on modifier keys

Perfect for creating custom modifier combinations and repurposing underused keys.

### ⌨️ **[Vim](/examples/vim/nested-leader-key)**

_Vim-style key bindings and navigation_

- **Nested Leader Key** - Implement Vim-style leader key sequences
- **Navigation Layers** - HJKL navigation in any application

Great for Vim users who want consistent navigation everywhere.

### 📝 **[Text Input](/examples/text-input/emoji)**

_Text expansion and typing shortcuts_

- **Text Expansions** - Quick insertion of common text
- **Symbol Layers** - Easy access to special characters
- **Unicode Input** - Type emojis and special symbols

Useful for automating repetitive typing and accessing special characters.

### 🚀 **[OS Functionality](/examples/os-functionality/launch-apps-layer)**

_System integration and app launching_

- **App Launchers** - Quick shortcuts to open applications
- **System Controls** - Volume, brightness, and system functions
- **Window Management** - Custom window manipulation shortcuts

Perfect for improving productivity and system interaction.

## Quick Examples

Here are some popular patterns to get you started:

### Essential: Caps Lock → Escape/Hyper

```typescript
rule('Caps Lock → Escape / Hyper').manipulators([
  map('⇪')
    .toIfAlone('⎋') // Escape when tapped
    .toIfHeldDown(toHyper()), // Hyper when held
])
```

### Navigation: Semicolon Layer

```typescript
layer('semicolon', 'nav').manipulators([
  map('h').to('←'), // Left arrow
  map('j').to('↓'), // Down arrow
  map('k').to('↑'), // Up arrow
  map('l').to('→'), // Right arrow
])
```

### Apps: Command+Space Layer

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

### Text: Hyper+Number Shortcuts

```typescript
rule('Text shortcuts').manipulators([
  map('1', '⌘⌥⌃⇧').toPaste('your.email@example.com'),
  map('2', '⌘⌥⌃⇧').toPaste('Your Full Name'),
  map('3', '⌘⌥⌃⇧').toPaste('(555) 123-4567'),
])
```

## Real-World Configurations

Want to see complete configurations? Check out these community examples:

- **[Evan's Configuration](https://github.com/evan-liu/karabiner-config)** - The creator's personal setup
- **[Community Configs](https://github.com/evan-liu/karabiner.ts/network/dependents)** - Real configurations from other users

## Building Your Configuration

### Start Simple

Begin with one or two examples that solve your immediate needs:

```typescript
writeToProfile('Default', [
  // Start with basics
  rule('Caps Lock').manipulators([map('⇪').to('⎋')]),
])
```

### Add Gradually

As you get comfortable, add more features:

```typescript
writeToProfile('Default', [
  // Basics
  rule('Caps Lock').manipulators([map('⇪').to('⎋')]),

  // Add navigation
  layer('semicolon', 'nav').manipulators([
    map('h').to('←'),
    map('j').to('↓'),
    map('k').to('↑'),
    map('l').to('→'),
  ]),
])
```

### Organize for Scale

For larger configurations, split into modules:

```typescript
// main.ts
import { appShortcuts } from './apps'
import { basicMappings } from './basic'
import { layers } from './layers'

writeToProfile('Default', [...basicMappings, ...layers, ...appShortcuts])
```

## Testing Examples

### Use Dry Run

Test examples without affecting your configuration:

```typescript
writeToProfile('--dry-run', [
  // Your example here
])
// This prints JSON to console instead of writing to file
```

### Create Test Profile

Use a separate profile for testing:

```typescript
writeToProfile('Testing', [
  // Examples to test
])
```

### Use Notifications

Add debug output to see when rules trigger:

```typescript
map('a').toNotificationMessage('debug', 'Rule triggered').to('b')
```

## Need More Examples?

- **Browse the full [examples directory](/examples)**
- **Check [community configurations](https://github.com/evan-liu/karabiner.ts/network/dependents)**
- **Visit the [online editor](https://karabiner.ts.evanliu.dev/editor)** to experiment
- **Ask in [GitHub Discussions](https://github.com/evan-liu/karabiner.ts/discussions)**

Ready to explore? Start with the [Caps Lock to Hyper example](/examples/modifier-keys/caps_lock-to-hyper) or dive into a specific category that interests you.
