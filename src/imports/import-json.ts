import { RuleBuilder } from '../config/rule.ts'
import { Manipulator, Rule } from '../karabiner/karabiner-config.ts'
import { writeContext } from '../output.ts'

/**
 * Imports from a JSON file.
 *
 * @param filePath - The path to the JSON file to import.
 */
export function importJson(filePath: string): RuleBuilder {
  return {
    build(): Rule {
      let json = writeContext.readJson(filePath)
      if (!Array.isArray(json?.rules))
        throw new Error(`Cannot file rules in ${filePath}`)

      return {
        description: `Imported from ${filePath}`,
        manipulators: (json.rules as Rule[]).reduce(
          (r, v) => r.concat(v.manipulators),
          [] as Manipulator[],
        ),
      }
    },
  }
}
