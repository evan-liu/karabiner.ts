import { KarabinerConfig, Rule } from './karabiner/karabiner-config.ts'
import { RuleBuilder } from './config/rule.ts'
import {
  complexModifications,
  ModificationParameters,
} from './config/complex-modifications.ts'

export const writeContext = {
  karabinerConfigDir() {
    return require('node:path').join(
      require('node:os').homedir(),
      '.config/karabiner',
    )
  },
  karabinerConfigFile() {
    return require('node:path').join(
      this.karabinerConfigDir(),
      'karabiner.json',
    )
  },
  readKarabinerConfig() {
    return require(this.karabinerConfigFile())
  },
  writeKarabinerConfig(json: any) {
    return require('node:fs/promises').writeFile(
      this.karabinerConfigFile(),
      json,
    )
  },
  exit(code = 0): never {
    process.exit(code)
  },
}

/**
 * Write complex_modifications rules to a profile inside ~/.config/karabiner/karabiner.json
 *
 * @param name        The profile name to write the complex_modifications to.
 *                    Use '--dry-run' to print the config json into console.
 * @param rules       The complex_modifications rules
 * @param parameters  Extra complex_modifications parameters
 *
 * @see https://karabiner-elements.pqrs.org/docs/json/root-data-structure/
 */
export function writeToProfile(
  name: '--dry-run' | string,
  rules: Array<Rule | RuleBuilder>,
  parameters: ModificationParameters = {},
) {
  const config: KarabinerConfig =
    name === '--dry-run'
      ? { profiles: [{ name, complex_modifications: { rules: [] } }] }
      : writeContext.readKarabinerConfig()

  const profile = config?.profiles.find((v) => v.name === name)
  if (!profile)
    exitWithError(`⚠️ Profile ${name} not found in ${writeContext.karabinerConfigFile()}.\n
ℹ️ Please check the profile name in the Karabiner-Elements UI and 
    - Update the profile name at writeToProfile()
    - Create a new profile if needed
 `)

  try {
    profile.complex_modifications = complexModifications(rules, parameters)
  } catch (e) {
    exitWithError(e)
  }

  const json = JSON.stringify(config, null, 2)

  if (name === '--dry-run') {
    console.info(json)
    return
  }

  writeContext.writeKarabinerConfig(json).catch(exitWithError)

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
  return writeContext.exit(1)
}
