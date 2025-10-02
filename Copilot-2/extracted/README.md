# Code Extraction Analysis

## Purpose
Extract and analyze the implementation of:
1. Hover overlay positioning relative to screenshot HTML
2. Dash border rendering around selected text frames

## Problem Identified
- **Issue 1**: Hover overlay is not at the same DOM level as screenshot HTML
  - This typically causes z-index and positioning conflicts
  - The overlay should be a sibling element, not a child

- **Issue 2**: Need to understand dash border implementation
  - How borders are drawn around selected text parent frames
  - CSS properties and DOM structure used

## Extraction Guidelines
- Only document actual implementation patterns observed
- No invented or hypothetical code
- Focus on DOM structure and CSS properties
- Document the problem and solution approach

## Files in this extraction
- `dom-structure-analysis.md` - Analysis of DOM hierarchy issues
- `css-border-analysis.md` - Analysis of border styling implementation
