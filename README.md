# karabiner.ts

[![License](https://img.shields.io/npm/l/karabiner.ts.svg)](LICENSE)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-pofqwered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)
[![Coverage Status](https://coveralls.io/repos/github/evan-liu/karabiner.ts/badge.svg)](https://coveralls.io/github/evan-liu/karabiner.ts)
[![npm](https://img.shields.io/npm/v/karabiner.ts.svg)](https://www.npmjs.com/package/karabiner.ts)
[![deno module](https://shield.deno.dev/x/karabinerts)](https://deno.land/x/karabinerts)

Write [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) configuration in TypeScript.

## Why karabiner.ts

`karabiner.ts` is heavily inspired by [Goku](https://github.com/yqrashawn/GokuRakuJoudo). Compared to the edn format, it allows for:

- Easier-to-understand TypeScript/JavaScript syntax
- Strong-typed abstractions and key aliases with IDE support
- Structured config files instead of one big file

## Learn More

- [📝 Docs](https://evan-liu.github.io/karabiner.ts/)
  - [🛝 Playground](https://evan-liu.github.io/karabiner.ts/playground)
- [Examples](https://github.com/evan-liu/karabiner.ts.examples/blob/main/src/index.ts) 
  - [evan-liu/karabiner-config](https://github.com/evan-liu/karabiner-config/blob/main/src/index.ts)

## Usage with Node.js

(Install [Node.js](https://nodejs.org/en) first if not already installed)

### Option 1

    npx create-karabiner-config@latest

The default directory name is `karabiner-config`. You can pass another `project-name`:

    npx create-karabiner-config@latest [project-name]

Then:

1. Write your key mapping in `src/index.ts`.
2. Set the profile name. Create a new Karabiner-Elements profile if needed.
3. Run `npm run build`.

To update to the latest version, run `npm run update` (or `npm update karabiner.ts`). 

### Option 2

1. [Download](https://github.com/evan-liu/karabiner.ts.examples/archive/refs/heads/main.zip) (or clone | [fork](https://github.com/evan-liu/karabiner.ts.examples/fork)) the [examples/starter repo](https://github.com/evan-liu/karabiner.ts.examples).
2. Run `npm install`.

Then write and build the config same as Option 1.

### Option 3

    npm install karabiner.ts

(or install with `yarn`, `pnpm`, etc) then call `writeToProfile()` from any Node.js script in your preferred way.

## Usage with Deno

In deno script file:

```typescript
import { map, rule, writeToProfile } from 'https://deno.land/x/karabinerts@1.19.0/deno.ts'

writeToProfile('Default', [
  rule('test').manipulators([
    map(...
  ]),
])
```

Then run it with:

    deno run --allow-env --allow-read --allow-write [file_name]
