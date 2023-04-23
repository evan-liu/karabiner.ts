import { homedir } from 'node:os'
import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import {
  ComplexModificationsParameters,
  KarabinerConfig,
  Rule,
} from './karabiner/karabiner-config'
import { isRuleBuilder, RuleBuilder } from './config/rule'

export const karabinerConfigDir = join(homedir(), '.config/karabiner')
export const karabinerConfigFile = join(karabinerConfigDir, 'karabiner.json')

/**
 * Write complex_modifications rules to a profile inside ~/.config/karabiner/karabiner.json
 *
 * @param name        The profile name to write the complex_modifications to
 * @param rules       The complex_modifications rules
 * @param parameters  Extra complex_modifications parameters
 *
 * @see https://karabiner-elements.pqrs.org/docs/json/root-data-structure/
 */
export function writeToProfile(
  name: string,
  rules: Array<Rule | RuleBuilder>,
  parameters: ComplexModificationsParameters = {},
) {
  const config = require(karabinerConfigFile) as KarabinerConfig
  const profile = config?.profiles.find((v) => v.name === name)
  if (!profile)
    exitWithError(`⚠️ Profile ${name} not found in ${karabinerConfigFile}.\n
ℹ️ Please check the profile name in the Karabiner-Elements UI and 
    - Update the profile name at writeToProfile()
    - Create a new profile if needed
 `)

  try {
    profile.complex_modifications.rules = rules.map((v) =>
      isRuleBuilder(v) ? v.build() : v,
    )
  } catch (e) {
    exitWithError(e)
  }
  for (const rule of profile.complex_modifications.rules) {
    if (!rule.manipulators.length) {
      exitWithError(`"manipulators" is empty in "${rule.description}"`)
    }
  }

  profile.complex_modifications.parameters = parameters

  const json = JSON.stringify(config, null, 2)
  writeFile(karabinerConfigFile, json).catch(exitWithError)

  console.log(`✓ Profile ${name} updated.`)
}

function exitWithError(err: any): never {
  if (err) {
    if (typeof err === 'string') {
      console.error(err)
    } else {
      console.error((err as Error).message || err)
    }
  }
  process.exit(1)
}
