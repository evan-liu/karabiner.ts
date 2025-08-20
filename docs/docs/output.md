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

```typescript
// Basic usage
writeToProfile('Default', [
  rule('Caps Lock to Delete').manipulators([
    map('⇪').to('⌫'),
  ]),
])

// Dry run (prints JSON to console)
writeToProfile('--dry-run', [...rules])

// Custom path
writeToProfile({
  name: 'MyProfile',
  karabinerJsonPath: '/custom/path/karabiner.json'
}, [...rules])
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

```typescript
// Configure menu bar display
writeToGlobal({
  show_in_menu_bar: true,
  show_profile_name_in_menu_bar: true,
})

// Disable update checks
writeToGlobal({
  check_for_updates_on_startup: false,
})

// Custom configuration file
writeToGlobal({
  show_in_menu_bar: false,
}, '/custom/path/karabiner.json')
```