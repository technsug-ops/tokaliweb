import Link from 'next/link'
import Layout from '../components/Layout'
import { contact, site, social, whatsappUrl } from '../lib/site'

export default function Kunye() {
  return (
    <Layout
      title="Künye / Impressum — TH Tokalı Hukuk"
      description="Tokalı Hukuk & Danışmanlık künye bilgileri: hizmet sağlayıcı, iletişim, meslek kuralları ve sorumluluk."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">Yasal</p>
          <h1>Künye / Impressum</h1>
          <p className="hero-sub">
            6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve Alman Dijital Hizmetler Yasası
            (DDG § 5) kapsamında zorunlu bilgilendirme.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="legal">
            <p className="legal-updated">Son güncelleme: {site.copyrightYear}</p>

            <h2>1. Hizmet Sağlayıcı</h2>
            <p>
              {site.name}
              <br />
              {contact.address}
            </p>

            <h2>2. İletişim</h2>
            <ul>
              <li>
                Telefon ve WhatsApp: <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a> —{' '}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp&rsquo;tan yazın
                </a>
              </li>
              <li>
                E-posta: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                X:{' '}
                <a href={social.x.url} target="_blank" rel="noopener noreferrer">
                  {social.x.label}
                </a>
              </li>
              <li>İnternet sitesi: {site.domain}</li>
            </ul>

            <h2>3. Meslek Unvanı ve Bağlı Olunan Kurallar</h2>
            <p>
              Mesleki unvan: Avukat (Türkiye Cumhuriyeti&rsquo;nde verilmiştir). Faaliyet, 1136 sayılı
              Avukatlık Kanunu, Türkiye Barolar Birliği Meslek Kuralları ve Avukatlık Asgari Ücret Tarifesi
              hükümlerine tabidir. İlgili mevzuata Türkiye Barolar Birliği&rsquo;nin internet sitesi
              üzerinden ulaşılabilir.
            </p>

            <h2>4. İçerikten Sorumlu Kişi</h2>
            <p>
              Bu internet sitesinde yayımlanan içeriklerden {site.name} sorumludur. Site üzerindeki bilgiler
              genel bilgilendirme amaçlıdır; somut bir uyuşmazlığa ilişkin hukuki görüş yerine geçmez ve
              tek başına avukat–müvekkil ilişkisi kurmaz.
            </p>

            <h2>5. Dış Bağlantılar</h2>
            <p>
              Sitede yer alan dış bağlantıların içeriği ilgili sağlayıcıların sorumluluğundadır. Bağlantılar
              eklendikleri tarihte hukuka aykırı içerik barındırmadıkları kontrol edilerek yayımlanır;
              sürekli denetim yükümlülüğü bulunmamaktadır. Hukuka aykırılık bildirildiğinde ilgili bağlantı
              gecikmeksizin kaldırılır.
            </p>

            <h2>6. Telif Hakkı</h2>
            <p>
              Sitedeki metin, görsel ve düzenlemeler üzerindeki haklar saklıdır. İzinsiz çoğaltma, dağıtım
              veya işleme yapılamaz.
            </p>

            <h2>7. Uyuşmazlık Çözümü</h2>
            <p>
              Tüketici uyuşmazlıklarında ilgili Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
              Avrupa Komisyonu&rsquo;nun çevrim içi uyuşmazlık çözüm platformuna{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
              </a>{' '}
              adresinden ulaşılabilir. Büro, tüketici hakem heyeti önünde alternatif uyuşmazlık çözümüne
              katılma yükümlülüğü altında değildir ve buna katılmamaktadır.
            </p>

            <h2>8. Kişisel Veriler ve Çerezler</h2>
            <p>
              Kişisel verilerin işlenmesine ilişkin bilgilendirme{' '}
              <Link href="/kvkk">KVKK Aydınlatma Metni</Link>, çerez ve üçüncü taraf içerik kullanımı ise{' '}
              <Link href="/cerez-politikasi">Çerez Politikası</Link> sayfasında yer alır.
            </p>

            <div className="legal-callout">
              <strong>Yayın öncesi tamamlanacak:</strong> Bu sayfa yasal olarak zorunlu alanları içerir,
              ancak aşağıdaki bilgiler hâlâ eksiktir ve mutlaka doldurulmalıdır: hizmet sağlayıcının tam
              ticari unvanı ve hukuki biçimi, açık adres, sorumlu avukatın adı–soyadı, kayıtlı olduğu baro
              ve baro sicil numarası, vergi dairesi ve vergi/TC kimlik numarası, varsa MERSİS numarası,
              mesleki sorumluluk sigortası bilgisi (sigortacı ve coğrafi geçerlilik alanı) ve Almanya&rsquo;da
              faaliyet varsa USt-IdNr. ile yetkili Rechtsanwaltskammer bilgisi.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
