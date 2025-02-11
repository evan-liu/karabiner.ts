import { useColorMode } from '@docusaurus/theme-common'
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
toKey, toConsumerKey, toPointingButton, toHyper, toSuperHyper, toMeh, to$, toApp, toPaste, toTypeSequence, toNone, toNotificationMessage, toRemoveNotificationMessage, toInputSource, toSetVar, toMouseKey, toMouseCursorPosition, toStickyModifier, toCgEventDoubleClick, toSleepSystem,
// conditions
ifApp, ifDevice, ifVar, ifDeviceExists, ifInputSource, ifKeyboardType, ifEventChanged,
// utils
withCondition, withMapper, withModifier, modifierKeyAliases, multiModifierAliases
} from 'karabiner.ts'`

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
    return {
      runner,
      editors,
      inputRef: (div: HTMLDivElement | null) => {
        if (!div || editors.input) return
        editors.input = monaco.editor.create(div, {
          value: code,
          language: 'typescript',
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
        })
        editors.input.onDidChangeModelContent(() => {
          runner
            .run(editors.input?.getValue() || '')
            .then((x) => editors.output?.setValue(x))
        })
      },
      outputRef: (div: HTMLDivElement | null) => {
        if (!div || editors.output) return
        editors.output = monaco.editor.create(div, {
          value: runner.output,
          language: 'json',
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          readOnly: true,
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
