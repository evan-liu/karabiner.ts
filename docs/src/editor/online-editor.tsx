import { useColorMode } from '@docusaurus/theme-common'
import { encodeCodeForUrl, readCodeFromUrl } from '@site/src/editor/editor-url'
import { useEditorExamples } from '@site/src/editor/examples'
import * as monaco from 'monaco-editor'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'

let importsCode = `import {
  // rule and layers
  rule, layer, simlayer, hyperLayer, modifierLayer, duoLayer,
  // from / map()
  map, mapConsumerKey, mapPointingButton, mapSimultaneous, mapDoubleTap, mouseMotionToScroll,
  // to
  toKey, toConsumerKey, toPointingButton, toHyper, toSuperHyper, toMeh, to$, toApp, toPaste, toTypeSequence, toNone, toNotificationMessage, toRemoveNotificationMessage, toInputSource, toSetVar, toUnsetVar, toMouseKey, toMouseCursorPosition, toStickyModifier, toCgEventDoubleClick, toSleepSystem,
  // conditions
  ifApp, ifDevice, ifVar, ifDeviceExists, ifInputSource, ifKeyboardType, ifEventChanged,
  // utils
  withCondition, withMapper, withModifier, modifierKeyAliases, multiModifierAliases, LetterKeyCode, KeyAlias, ModifierKeyAlias, MultiModifierAlias
} from 'karabiner.ts'`

let playgroundCode = `\
// ↓ ↓ ↓ Add support code if needed.  ↑ ↑ ↑ Do not delete \`import ...\` ↑

// ↑ ↑ ↑ Add support code if needed.  ↓ ↓ ↓ Do not delete the \`rules\` variable ↓
let rules = [
  // ↓ ↓ ↓ Add rules and/or layers.   ↑ ↑ ↑ Do not delete the \`rules\` variable ↑

  rule('Playground').manipulators([
    map('⇪').toHyper().toIfAlone('⎋'),
    { escape: toKey('caps_lock') },
  ]),
  
  // ↑ ↑ ↑ Add rules and/or layers.   ↓ ↓ ↓ Do not delete \`]\` below ↓
]\n`

self.MonacoEnvironment = {
  getWorkerUrl: (_, label) => {
    if (label == 'json') return '/workers/json.worker.js'
    if (label == 'typescript' || label == 'javascript')
      return '/workers/ts.worker.js'
    return '/workers/editor.worker.js'
  },
}

let typingLoaded = false
function useKarabinerTyping() {
  useEffect(() => {
    if (typingLoaded) return
    fetch('https://unpkg.com/karabiner.ts@latest/dist/index.d.ts')
      .then((res) => res.text())
      .then((types) => {
        if (typingLoaded) return
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          `declare module 'karabiner.ts' { ${types} }`,
          'file:///node_modules/karabiner.ts/index.d.ts',
        )
        typingLoaded = true
      })
      .catch((err) => {
        // TODO Handle error
      })
  }, [])
}

function useEditorColorTheme() {
  let { colorMode } = useColorMode()
  useEffect(() => {
    monaco.editor.setTheme(colorMode == 'dark' ? 'vs-dark' : 'light')
  }, [colorMode])
}

class CodeRunner {
  private job: {
    output?: string
    input: string
    promise: Promise<string>
    resolve?: (x: string) => void
  } | null = null
  private worker: Worker | null = null

  constructor() {
    this.createWorker()
  }

  get output() {
    return this.job?.output || ''
  }

  run(input: string): Promise<string> {
    if (this.job) {
      if (input == this.job.input) return this.job.promise
      this.job.resolve?.('')
    }

    if (!input) {
      this.job = { input, output: '', promise: Promise.resolve('') }
      return this.job.promise
    }

    let resolve: ((x: string) => void) | undefined
    let promise = new Promise<string>((x) => (resolve = x))
    this.job = { input, promise, resolve }
    this.worker?.postMessage(input)
    return this.job.promise
  }

  dispose() {
    this.worker?.terminate()
    this.worker = null
  }

  private createWorker() {
    this.worker?.terminate()
    this.worker = new Worker('/workers/karabiner.worker.js')
    this.worker.onmessage = (x) => {
      let { input, output } = x.data as { input: string; output: string }
      if (input == this.job?.input) {
        this.job.output = output
        this.job.resolve?.(output)
      }
    }
  }
}

