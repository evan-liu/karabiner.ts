import { lstatSync } from 'node:fs'
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
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

  const toCopy = { code: {}, files: [], dirs: [] }
  items.forEach((item) => {
    const itemFullPath = join(dirFullPath, item)
    if (lstatSync(itemFullPath).isDirectory()) {
      return toCopy.dirs.push(item)
    }

    const codeMatched = item.match(/^(.*)\.(md|js)$/)
    if (!codeMatched) {
      return toCopy.files.push(item)
    }
    const [, name, format] = codeMatched
    ;(toCopy.code[name] ||= []).push(format)
  })

  await Promise.all([
    ...toCopy.dirs.map(async (item) => {
      const dirInDocs = join(examplesInDocs, ...dirLevels, item)
      await mkdir(dirInDocs, { recursive: true })
      await copyDir(join(dirFullPath, item), dirLevels.concat(item))
    }),
    ...toCopy.files.map((item) =>
      copyFile(
        join(dirFullPath, item),
        join(examplesInDocs, ...dirLevels, item),
      ),
    ),
    ...Object.entries(toCopy.code).map(([name, formats]) =>
      copyCode(name, formats, dirFullPath, dirLevels),
    ),
  ])
}

async function copyCode(name, formats, dirFullPath, dirLevels) {
  const { jsCode, jsonCode, rules } = formats.includes('js')
    ? await readJsCode(name, dirFullPath, dirLevels)
    : {}

  let mdCode = formats.includes('md')
    ? await readFile(join(dirFullPath, `${name}.md`), 'utf8')
    : `---\ntitle: ${rules[0].description}\n---`

  if (jsCode) {
    mdCode += `

Copy and edit the code below in [the online editor](https://karabiner.ts.evanliu.dev/editor):

\`\`\`typescript
${jsCode}
\`\`\`

Or copy the JSON below and [add it to Karabiner-Elements](https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/#create-your-own-rules) without changes:

\`\`\`json
${jsonCode}
\`\`\`
`
    const mdFile = join(examplesInDocs, ...dirLevels, `${name}.md`)
    await writeFile(mdFile, mdCode)
  }
}

async function readJsCode(name, dirFullPath, dirLevels) {
  const fileName = `${name}.js`
  const fullPath = join(dirFullPath, fileName)
  const srcCode = await readFile(fullPath, 'utf-8')
  const matched = srcCode.match(/^(import[\s\S]*?)from '.*?'\s*([\s\S]*)$/m)
  if (!matched)
    throw new Error(`Cannot parse ${dirLevels.concat(fileName).join('/')}`)

  const [, imports, jsCode] = matched

  const fileInDist = join(distDir, fileName)
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
  return { jsCode, jsonCode, rules }
}
