export * from './index.ts'

import { join } from 'https://deno.land/std@0.192.0/path/mod.ts'
import { writeContext } from './output.ts'

Object.assign(writeContext, {
  karabinerConfigDir() {
    return join(Deno.env.get('HOME')!, '.config', 'karabiner')
  },
  karabinerConfigFile() {
    return join(this.karabinerConfigDir(), 'karabiner.json')
  },
  readKarabinerConfig(karabinerJsonPath?: string) {
    return JSON.parse(Deno.readTextFileSync(karabinerJsonPath ?? this.karabinerConfigFile()))
  },
  writeKarabinerConfig(json: any, karabinerJsonPath?: string) {
    return Deno.writeTextFile(karabinerJsonPath ?? this.karabinerConfigFile(), json)
  },
  readJson(filePath: string) {
    return JSON.parse(Deno.readTextFileSync(filePath))
  },
  exit(code = 0): never {
    Deno.exit(code)
  },
} satisfies typeof writeContext)
