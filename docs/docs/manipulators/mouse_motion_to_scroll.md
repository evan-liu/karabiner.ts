# type: mouse_motion_to_scroll

Most manipulators have type `basic`. Another manipulator type in Karabiner-Elements is 
[mouse_motion_to_scroll](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/other-types/mouse-motion-to-scroll/).

```typescript
type MouseMotionToScrollManipulator = {
  type: 'mouse_motion_to_scroll'
  from?: { modifiers: FromModifiers }
  conditions?: BasicManipulator['conditions']
  options?: {
    momentum_scroll_enabled?: boolean
    speed_multiplier?: number
  }
}
```

It can be created with `mouseMotionToScroll()`. 

```typescript
mouseMotionToScroll()
  .modifiers('⌘')
  .condition(ifVar('test'))
  .options({ speed_multiplier: 2 })
```

<details>
<summary>Generated JSON</summary>

```json
{
  "type": "mouse_motion_to_scroll",
  "from": {
    "modifiers": { "mandatory": ["command"] }
  },
  "conditions": [
    {"type": "variable_if", "name": "test", "value": 1}
  ],
  "options": { "speed_multiplier": 2 }
}
```

</details>

