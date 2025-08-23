---
title: Imports
---

# Importing Existing Configurations

karabiner.ts can import configurations from [Karabiner-Elements shared rules](https://ke-complex-modifications.pqrs.org), existing JSON files, and other profiles. This lets you gradually migrate to karabiner.ts or combine different sources.

## importJson()

Import rules from JSON files, including shared gallery rules.

**Import shared rules** (stored in `~/.config/karabiner/assets/complex_modifications/`):

```typescript
writeToProfile('Default', [
  rule('My custom rule').manipulators([map('⇪').to('⎋')]),
  importJson(
    resolve(
      homedir(),
      '.config/karabiner/assets/complex_modifications/1703535155.json',
    ),
  ),
])
```

**Import local files:**

```typescript
writeToProfile('Default', [
  rule('TypeScript rules').manipulators([map('a').to('b')]),
  importJson(resolve(__dirname, './legacy-config.json')),
])
```

## importProfile()

Import all rules from another Karabiner-Elements profile:

```typescript
writeToProfile('karabiner.ts', [
  rule('New rules').manipulators([map('⇪').to('⎋')]),
  importProfile('MyOldProfile'), // Import existing profile
])
```

**Migration strategy:**

```typescript
writeToProfile('Default', [
  importProfile('LegacyConfig'), // Keep existing rules
  rule('New features').manipulators([
    layer('a', 'nav').manipulators([map('h').to('←'), map('j').to('↓')]),
  ]),
])
```

## Best Practices

- **Group imports at the top** for clarity
- **Use absolute paths:** `resolve(__dirname, './file.json')`
- **Check file exists** before importing
- **Rules process in order** - earlier rules take precedence
