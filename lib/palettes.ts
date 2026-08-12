/**
 * Geçici palet denemeleri. Karar verilince bu dosya, styles/palettes.css ve
 * components/ThemeSwitch.tsx birlikte silinir.
 *
 * `id: null` varsayılan paletttir (globals.css :root) ve URL'de parametre almaz.
 * Buradaki id'ler styles/palettes.css içindeki [data-theme] değerleriyle ve
 * pages/_document.tsx'teki satır içi scriptin regex'iyle aynı olmalıdır.
 */
export const palettes = [
  { id: null, short: 'Abis', name: 'P1 · Abis + Bakır — dengeli, kurumsal' },
  { id: 'altin', short: 'Altın', name: 'P2 · Gece + Altın — lüks' },
  { id: 'lacivert', short: 'Lacivert', name: 'P3 · Lacivert + Mercan — klasik modern' },
  { id: 'monokrom', short: 'Monokrom', name: 'P4 · Monokrom Turkuaz — pürist' },
  { id: 'toprak', short: 'Toprak', name: 'P5 · Toprak + Kil — sıcak premium' },
  { id: 'kontrast', short: 'Kontrast', name: 'P6 · Saf Kontrast — modernist' },
  { id: 'klasik', short: 'Klasik', name: 'Turkuaz öncesi bronz–kağıt paleti' },
] as const

const ids = new Set<string>(palettes.flatMap((p) => (p.id === null ? [] : [p.id])))

/** URL'den gelen değeri doğrular; tanınmayan değer varsayılan palete düşer. */
export function normalizePalette(value: unknown): string | null {
  return typeof value === 'string' && ids.has(value) ? value : null
}
