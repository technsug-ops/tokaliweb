/**
 * out/ klasörünü All-Inkl'e FTPS ile yükler.
 *
 * Şifre bilerek dosyada tutulmaz; ortam değişkeninden okunur.
 *
 *   PowerShell:
 *     $env:FTP_PASS = "..."
 *     npm run deploy
 *
 *   Git Bash:
 *     FTP_PASS="..." npm run deploy
 *
 * Değiştirilebilir değişkenler: FTP_HOST, FTP_USER, FTP_DIR
 */
import { spawnSync } from 'node:child_process'
import { readdirSync, statSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, posix } from 'node:path'
import { tmpdir } from 'node:os'

// Depo herkese açık olduğu için sunucu bilgileri koda yazılmaz; hiçbirinin
// varsayılanı yoktur. Kullanıcı adı da şifrenin yarısı sayılır.
const { FTP_HOST: HOST, FTP_USER: USER, FTP_DIR: DIR, FTP_PASS: PASS } = process.env

const missing = Object.entries({ FTP_HOST: HOST, FTP_USER: USER, FTP_DIR: DIR, FTP_PASS: PASS })
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missing.length) {
  console.error(`HATA: şu ortam değişkenleri tanımlı değil: ${missing.join(', ')}`)
  console.error('PowerShell:  $env:FTP_PASS = "..."; npm run deploy')
  console.error('Git Bash:    FTP_PASS=... npm run deploy')
  console.error('Ayrıntı için README > Yayınlama bölümüne bakın.')
  process.exit(1)
}

if (!existsSync('out')) {
  console.error('HATA: out/ klasörü yok. Önce `npm run build` çalıştırın.')
  process.exit(1)
}

/** out/ altındaki tüm dosyaları göreli yol olarak toplar (nokta dosyaları dahil). */
function walk(dir, base = '') {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const rel = base ? posix.join(base, entry) : entry
    if (statSync(full).isDirectory()) files.push(...walk(full, rel))
    else files.push({ full, rel })
  }
  return files
}

const files = walk('out')
console.log(`${files.length} dosya yüklenecek → ftp://${HOST}/${DIR}/`)

// curl yapılandırması: tek bağlantı üzerinden sıralı yükleme.
const conf = [
  '--ssl-reqd',
  '--ftp-create-dirs',
  '--connect-timeout 20',
  `user = "${USER}:${PASS}"`,
  ...files.flatMap((f) => [
    `upload-file = "${f.full.replace(/\\/g, '/')}"`,
    `url = "ftp://${HOST}/${DIR}/${f.rel}"`,
  ]),
].join('\n')

const confPath = join(tmpdir(), `tokali-deploy-${process.pid}.conf`)
writeFileSync(confPath, conf)

try {
  const result = spawnSync('curl', ['-sS', '--fail', '-K', confPath], { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`\nYükleme başarısız (curl çıkış kodu ${result.status}).`)
    process.exit(1)
  }
  console.log(`✓ ${files.length} dosya yüklendi.`)
} finally {
  // Şifre içerdiği için geçici dosya her durumda silinir.
  rmSync(confPath, { force: true })
}
