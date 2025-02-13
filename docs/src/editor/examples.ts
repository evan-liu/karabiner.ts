import { useEffect, useState } from 'react'

type Examples = Record<string, string>
let _examples: Examples | null = null
let _fetchPromise: Promise<Examples> | null = null

async function fetchExamples(): Promise<Examples> {
  if (_examples) return _examples
  if (_fetchPromise) return _fetchPromise

  let promise = fetch('/examples.json')
    .then((x) => x.json())
    .finally(() => (_fetchPromise = null))
  _fetchPromise = promise
  return promise
}

export function useEditorExamples() {
  let [examples, setExamples] = useState<Examples | null>(() => _examples)
  let [initExampleKey] = useState(() =>
    new URLSearchParams(window.location.search).get('example'),
  )
  let [initExampleCode, setInitExampleCode] = useState(() =>
    initExampleKey ? _examples?.[initExampleKey] : undefined,
  )
  useEffect(() => {
    let unmounted = false
    fetchExamples()
      .catch(() => null)
      .then((x) => {
        if (unmounted || !x) return
        setExamples(x)
        if (initExampleKey && initExampleKey in x) {
          setInitExampleCode(x[initExampleKey])
        }
      })
    return () => void (unmounted = true)
  }, [])
  return { initExampleKey, initExampleCode, examples }
}
