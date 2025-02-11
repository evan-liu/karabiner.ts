import {
  OnlineEditorInput,
  OnlineEditorOutput,
  OnlineEditorProvider,
  useOnlineEditorCtrl,
} from '@site/src/editor/online-editor'
import Layout from '@theme/Layout'

let initCode = `\
// ↓ ↓ ↓ Add support code if needed.  ↑ ↑ ↑ Do not delete \`import ...\` ↑

// ↑ ↑ ↑ Add support code if needed.  ↓ ↓ ↓ Do not delete the \`rules\` variable ↓
let rules = [
  // ↓ ↓ ↓ Add rules and/or layers.   ↑ ↑ ↑ Do not delete the \`rules\` variable  ↑

  rule('Playground').manipulators([
    map('⇪').toHyper().toIfAlone('⎋'),
    { escape: toKey('caps_lock') },
  ]),
  
  // ↑ ↑ ↑ Add rules and/or layers.   ↓ ↓ ↓ Do not delete \`]\` below ↓
]\n`

export default function EditorPage() {
  return (
    <Layout title="Online Editor">
      <OnlineEditorProvider code={initCode}>
        <OnlineEditorHeader />
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1 }}>
          <OnlineEditorInput />
          <OnlineEditorOutput />
        </div>
      </OnlineEditorProvider>
    </Layout>
  )
}

function OnlineEditorHeader() {
  let ctrl = useOnlineEditorCtrl()
  function handleCopyJson() {
    let text = ctrl.editors.output?.getValue()
    if (text) {
      void navigator.clipboard.writeText(text)
    }
  }
  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
      }}>
      <a
        href="https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/#create-your-own-rules"
        target="_blank">
        ? Import to Karabiner-Elements
      </a>
      <button onClick={handleCopyJson}>Copy JSON</button>
    </div>
  )
}
