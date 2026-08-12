import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { normalizePalette } from '../lib/palettes'
import '../styles/globals.css'
// Geçici palet denemeleri — karar verilince bu satır ve dosya silinir.
import '../styles/palettes.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter()
  const tema = normalizePalette(query.tema)

  // İlk yüklemede _document içindeki satır içi script çalışır; bu efekt yalnızca
  // istemci tarafı gezinmede temayı senkron tutar.
  useEffect(() => {
    const root = document.documentElement
    if (tema) root.dataset.theme = tema
    else delete root.dataset.theme
  }, [tema])

  return <Component {...pageProps} />
}
