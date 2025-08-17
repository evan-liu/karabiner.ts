import {
  complexModifications,
  ModificationParameters,
} from './config/complex-modifications.ts'
import { RuleBuilder } from './config/rule.ts'
import { KarabinerConfig, Rule } from './karabiner/karabiner-config.ts'

export let writeContext = {
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
  readKarabinerConfig(karabinerJsonPath?: string) {
    return require(karabinerJsonPath ?? this.karabinerConfigFile())
  },
  writeKarabinerConfig(json: any, karabinerJsonPath?: string) {
    return require('node:fs/promises').writeFile(
      karabinerJsonPath ?? this.karabinerConfigFile(),
      json,
    )
  },
  readJson(filePath: string) {
    return require(filePath)
  },
  exit(code = 0): never {
    process.exit(code)
  },
}

export interface WriteTarget {
  name: string
  dryRun?: boolean
  karabinerJsonPath?: string
}

/**
 * Write complex_modifications rules to a profile inside ~/.config/karabiner/karabiner.json
 *
 * @param writeTarget The profile name or a WriteTarget describing the profile and where to write the output.
 *                    Use '--dry-run' to print the config json into console.
 * @param rules       The complex_modifications rules
 * @param parameters  Extra complex_modifications parameters
 *
 * @see https://karabiner-elements.pqrs.org/docs/json/root-data-structure/
 */
export function writeToProfile(
  writeTarget: '--dry-run' | string | WriteTarget,
  rules: Array<Rule | RuleBuilder>,
  parameters: ModificationParameters = {},
) {
  if (typeof writeTarget == 'string') {
    writeTarget = { name: writeTarget, dryRun: writeTarget == '--dry-run' }
  }
  let { name, dryRun } = writeTarget
  let jsonPath =
    writeTarget.karabinerJsonPath ?? writeContext.karabinerConfigFile()

  let config: KarabinerConfig = dryRun
    ? { profiles: [{ name, complex_modifications: { rules: [] } }] }
    : writeContext.readKarabinerConfig(jsonPath)

  let profile = config?.profiles.find((v) => v.name == name)
  if (!profile)
    exitWithError(`⚠️ Profile ${name} not found in ${jsonPath}.\n
ℹ️ Please check the profile name in the Karabiner-Elements UI and 
    - Update the profile name at writeToProfile()
    - Create a new profile if needed
 `)

  try {
    profile.complex_modifications = complexModifications(rules, parameters)
  } catch (e) {
    exitWithError(e)
  }

  let json = JSON.stringify(config, null, 2)

  if (dryRun) {
    console.info(json)
    return
  }

  writeContext.writeKarabinerConfig(json, jsonPath).catch(exitWithError)

  console.log(`✓ Profile ${name} updated.`)
}

function exitWithError(err: any): never {
  if (err) {
    if (typeof err == 'string') {
      console.error(err)
    } else {
      console.error((err as Error).message || err)
    }
  }
  return writeContext.exit(1)
}

/** Write global settings of ~/.config/karabiner/karabiner.json */
export function writeToGlobal(
  global: KarabinerConfig['global'],
  karabinerJsonPath?: string,
) {
  let jsonPath = karabinerJsonPath ?? writeContext.karabinerConfigFile()
  let config: KarabinerConfig = writeContext.readKarabinerConfig(jsonPath)
  config.global = { ...config.global, ...global }
  let json = JSON.stringify(config, null, 2)

  writeContext.writeKarabinerConfig(json, jsonPath).catch(exitWithError)

  console.log(`✓ global updated.`)
}
