import {
  complexModifications,
  ModificationParameters,
} from './config/complex-modifications.ts'
import { RuleBuilder } from './config/rule.ts'
import { KarabinerConfig, Rule } from './karabiner/karabiner-config.ts'

// Constants for better maintainability
const KARABINER_CONFIG_DIR = '.config/karabiner'
const KARABINER_CONFIG_FILE = 'karabiner.json'
const JSON_INDENT = 2

const ERROR_MESSAGES = {
  PROFILE_NOT_FOUND: (name: string, jsonPath: string) => 
    `⚠️ Profile ${name} not found in ${jsonPath}.\n\nℹ️ Please check the profile name in the Karabiner-Elements UI and \n    - Update the profile name at writeToProfile()\n    - Create a new profile if needed`,
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const

export let writeContext = {
  karabinerConfigDir() {
    return require('node:path').join(
      require('node:os').homedir(),
      KARABINER_CONFIG_DIR,
    )
  },
  karabinerConfigFile() {
    return require('node:path').join(
      this.karabinerConfigDir(),
      KARABINER_CONFIG_FILE,
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
  if (!profile) {
    exitWithError(ERROR_MESSAGES.PROFILE_NOT_FOUND(name, jsonPath))
  }

  try {
    profile.complex_modifications = complexModifications(rules, parameters)
  } catch (e) {
    exitWithError(e)
  }

  let json = JSON.stringify(config, null, JSON_INDENT)

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
      console.error(`❌ Error: ${err}`)
    } else if (err instanceof Error) {
      console.error(`❌ Error: ${err.message}`)
      if (err.stack) {
        console.error(err.stack)
      }
    } else {
      console.error(`❌ Unknown error:`, err)
    }
  } else {
    console.error(`❌ ${ERROR_MESSAGES.UNKNOWN_ERROR}`)
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
  let json = JSON.stringify(config, null, JSON_INDENT)

  writeContext.writeKarabinerConfig(json, jsonPath).catch(exitWithError)

  console.log(`✓ global updated.`)
}
