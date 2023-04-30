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

<img src="https://user-images.githubusercontent.com/126383/235345208-0f1c695c-5857-41dd-8e68-ad6dbbc2ffb3.png" width="640" alt="screenshot">

See [more examples](https://github.com/evan-liu/karabiner.ts.examples/blob/main/src/index.ts) and [evan-liu/karabiner-config](https://github.com/evan-liu/karabiner-config/blob/main/src/index.ts).

## Usage

(Install [Node.js](https://nodejs.org/en) first if not already installed)

1. [Download](https://github.com/evan-liu/karabiner.ts.examples/archive/refs/heads/main.zip) (or clone | [fork](https://github.com/evan-liu/karabiner.ts.examples/fork)) the [examples/starter repo](https://github.com/evan-liu/karabiner.ts.examples).
2. Run `npm install`.
3. Update to your own [configs](https://github.com/evan-liu/karabiner.ts.examples/blob/main/src/index.ts).
4. Set the profile name. Create a new Karabiner-Elements profile if needed.
5. Run `npm run build`.

Alternatively, you can install the `karabiner.ts` npm package and call `writeToProfile()` in a Node.js script in your preferred way.
