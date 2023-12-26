---
title: Imports
---

Config created by other tools, or those imported from
[shared rules](https://ke-complex-modifications.pqrs.org), can be imported into
`karabiner.ts` instead of being rewritten.

## importJson() {#import-json}

Rules imported from [shared rules](https://ke-complex-modifications.pqrs.org)
are stored in directory `~/.config/karabiner/assets/complex_modifications/`.
They can also be stored within the `karabiner.ts` project directory and
imported using `__dirname`:

```typescript
import { homedir } from 'node:os'
import { resolve } from 'node:path'

writeToProfile('Default', [
  // ... karabiner.ts rules

  // Imported shared rules
  importJson(
    resolve(
      homedir(),
      '.config/karabiner/assets/complex_modifications/1703535155.json',
    ),
  ),

  // Local JSON file
  importJson(resolve(__dirname, './my-rules.json')),
])
```

## importProfile() {#import-profile}

Rules created using other tools can be imported from a different profile, and new rules
can be added prior to the `importProfile()` call.

```typescript
writeToProfile('karabiner.ts', [
  // ... karabiner.ts rules

  // Import from another profile
  importProfile('ByAnotherTool'),
])
```
