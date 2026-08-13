/**
 * Renk kontrastı denetleyicisi.
 *
 * styles/globals.css içindeki :root bloğunu okur, token'ları çözer ve sitede
 * gerçekten kullanılan renk çiftlerini WCAG 2.1 AA eşiğine göre ölçer.
 * Bir çift eşiğin altında kalırsa çıkış kodu 1 döner.
 *
 * Renk değiştirdiğinizde çalıştırın:  npm run kontrast
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/* ---------- renk yardımcıları ---------- */

const toRgb = (hex) => {
  const h = hex.trim().replace('#', '')
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}
const channel = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}
const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map(channel)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)]
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}
/** fg rengini bg üzerine `alpha` opaklıkla bindirir (color-mix ... transparent). */
const over = (fg, bg, alpha) => {
  const [f, b] = [toRgb(fg), toRgb(bg)]
  return (
    '#' +
    f.map((v, i) => Math.round(v * alpha + b[i] * (1 - alpha)).toString(16).padStart(2, '0')).join('')
  )
}

/* ---------- CSS'ten token okuma ---------- */

const css = readFileSync(join(root, 'styles/globals.css'), 'utf8')
const open = css.indexOf('{', css.indexOf(':root {'))
const close = css.indexOf('}', open)
const tokens = {}
for (const line of css.slice(open + 1, close).split('\n')) {
  const m = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/)
  if (m) tokens[m[1]] = m[2].trim()
}
if (!Object.keys(tokens).length) throw new Error('globals.css içinde :root token bulunamadı')

/** var(--x) referanslarını çözer; color-mix gibi çözülemeyenler null döner. */
const resolve = (name, depth = 0) => {
  const raw = tokens[name]
  if (raw === undefined || depth > 10) return null
  const m = raw.match(/^var\((--[\w-]+)\)$/)
  if (m) return resolve(m[1], depth + 1)
  return /^#[0-9a-f]{3,8}$/i.test(raw) ? raw : null
}

/* ---------- denetlenecek çiftler ---------- */
/* AA: normal metin 4.5:1 · metin dışı arayüz öğesi (odak halkası) 3:1 */

const checks = [
  // Açık zemin — sayfa
  { name: 'gövde metni', bg: '--paper', fg: '--text' },
  { name: 'ikincil metin', bg: '--paper', fg: '--muted' },
  { name: 'kicker / ince çizgi', bg: '--paper', fg: '--accent-line' },
  { name: 'link, tarih etiketi', bg: '--paper', fg: '--accent-ink' },
  { name: 'header İletişim düğmesi', bg: '--paper', fg: '--cta-fg' },
  // Açık zemin — bant (Yaklaşım bölümü, uyarı kutusu)
  { name: 'bant · metin', bg: '--paper-deep', fg: '--text' },
  { name: 'bant · ikincil metin', bg: '--paper-deep', fg: '--muted' },
  // Kart yüzeyi
  { name: 'kart · gövde', bg: '--surface', fg: '--text' },
  { name: 'kart · ikincil metin', bg: '--surface', fg: '--muted' },
  { name: 'kart · Dosya etiketi', bg: '--surface', fg: '--accent-ink' },
  // Koyu zemin
  { name: 'koyu · ana metin', bg: '--ink', fg: '--paper' },
  { name: 'koyu · vurgu metni', bg: '--ink', fg: '--accent-soft' },
  // Koyu zeminde yarı saydam metinler (globals.css'teki color-mix oranları)
  { name: 'koyu · hero alt metni %72', bg: '--ink', fg: '--paper', alpha: 0.72 },
  { name: 'koyu · X şeridi lede %70', bg: '--ink', fg: '--paper', alpha: 0.7 },
  { name: 'koyu · iletişim notu %68', bg: '--ink', fg: '--paper', alpha: 0.68 },
  { name: 'koyu · form lede %62', bg: '--ink', fg: '--paper', alpha: 0.62 },
  { name: 'koyu · form notu %55', bg: '--ink', fg: '--paper', alpha: 0.55 },
  { name: 'koyu · footer %50', bg: '--ink', fg: '--paper', alpha: 0.5 },
  { name: 'koyu · placeholder %50', bg: '--ink', fg: '--paper', alpha: 0.5 },
  // Butonlar
  { name: 'buton · birincil (koyu zemin)', bg: '--btn-primary-bg', fg: '--btn-primary-fg' },
  { name: 'buton · birincil hover', bg: '--btn-primary-bg-hover', fg: '--btn-primary-fg-hover' },
  { name: 'buton · birincil (açık zemin)', bg: '--btn-solid-bg', fg: '--btn-solid-fg' },
  { name: 'buton · birincil açık hover', bg: '--btn-solid-bg-hover', fg: '--btn-solid-fg-hover' },
  { name: 'buton · İletişim hover', bg: '--cta-bg-hover', fg: '--cta-fg-hover' },
  // X butonu bağlama göre ters çevrilir; iki yön de aynı çifti kullanır
  { name: 'buton · X (açık zemin)', bg: '--btn-x-bg', fg: '--btn-x-fg' },
  { name: 'buton · X hover', bg: '--btn-x-bg-hover', fg: '--btn-x-fg-hover' },
  { name: 'header X butonu / zemin', bg: '--paper', fg: '--btn-x-bg', min: 3 },
  { name: 'WhatsApp düğmesi', bg: '--wa-bg', fg: '--wa-fg' },
  { name: 'WhatsApp hover', bg: '--wa-bg-hover', fg: '--wa-fg' },
  // Metin dışı: odak halkası ve hover kenarlığı
  { name: 'odak halkası · açık zemin', bg: '--paper', fg: '--focus', min: 3 },
  { name: 'odak halkası · koyu zemin', bg: '--ink', fg: '--accent', min: 3 },
  { name: 'kart hover kenarlığı', bg: '--surface', fg: '--accent', min: 3 },
]

/* ---------- çalıştır ---------- */

const green = (s) => `\x1b[32m${s}\x1b[0m`
const red = (s) => `\x1b[31m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`

let failed = 0
let skipped = 0

console.log('\nRenk kontrastı — WCAG 2.1 AA')
console.log('─'.repeat(60))

for (const check of checks) {
  const min = check.min ?? 4.5
  const bg = resolve(check.bg)
  let fg = resolve(check.fg)

  if (!bg || !fg) {
    skipped++
    console.log(dim(`   —        atlandı   ${check.name}`))
    continue
  }
  if (check.alpha) fg = over(fg, bg, check.alpha)

  const r = ratio(bg, fg)
  const ok = r >= min
  if (!ok) failed++
  const line = `${r.toFixed(2).padStart(6)}:1  ${ok ? 'AA ✓  ' : 'KALDI '} ${check.name}${
    min !== 4.5 ? dim(` (eşik ${min}:1)`) : ''
  }`
  console.log('  ' + (ok ? green(line) : red(line + `  → ${bg} / ${fg}`)))
}

console.log('─'.repeat(60))
if (failed === 0) console.log(green(`${checks.length - skipped} çiftin tamamı geçti`))
else console.log(red(`${failed} çift AA eşiğinin altında kaldı`))
if (skipped) console.log(dim(`${skipped} çift atlandı (transparent / color-mix)`))

process.exit(failed === 0 ? 0 : 1)
