import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Manrope:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/*
          Palet karşılaştırması: ?tema=<id> ile alternatif paletler açılır.
          Boyamadan önce çalışır, böylece tema geçişinde titreme olmaz.
          Buradaki liste lib/palettes.ts ile aynı olmalıdır.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=new URLSearchParams(location.search).get('tema');" +
              "if(t&&/^(altin|lacivert|monokrom|toprak|kontrast|klasik)$/.test(t))" +
              "document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
