---
title: FAQ
---

# Frequently Asked Questions

## General Questions

### What is karabiner.ts?

karabiner.ts is a TypeScript library that allows you to write [Karabiner-Elements](https://karabiner-elements.pqrs.org/) configurations using TypeScript instead of complex JSON. It provides type safety, IDE support, and powerful abstractions for creating keyboard remapping rules.

### Do I need to know TypeScript to use karabiner.ts?

No! While the library is written in TypeScript, you can use it with basic JavaScript knowledge. Most configurations use simple, readable syntax. TypeScript knowledge helps with advanced features, but isn't required.

### How is this different from Goku?

Both karabiner.ts and [Goku](https://github.com/yqrashawn/GokuRakuJoudo) aim to simplify Karabiner-Elements configuration:

- **karabiner.ts**: Uses TypeScript/JavaScript syntax with strong typing and IDE support
- **Goku**: Uses EDN (Extensible Data Notation) format from Clojure

Choose based on your preference for syntax and tooling.

### Can I use this with the online editor only?

Yes! The [online editor](https://karabiner.ts.evanliu.dev/editor) lets you write configurations and generate JSON without installing anything locally. Just copy the generated JSON and import it into Karabiner-Elements.

## Installation & Setup

### Which installation method should I choose?

- **Online Editor**: Best for trying out karabiner.ts or simple configurations
- **`create-karabiner-config`**: Best for regular use and complex configurations
- **Manual npm install**: Best if you want to integrate into existing projects

### My configuration isn't working. What should I check?

1. **Check Karabiner-Elements is running**: Look for the icon in your menu bar
2. **Verify your profile is selected**: Go to Karabiner-Elements → Profiles
3. **Check for syntax errors**: Look at the generated JSON for issues
4. **Restart Karabiner-Elements**: Sometimes needed after major changes
5. **Check the EventViewer**: Use Karabiner-Elements → Misc → EventViewer to see if keys are being detected

### How do I update to the latest version?

- **Online Editor**: Always uses the latest version automatically
- **Project-based**: Run `npm run update` or `npm update karabiner.ts`
- **Manual install**: Run `npm update karabiner.ts`

## Configuration Issues

### Why isn't my layer working?

Common layer issues:

1. **Missing condition**: Ensure your layer manipulators are inside the layer block
2. **Key conflicts**: Check if another rule is capturing the same key
3. **Modifier conflicts**: Layer modifiers might conflict with system shortcuts
4. **Variable name conflicts**: Different layers shouldn't use the same variable name

```typescript
// ❌ Wrong - manipulator outside layer
layer('a', 'nav').manipulators([map('h').to('←')])
map('j').to('↓') // This won't be part of the layer

// ✅ Correct - all manipulators inside layer
layer('a', 'nav').manipulators([map('h').to('←'), map('j').to('↓')])
```

### My key mappings are being overridden. What's happening?

Karabiner-Elements applies rules in order. If multiple rules match the same key combination, only the first one is used. To fix this:

1. **Check rule order**: Rules earlier in your configuration take priority
2. **Use conditions**: Add conditions to make rules more specific
3. **Combine related mappings**: Put related mappings in the same rule

### How do I debug what's happening with my keys?

1. **Use EventViewer**: Open Karabiner-Elements → Misc → EventViewer to see real-time key events
2. **Check generated JSON**: Use `--dry-run` to see the generated configuration without applying it
3. **Use notifications**: Add `toNotificationMessage()` to see when rules trigger
4. **Simplify temporarily**: Comment out complex rules to isolate issues

## Key Syntax & Aliases

### What key codes are available?

See the full list in the source code:

- [Key codes](https://github.com/evan-liu/karabiner.ts/blob/main/src/karabiner/key-code.ts)
- [Consumer key codes](https://github.com/evan-liu/karabiner.ts/blob/main/src/karabiner/consumer-key-code.ts)
- [Key aliases](https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts)

### How do I map function keys (F1, F2, etc.)?

```typescript
map('f1').to('brightness_down'),
map('f2').to('brightness_up'),
map('f3').to('mission_control'),
// ... etc
```

### How do I handle international keyboards?

Most international keyboard layouts are supported. Use the actual key codes or test with EventViewer to see what key codes your keyboard sends.

### What's the difference between `'⌘'` and `'command'`?

They're aliases for the same thing. Use whichever you prefer:

- Symbols: `'⌘'`, `'⌥'`, `'⌃'`, `'⇧'`
- Names: `'command'`, `'option'`, `'control'`, `'shift'`

## Advanced Features

### What's the difference between layer, simlayer, and hyperLayer?

- **[layer](/rules/layer)**: Activated when a key is held down
- **[simlayer](/rules/simlayer)**: Activated when keys are pressed simultaneously
- **[hyperLayer](/rules/hyper-layer)**: A layer using Hyper (⌘⌥⌃⇧) as the modifier

### How do I create complex conditions?

Use `ifVar()`, `ifDevice()`, `ifApp()`, and combine them:

```typescript
rule('Complex conditions').manipulators([
  map('a')
    .condition(ifApp('^com\\.apple\\.Safari$'))
    .condition(ifVar('layer1'))
    .to('b'),
])
```

### Can I import existing Karabiner-Elements configurations?

Yes! Use the `import` functions:

```typescript
import { importJson } from 'karabiner.ts'

// Import from existing karabiner.json
importJson('path/to/karabiner.json')
```

## Performance & Best Practices

### Are there performance considerations?

karabiner.ts generates static JSON, so there's no runtime performance impact. However:

1. **Avoid excessive rules**: Too many rules can slow down Karabiner-Elements
2. **Use specific conditions**: Broad conditions can cause unnecessary processing
3. **Organize efficiently**: Group related mappings in the same rule

### How should I organize my configuration files?

For large configurations:

```typescript
// src/index.ts - Main file
import { layers } from './layers'
import { apps } from './apps'

writeToProfile('Default', [
  ...layers,
  ...apps,
])

// src/layers.ts - Layer definitions
export let layers = [
  layer('a', 'nav').manipulators([...]),
  layer('s', 'symbols').manipulators([...]),
]
```

### What are some common patterns to avoid?

1. **Don't nest layers deeply**: Complex layer hierarchies can be confusing
2. **Don't override system shortcuts carelessly**: Consider users' muscle memory
3. **Don't forget escape mechanisms**: Always provide ways to exit modes/layers
4. **Don't ignore conflicts**: Test configurations thoroughly

## Troubleshooting

### Nothing happens when I run my configuration

1. Check that Node.js/Deno ran without errors
2. Verify the profile name matches your Karabiner-Elements profile
3. Check that Karabiner-Elements has necessary permissions
4. Look at Karabiner-Elements → Log for error messages

### My changes aren't taking effect

1. Make sure you ran the build command (`npm run build`)
2. Check that Karabiner-Elements reloaded the configuration
3. Verify you're editing the correct profile
4. Try restarting Karabiner-Elements

### I'm getting TypeScript errors

1. Update to the latest version: `npm update karabiner.ts`
2. Check the [examples](/examples) for correct syntax
3. Make sure you're importing functions correctly
4. Try the online editor to test your syntax

### Keys are behaving unexpectedly

1. Use EventViewer to see what key events are being generated
2. Check for conflicting rules in your configuration
3. Verify modifier key combinations are correct
4. Test with a minimal configuration to isolate the issue

## Still Need Help?

- **Check the [FAQ](/faq)** for common questions
- **Read the documentation**: See detailed explanations in the [main docs](/)
- **Visit the troubleshooting guide**: Check the [troubleshooting section](/troubleshooting)
- **Report issues**: File bugs or feature requests on [GitHub](https://github.com/evan-liu/karabiner.ts/issues)
