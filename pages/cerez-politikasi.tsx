import Layout from '../components/Layout'
import Link from 'next/link'
import { contact, site } from '../lib/site'

export default function CerezPolitikasi() {
  return (
    <Layout
      title="Çerez Politikası — TH Tokalı Hukuk"
      description="Tokalı Hukuk & Danışmanlık internet sitesinde çerez kullanımı ve üçüncü taraf istekleri hakkında bilgilendirme."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">Yasal</p>
          <h1>Çerez Politikası</h1>
          <p className="hero-sub">
            Bu sitede hangi çerezlerin kullanıldığı ve hangi üçüncü taraf isteklerinin yapıldığı aşağıda
            açıklanmıştır.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="legal">
            <p className="legal-updated">Son güncelleme: {site.copyrightYear}</p>

            <h2>1. Çerez nedir?</h2>
            <p>
              Çerez, bir internet sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin
              dosyasıdır. Siteler çerezleri oturum yönetimi, tercih hatırlama veya ziyaretçi ölçümlemesi
              için kullanır.
            </p>

            <h2>2. Bu sitede çerez kullanılıyor mu?</h2>
            <p>
              {site.name} internet sitesi kendi adına reklam, ölçümleme veya profilleme çerezi
              kullanmamaktadır. Sitede analiz aracı, reklam ağı kodu veya ziyaretçi takip yazılımı
              çalıştırılmaz.
            </p>
            <p>
              Tek istisna, aşağıda açıklanan X (Twitter) akışıdır: bu içerik yalnızca siz onay verdiğinizde
              yüklenir ve ancak o andan itibaren üçüncü taraf çerezi oluşabilir.
            </p>

            <h2>3. X (Twitter) akışı — onaya bağlı içerik</h2>
            <p>
              <Link href="/paylasimlar">Paylaşımlar</Link> sayfasında X hesabımızın akışı gösterilebilir. Bu
              akış, X Corp. tarafından işletilen <em>platform.twitter.com</em> adresinden yüklenen bir
              bileşendir ve sayfa açıldığında kendiliğinden çalışmaz.
            </p>
            <ul>
              <li>
                Sayfayı ziyaret etmeniz tek başına X&rsquo;e istek gönderilmesine yol açmaz; içerik, siz
                &ldquo;İçeriği Yükle&rdquo; düğmesine basana kadar yüklenmez.
              </li>
              <li>
                Onay verdiğinizde tarayıcınız doğrudan X sunucularına bağlanır. Bu sırada IP adresiniz,
                tarayıcı ve cihaz bilgileriniz X&rsquo;e iletilir; X kendi çerezlerini yazabilir ve
                X hesabınız açıksa bu ziyareti hesabınızla ilişkilendirebilir.
              </li>
              <li>
                Bu veri işleme X Corp.&rsquo;un kendi politikalarına tabidir ve büromuzun kontrolü dışındadır.
                Ayrıntılar için X&rsquo;in gizlilik politikasını inceleyebilirsiniz.
              </li>
              <li>Söz konusu aktarım, verilerinizin yurt dışına aktarılması sonucunu doğurur.</li>
            </ul>
            <p>
              Verdiğiniz onay, tarayıcınızın yerel deposunda (localStorage) <em>th:x-timeline-consent</em>{' '}
              anahtarıyla saklanır; böylece her ziyarette tekrar sorulmaz. Bu kayıt teknik olarak çerez
              değildir, sunucularımıza gönderilmez ve yalnızca cihazınızda kalır. Akış yüklendikten sonra
              aynı sayfadaki &ldquo;İçerik yükleme iznini geri al&rdquo; bağlantısıyla onayınızı her zaman
              geri çekebilirsiniz.
            </p>

            <h2>4. Diğer üçüncü taraf istekleri</h2>
            <p>
              Sayfa yazı tipleri Google Fonts üzerinden yüklenmektedir. Bu yükleme sırasında tarayıcınız
              Google sunucularına bir istek gönderir ve bu istek kapsamında IP adresiniz ile tarayıcı
              bilgileriniz ilgili sağlayıcı tarafından görülebilir. Bu istek çerez oluşturmaz. Bu paylaşımın
              tümüyle önlenmesi isteniyorsa yazı tipleri site sunucusundan servis edilecek şekilde
              yapılandırılabilir.
            </p>
            <p>
              Sitedeki WhatsApp ve X bağlantıları yalnızca birer köprüdür; tıklamadığınız sürece ilgili
              hizmetlere veri gitmez. Tıkladığınızda WhatsApp sohbeti veya X profili ilgili sağlayıcının
              uygulamasında ya da sitesinde açılır ve o noktadan itibaren o sağlayıcının koşulları geçerli
              olur.
            </p>

            <h2>5. Tarayıcı üzerinden yönetim</h2>
            <p>
              Kullandığınız tarayıcının ayarlar bölümünden çerezleri ve site verilerini her zaman silebilir
              veya engelleyebilirsiniz. Sitede zorunlu çerez bulunmadığından, çerezleri engellemeniz sitenin
              çalışmasını etkilemez; yalnızca X akışı görüntülenemez.
            </p>

            <h2>6. Kişisel verileriniz</h2>
            <p>
              Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için{' '}
              <Link href="/kvkk">KVKK Aydınlatma Metni</Link> sayfasını inceleyebilir, sorularınızı{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine iletebilirsiniz.
            </p>

            <div className="legal-callout">
              <strong>Yayın öncesi tamamlanacak:</strong> İleride analiz aracı (Google Analytics, Vercel
              Analytics vb.) veya gömülü harita/video eklenirse bu metin güncellenmeli ve açık rıza alan bir
              çerez bildirimi eklenmelidir. X akışı kaldırılırsa 3. bölüm de kaldırılmalıdır.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
