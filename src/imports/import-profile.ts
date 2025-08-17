import { RuleBuilder } from '../config/rule.ts'
import {
  KarabinerConfig,
  Manipulator,
  Rule,
} from '../karabiner/karabiner-config.ts'
import { writeContext } from '../output.ts'

/**
 * Import from karabiner config profile
 *
 * @param name        The profile name in the config JSON
 * @param configFile  The config JSON file path. Default ~/.config/karabiner/karabiner.json
 */
export function importProfile(name: string, configFile?: string): RuleBuilder {
  return {
    build(): Rule {
      let config: KarabinerConfig = writeContext.readKarabinerConfig(configFile)
      let profile = config.profiles.find((v) => v.name == name)
      if (!profile) throw new Error(`Profile ${name} not found`)

      return {
        description: `Imported from profile ${name}`,
        manipulators: profile.complex_modifications.rules.reduce(
          (r, v) => r.concat(v.manipulators),
          [] as Manipulator[],
        ),
      }
    },
  }
}
