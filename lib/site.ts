/**
 * Sitenin tek doğruluk kaynağı. İletişim bilgisi, alan adı veya menü değişikliği
 * yalnızca bu dosyadan yapılır.
 *
 * TODO (yayına almadan önce): TELEFON ve ADRES alanları hâlâ örnek veridir.
 */
export const site = {
  name: 'Tokalı Hukuk & Danışmanlık',
  shortName: 'TH',
  url: 'https://tokalihukuk.com.tr',
  domain: 'tokalihukuk.com.tr',
  defaultTitle: 'TH | Tokalı Hukuk & Danışmanlık',
  defaultDescription:
    'Tokalı Hukuk & Danışmanlık — ceza, infaz, iş, idare, gayrimenkul ve kira hukuku alanlarında danışmanlık ve dava takibi.',
  locale: 'tr_TR',
  /**
   * Footer telif yılı. Bilerek sabit: `new Date()` ile üretilseydi statik HTML
   * derleme yılını, tarayıcı içinde bulunulan yılı basar ve hydration uyuşmazlığı
   * oluşurdu. Yılda bir kez elle güncellenir.
   */
  copyrightYear: 2026,
} as const

export const contact = {
  /** Ekranda görünen biçim. */
  phone: '+90 (000) 000 00 00',
  /** tel: bağlantısı için boşluksuz biçim. */
  phoneHref: '+900000000000',
  /* Bu kutunun KAS → E-Mail bölümünden oluşturulması gerekiyor; iletişim formu
     ve tüm mailto bağlantıları buraya gidiyor. */
  email: 'info@tokalihukuk.com.tr',
  address: 'Adres bilgisi — Şehir / Türkiye',
  hours: 'Hafta içi 09.00 – 18.00',
} as const

export const whatsapp = {
  /** Ekranda görünen biçim. */
  display: '+90 552 292 39 33',
  /** wa.me yalnızca rakam kabul eder: ülke kodu + numara, artı ve boşluk olmadan. */
  number: '905522923933',
  /** Sohbet açıldığında hazır gelen mesaj. */
  prefill: 'Merhaba, web siteniz üzerinden görüşme talebi için yazıyorum.',
} as const

export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.prefill)}`

export const social = {
  x: {
    handle: 'tokali_ibrahim',
    label: '@tokali_ibrahim',
    url: 'https://x.com/tokali_ibrahim',
  },
} as const

export const xTimeline = {
  /**
   * Paylaşımlar sayfasındaki X akışının ziyaretçi onayı beklemeden yüklenip
   * yüklenmeyeceği.
   *
   * `false` (varsayılan): akış, ziyaretçi "İçeriği Yükle" düğmesine basana kadar
   * yüklenmez; X'e hiçbir istek gitmez ve Çerez Politikası'ndaki beyan doğru kalır.
   *
   * `true`: akış sayfa açılır açılmaz görünür — dönüşüm açısından daha iyidir, ancak
   * ziyaretçinin onayı olmadan X çerezleri yazılır. Bu anahtarı açacaksanız önce
   * pages/cerez-politikasi.tsx güncellenmeli ve siteye açık rıza alan bir çerez
   * bildirimi (banner) eklenmelidir. AB/Almanya'da ziyaretçiniz varsa onaysız yükleme
   * hukuka aykırıdır.
   */
  autoload: false,
} as const

export const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/about', label: 'Hakkında' },
  { href: '/services', label: 'Hizmetler' },
  { href: '/paylasimlar', label: 'Paylaşımlar' },
  { href: '/contact', label: 'İletişim' },
] as const

export const legalLinks = [
  { href: '/kunye', label: 'Künye / Impressum' },
  { href: '/kvkk', label: 'KVKK Aydınlatma Metni' },
  { href: '/cerez-politikasi', label: 'Çerez Politikası' },
] as const

export const practiceAreas = [
  {
    title: 'İnfaz Hukuku',
    description:
      'Cezaların infazı, denetimli serbestlik, koşullu salıverilme ve infaz hâkimliği başvuruları.',
  },
  {
    title: 'Ceza Hukuku',
    description:
      'Soruşturma ve kovuşturmanın her aşamasında müdafilik ile mağdur ve katılan vekilliği.',
  },
  {
    title: 'İş Hukuku',
    description:
      'İşe iade, kıdem ve ihbar tazminatı, fazla mesai alacakları ve hizmet tespiti davaları.',
  },
  {
    title: 'İdare Hukuku',
    description: 'İptal ve tam yargı davaları, idari başvurular ve kamu personeli uyuşmazlıkları.',
  },
  {
    title: 'Gayrimenkul, Kira ve Tahliye',
    description: 'Kira uyuşmazlıkları, tahliye davaları, tapu iptali ve tescil süreçleri.',
  },
] as const
