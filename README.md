# TH — Tokalı Hukuk & Danışmanlık

Next.js 16 (Pages Router) + React 19 + TypeScript ile yazılmış statik tanıtım sitesi. Veritabanı yok;
tüm sayfalar derleme sırasında statik HTML olarak üretilir.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
```

| Komut               | Açıklama                                  |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Geliştirme sunucusu                       |
| `npm run build`     | Üretim derlemesi                          |
| `npm start`         | Derlenmiş çıktıyı sunar                   |
| `npm run lint`      | ESLint (next/core-web-vitals + typescript) |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm run kontrast`  | Tüm paletlerin WCAG AA kontrast denetimi  |
| `npm run deploy`    | `out/` klasörünü FTPS ile sunucuya yükler |

## Yayınlama

Site statik olarak derlenir (`output: 'export'`), `out/` klasörüne düz HTML çıkar
ve All-Inkl'e (kasserver.com) FTPS ile yüklenir.

Bu depo herkese açıktır; sunucu bilgileri koda yazılmaz, ortam değişkeninden
okunur. Değerler KAS panelinde ve `.env.local` dosyanızdadır (bu dosya
`.gitignore` içindedir).

```bash
npm run build

# PowerShell
$env:FTP_HOST = "..."; $env:FTP_USER = "..."; $env:FTP_DIR = "..."; $env:FTP_PASS = "..."
npm run deploy

# Git Bash
FTP_HOST=... FTP_USER=... FTP_DIR=... FTP_PASS=... npm run deploy
```

| Değişken | Açıklama |
| --- | --- |
| `FTP_HOST` | KAS sunucu adı (KAS → Startseite → Servername) |
| `FTP_USER` | FTP kullanıcısı (KAS → FTP) |
| `FTP_DIR` | Alan adının yükleme dizini |
| `FTP_PASS` | FTP şifresi — KAS panel şifresinden ayrıdır |

Alan adı **tokalihukuk.com.tr**, Natro'da kayıtlı. Hosting All-Inkl
(kasserver.com); nameserver'lar `ns5.kasserver.com` ve `ns6.kasserver.com`
olarak ayarlanır.

`public/.htaccess` çıktıya kopyalanır: HTTPS yönlendirmesi, 404 sayfası, önbellek
ve güvenlik başlıkları oradan gelir. HTTPS yönlendirmesi `/.well-known/` dizinini
dışarıda bırakır — Let's Encrypt sertifikayı oradan doğruladığı için bu şart.

## Palet denemeleri

Renk kartelası v2 sitede uygulanmıştır. Karşılaştırma için altı varyasyon ve
turkuaz öncesi eski palet URL parametresiyle açılabilir:

| Palet | URL | Karakter |
| --- | --- | --- |
| P1 · Abis + Bakır | *(varsayılan)* | Dengeli, kurumsal |
| P2 · Gece + Altın | `?tema=altin` | Lüks |
| P3 · Lacivert + Mercan | `?tema=lacivert` | Klasik modern |
| P4 · Monokrom Turkuaz | `?tema=monokrom` | Pürist |
| P5 · Toprak + Kil | `?tema=toprak` | Sıcak premium |
| P6 · Saf Kontrast | `?tema=kontrast` | Modernist |
| Klasik | `?tema=klasik` | Turkuaz öncesi bronz–kağıt |

### Buton sistemi

Butonlar palete göre değişmez; altı palette de aynıdır. Gerekçe her satırda:

| Buton | Renk | Neden |
| --- | --- | --- |
| Birincil (Görüşme Talep Edin) | Turkuaz dolgu + `#04211E` metin | Bu çift 5.35:1 verir ve oran arkasındaki zeminden bağımsızdır — koyu hero'da da beyaz kartta da aynı çalışır |
| Header "İletişim" | Dolu turkuaz | Sitenin ana dönüşüm noktası; her palette aynı yerde aynı renkte bulunur |
| X butonları | Koyu zeminde açık dolgu, açık zeminde koyu dolgu | X'in kendi siyah–beyaz kimliği; hover'da turkuaza döner |
| WhatsApp | Her zaman kendi yeşili `#1B8652` | Tanınırlık dönüşüm getirir; palete uydurmak onu harcar |
| İkincil (çerçeveli) | Paletin kendi rengi | Palet kimliği burada, linklerde ve etiketlerde yaşar |

Turkuaz (`#11A297`) altı palette de sabittir; yalnızca onu çevreleyen renkler
değişir. `npm run dev` sırasında sol altta palet anahtarı görünür — üretim
derlemesine girmez, ama `?tema=` parametresi her ortamda çalışır.

**Renk değeri değiştirdiğinizde `npm run kontrast` çalıştırın.** Betik CSS'i
okuyup her paletin gerçekte kullanılan 30 renk çiftini ölçer ve AA eşiğinin
altında kalan olursa hata verir.

Karar verildiğinde silinecekler: `styles/palettes.css`, `lib/palettes.ts`,
`components/ThemeSwitch.tsx`, `scripts/kontrast.mjs`, `_app.tsx` içindeki import
ve efekt, `_document.tsx` içindeki satır içi script, `globals.css` içindeki
`.theme-switch` kuralları.

