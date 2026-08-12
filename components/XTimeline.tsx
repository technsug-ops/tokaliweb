import { useCallback, useEffect, useRef, useState } from 'react'
import { social, xTimeline } from '../lib/site'
import { XIcon } from './Icons'

/**
 * X (Twitter) zaman akışını onay kapısının arkasında yükler.
 *
 * Ziyaretçi onay vermeden `platform.twitter.com` adresine HİÇBİR istek gitmez; bu
 * sayede varsayılan durumda üçüncü taraf çerezi yazılmaz ve Çerez Politikası'ndaki
 * "çerez kullanılmıyor" beyanı doğru kalır. Onay, yalnızca tarayıcıda tutulan
 * localStorage kaydıyla hatırlanır ve aynı sayfadan geri alınabilir.
 */

const CONSENT_KEY = 'th:x-timeline-consent'
const SCRIPT_SRC = 'https://platform.twitter.com/widgets.js'

type Status = 'idle' | 'loading' | 'ready' | 'error'

type TwitterWidgets = {
  widgets: {
    createTimeline: (
      source: { sourceType: 'profile'; screenName: string },
      target: HTMLElement,
      options?: Record<string, unknown>
    ) => Promise<HTMLElement | undefined>
  }
}

declare global {
  interface Window {
    twttr?: TwitterWidgets
  }
}

let scriptPromise: Promise<TwitterWidgets> | null = null

function loadWidgetScript(): Promise<TwitterWidgets> {
  if (window.twttr?.widgets) return Promise.resolve(window.twttr)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<TwitterWidgets>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.charset = 'utf-8'
    script.onload = () => {
      if (window.twttr?.widgets) resolve(window.twttr)
      else reject(new Error('widgets.js yüklendi fakat twttr.widgets bulunamadı'))
    }
    script.onerror = () => reject(new Error('widgets.js yüklenemedi'))
    document.head.appendChild(script)
  })

  // Başarısız denemenin sonraki denemeleri kilitlememesi için önbelleği temizle.
  scriptPromise.catch(() => {
    scriptPromise = null
  })

  return scriptPromise
}

export default function XTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Bileşen yalnızca istemcide çalışır (ssr: false), bu yüzden ilk durumu
  // doğrudan localStorage'dan okuyabiliriz; onay varsa yüklemeye başlanır.
  const [status, setStatus] = useState<Status>(() =>
    xTimeline.autoload || window.localStorage.getItem(CONSENT_KEY) === 'granted' ? 'loading' : 'idle'
  )

  // Asıl yükleme yalnızca 'loading' durumunda, efekt içinde yapılır.
  useEffect(() => {
    if (status !== 'loading') return
    let cancelled = false

    void (async () => {
      try {
        const twttr = await loadWidgetScript()
        const target = containerRef.current
        if (cancelled || !target) return
        target.replaceChildren()

        const widget = await twttr.widgets.createTimeline(
          { sourceType: 'profile', screenName: social.x.handle },
          target,
          { height: 760, lang: 'tr', dnt: true, chrome: 'noheader nofooter transparent' }
        )
        if (cancelled) return

        // createTimeline, hesap gizli/askıda olduğunda hata fırlatmadan undefined döner.
        setStatus(widget ? 'ready' : 'error')
      } catch {
        if (!cancelled) setStatus('error')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [status])

  const accept = useCallback(() => {
    window.localStorage.setItem(CONSENT_KEY, 'granted')
    setStatus('loading')
  }, [])

  const retry = useCallback(() => setStatus('loading'), [])

  const revoke = useCallback(() => {
    window.localStorage.removeItem(CONSENT_KEY)
    containerRef.current?.replaceChildren()
    setStatus('idle')
  }, [])

  return (
    <div className="x-embed">
      {status === 'idle' && (
        <div className="x-consent">
          <XIcon className="x-consent-icon" />
          <h3>Son paylaşımları burada görün</h3>
          <p>
            {social.x.label} hesabının akışı tek tıkla bu sayfada açılır. Akış X (eski adıyla Twitter)
            sunucularından geldiği için, yüklendiğinde IP adresiniz X&rsquo;e iletilir ve tarayıcınıza
            X&rsquo;e ait çerezler yazılabilir; bu nedenle kararı size bırakıyoruz. Onay vermediğiniz
            sürece X&rsquo;e hiçbir istek gönderilmez.
          </p>
          <div className="x-consent-actions">
            <button type="button" className="btn btn-primary" onClick={accept}>
              İçeriği Yükle
            </button>
            <a className="btn btn-x" href={social.x.url} target="_blank" rel="noopener noreferrer">
              <XIcon className="btn-icon" />
              X&rsquo;te Aç
            </a>
          </div>
          <p className="x-consent-fine">
            Tercihiniz yalnızca bu tarayıcıda saklanır ve yükledikten sonra geri alabilirsiniz.
          </p>
        </div>
      )}

      {status === 'loading' && (
        <p className="x-status" role="status">
          Akış yükleniyor…
        </p>
      )}

      {status === 'error' && (
        <div className="x-consent">
          <XIcon className="x-consent-icon" />
          <h3>Akış görüntülenemedi</h3>
          <p>
            X akışı şu anda yüklenemiyor. Bunun nedeni bağlantı sorunu, tarayıcı eklentisi veya
            X&rsquo;in gömülü içerik kısıtlaması olabilir. Paylaşımlara doğrudan X üzerinden
            ulaşabilirsiniz.
          </p>
          <div className="x-consent-actions">
            <a className="btn btn-x" href={social.x.url} target="_blank" rel="noopener noreferrer">
              <XIcon className="btn-icon" />
              {social.x.label} — X&rsquo;te Aç
            </a>
            <button type="button" className="btn btn-ghost" onClick={retry}>
              Tekrar Dene
            </button>
          </div>
        </div>
      )}

      <div ref={containerRef} className="x-timeline" />

      {status === 'ready' && (
        <div className="x-embed-footer">
          <a href={social.x.url} target="_blank" rel="noopener noreferrer">
            {social.x.label} hesabını X&rsquo;te aç
          </a>
          {!xTimeline.autoload && (
            <button type="button" className="link-button" onClick={revoke}>
              İçerik yükleme iznini geri al
            </button>
          )}
        </div>
      )}
    </div>
  )
}
