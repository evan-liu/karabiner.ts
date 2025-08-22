---
title: Troubleshooting
---

# Troubleshooting Guide

This guide helps you diagnose and fix common issues with karabiner.ts configurations.

## Quick Diagnosis Checklist

Before diving into specific issues, check these common causes:

- [ ] **Karabiner-Elements is running** - Look for the icon in your menu bar
- [ ] **Correct profile selected** - Check Karabiner-Elements → Profiles
- [ ] **Configuration built successfully** - No errors when running build command
- [ ] **Permissions granted** - Karabiner-Elements has Input Monitoring permission
- [ ] **No syntax errors** - Check the generated JSON for issues

## Configuration Not Loading

### Problem: My configuration isn't appearing in Karabiner-Elements

**Possible Causes:**

1. Build errors preventing JSON generation
2. Wrong profile name
3. File permissions issues
4. Karabiner-Elements not detecting changes

**Solutions:**

**Check for build errors:**

```bash
npm run build
# Look for any error messages
```

**Test with dry run:**

```typescript
writeToProfile('--dry-run', [
  // Your rules here
])
```

**Verify profile name:**

```typescript
// Make sure this matches your Karabiner-Elements profile
writeToProfile('Default', [...])
```

**Check file location:**

- Default path: `~/.config/karabiner/karabiner.json`
- Verify the file exists and was updated recently

**Force Karabiner-Elements to reload:**

1. Open Karabiner-Elements
2. Go to Profiles tab
3. Switch to a different profile and back
4. Or restart Karabiner-Elements completely

## Key Mappings Not Working

### Problem: Keys don't behave as configured

**Debug steps:**

**1. Use EventViewer to see what's happening:**

1. Open Karabiner-Elements → Misc → EventViewer
2. Press the keys you're trying to map
3. Check if events are being detected and transformed

**2. Check for rule conflicts:**

```typescript
// Rules are processed in order - first match wins
rule('First rule').manipulators([
  map('a').to('b'), // This will trigger
])
rule('Second rule').manipulators([
  map('a').to('c'), // This will be ignored
])
```

**3. Verify key syntax:**

```typescript
// ✅ Correct ways to specify keys
map('a').to('b')
map('⌘', 'a').to('⌘', 'c')
map('caps_lock').to('escape')

// ❌ Common mistakes
map('cmd', 'a') // Use '⌘' or 'command'
map('ctrl', 'a') // Use '⌃' or 'control'
```

**4. Check modifier combinations:**

```typescript
// Make sure modifier syntax is correct
map('a', '⌘').to('b') // Command + A
map('a', '⌘⌥').to('b') // Command + Option + A
map('a', { mandatory: ['⌘'] }) // Alternative syntax
```

## Layer Issues

### Problem: Layer not activating or behaving unexpectedly

**Common layer problems:**

**1. Missing manipulators inside layer:**

```typescript
// ❌ Wrong - manipulator outside layer
layer('a', 'nav').manipulators([map('h').to('←')])
map('j').to('↓') // This won't be part of the layer

// ✅ Correct - all manipulators inside layer
layer('a', 'nav').manipulators([map('h').to('←'), map('j').to('↓')])
```

**2. Variable name conflicts:**

```typescript
// ❌ Wrong - same variable name
layer('a', 'mode').manipulators([...])
layer('b', 'mode').manipulators([...]) // Conflict!

// ✅ Correct - unique variable names
layer('a', 'nav-mode').manipulators([...])
layer('b', 'edit-mode').manipulators([...])
```

**3. Layer key conflicts:**

```typescript
// If 'a' is used elsewhere, it might not trigger the layer
map('a').to('b') // This might override the layer
layer('a', 'nav').manipulators([...])
```

**4. Debug layer activation:**

```typescript
layer('a', 'nav')
  .configKey((key) => key.toNotificationMessage('nav', 'Nav layer activated'))
  .manipulators([
    map('h').toNotificationMessage('nav', 'H pressed in nav layer').to('←'),
  ])
```

### Problem: Layer key not working when tapped alone

**Check toIfAlone configuration:**

```typescript
// Default behavior - layer key works when tapped alone
layer('a', 'nav').manipulators([...]) // 'a' still types 'a' when tapped

// Custom behavior
layer('a', 'nav')
  .configKey((key) => key.toIfAlone('escape'))
  .manipulators([...])
```

## Modifier Key Issues

### Problem: Modifiers not working as expected

**Check modifier syntax:**

```typescript
// Different ways to specify modifiers
map('a', '⌘').to('b') // Mandatory Command
map('a', { mandatory: ['⌘'] }).to('b') // Same as above
map('a', { optional: ['⌘'] }).to('b') // Optional Command
map('a', 'optionalAny').to('b') // Any optional modifiers
```

**Debug modifier issues:**

```typescript
// Add notifications to see what's being triggered
map('a', '⌘').toNotificationMessage('debug', 'Command+A pressed').to('b')

map('a').toNotificationMessage('debug', 'Just A pressed').to('c')
```

