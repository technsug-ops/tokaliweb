import Link from 'next/link'
import Layout from '../components/Layout'
import { XIcon } from '../components/Icons'
import { contact, practiceAreas, site, social, whatsappUrl } from '../lib/site'

const principles = [
  {
    title: 'Şeffaflık',
    description:
      'Dosyanızın durumu, olası sonuçlar ve masraflar hakkında baştan itibaren açık bilgi verilir.',
  },
  {
    title: 'Erişilebilirlik',
    description: 'Süreç boyunca sorularınız makul sürede yanıtlanır; gelişmeler düzenli olarak paylaşılır.',
  },
  {
    title: 'Gizlilik',
    description:
      'Tüm görüşmeler ve belgeler, avukatlık mesleğinin sır saklama yükümlülüğü kapsamında korunur.',
  },
]

const steps = [
  {
    title: 'Ön görüşme',
    description:
      'Dosyanız dinlenir, belgeler incelenir; hukuki durum ve izlenebilecek yollar hakkında ilk değerlendirme yapılır.',
  },
  {
    title: 'Strateji ve vekâlet',
    description:
      'Birlikte karar verilen yol haritası netleştirilir, vekâletname düzenlenir ve süreç resmen başlar.',
  },
  {
    title: 'Takip ve bilgilendirme',
    description:
      'Duruşmalar, başvurular ve yazışmalar takip edilir; her önemli gelişmede tarafınıza bilgi verilir.',
  },
]

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">TH — Tokalı Hukuk &amp; Danışmanlık</p>
          <h1>
            Sakin strateji,
            <br />
            <em>kararlı savunma.</em>
          </h1>
          <p className="hero-sub">
            Tokalı Hukuk &amp; Danışmanlık; infaz, ceza, iş ve idare hukuku ile gayrimenkul, kira ve tahliye
            uyuşmazlıklarında, sürecin her aşamasını şeffaf biçimde yürütür.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Görüşme Talep Edin
            </Link>
            <Link className="btn btn-x" href="/paylasimlar">
              <XIcon className="btn-icon" />
              X Paylaşımları
            </Link>
          </div>
          <span className="hero-vertical">{site.domain}</span>
        </div>
      </section>

      {/* Müvekkillerin önemli kısmı X üzerinden geldiği için bu şerit bilerek
          hero'nun hemen altında, çalışma alanlarından önce duruyor. */}
      <section className="section x-band" id="x">
        <div className="shell">
          <div className="x-band-inner">
            <div className="x-band-copy">
              <span className="kicker">X&rsquo;te</span>
              <h2>Güncel değerlendirmeleri X&rsquo;ten takip edin.</h2>
              {/* Buton yok: aynı çağrı hero'da ve header'da zaten var. Bu bölümde
                  eylem, sağdaki kartın kendisidir. */}
              <p className="section-lede">
                Mevzuat değişiklikleri, güncel kararlar ve sık sorulan hukuki soruların yanıtları düzenli
                olarak {social.x.label} hesabından paylaşılıyor.{' '}
                <Link href="/paylasimlar" className="lede-link">
                  Akışı bu sayfada görün
                </Link>
                .
              </p>
            </div>
            <Link className="x-card" href="/paylasimlar" aria-label="X akışını sitede görüntüle">
              <XIcon className="x-card-mark" />
              <span className="x-card-handle">{social.x.label}</span>
              <span className="x-card-meta">Hukuk gündemi · günlük notlar</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="alanlar">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">Çalışma Alanları</span>
            <h2>Her dosya, kendi alanının usulüyle yürütülür.</h2>
            <p className="section-lede">
              Büromuz kıdemli avukat kadrosu ile dava takibi ve hukuki danışmanlık hizmetini bir arada sunar.
            </p>
          </div>
          <div className="areas-grid">
            {practiceAreas.map((area, index) => (
              <article key={area.title} className="area-card">
                <span className="area-ref">Dosya · {String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approach section" id="yaklasim">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">Yaklaşım</span>
            <h2>Üç ilke, her dosyada.</h2>
          </div>
          <div className="approach-grid">
            {principles.map((principle) => (
              <div key={principle.title} className="approach-item">
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="surec">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">Süreç</span>
            <h2>İlk görüşmeden sonuca kadar.</h2>
          </div>
          <div className="process-list">
            {steps.map((step, index) => (
              <div key={step.title} className="process-step">
                <span className="process-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section" id="iletisim">
        <div className="shell">
          <div className="contact-grid">
            <div>
              <span className="kicker">İletişim</span>
              <h2>Görüşme talebiniz için bize ulaşın.</h2>
              <p className="contact-note">
                İlk değerlendirme görüşmesi için telefon veya e-posta ile randevu oluşturabilirsiniz.
              </p>
              <Link href="/contact" className="btn btn-primary">
                İletişim Sayfasına Git
              </Link>
            </div>
            <div className="contact-list">
              <div className="contact-row">
                <span className="contact-label">Telefon</span>
                <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              </div>
              {/* Numara telefon satırında zaten yazıyor; burada eylem gösterilir. */}
              <div className="contact-row">
                <span className="contact-label">WhatsApp</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Aynı numaradan mesaj gönderin
                </a>
              </div>
              <div className="contact-row">
                <span className="contact-label">E-posta</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div className="contact-row">
                <span className="contact-label">X</span>
                <a href={social.x.url} target="_blank" rel="noopener noreferrer">
                  {social.x.label}
                </a>
              </div>
              <div className="contact-row">
                <span className="contact-label">Adres</span>
                <span>{contact.address}</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">Çalışma</span>
                <span>{contact.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
