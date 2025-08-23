---
title: Troubleshooting
---

# Troubleshooting Guide

## Quick Diagnosis Checklist

- [ ] **Karabiner-Elements running** - Menu bar icon visible
- [ ] **Correct profile selected** - Check Karabiner-Elements → Profiles
- [ ] **Build successful** - No errors when running build command
- [ ] **Permissions granted** - Input Monitoring permission enabled
- [ ] **No syntax errors** - Check generated JSON

## Configuration Not Loading

**Check build errors:**

```bash
npm run build  # Look for error messages
```

**Test with dry run:**

```typescript
writeToProfile('--dry-run', [rule('Test').manipulators([map('a').to('b')])])
```

**Verify profile name matches Karabiner-Elements profile**

**Force reload:** Switch profiles in Karabiner-Elements or restart the app

## Debugging Key Mappings

**Use EventViewer:** Karabiner-Elements → Misc → EventViewer to see key events in real-time

**Check rule conflicts:** Rules apply in order - first match wins

```typescript
rule('First').manipulators([map('a').to('b')]) // This triggers
rule('Second').manipulators([map('a').to('c')]) // This is ignored
```

**Add debug notifications:**

```typescript
map('a').toNotificationMessage('debug', 'Key A pressed').to('b')
```

## Layer Issues

**Common problems:**

- Manipulators outside `.manipulators([...])`
- Variable name conflicts between layers
- Layer key conflicts with other rules

**Debug layer activation:**

```typescript
layer('a', 'nav')
  .configKey((key) => key.toNotificationMessage('nav', 'Layer activated'))
  .manipulators([map('h').to('←')])
```

## Performance Issues

**Optimize for better performance:**

- Combine related mappings into single rules
- Use specific conditions instead of broad ones
- Reduce total number of rules

```typescript
// ❌ Inefficient - many separate rules
rule('A').manipulators([map('a').to('1')])
rule('B').manipulators([map('b').to('2')])

// ✅ Efficient - combined rule
rule('Letters').manipulators([map('a').to('1'), map('b').to('2')])
```

## Getting Help

**Include when asking for help:**

- macOS and Karabiner-Elements versions
- Minimal example reproducing the issue
- Generated JSON from `--dry-run`
- EventViewer output/screenshots

**Resources:**

- **[FAQ](/faq)** - Common questions and solutions
- **[Examples](/examples)** - Working configurations
- **[GitHub Issues](https://github.com/evan-liu/karabiner.ts/issues)** - Report bugs
