import Link from 'next/link'
import { useRouter } from 'next/router'
import { normalizePalette, palettes } from '../lib/palettes'

/**
 * Palet karşılaştırma anahtarı — yalnızca `npm run dev` sırasında görünür,
 * üretim derlemesine hiç girmez (Layout içinde NODE_ENV ile korunur).
 * Silme listesi için lib/palettes.ts başlığına bakınız.
 */
export default function ThemeSwitch() {
  const router = useRouter()
  const active = normalizePalette(router.query.tema)
  const activeName = palettes.find((p) => p.id === active)?.name ?? ''

  // Mevcut sayfada kal, yalnızca tema parametresini değiştir.
  const hrefFor = (tema: string | null) => {
    const query: Record<string, string> = {}
    for (const [key, value] of Object.entries(router.query)) {
      if (key !== 'tema' && typeof value === 'string') query[key] = value
    }
    if (tema) query.tema = tema
    return { pathname: router.pathname, query }
  }

  return (
    <div className="theme-switch" aria-label="Palet önizleme">
      <p className="theme-switch-name">{activeName}</p>
      <div className="theme-switch-row">
        {palettes.map((palette) => (
          <Link
            key={palette.id ?? 'default'}
            href={hrefFor(palette.id)}
            aria-current={palette.id === active}
            title={palette.name}
            scroll={false}
          >
            {palette.short}
          </Link>
        ))}
      </div>
    </div>
  )
}
