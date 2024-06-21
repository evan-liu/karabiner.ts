import { useColorMode } from '@docusaurus/theme-common'
import type { WrapperProps } from '@docusaurus/types'
import Giscus from '@giscus/react'
import Footer from '@theme-original/DocItem/Footer'
import type FooterType from '@theme/DocItem/Footer'

export default function FooterWrapper(props: WrapperProps<typeof FooterType>) {
  let { colorMode } = useColorMode()

  return (
    <>
      <Footer {...props} />

      <div style={{ height: '56px' }} />
      <Giscus
        theme={colorMode}
        id="giscus"
        repo="evan-liu/karabiner.ts"
        repoId="R_kgDOJZ587w"
        category="giscus"
        categoryId="DIC_kwDOJZ58784CgPKB"
        mapping="pathname"
        reactionsEnabled="1"
        inputPosition="bottom"
        lang="en"
        loading="lazy"
      />
    </>
  )
}
