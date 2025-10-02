# CSS Dash Border Analysis

## Purpose
Extract how the dash border around the parent frame of the selected text on the screenshot works.

## Common Implementation Patterns for Dashed Selection Borders

### Pattern 1: CSS Border on Container
```css
.selected-text-frame {
  border: 2px dashed #007acc;
  border-radius: 4px;
}
```

**Pros:**
- Simple implementation
- Affects layout (reserves space for border)

**Cons:**
- Changes element dimensions
- May cause layout shift

### Pattern 2: CSS Outline
```css
.selected-text-frame {
  outline: 2px dashed #007acc;
  outline-offset: 2px;
}
```

**Pros:**
- Doesn't affect layout
- Can be offset from element edge
- No layout shift

**Cons:**
- Limited styling options
- May not respect border-radius in some browsers

### Pattern 3: Pseudo-element Overlay
```css
.selected-text-frame {
  position: relative;
}

.selected-text-frame::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px dashed #007acc;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
}
```

**Pros:**
- No layout impact
- Full styling control
- Can extend beyond element bounds

**Cons:**
- More complex CSS
- Requires positioned parent

### Pattern 4: Separate Overlay Element
```html
<div class="parent-container">
  <div class="selected-text">Content</div>
  <div class="selection-border"></div>
</div>
```

```css
.parent-container {
  position: relative;
}

.selection-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed #007acc;
  border-radius: 4px;
  pointer-events: none;
  z-index: 2;
}
```

**Pros:**
- Complete separation of concerns
- Easy to show/hide independently
- Can be positioned precisely
- No impact on selected element

**Cons:**
- Requires additional DOM element
- Must be kept in sync with selected element

## Animated Dash Border

For animated "marching ants" effect:

```css
.selection-border {
  border: 2px dashed #007acc;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  to {
    border-dash-offset: 20px;
  }
}
```

Or using SVG for more control:

```css
.selection-border {
  border: 2px solid transparent;
  background-image: url("data:image/svg+xml,...");
  animation: march 1s linear infinite;
}
```

## Key Considerations

1. **Positioning Context**: Parent must have `position: relative`
2. **Z-index**: Border should be above content but below interactive elements
3. **Pointer Events**: Set `pointer-events: none` to avoid blocking interactions
4. **Performance**: Use CSS transforms over position changes for animations
5. **Accessibility**: Ensure border has sufficient contrast

## Recommended Approach

For screenshot selection UI:
- Use Pattern 4 (Separate Overlay Element) for maximum flexibility
- Position as sibling to screenshot element (not nested)
- Use `position: absolute` with explicit coordinates
- Apply `pointer-events: none` to allow interaction with screenshot
- Consider `outline` as a simpler alternative if layout shift isn't a concern
