import { lstatSync } from 'node:fs'
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

let rootDir = process.cwd()
let examplesDir = join(rootDir, 'examples')
let examplesInDocs = join(rootDir, 'docs/docs/examples')
let examplesFile = join(rootDir, 'docs/static/examples.json')
let examplesMap = {}

copyDir(examplesDir)
  .then(() => writeFile(examplesFile, JSON.stringify(examplesMap)))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

async function copyDir(dirFullPath, dirLevels = []) {
  let items = await readdir(dirFullPath)

  let toCopy = { code: {}, files: [], dirs: [] }
  items.forEach((item) => {
    let itemFullPath = join(dirFullPath, item)
    if (lstatSync(itemFullPath).isDirectory()) {
      return toCopy.dirs.push(item)
    }

    let codeMatched = item.match(/^(.*)\.(md|ts)$/)
    if (!codeMatched) {
      return toCopy.files.push(item)
    }
    let [, name, format] = codeMatched
    ;(toCopy.code[name] ||= []).push(format)
  })

  await Promise.all([
    ...toCopy.dirs.map(async (item) => {
      let dirInDocs = join(examplesInDocs, ...dirLevels, item)
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
  let code = formats.includes('ts')
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
    let mdFile = join(examplesInDocs, ...dirLevels, `${name}.md`)
    await writeFile(mdFile, markdown)
  }
}

async function readCode(name, dirFullPath, dirLevels) {
  let fileName = `${name}.ts`
  let fullPath = join(dirFullPath, fileName)
  let srcCode = await readFile(fullPath, 'utf-8')
  let matched = srcCode.match(/^(import[\s\S]*?)from '.*?'\s*([\s\S]*)$/m)
  if (!matched)
    throw new Error(`Cannot parse ${dirLevels.concat(fileName).join('/')}`)

  let code = matched[2]
  examplesMap[dirLevels.concat(name).join('/')] = code
  return code
}
