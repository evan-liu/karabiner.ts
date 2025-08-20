---
title: Output
---

Methods for writing configuration to Karabiner-Elements files.

- [writeToProfile()](#write-to-profile)
- [writeToGlobal()](#write-to-global)

## writeToProfile() {#write-to-profile}

Write complex_modifications rules to a profile inside `~/.config/karabiner/karabiner.json`.

```typescript
writeToProfile('Default', [
  rule('Demo Rule').manipulators([
    map('⇪').to('⌫', '⌘'),
  ]),
])
```

### Parameters

- **writeTarget**: The profile name or a WriteTarget describing the profile and where to write the output.
  - Use `'--dry-run'` to print the config JSON to console instead of writing to file.
  - Use a string for the profile name.
  - Use a `WriteTarget` object for advanced options:
    ```typescript
    interface WriteTarget {
      name: string
      dryRun?: boolean
      karabinerJsonPath?: string
    }
    ```
- **rules**: Array of `Rule` or `RuleBuilder` objects containing the complex_modifications rules.
- **parameters**: Optional `ModificationParameters` for global rule settings.

### Examples

**Basic usage:**
```typescript
import { writeToProfile, rule, map } from 'karabiner.ts'

writeToProfile('Default', [
  rule('Caps Lock to Delete').manipulators([
    map('⇪').to('⌫'),
  ]),
])
```

**Dry run:**
```typescript
writeToProfile('--dry-run', [
  rule('Test Rule').manipulators([
    map('a').to('b'),
  ]),
])
// Prints JSON to console instead of writing to file
```

**Custom karabiner.json path:**
```typescript
writeToProfile({
  name: 'MyProfile',
  karabinerJsonPath: '/path/to/custom/karabiner.json'
}, [
  rule('Custom Rule').manipulators([
    map('1').to('a'),
  ]),
])
```

## writeToGlobal() {#write-to-global}

Write global settings to the Karabiner-Elements configuration file (`~/.config/karabiner/karabiner.json`). This allows you to configure global preferences that affect all profiles.

```typescript
writeToGlobal({
  check_for_updates_on_startup: false,
  show_in_menu_bar: true,
  show_profile_name_in_menu_bar: true,
})
```

### Parameters

- **global**: Object containing global settings to write. Properties will be merged with existing global settings.
  - `check_for_updates_on_startup?: boolean` - Whether to check for updates when Karabiner-Elements starts
  - `show_in_menu_bar?: boolean` - Whether to show Karabiner-Elements icon in menu bar
  - `show_profile_name_in_menu_bar?: boolean` - Whether to show profile name in menu bar
- **karabinerJsonPath**: Optional path to karabiner.json file. Defaults to `~/.config/karabiner/karabiner.json`.

### Examples

**Configure menu bar display:**
```typescript
import { writeToGlobal } from 'karabiner.ts'

writeToGlobal({
  show_in_menu_bar: true,
  show_profile_name_in_menu_bar: true,
})
```

**Disable update checks:**
```typescript
writeToGlobal({
  check_for_updates_on_startup: false,
})
```

**Use custom configuration file:**
```typescript
writeToGlobal({
  show_in_menu_bar: false,
}, '/path/to/custom/karabiner.json')
```

**Combined with profile configuration:**
```typescript
import { writeToProfile, writeToGlobal, rule, map } from 'karabiner.ts'

// Configure global settings
writeToGlobal({
  show_in_menu_bar: true,
  show_profile_name_in_menu_bar: true,
})

// Configure profile rules
writeToProfile('MyProfile', [
  rule('Custom mappings').manipulators([
    map('⇪').to('⌫'),
  ]),
])
```

## Using with Deno

Both methods are available in Deno environments:

```typescript
import { writeToProfile, writeToGlobal } from 'https://deno.land/x/karabinerts@{version}/deno.ts'

writeToGlobal({
  show_in_menu_bar: true,
})

writeToProfile('Default', [
  // rules...
])
```

Run with:
```bash
deno run --allow-env --allow-read --allow-write your-script.ts
```