## Yapı

```
components/    Layout, ContactForm, XTimeline (onaya bağlı X akışı), Icons
lib/site.ts    Tek doğruluk kaynağı: iletişim, WhatsApp, X, menü, çalışma alanları
pages/         Anasayfa, Hakkında, Hizmetler, Paylaşımlar, İletişim,
               Künye/Impressum, KVKK, Çerez Politikası
public/        favicon.svg
styles/        globals.css — tek dosyada tasarım sistemi
```

İletişim bilgisi, WhatsApp numarası, X hesabı, menü öğeleri veya çalışma alanları değişecekse
**yalnızca** `lib/site.ts` düzenlenir; tüm sayfalar bu dosyadan beslenir.

## X (Twitter) akışı ve onay kapısı

`/paylasimlar` sayfasındaki X akışı **varsayılan olarak ziyaretçi onayıyla** yüklenir: ziyaretçi
"İçeriği Yükle" düğmesine basmadan `platform.twitter.com` adresine hiçbir istek gitmez, dolayısıyla
X çerezi yazılmaz ve Çerez Politikası'ndaki beyan doğru kalır. Onay, tarayıcıdaki
`th:x-timeline-consent` localStorage kaydıyla hatırlanır ve aynı sayfadan geri alınabilir.

X profiline giden bağlantılar (header, hero, anasayfadaki X şeridi, footer, iletişim satırı) hiçbir
üçüncü taraf isteği yapmaz; onay kapısı yalnızca gömülü akış için geçerlidir.

**Akışı onaysız, doğrudan yüklemek isterseniz:** `lib/site.ts` içindeki `xTimeline.autoload`
değerini `true` yapmanız yeterli. Ancak bu durumda ziyaretçi onayı olmadan X çerezleri yazılır;
`pages/cerez-politikasi.tsx` güncellenmeli ve siteye açık rıza alan bir çerez bildirimi
eklenmelidir. AB/Almanya'da ziyaretçiniz varsa onaysız yükleme hukuka aykırıdır.

## İletişim formu nasıl çalışıyor?

Sunucu tarafı bulunmadığından form, doğrulamadan geçtikten sonra ziyaretçinin e-posta uygulamasını
hazır bir taslakla açar (`mailto:`). Mesaj hiçbir yerde saklanmaz, doğrudan büronun kutusuna ulaşır.

Kendi sunucusu üzerinden gönderim istenirse: `components/ContactForm.tsx` içindeki `buildMailto`
çağrısı bir `fetch('/api/contact', …)` isteğiyle değiştirilir ve `pages/api/contact.ts` altında bir
e-posta servisi (Resend, Postmark, SMTP vb.) bağlanır.

## Yayına almadan önce tamamlanacaklar

- [ ] `lib/site.ts` içindeki **telefon** ve **adres** hâlâ örnek veridir; gerçek bilgilerle
      değiştirilmelidir. (WhatsApp numarası ve X hesabı girilmiştir.)
- [ ] `pages/kunye.tsx`, `pages/kvkk.tsx` ve `pages/cerez-politikasi.tsx` sayfalarındaki uyarı
      kutuları: ticari unvan, açık adres, sorumlu avukatın adı, baro ve sicil numarası, vergi
      bilgileri, mesleki sorumluluk sigortası ve varsa VERBİS kaydı eklenmelidir. Künye sayfası
      Almanya'da faaliyet varsayımıyla DDG § 5 alanlarını da içerir; yalnızca Türkiye'de faaliyet
      varsa Almanya'ya özgü satırlar çıkarılmalıdır.
- [ ] Sosyal paylaşım görseli: `public/og.png` (1200×630) eklenip `components/Layout.tsx` içine
      `og:image` / `twitter:image` etiketleri yazılmalı, kart tipi `summary_large_image` yapılmalıdır.
      Görsel olmadığı için şu an bilinçli olarak `summary` kullanılıyor.
- [ ] `lib/site.ts` içindeki `copyrightYear` yılda bir güncellenir (hydration uyuşmazlığı olmaması
      için bilerek sabit tutulmuştur).
- [ ] Alan adı `lib/site.ts` → `site.url` alanından okunur; canonical ve Open Graph etiketleri buna
      göre üretilir.

## Notlar

- **`npm run dev` çalışırken `npm run build` çalıştırmayın.** İkisi de aynı `.next` klasörünü
  kullanır; üretim derlemesi dev sunucusunun modül grafiğini bozar ve `Cannot read properties of
  undefined` gibi gerçekte var olmayan çalışma zamanı hataları görürsünüz. Böyle bir hata alırsanız
  dev sunucusunu durdurup `.next` klasörünü silin ve yeniden başlatın.
- `<html lang="tr">` `pages/_document.tsx` üzerinden ayarlanır.
- Yazı tipleri Google Fonts üzerinden yüklenir. Üçüncü taraf isteği istenmiyorsa yazı tipleri yerel
  olarak servis edilmeli ve `pages/cerez-politikasi.tsx` buna göre güncellenmelidir.
- 860px altında menü hamburger paneline dönüşür; Escape ile veya panel dışına tıklayarak kapanır.
