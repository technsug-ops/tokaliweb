import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'
import { contact, social, whatsapp, whatsappUrl } from '../lib/site'

export default function Contact() {
  return (
    <Layout
      title="İletişim — TH Tokalı Hukuk"
      description="Tokalı Hukuk & Danışmanlık ile iletişime geçmek için telefon, e-posta veya mesaj formunu kullanın."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">İletişim</p>
          <h1>Görüşme talebiniz için buradayız.</h1>
          <p className="hero-sub">
            Detayları paylaşın, size en kısa sürede geri dönüş sağlayalım. Alternatif olarak{' '}
            {contact.email} adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </section>

      <section className="section contact" id="iletisim">
        <div className="shell contact-grid">
          <div>
            <span className="kicker">Ofise ulaşın</span>
            <h2>İletişim bilgileri</h2>
            <p className="contact-note">
              {contact.hours} arasında sorularınızı bekliyoruz. Acil durumlar için telefonla öncelikli
              destek.
            </p>
            <div className="contact-list">
              <div className="contact-row">
                <span className="contact-label">Telefon</span>
                <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              </div>
              <div className="contact-row">
                <span className="contact-label">WhatsApp</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {whatsapp.display}
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
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  )
}
