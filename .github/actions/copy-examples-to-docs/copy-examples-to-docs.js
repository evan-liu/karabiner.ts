import { lstatSync } from 'node:fs'
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const rootDir = process.cwd()
const examplesDir = join(rootDir, 'examples')
const examplesInDocs = join(rootDir, 'docs/docs/examples')
const examplesFile = join(rootDir, 'docs/static/examples.json')
const examplesMap = {}

copyDir(examplesDir)
  .then(() => writeFile(examplesFile, JSON.stringify(examplesMap)))
  .catch((err) => {
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

    const codeMatched = item.match(/^(.*)\.(md|ts)$/)
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
  const code = formats.includes('ts')
    ? await readCode(name, dirFullPath, dirLevels)
    : null

  if (!formats.includes('md')) return
  let markdown = await readFile(join(dirFullPath, `${name}.md`), 'utf8')
  if (code) {
    let key = dirLevels.concat(name).join('/')
    markdown += `
Example code: ( [Open in the online editor →](/editor?example=${key}) )

\`\`\`typescript
${code}
\`\`\`
`
    const mdFile = join(examplesInDocs, ...dirLevels, `${name}.md`)
    await writeFile(mdFile, markdown)
  }
}

async function readCode(name, dirFullPath, dirLevels) {
  const fileName = `${name}.ts`
  const fullPath = join(dirFullPath, fileName)
  const srcCode = await readFile(fullPath, 'utf-8')
  const matched = srcCode.match(/^(import[\s\S]*?)from '.*?'\s*([\s\S]*)$/m)
  if (!matched)
    throw new Error(`Cannot parse ${dirLevels.concat(fileName).join('/')}`)

  const code = matched[2]
  examplesMap[dirLevels.concat(name).join('/')] = code
  return code
}
