# Copilot Instructions for karabiner.ts

## Repository Overview

**karabiner.ts** is a TypeScript/JavaScript library that allows users to write [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) configuration using modern syntax instead of JSON. It provides strongly-typed abstractions and IDE support for creating complex keyboard remapping rules.

### Repository Details

- **Type**: TypeScript library package distributed via npm and Deno
- **Size**: ~50 source files, medium-sized codebase
- **Languages**: TypeScript (primary), JavaScript (documentation examples)
- **Frameworks**: Vite (build), Vitest (testing), Docusaurus (documentation)
- **Target Runtimes**: Node.js 18+, Deno, Browser (online editor)
- **Package Manager**: npm (main), also supports yarn/pnpm

## Build and Validation Commands

### Prerequisites

- Node.js 18+ is required
- Always run `npm install` before any build commands
- The repository supports multiple package managers but uses npm by default

### Core Commands (run in repository root)

#### Bootstrap and Dependencies

```bash
npm install
# Note: Removes package-lock.json in CI/CD workflows for dependency updates
```

#### Build

```bash
npm run build
# Uses Vite to build TypeScript library
# Outputs to dist/ directory (UMD and ESM formats)
# Includes TypeScript declaration files
# Build time: ~3-5 seconds
# Note: Deno-specific files (src/deno.ts) cause TypeScript errors but build succeeds
```

#### Test

```bash
npm run test        # Run all tests
npm run test:coverage  # Run tests with coverage report
# Uses Vitest test runner
# Test time: ~2-3 seconds
# 18 test files, 121+ tests
# Coverage reports go to coverage/ directory
```

#### Formatting

```bash
npx prettier --check .    # Check formatting
npx prettier --write .    # Fix formatting issues
# Note: Some files in docs/ and examples/ directories commonly have formatting issues
# Uses prettier with custom configuration (prettier.config.cjs)
```

#### Documentation (run in docs/ directory)

```bash
cd docs
npm install  # Required first time and after dependency changes
npm run build:editor-worker  # Build Monaco editor worker
# Copy examples to docs (normally done by build pipeline)
node ../.github/actions/copy-examples-to-docs/copy-examples-to-docs.js
npm run build               # Build documentation site
npm run start              # Development server
```

### Common Build Issues and Workarounds

1. **Deno TypeScript Errors**: Build shows TypeScript errors for `src/deno.ts` but completes successfully. This is expected behavior.

2. **Prettier Formatting**: Documentation and example files often fail formatting checks. Run `npx prettier --write .` before committing.

3. **Documentation Dependencies**: The docs build requires installing dependencies in both root and docs/ directories.

4. **Package Lock Issues**: CI workflows remove `package-lock.json` for fresh dependency resolution. Only commit `package-lock.json` when making actual dependency changes in `package.json`.

5. **Documentation Examples**: Before building docs locally, run `node ../.github/actions/copy-examples-to-docs/copy-examples-to-docs.js` to copy examples to the docs directory (this is normally done by the build pipeline).

## Project Architecture and Layout

### Core Library Structure

```
src/
├── index.ts                 # Main entry point, exports all public APIs
├── output.ts               # writeToProfile(), writeToGlobal() functions
├── deno.ts                 # Deno-specific runtime implementations (causes TS errors)
├── config/                 # Core configuration abstractions
│   ├── rule.ts            # Rule builders and manipulation
│   ├── manipulator.ts     # Key mapping manipulator logic
│   ├── layer.ts           # Layer abstractions (hyperLayer, duoLayer, etc.)
│   ├── from.ts, to.ts     # Input/output key mapping definitions
│   └── complex-modifications.ts  # Main configuration assembly
├── karabiner/             # Karabiner-Elements type definitions
│   ├── karabiner-config.ts  # Core Karabiner configuration types
│   └── key-code.ts        # Key code enumerations
├── utils/                 # Utility functions and helpers
└── imports/               # Import functions for existing configurations
```

