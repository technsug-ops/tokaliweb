import Layout from '../components/Layout'
import { practiceAreas } from '../lib/site'

export default function Services() {
  return (
    <Layout
      title="Hizmetler — TH Tokalı Hukuk"
      description="Tokalı Hukuk & Danışmanlık hizmetlerimiz: ceza, infaz, iş, idare, kira ve gayrimenkul hukuku."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">Hizmetler</p>
          <h1>Her alana uygun, dikkatle seçilmiş uzmanlık.</h1>
          <p className="hero-sub">
            Tokalı Hukuk &amp; Danışmanlık ekibi, müvekkil hedeflerini yakından dinler ve her dosya için yol
            haritasını özel olarak belirler.
          </p>
        </div>
      </section>

      <section className="section" id="alanlar">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">Çalışma Alanları</span>
            <h2>Hukuki destek, kritik tüm adımları kapsar.</h2>
            <p className="section-lede">
              Aşağıdaki alanlarda hem dava takibi hem de danışmanlık hizmeti sunuyoruz.
            </p>
          </div>
          <div className="areas-grid">
            {practiceAreas.map((service) => (
              <article key={service.title} className="area-card">
                <span className="area-ref">Hizmet</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
