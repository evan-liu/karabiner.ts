/**
 * Karabiner-Elements style JSON formatter
 *
 * Ported from pqrs::json::pqrs_formatter (C++)
 * https://github.com/pqrs-org/Karabiner-Elements/blob/v15.0.0/src/vendor/cget/cget/pkg/pqrs-org__cpp-json/install/include/pqrs/json/pqrs_formatter.hpp
 *
 * Rules:
 * - Arrays stay on a single line by default; but if size >= 2 and contains arrays or objects, they expand to multiple lines.
 * - Objects with only 1 key and a single-line value stay on a single line (e.g., { "key": "value" }).
 * - Certain arrays can be forced to expand via forceMultiLineArrayKeys.
 */

export interface PqrsFormatterOptions {
  /** Indent size, default is 4 */
  indentSize?: number
  /** Specify object keys where arrays should be forced to display in multiple lines */
  forceMultiLineArrayKeys?: Set<string>
}

const defaultOptions: Required<PqrsFormatterOptions> = {
  indentSize: 4,
  forceMultiLineArrayKeys: new Set(),
}

/**
 * Determines whether a JSON value should be displayed in multiple lines
 */
function isMultiLine(
  value: unknown,
  options: Required<PqrsFormatterOptions>,
  parentKey?: string,
): boolean {
  if (value === null || value === undefined) return false

  if (Array.isArray(value)) {
    // Parent key is in the force multi-line list
    if (parentKey && options.forceMultiLineArrayKeys.has(parentKey)) {
      return true
    }

    if (value.length === 0) return false

    // If there is only 1 element, recursively judge the element
    if (value.length === 1) {
      return isMultiLine(value[0], options)
    }

    // If there are more than 2 elements, if it contains an array or object, it will be multi-line
    for (const item of value) {
      if (typeof item === 'object' && item !== null) {
        return true
      }
    }
    return false
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value as Record<string, unknown>)

    if (keys.length === 0) return false

    // If there is only 1 key, recursively judge its value
    if (keys.length === 1) {
      return isMultiLine(
        (value as Record<string, unknown>)[keys[0]],
        options,
        keys[0],
      )
    }

    // More than 2 keys must be multi-line
    return true
  }

  return false
}

/**
 * Recursively format JSON values
 */
function formatValue(
  value: unknown,
  options: Required<PqrsFormatterOptions>,
  indentLevel: number,
  parentKey?: string,
): string {
  // null
  if (value === null) return 'null'
  // for specific undefined value, return null
  if (value === undefined) return 'null'

  // Primitive types
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  const indent = ' '.repeat(options.indentSize * indentLevel)
  const childIndent = ' '.repeat(options.indentSize * (indentLevel + 1))

  // Array
  if (Array.isArray(value)) {
    if (!isMultiLine(value, options, parentKey)) {
      // Single-line array
      const items = value.map((v) => formatValue(v, options, indentLevel + 1))
      return `[${items.join(', ')}]`
    }

    // Multi-line array
    const items = value.map(
      // for undefined value in array, return formatValue(undefined, options, indentLevel + 1),
      (v) => `${childIndent}${formatValue(v, options, indentLevel + 1)}`,
    )
    return `[\n${items.join(',\n')}\n${indent}]`
  }

  // Object
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      // for undefined value in object, skip it
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))

    if (entries.length === 0) return '{}'

    if (!isMultiLine(value, options, parentKey)) {
      // Single-line object (only 1 key and the value is single-line)
      const [k, v] = entries[0]
      return `{ ${JSON.stringify(k)}: ${formatValue(v, options, indentLevel + 1, k)} }`
    }

    // Multi-line object
    const lines = entries.map(([k, v]) => {
      const formattedValue = formatValue(v, options, indentLevel + 1, k)
      return `${childIndent}${JSON.stringify(k)}: ${formattedValue}`
    })
    return `{\n${lines.join(',\n')}\n${indent}}`
  }

  return String(value)
}

/**
 * Formats a JSON value into a compact Karabiner-Elements style JSON string
 *
 * @example
 * ```ts
 * const json = { from: { key_code: "a" }, to: [{ key_code: "b" }] }
 * console.log(pqrsFormat(json))
 * // {
 * //     "from": { "key_code": "a" },
 * //     "to": [{ "key_code": "b" }]
 * // }
 * ```
 */
export function pqrsFormat(
  json: unknown,
  options?: PqrsFormatterOptions,
): string {
  const resolved: Required<PqrsFormatterOptions> = {
    indentSize: options?.indentSize ?? defaultOptions.indentSize,
    forceMultiLineArrayKeys:
      options?.forceMultiLineArrayKeys ??
      defaultOptions.forceMultiLineArrayKeys,
  }
  return formatValue(json, resolved, 0)
}
