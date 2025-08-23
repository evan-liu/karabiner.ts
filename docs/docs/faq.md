---
title: FAQ
---

# Frequently Asked Questions

## General Questions

**What is karabiner.ts?**

A TypeScript library for writing [Karabiner-Elements](https://karabiner-elements.pqrs.org/) configurations with type safety, IDE support, and powerful abstractions.

**Do I need TypeScript knowledge?**

No! Basic JavaScript knowledge is sufficient. TypeScript helps with advanced features but isn't required.

**How is this different from Goku?**

- **karabiner.ts**: TypeScript/JavaScript with strong typing and IDE support
- **Goku**: EDN format from Clojure ecosystem

**Can I use only the online editor?**

Yes! The [online editor](https://karabiner.ts.evanliu.dev/editor) generates JSON you can import into Karabiner-Elements.

## Installation & Setup

**Which installation method should I choose?**

- **Online Editor**: For trying out or simple configurations
- **Create Project**: For regular use and complex setups
- **Manual Install**: For integrating into existing projects

**Configuration not working?**

1. Check Karabiner-Elements is running (menu bar icon)
2. Verify correct profile is selected
3. Check for syntax errors in generated JSON
4. Use EventViewer to debug key detection

## Configuration Issues

**Layer not working?**

- Ensure all manipulators are inside `.manipulators([...])`
- Use unique variable names for different layers
- Check for key conflicts with other rules

**Keys being overridden?**

- Rules apply in order - first match wins
- Add conditions to make rules more specific
- Combine related mappings in same rule

**How to debug issues?**

- Use Karabiner-Elements → Misc → EventViewer
- Add `.toNotificationMessage()` to see when rules trigger
- Simplify configuration to isolate problems

## Advanced Features

**Difference between layer types?**

- **[layer](/rules/layer)**: Activated when a key is held down
- **[simlayer](/rules/simlayer)**: Activated when keys are pressed simultaneously
- **[hyperLayer](/rules/hyper-layer)**: Uses Hyper (⌘⌥⌃⇧) as modifier

**Complex conditions?**

```typescript
rule('Example').manipulators([
  map('a')
    .condition(ifApp('^com\\.apple\\.Safari$'))
    .condition(ifVar('layer1'))
    .to('b'),
])
```

**Import existing configurations?**

```typescript
import { importJson } from 'karabiner.ts'

importJson('path/to/karabiner.json')
```

## Best Practices

**Performance tips:**

- Group related mappings in same rule
- Use specific conditions to avoid unnecessary processing
- Avoid excessive rules that can slow Karabiner-Elements

**Organization for large configs:**

```typescript
// src/index.ts
import { apps } from './apps'
import { layers } from './layers'

writeToProfile('Default', [...layers, ...apps])
```

## Need More Help?

- **[Troubleshooting Guide](/troubleshooting)** - Detailed diagnostic steps
- **[Examples](/examples)** - Working configuration patterns
- **[GitHub Issues](https://github.com/evan-liu/karabiner.ts/issues)** - Report bugs or feature requests
