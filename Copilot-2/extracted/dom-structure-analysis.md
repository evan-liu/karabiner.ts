# DOM Structure Analysis

## Current Problem
The hover overlay is not at the same DOM level as the screenshot HTML.

## Typical DOM Structure Issues

### Problematic Structure (Current)
```
<container>
  <screenshot-element>
    <hover-overlay />  <!-- WRONG: nested inside -->
  </screenshot-element>
</container>
```

**Issues with this approach:**
- Z-index conflicts
- Overlay inherits positioning context from screenshot element
- Difficult to position overlay relative to viewport
- May be clipped by parent's overflow property

### Correct Structure (Target)
```
<container style="position: relative;">
  <screenshot-element />
  <hover-overlay />  <!-- CORRECT: sibling element -->
</container>
```

**Benefits of this approach:**
- Both elements share the same positioning context
- Easier z-index management
- Overlay can be positioned independently
- No clipping issues

## Key CSS Properties

### Container
- `position: relative` - establishes positioning context for children
- `overflow: visible` - ensures overlay isn't clipped

### Screenshot Element
- `position: relative` or `absolute`
- `z-index: 1` - base layer

### Hover Overlay
- `position: absolute` - positioned relative to container
- `top: 0; left: 0; right: 0; bottom: 0` - fills container
- `z-index: 2` - above screenshot
- `pointer-events: none` - allows interaction with elements below (if needed)

## Implementation Notes
- The overlay should be created as a sibling, not a child
- Use the same positioning context (shared parent with `position: relative`)
- Manage z-index at the sibling level, not through parent/child nesting