function useOnlineEditorInit(code = '') {
  useKarabinerTyping()
  useEditorColorTheme()

  if (code && !/import[\s\S]*'karabiner\.ts'/.test(code)) {
    code = `${importsCode}\n\n${code}`
  }

  let [ctrl] = useState(() => {
    let runner = new CodeRunner()
    let editors = {
      input: null as null | monaco.editor.IStandaloneCodeEditor,
      output: null as null | monaco.editor.IStandaloneCodeEditor,
    }
    runner.run(code).then((x) => editors.output?.setValue(x))
    let editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      tabSize: 2,
    }
    return {
      runner,
      editors,
      inputRef: (div: HTMLDivElement | null) => {
        if (!div || editors.input) return
        editors.input = monaco.editor.create(div, {
          ...editorOptions,
          language: 'typescript',
          value: code,
        })
        editors.input.onDidChangeModelContent(() => {
          runner
            .run(editors.input?.getValue() || '')
            .then((x) => editors.output?.setValue(x))
        })
        editors.input.trigger('', 'editor.fold', {})
      },
      outputRef: (div: HTMLDivElement | null) => {
        if (!div || editors.output) return
        editors.output = monaco.editor.create(div, {
          ...editorOptions,
          readOnly: true,
          language: 'json',
          value: runner.output,
        })
      },
    }
  })
  useEffect(
    () => () => {
      ctrl.runner.dispose()
      ctrl.editors.input?.dispose()
      ctrl.editors.output?.dispose()
      ctrl.editors = { input: null, output: null }
    },
    [],
  )

  return ctrl
}

type OnlineEditorController = ReturnType<typeof useOnlineEditorInit>

let OnlineEditorContext = createContext<OnlineEditorController | null>(null)

export function OnlineEditorProvider(props: {
  code?: string
  children?: ReactNode
}) {
  let ctrl = useOnlineEditorInit(props.code)
  return (
    <OnlineEditorContext.Provider value={ctrl}>
      {props.children}
    </OnlineEditorContext.Provider>
  )
}

export function useOnlineEditorCtrl() {
  let ctrl = useContext(OnlineEditorContext)
  if (!ctrl) throw new Error(`OnlineEditorContext not found`)
  return ctrl
}

export function OnlineEditorInput(props: ComponentProps<'div'>) {
  return <div {...props} ref={useOnlineEditorCtrl().inputRef} />
}

export function OnlineEditorOutput(props: ComponentProps<'div'>) {
  return <div {...props} ref={useOnlineEditorCtrl().outputRef} />
}

export function OnlineEditorPageContent() {
  let { initExampleKey, initExampleCode } = useEditorExamples()
  let initCode =
    readCodeFromUrl() || (initExampleKey ? initExampleCode : playgroundCode)
  return (
    <OnlineEditorProvider code={initCode}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto 1fr',
          flex: 1,
        }}>
        <OnlineEditorInputHeader />
        <OnlineEditorOutputHeader />
        <OnlineEditorInput style={{ maxWidth: '50vw' }} />
        <OnlineEditorOutput style={{ maxWidth: '50vw' }} />
      </div>
    </OnlineEditorProvider>
  )
}

function OnlineEditorInputHeader() {
  let ctrl = useOnlineEditorCtrl()
  let { initExampleCode, initExampleKey, examples } = useEditorExamples()
  let [exampleKey, setExampleKey] = useState(initExampleKey || '')

  let updateInputCode = (code: string) => {
    ctrl.editors.input?.setValue(`${importsCode}\n\n${code}`)
    ctrl.editors.input?.trigger('', 'editor.fold', {})
  }
  useEffect(
    () => void (initExampleCode && updateInputCode(initExampleCode)),
    [initExampleCode],
  )

  function handleSelectChange(key: string) {
    setExampleKey(key)
    updateInputCode(key && examples?.[key] ? examples[key] : playgroundCode)

    let url = new URL(window.location.href)
    if (key) {
      url.searchParams.set('example', key)
    } else {
      url.searchParams.delete('example')
    }
    window.history.replaceState({}, '', url)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between',
        padding: '1rem',
      }}>
      <select
        value={exampleKey}
        onChange={(x) => handleSelectChange(x.target.value)}
        style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>
        <option value="">Playground</option>
        {examples &&
          Object.keys(examples).map((x) => (
            <option key={x} value={x}>
              Example: {x}
            </option>
          ))}
      </select>

      <OnlineEditorCodeUrl />
    </div>
  )
}

function OnlineEditorOutputHeader() {
  let ctrl = useOnlineEditorCtrl()

  let [copied, setCopied] = useState(false)
  function handleCopyJson() {
    let text = ctrl.editors.output?.getValue()
    if (text) {
      void navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    }
  }
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <button
        onClick={handleCopyJson}
        style={{ width: '6rem' }}
        title="Copy JSON for Karabiner-Elements import">
        {copied ? 'Copied' : 'Copy JSON'}
      </button>
      <a
        href="https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/"
        target="_blank">
        ? Import to Karabiner-Elements
      </a>
    </div>
  )
}

function OnlineEditorCodeUrl() {
  let ctrl = useOnlineEditorCtrl()
  let [copied, setCopied] = useState(false)

  function handleCopyUrl() {
    let code = encodeCodeForUrl(ctrl.editors.input?.getValue())
    if (code) {
      let url = new URL(location.origin + location.pathname)
      url.searchParams.set('c', code)

      void navigator.clipboard.writeText(url.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    }
  }

  return (
    <button
      onClick={handleCopyUrl}
      style={{ width: '6rem' }}
      title="Copy URL to share or save this code">
      {copied ? 'Copied!' : 'Copy URL'}
    </button>
  )
}
