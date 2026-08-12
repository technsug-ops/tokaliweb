/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Site tamamen statiktir: sunucu tarafı kod, API rotası ve next/image yoktur.
   * Bu yüzden `npm run build` doğrudan `out/` klasörüne düz HTML üretir. Çıktı
   * hem Natro gibi paylaşımlı hostinglere FTP ile yüklenebilir hem de
   * Vercel/Netlify gibi platformlarda çalışır.
   */
  output: 'export',

  /**
   * /hakkinda yerine /hakkinda/ üretir (about/index.html). Apache ve paylaşımlı
   * hostinglerde uzantısız adreslerin çalışması için gereklidir; aksi hâlde
   * /about isteği 404 döner.
   */
  trailingSlash: true,
}

module.exports = nextConfig
