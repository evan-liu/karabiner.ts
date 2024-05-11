---
title: layer().leaderMode()
---

# Leader Mode

`layer()` (or `hyperLayer()` / `modifierLayer()` / `duoLayer()`) has a "leader mode", which works 
similar to Vim leader keys: The layer stays activated even after the layer key is 
released, until one of the action or escape keys is pressed.

```typescript
hyperLayer('o')
  .description('Open App')
  .leaderMode()
  .notification() // Notification is highly recommanded when use leader mode
  .manipulators({
    f: toApp('Finder'),
  })
```

## Sticky

To keep the layer activated after the first action, and only deactivate the layer
when one of the escape keys is pressed, set the `sticky` option.


```typescript
hyperLayer('o')
  .leaderMode({ sticky: true }) 
```

## Escape

By default `escape` and `caps_lock` keys are used to deactivate the leader mode layer.
To use other keys, set the `escape` option.

```typescript
hyperLayer('o')
  .leaderMode({ escape: ['spacebar', 'return_or_enter'] }) 
```
