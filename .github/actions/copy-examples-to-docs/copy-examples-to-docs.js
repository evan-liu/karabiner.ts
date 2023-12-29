import {
  copyFile,
  lstat,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises'
import { join } from 'node:path'

const rootDir = process.cwd()
const examplesDir = join(rootDir, 'examples')
const distDir = join(rootDir, 'dist')
const examplesInDocs = join(rootDir, 'docs/docs/examples')

copyDir(examplesDir).catch((err) => {
  console.error(err)
  process.exit(1)
})

async function copyDir(dirFullPath, dirLevels = []) {
  const items = await readdir(dirFullPath)
  await Promise.all(
    items.map(async (item) => {
      const itemFullPath = join(dirFullPath, item)
      const stats = await lstat(itemFullPath)
      if (stats.isDirectory()) {
        const dirInDocs = join(examplesInDocs, ...dirLevels, item)
        await mkdir(dirInDocs, { recursive: true })
        await copyDir(itemFullPath, dirLevels.concat(item))
      } else if (item.endsWith('.js')) {
        await copyJsToMd(itemFullPath, dirLevels, item)
      } else if (item === '_category_.json') {
        await copyCategoryJson(itemFullPath, dirLevels, item)
      }
    }),
  )
}

async function copyJsToMd(fullPath, dirLevels, name) {
  const srcCode = await readFile(fullPath, 'utf-8')
  const matched = srcCode.match(/^(import[\s\S]*?)from '.*?'\s*([\s\S]*)$/m)
  if (!matched)
    throw new Error(`Cannot parse ${dirLevels.concat(name).join('/')}`)

  const [, imports, jsCode] = matched

  const fileInDist = join(distDir, name)
  await writeFile(fileInDist, `${imports}from './index.js'\n${jsCode}`)

  const { complexModifications } = await import(join(distDir, 'index.js'))
  const jsModule = await import(fileInDist)
  const { rules } = complexModifications(jsModule.rules())
  const config = rules.reduce(
    (r, v) => ({
      description: r.description
        ? `${r.description}; ${v.description}`
        : v.description,
      manipulators: r.manipulators.concat(v.manipulators),
    }),
    { description: '', manipulators: [] },
  )
  const jsonCode = JSON.stringify(config, null, 2)
  const mdCode = `\
---
title: ${rules[0].description}
---

\`\`\`typescript
${jsCode}
\`\`\`

\`\`\`json
${jsonCode}
\`\`\`
`

  const mdFile = join(examplesInDocs, ...dirLevels, name.replace('.js', '.md'))
  await writeFile(mdFile, mdCode)
}

async function copyCategoryJson(fullPath, dirLevels, name) {
  await copyFile(fullPath, join(examplesInDocs, ...dirLevels, name))
}
