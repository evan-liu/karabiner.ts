import BrowserOnly from '@docusaurus/BrowserOnly'
import Layout from '@theme/Layout'

export default function EditorPage() {
  return (
    <Layout title="Online Editor">
      <BrowserOnly>
        {() => {
          let OnlineEditorPageContent =
            require('@site/src/editor/online-editor').OnlineEditorPageContent
          return <OnlineEditorPageContent />
        }}
      </BrowserOnly>
    </Layout>
  )
}
