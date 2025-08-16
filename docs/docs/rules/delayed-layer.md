---
title: layer().delay() 
---

# Delayed Layer

`layer()` (or `hyperLayer()` / `modifierLayer()` / `duoLayer()`) has a 
"delay mode", which prevents accidental layer activation during fast typing. 
When keys are pressed and released quickly, it outputs the original keys. 
When held down, it activates the layer after a short delay.

```typescript
duoLayer('j', 'k')
  .delay()
  .notification() // Notification is recommended with delay mode
  .manipulators({
    h: toKey('left_arrow'),
    l: toKey('right_arrow'),
  })
```

## Custom Delay

To set a custom delay timing, pass the number of milliseconds:

```typescript
duoLayer('f', 'd')
  .delay(150) // 150ms delay instead of default 200ms
```

## Global Settings

The default delay can be set at `writeToProfile()` for all duoLayers in the profile:

```typescript
writeToProfile(
  'MyProfile', // profile name 
  [], // rules
  { 'duo_layer.delay_milliseconds': 150 }, // parameters 
)
```

To enable delay mode by default for all duoLayers:

```typescript
writeToProfile(
  'MyProfile', 
  [], 
  { 'duo_layer.delay_by_default': true },
)
```
