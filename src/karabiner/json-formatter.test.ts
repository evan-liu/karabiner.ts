import { describe, expect, test } from 'vitest';



import { pqrsFormat } from './json-formatter';


describe('pqrsFormat', () => {
  // --- Primitives ---

  test('formats string', () => {
    expect(pqrsFormat('hello')).toBe('"hello"')
  })

  test('formats number', () => {
    expect(pqrsFormat(42)).toBe('42')
  })

  test('formats boolean', () => {
    expect(pqrsFormat(true)).toBe('true')
  })

  test('formats null', () => {
    expect(pqrsFormat(null)).toBe('null')
  })

  test('formats bigint (falls back to String() for unhandled types)', () => {
    expect(pqrsFormat(1n)).toBe('1')
  })

  // --- isMultiLine branches ---

  test('formats empty object (isMultiLine: empty keys)', () => {
    expect(pqrsFormat({})).toBe('{}')
  })

  test('single-key object with empty object value (isMultiLine: keys.length === 0)', () => {
    expect(pqrsFormat({ x: {} })).toBe('{ "x": {} }')
  })

  test('formats multi-element primitive array on single line (isMultiLine: all-primitives loop)', () => {
    expect(pqrsFormat([1, 2, 3])).toBe('[1, 2, 3]')
  })

  test('formats single-element object with primitive on single line', () => {
    expect(pqrsFormat({ key: 'value' })).toBe('{ "key": "value" }')
  })

  test('formats multi-key object as multi-line (isMultiLine: >1 key)', () => {
    const result = pqrsFormat({ a: 1, b: 2 })
    expect(result).toContain('\n')
    expect(result).toContain('"a": 1')
    expect(result).toContain('"b": 2')
  })

  // --- forceMultiLineArrayKeys (isMultiLine: parentKey match) ---

  test('forceMultiLineArrayKeys expands matching array', () => {
    const result = pqrsFormat(
      { to: ['a', 'b'] },
      { forceMultiLineArrayKeys: new Set(['to']) },
    )
    expect(result).toContain('\n')
    expect(result).toContain('"to"')
  })

  test('forceMultiLineArrayKeys does not affect non-matching key', () => {
    const result = pqrsFormat(
      { from: ['a', 'b'] },
      { forceMultiLineArrayKeys: new Set(['to']) },
    )
    expect(result).not.toContain('\n')
  })

  // --- null / undefined handling ---

  test('formats null in object', () => {
    const result = pqrsFormat({ a: null })
    expect(result).toBe('{ "a": null }')
  })

  test('skips undefined values in object', () => {
    const result = pqrsFormat({ a: 'keep', b: undefined, c: 3 })
    expect(result).toContain('"a": "keep"')
    expect(result).toContain('"c": 3')
    expect(result).not.toContain('"b"')
  })

  test('formats object with all undefined values as empty', () => {
    expect(pqrsFormat({ a: undefined, b: undefined })).toBe('{}')
  })

  test('filters undefined from array', () => {
    expect(pqrsFormat([1, undefined, 3])).toBe('[1, null, 3]')
  })

  test('formats array with all undefined as empty', () => {
    expect(pqrsFormat([undefined, undefined])).toBe('[null, null]')
  })

  test('skips undefined in nested structure', () => {
    const result = pqrsFormat({
      items: [undefined, { x: 1, y: undefined }],
    })
    expect(result).toContain('"x": 1')
    expect(result).not.toContain('"y"')
  })

  // --- Empty arrays ---

  test('formats empty array', () => {
    expect(pqrsFormat([])).toBe('[]')
  })

  // --- Multi-line arrays with objects ---

  test('formats array with 2+ objects as multi-line', () => {
    const result = pqrsFormat([{ a: 1 }, { b: 2 }])
    expect(result).toContain('\n')
  })

  // --- Multi-line objects ---

  test('sorts object keys alphabetically in multi-line', () => {
    const result = pqrsFormat({ z: 1, a: 2, m: 3 })
    const aIdx = result.indexOf('"a"')
    const mIdx = result.indexOf('"m"')
    const zIdx = result.indexOf('"z"')
    expect(aIdx).toBeLessThan(mIdx)
    expect(mIdx).toBeLessThan(zIdx)
  })

  // --- Custom indentSize ---

  test('respects custom indentSize', () => {
    const result = pqrsFormat({ a: 1, b: 2 }, { indentSize: 2 })
    expect(result).toContain('  "a": 1')
    expect(result).toContain('  "b": 2')
    expect(result).not.toContain('    "a"')
  })

  // --- String escaping ---

  test('escapes special characters in strings', () => {
    expect(pqrsFormat('he said "hi"')).toBe('"he said \\"hi\\""')
  })

  // --- Single-element arrays ---

  test('single-element primitive array stays single-line', () => {
    expect(pqrsFormat([42])).toBe('[42]')
  })

  test('single-element single-key object array stays single-line', () => {
    const result = pqrsFormat([{ key: 'val' }])
    expect(result).toBe('[{ "key": "val" }]')
  })

  test('single-element multi-key object array expands to multi-line', () => {
    const result = pqrsFormat([{ a: 1, b: 2 }])
    expect(result).toContain('\n')
  })

  // --- Single-key object with nested ---

  test('single-key object with multi-value object stays single-line through recursion', () => {
    // { a: "v" } → single line
    expect(pqrsFormat({ a: 'v' })).toBe('{ "a": "v" }')
  })

  test('single-key object with multi-key value expands', () => {
    const result = pqrsFormat({ wrapper: { x: 1, y: 2 } })
    expect(result).toContain('\n')
  })

  // --- Complex Karabiner-like config ---

  test('formats typical Karabiner config', () => {
    const result = pqrsFormat({
      from: { key_code: 'a' },
      to: [{ key_code: 'b' }],
    })
    expect(result).toContain('"from": { "key_code": "a" }')
    expect(result).toContain('"to"')
    expect(result).toContain('"key_code": "b"')
  })
})
