import pako from 'pako'

export function readCodeFromUrl() {
  let url = new URL(location.href)
  let param = url.searchParams.get('c')
  if (param != undefined) {
    url.searchParams.delete('c')
    history.replaceState(null, '', url.toString())
  }
  try {
    if (!param) return null
    let binary = base64urlDecode(param)
    return pako.inflate(binary, { to: 'string' })
  } catch (e) {
    console.warn('Decompression failed', e)
    return null
  }
}

export function encodeCodeForUrl(code: string | undefined) {
  code = code?.replace(/import[\s\S]*from\s+.karabiner.ts./m, '')
  code = code?.replaceAll(/^\s*\/\/\s*[↑↓].*$\n*/gm, '').trim()
  if (!code?.length) return
  try {
    let compressed = pako.deflate(code)
    return base64urlEncode(compressed)
  } catch (e) {
    console.warn('Compression failed', e)
    return null
  }
}

function base64urlEncode(bytes: Uint8Array): string {
  let binary = String.fromCharCode(...bytes)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  let binary = atob(base64)
  return Uint8Array.from(binary, (c) => c.charCodeAt(0))
}
