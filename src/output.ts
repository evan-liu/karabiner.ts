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
    exitWithError(`Profile ${name} not found in ${karabinerConfigFile}.`)

  profile.complex_modifications.rules = rules.map((v) =>
    isRuleBuilder(v) ? v.build() : v,
  )
  profile.complex_modifications.parameters = parameters

  const json = JSON.stringify(config, null, 2)
  writeFile(karabinerConfigFile, json).catch(exitWithError)

  console.log(`✓ Profile ${name} updated.`)
}

function exitWithError(err: any): never {
  console.error(err)
  process.exit(1)
}
