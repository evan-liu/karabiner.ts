# karabiner.ts

[![License](https://img.shields.io/npm/l/karabiner.ts.svg)](LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/evan-liu/karabiner.ts/badge.svg)](https://coveralls.io/github/evan-liu/karabiner.ts)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)
[![npm](https://img.shields.io/npm/v/karabiner.ts.svg)](https://www.npmjs.com/package/karabiner.ts)
[![deno module](https://shield.deno.dev/x/karabinerts)](https://deno.land/x/karabinerts)

Write [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) configuration in TypeScript.

## Why karabiner.ts

`karabiner.ts` is heavily inspired by [Goku](https://github.com/yqrashawn/GokuRakuJoudo). Compared to the edn format, it allows for:

- Easier-to-understand TypeScript/JavaScript syntax
- Strong-typed abstractions and key aliases with IDE support
- Structured config files instead of one big file

And more features (abstractions)
([hyperLayer](https://evan-liu.github.io/karabiner.ts/rules/hyper-layer),
[duoLayer](https://evan-liu.github.io/karabiner.ts/rules/duo-layer),
[leaderMode](https://evan-liu.github.io/karabiner.ts/rules/leader-mode), ...).

## Learn More

- [📝 Docs](https://karabiner.ts.evanliu.dev)
- [🔧 My Config](https://github.com/evan-liu/karabiner-config/blob/main/karabiner-config.ts)
- [💡 In-the-wild usage](https://github.com/evan-liu/karabiner.ts/network/dependents)

## Using the Online Editor

1. Write config in the [online editor](https://stackblitz.com/github/evan-liu/karabiner.ts/tree/main/editor?embed=1&file=rules.js&hideExplorer=1&hideNavigation=1&terminalHeight=20&title=karabiner.ts%20editor).
   (Optional: 
   [fork the editor](https://stackblitz.com/fork/github/evan-liu/karabiner.ts/tree/main/editor?file=rules.js)
   to save the config for later editing)
2. Copy the generated JSON then [add to Karabiner-Elements](https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/#create-your-own-rules).

> [!NOTE]
> Importing JSON to Karabiner-Elements is only needed when using the Online Editor.
`karabiner.ts` writes to `~/.config/karabiner/karabiner.json` if using with Node.js or Deno.
>
> > Karabiner-Elements watches ~/.config/karabiner/karabiner.json and reloads it if updated.

## Using Node.js

[![npm](https://img.shields.io/npm/v/karabiner.ts.svg)](https://www.npmjs.com/package/karabiner.ts)

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

## Using Deno

[![deno module](https://shield.deno.dev/x/karabinerts)](https://deno.land/x/karabinerts)

In a Deno script file (replace `{version}`):

```typescript
import { rule, writeToProfile } from 'https://deno.land/x/karabinerts@{version}/deno.ts'

writeToProfile('Default', [
  // rule(...
])
```

Then run it with:

    deno run --allow-env --allow-read --allow-write {filename}
