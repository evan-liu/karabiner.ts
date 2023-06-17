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
  readKarabinerConfig() {
    return JSON.parse(Deno.readTextFileSync(this.karabinerConfigFile()))
  },
  writeKarabinerConfig(json: any) {
    return Deno.writeTextFile(this.karabinerConfigFile(), json)
  },
  exit(code = 0): never {
    Deno.exit(code)
  },
} satisfies typeof writeContext)
