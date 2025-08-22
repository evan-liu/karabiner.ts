---
title: Imports
---

# Importing Existing Configurations

You don't need to start from scratch! karabiner.ts can import configurations from:

- [Karabiner-Elements shared rules](https://ke-complex-modifications.pqrs.org)
- Existing JSON configurations
- Other Karabiner-Elements profiles
- Configurations created by other tools

This lets you gradually migrate to karabiner.ts or combine different configuration sources.

## importJson() {#import-json}

Import rules from JSON files, including those from the [shared rules gallery](https://ke-complex-modifications.pqrs.org).

### Importing Shared Rules

Rules downloaded from the shared gallery are stored in `~/.config/karabiner/assets/complex_modifications/`:

```typescript
import { homedir } from 'node:os'
import { resolve } from 'node:path'

writeToProfile('Default', [
  // Your karabiner.ts rules
  rule('My custom rule').manipulators([map('⇪').to('⎋')]),

  // Import downloaded shared rules
  importJson(
    resolve(
      homedir(),
      '.config/karabiner/assets/complex_modifications/1703535155.json',
    ),
  ),
])
```

### Importing Local JSON Files

You can also import JSON files stored in your project:

```typescript
// Import from project directory
writeToProfile('Default', [
  // Mix karabiner.ts rules with imported JSON
  rule('TypeScript rules').manipulators([map('a').to('b')]),

  // Import local JSON configuration
  importJson(resolve(__dirname, './legacy-config.json')),
  importJson(resolve(__dirname, './shared-rules.json')),
])
```

### Finding Shared Rules

1. Visit [ke-complex-modifications.pqrs.org](https://ke-complex-modifications.pqrs.org)
2. Find rules you want to use
3. Click "Import" in Karabiner-Elements
4. The JSON file will be downloaded to `~/.config/karabiner/assets/complex_modifications/`
5. Use the filename in your `importJson()` call

:::tip
You can also copy the JSON content directly and save it as a local file in your project for version control.
:::

## importProfile() {#import-profile}

Import all rules from another Karabiner-Elements profile. This is useful when:

- Migrating from other configuration tools
- Sharing configurations between profiles
- Testing new rules alongside existing ones

### Basic Usage

```typescript
writeToProfile('karabiner.ts', [
  // Your new karabiner.ts rules
  rule('New TypeScript rules').manipulators([map('⇪').to('⎋')]),

  // Import all rules from another profile
  importProfile('MyOldProfile'),
])
```

### Migration Strategy

Use this pattern to gradually migrate from JSON to karabiner.ts:

```typescript
writeToProfile('Default', [
  // Phase 1: Import existing rules
  importProfile('LegacyConfig'),

  // Phase 2: Add new rules in karabiner.ts
  rule('New features').manipulators([
    layer('a', 'nav').manipulators([
      map('h').to('←'),
      map('j').to('↓'),
      map('k').to('↑'),
      map('l').to('→'),
    ]),
  ]),

  // Phase 3: Gradually rewrite imported rules
  // (Remove from LegacyConfig, add here)
])
```

## Combining Import Methods

You can use both import methods together:

```typescript
writeToProfile('Default', [
  // Core karabiner.ts configuration
  rule('Core mappings').manipulators([map('⇪').to('⎋')]),

  // Import from another profile
  importProfile('SharedConfig'),

  // Import specific JSON files
  importJson(resolve(__dirname, './vim-bindings.json')),
  importJson(resolve(__dirname, './app-shortcuts.json')),

  // More karabiner.ts rules
  rule('Advanced features').manipulators([
    layer('semicolon', 'nav').manipulators([
      map('h').to('←'),
      map('l').to('→'),
    ]),
  ]),
])
```

## Best Practices

### Organization

```typescript
// Group imports at the top for clarity
writeToProfile('Default', [
  // Imports first
  importProfile('LegacyRules'),
  importJson(resolve(__dirname, './shared-rules.json')),

  // Then your karabiner.ts rules
  ...myCustomRules,
  ...layerDefinitions,
  ...appSpecificRules,
])
```

### Version Control

- **Include imported JSON files** in your project for reproducible builds
- **Document the source** of imported rules for future reference
- **Use comments** to explain why rules are imported vs rewritten

```typescript
writeToProfile('Default', [
  // Import complex Vim emulation rules (too complex to rewrite)
  importJson(resolve(__dirname, './vim-emulation.json')),

  // Import company-specific shortcuts (maintained by team)
  importJson(resolve(__dirname, './company-shortcuts.json')),

  // Personal customizations in karabiner.ts
  rule('Personal shortcuts').manipulators([
    // ...
  ]),
])
```

### Testing Imported Rules

When importing rules, test that they work correctly:

```typescript
// Use a separate profile for testing
writeToProfile('Testing', [
  importJson(resolve(__dirname, './new-rules.json')),

  // Add debug rule to verify import worked
  rule('Import test').manipulators([
    map('f12').toNotificationMessage('test', 'Import successful'),
  ]),
])
```

## Common Issues

### File Path Problems

```typescript
// ❌ Wrong - relative paths might not work
importJson('./rules.json')

// ✅ Correct - use absolute paths
importJson(resolve(__dirname, './rules.json'))
```

### Missing Files

```typescript
import { existsSync } from 'node:fs'

// Check if file exists before importing
let sharedRulesPath = resolve(__dirname, './shared-rules.json')
if (existsSync(sharedRulesPath)) {
  rules.push(importJson(sharedRulesPath))
} else {
  console.warn('Shared rules file not found:', sharedRulesPath)
}
```

### Rule Conflicts

Imported rules are processed in order. If there are conflicts:

```typescript
writeToProfile('Default', [
  // This rule will take precedence
  rule('Override').manipulators([map('a').to('custom_behavior')]),

  // Any 'a' mappings in imported rules will be ignored
  importProfile('OtherProfile'),
])
```

## Migration Examples

### From Goku to karabiner.ts

```typescript
// Keep Goku rules temporarily while migrating
writeToProfile('Default', [
  // Import existing Goku-generated rules
  importProfile('GokuProfile'),

  // Add new karabiner.ts rules
  rule('Migrated to karabiner.ts').manipulators([
    // Start with simple rules and gradually migrate complex ones
    map('⇪').to('⎋'),
  ]),
])
```

### From Manual JSON to karabiner.ts

```typescript
// Gradual migration approach
writeToProfile('Default', [
  // Keep working JSON rules
  importJson(resolve(__dirname, './working-config.json')),

  // Add new features in karabiner.ts
  rule('New features').manipulators([
    // Implement new rules that would be hard in JSON
    hyperLayer('⇪').manipulators([map('h').to('←'), map('j').to('↓')]),
  ]),
])
```