## Performance Issues

### Problem: Karabiner-Elements is slow or unresponsive

**Possible causes:**

1. Too many rules
2. Inefficient conditions
3. Complex manipulator chains

**Solutions:**

**1. Optimize rule count:**

```typescript
// ❌ Many separate rules
rule('A mapping').manipulators([map('a').to('1')])
rule('B mapping').manipulators([map('b').to('2')])
rule('C mapping').manipulators([map('c').to('3')])

// ✅ Combined into one rule
rule('Letter mappings').manipulators([
  map('a').to('1'),
  map('b').to('2'),
  map('c').to('3'),
])
```

**2. Use specific conditions:**

```typescript
// ❌ Broad condition checked frequently
rule('All keys').manipulators([
  withCondition(ifApp('^.*$'))([
    map('a').to('b'),
    // ... many more mappings
  ]),
])

// ✅ Specific condition
rule('Safari only').manipulators([
  withCondition(ifApp('^com\\.apple\\.Safari$'))([map('a').to('b')]),
])
```

## Application-Specific Issues

### Problem: Rules not working in specific applications

**Check application bundle identifier:**

```typescript
// Get the correct bundle ID
// Use EventViewer or Activity Monitor to find the exact ID
ifApp('^com\\.apple\\.Safari$') // Safari
ifApp('^com\\.microsoft\\.VSCode$') // VS Code
ifApp('^com\\.apple\\.Terminal$') // Terminal
```

**Test application detection:**

```typescript
rule('App detection test').manipulators([
  map('f1')
    .condition(ifApp('^com\\.apple\\.Safari$'))
    .toNotificationMessage('app', 'Safari detected')
    .to('f1'),

  map('f1').toNotificationMessage('app', 'Other app').to('f1'),
])
```

## Device-Specific Issues

### Problem: Configuration not working on specific keyboards

**Check device detection:**

```typescript
// Use EventViewer to see device information
rule('Device-specific').manipulators([
  withCondition(ifDevice({ vendor_id: 1452 }))([
    map('a').to('b'), // Only for Apple keyboards
  ]),
])
```

**Test multiple devices:**

```typescript
rule('Multi-device test').manipulators([
  map('f12')
    .toNotificationMessage('device', `Device: ${device.vendor_id}`)
    .to('f12'),
])
```

## JSON Generation Issues

### Problem: Generated JSON looks wrong

**Check with dry run:**

```typescript
writeToProfile('--dry-run', [rule('Test').manipulators([map('a').to('b')])])
// This prints JSON to console instead of writing to file
```

**Validate JSON syntax:**

- Copy generated JSON to a JSON validator
- Check for missing commas, brackets, or quotes
- Look for TypeScript compilation errors

**Common JSON issues:**

```typescript
// ❌ This might generate invalid JSON
map(someVariable).to('b') // If someVariable is undefined

// ✅ Always use valid values
map('a').to('b')
```

## System Integration Issues

### Problem: macOS system shortcuts conflicting

**Common conflicts:**

- Mission Control (F3, ⌃↑)
- Spotlight (⌘Space)
- Dock shortcuts (⌥⌘D)

**Solutions:**

```typescript
// Check if system shortcuts are overriding your config
// Go to System Preferences → Keyboard → Shortcuts
// Disable conflicting system shortcuts

// Or use different key combinations
map('space', '⌥⌘').to(...) // Instead of ⌘Space
```

## Getting Help

### Diagnostic Information to Collect

When asking for help, include:

1. **System information:**
   - macOS version
   - Karabiner-Elements version
   - karabiner.ts version

2. **Configuration details:**
   - Minimal example that reproduces the issue
   - Generated JSON (use `--dry-run`)
   - Error messages

3. **EventViewer output:**
   - Screenshots or logs from EventViewer
   - Before and after key events

### Minimal Reproduction Example

Create a minimal config that demonstrates the issue:

```typescript
// Minimal example for debugging
writeToProfile('Default', [
  rule('Debug rule').manipulators([
    map('a').to('b'), // Simple mapping that should work
  ]),
])
```

### Where to Get Help

- **Check the [FAQ](/faq)** for common questions
- **Browse [examples](/examples)** for working configurations
- **Look at [community configs](https://github.com/evan-liu/karabiner.ts/network/dependents)**
- **File an issue on [GitHub](https://github.com/evan-liu/karabiner.ts/issues)**

## Prevention Tips

### Best Practices to Avoid Issues

1. **Start simple** - Begin with basic mappings and add complexity gradually
2. **Test frequently** - Build and test after each change
3. **Use version control** - Track configuration changes with git
4. **Comment your code** - Document complex configurations
5. **Backup working configs** - Save known-good configurations

### Configuration Validation

```typescript
// Add validation to catch errors early
import { map, rule, writeToProfile } from 'karabiner.ts'

try {
  writeToProfile('Default', [rule('Test').manipulators([map('a').to('b')])])
  console.log('✅ Configuration built successfully')
} catch (error) {
  console.error('❌ Configuration error:', error)
}
```
