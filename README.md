# karabiner.ts

[![License](https://img.shields.io/npm/l/karabiner.ts.svg)](LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/evan-liu/karabiner.ts/badge.svg)](https://coveralls.io/github/evan-liu/karabiner.ts)
[![npm](https://img.shields.io/npm/v/karabiner.ts.svg)](https://www.npmjs.com/package/karabiner.ts)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

Write [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) configuration in TypeScript.

## Why karabiner.ts

`karabiner.ts` is heavily inspired by [Goku](https://github.com/yqrashawn/GokuRakuJoudo). Compared to the edn format, it allows for:

- Easier-to-understand TypeScript/JavaScript syntax
- Strong-typed abstractions and key aliases with IDE support
- Structured config files instead of one big file

<img src="https://user-images.githubusercontent.com/126383/235345521-89bd50a9-2e2e-416b-8a07-93e5d9ac6f70.png" width="640" alt="screenshot">

## Learn More

- [Docs](https://evan-liu.github.io/karabiner.ts/)
- [Examples](https://github.com/evan-liu/karabiner.ts.examples/blob/main/src/index.ts) 
- [evan-liu/karabiner-config](https://github.com/evan-liu/karabiner-config/blob/main/src/index.ts)

## Usage

(Install [Node.js](https://nodejs.org/en) first if not already installed)

    npx create-karabiner-config@latest

The default directory name is `karabiner-config`. You can pass another `project-name`:

    npx create-karabiner-config@latest [project-name]

Then:

1. Write your key mapping in `src/index.ts`.
2. Set the profile name. Create a new Karabiner-Elements profile if needed.
3. Run `npm run build`.

Alternatively, you can install the `karabiner.ts` npm package and call 
`writeToProfile()` from a Node.js script in your preferred way.
