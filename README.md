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
| `npm run kontrast`  | WCAG AA renk kontrastı denetimi           |
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

Asıl alan adı **tokali-hukuk.com** (Natro'da kayıtlı, hosting All-Inkl).
Yükleme dizini `/tokali-hukuk.com/`. Nameserver'lar `ns5.kasserver.com` ve
`ns6.kasserver.com` olarak ayarlanır.

`tokalihukuk.com.tr` kaydı henüz tamamlanmadı. O dizine 301 yönlendirmesi
konuldu; kayıt biterse otomatik olarak `tokali-hukuk.com` adresine gider.
`tokalihukuk.com` (tiresiz) başkasına aittir.

`public/.htaccess` çıktıya kopyalanır: 404 sayfası, önbellek ve güvenlik
başlıkları oradan gelir.

### Yayına alma sırası

1. **KAS** → E-Mail → `info@tokali-hukuk.com` posta kutusunu oluştur
2. **Natro** → `tokali-hukuk.com` nameserver'ları `ns5.kasserver.com` / `ns6.kasserver.com` yap
3. **KAS** → Domain → `tokali-hukuk.com` → SSL-Schutz → **Let's Encrypt etkinleştir**
4. `https://tokali-hukuk.com` açılıyor mu kontrol et
5. `public/.htaccess` içindeki **HTTPS yönlendirme bloğunu aç** (`#` işaretlerini
   kaldır), `npm run build && npm run deploy`

**3. adımı atlamayın.** SSL etkinleşmeden sunucu `https://` isteklerini `http://`
adresine 301 ile geri gönderiyor (ölçüldü). HTTPS yönlendirmesi o sırada açık
olursa `http → https → http` sonsuz döngüsü oluşur ve site tamamen erişilemez
hâle gelir. Bu yüzden blok şu an bilerek kapalı.

### İletişim formu

`public/iletisim.php` mesajı doğrulayıp `info@tokali-hukuk.com` adresine
gönderir; hiçbir yere kaydetmez. PHP 7.4+ ile çalışır, bal küpü alanıyla basit
bot koruması vardır. Vercel PHP çalıştırmadığı için orada istek başarısız olur
ve form sessizce `mailto:` taslağına düşer.

## Renk paleti

Bronz–kağıt paleti. Turkuaz temelli altı varyasyon denendi, bu seçildi.

Tüm renkler `styles/globals.css` içindeki tek `:root` bloğunda tanımlıdır;
hiçbir kuralda sabit renk yoktur. Renk rolleri:

| Token | Rol |
| --- | --- |
| `--accent` | Bronz. Dolgu ve kenarlık — hiçbir zaman doğrudan metin değil |
| `--accent-soft` | Koyu zeminde metin vurgusu (hero eyebrow, italik başlık, kicker) |
| `--accent-ink` | Açık zeminde metin ve link. Ham bronz burada yeterli kontrast vermiyor |
| `--accent-line` | Mühür kırmızısı. Açık zeminde kicker ve ince çizgi |
| `--warm` | Nokta vurgu (uyarı kutusu), ~%2 doz |

### Buton sistemi

| Buton | Renk | Neden |
| --- | --- | --- |
| Birincil, koyu zemin | Kağıt dolgu + koyu metin | Hero ve iletişim bölümünde en yüksek kontrast |
| Birincil, açık zemin | Koyu dolgu + kağıt metin | Beyaz kart üzerinde aynı ağırlık |
| Header "İletişim" | Çerçeveli, hover'da dolar | Menüde sessiz durur, tıklanabilirliği belli |
| X butonları | Koyu zeminde açık dolgu, açık zeminde koyu dolgu | X'in kendi siyah–beyaz kimliği; hover'da bronza döner |
| WhatsApp | Her zaman kendi yeşili `#1B8652` | Tanınırlık dönüşüm getirir; palete uydurmak onu harcar |

**Renk değiştirdiğinizde `npm run kontrast` çalıştırın.** Betik `globals.css`'i
okuyup gerçekte kullanılan 32 renk çiftini ölçer, AA eşiğinin altında kalan
olursa hata verir.

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

## Yayına almadan önce tamamlanacaklar

- [ ] **`info@tokali-hukuk.com` posta kutusu** KAS → E-Mail'den oluşturulmalı; form
      mesajları buraya gidiyor.
- [ ] `lib/site.ts` → `address` yalnızca ilçe/il ("Kemer / Antalya"). Künye açık
      adres istiyor: cadde, numara, posta kodu.
- [ ] `lib/site.ts` → `lawyer.barRegistrationNumber`, `taxOffice`, `taxNumber` boş.
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