### Configuration Files

- `package.json` - Main package configuration, build scripts
- `tsconfig.json` - TypeScript compiler configuration
- `vite.config.ts` - Build configuration (Vite + vitest)
- `prettier.config.cjs` - Code formatting rules
- `.gitignore` - Standard Node.js gitignore with dist/, coverage/

### Documentation

```
docs/
├── package.json           # Documentation dependencies
├── docusaurus.config.js   # Docusaurus configuration
├── docs/                  # Markdown documentation files
├── src/editor/           # Online editor implementation
└── static/               # Static assets
```

### Examples

```
examples/
├── modifier-keys/        # Modifier key examples
├── os-functionality/     # OS integration examples
├── text-input/          # Text input examples
└── vim/                 # Vim-style key bindings
```

### GitHub Workflows

Located in `.github/workflows/`:

- `pr-test.yml` - Runs build + test on PRs (affects src/ changes)
- `build-publish.yml` - Builds, tests, publishes to npm (on main branch)
- `docs-publish.yml` - Builds and deploys documentation (on docs/ changes)

### Key Dependencies

- **Production**: None (library outputs pure configuration objects)
- **Development**: Vite, Vitest, TypeScript, Prettier, API Extractor
- **Documentation**: Docusaurus, Monaco Editor, ESBuild (for online editor)

### Validation Steps

1. **Always run tests after code changes**: `npm run test`
2. **Check formatting**: `npx prettier --check .`
3. **Verify build succeeds**: `npm run build`
4. **For documentation changes**: Test docs build in `docs/` directory
5. **Example validation**: Test example files can be imported and executed

### File Organization Notes

- Main library exports are in `src/index.ts`
- Each major feature has its own file in `src/config/`
- Test files are co-located with source files (`.test.ts`)
- TypeScript declaration files auto-generated during build
- Examples serve as both documentation and integration tests

### Build Artifacts

- `dist/` - Built library (gitignored)
- `coverage/` - Test coverage reports (gitignored)
- `docs/build/` - Built documentation site (gitignored)
- `node_modules/` - Dependencies (gitignored)

## Agent Instructions

**Trust these instructions**: Only search for additional information if the instructions above are incomplete or found to be incorrect. The commands and file locations documented here have been validated and should be used as the primary reference for working with this codebase.

**Common Tasks**:

- For library changes: Modify files in `src/`, run `npm run test` and `npm run build`
- For documentation: Work in `docs/docs/`, build with `cd docs && npm run build`
- For examples: Add to appropriate subdirectory in `examples/`
- Always check formatting with prettier before committing changes

## Coding Style and Conventions

### Core Principle: Be Precise, yet Concise

- **Apply to all aspects**: This principle governs code, tests, documentation, commit messages, PR titles, and all project contributions
- **Precision**: Changes should be targeted and exact, addressing the specific need without unnecessary modifications
- **Conciseness**: Avoid verbosity while maintaining clarity - prefer clear, direct solutions over elaborate ones
- **Examples**: 
  - Code: Use descriptive but brief variable names, minimal function signatures
  - Tests: Focus on specific behaviors, avoid redundant test cases
  - Documentation: Clear explanations without unnecessary detail
  - Commits: Descriptive but concise messages with appropriate Gitmoji
  - PRs: Clear titles and focused changes

### Variable Declarations

- **Prefer `let` over `const`** for variable declarations, even for values that won't be reassigned
- This maintains consistency with the existing codebase style

### Equality Comparisons

- **Prefer `==` over `===`** for equality comparisons
- The codebase uses loose equality checks consistently

### Commit and PR Conventions

- **Use Gitmoji** for commit messages and PR titles (e.g., ♻️ for refactoring, ✨ for new features)
- Follow the existing Gitmoji patterns seen in commit history

### Dependency Management

- **Only commit `package-lock.json`** when making actual dependency changes in `package.json`
- CI workflows remove package-lock.json for fresh dependency resolution in most cases
