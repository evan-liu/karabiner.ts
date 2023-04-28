import { homedir } from 'node:os'
import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import {
  ComplexModificationsParameters,
  KarabinerConfig,
  Rule,
} from './karabiner/karabiner-config'
import { buildRule, RuleBuilder } from './config/rule'
import { doubleTapParameters } from './config/double-tap'

export const karabinerConfigDir = join(homedir(), '.config/karabiner')
export const karabinerConfigFile = join(karabinerConfigDir, 'karabiner.json')

type Parameters = ComplexModificationsParameters &
  Partial<typeof doubleTapParameters>

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
  parameters: Parameters = {},
) {
  if (parameters['double_tap.delay_milliseconds']) {
    doubleTapParameters['double_tap.delay_milliseconds'] =
      parameters['double_tap.delay_milliseconds']
    delete parameters['double_tap.delay_milliseconds']
  }
  const profileParameters: ComplexModificationsParameters = {
    'basic.to_if_alone_timeout_milliseconds': 1000,
    'basic.to_if_held_down_threshold_milliseconds': 500,
    'basic.to_delayed_action_delay_milliseconds': 500,
    'basic.simultaneous_threshold_milliseconds': 50,
    'mouse_motion_to_scroll.speed': 100,
    ...parameters,
  }

  const config: KarabinerConfig =
    name === '--dry-run'
      ? { profiles: [{ name, complex_modifications: { rules: [] } }] }
      : require(karabinerConfigFile)

  const profile = config?.profiles.find((v) => v.name === name)
  if (!profile)
    exitWithError(`⚠️ Profile ${name} not found in ${karabinerConfigFile}.\n
ℹ️ Please check the profile name in the Karabiner-Elements UI and 
    - Update the profile name at writeToProfile()
    - Create a new profile if needed
 `)

  try {
    profile.complex_modifications.rules = rules.map(buildRule)
  } catch (e) {
    exitWithError(e)
  }
  for (const rule of profile.complex_modifications.rules) {
    if (!rule.manipulators.length) {
      exitWithError(`"manipulators" is empty in "${rule.description}"`)
    }
  }

  profile.complex_modifications.parameters = profileParameters

  const json = JSON.stringify(config, null, 2)

  if (name === '--dry-run') {
    console.info(json)
    return
  }

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
