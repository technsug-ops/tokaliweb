import Link from 'next/link'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import { XIcon } from '../components/Icons'
import { social } from '../lib/site'

// Yalnızca istemcide çalışır: localStorage okur ve DOM'a widget basar.
const XTimeline = dynamic(() => import('../components/XTimeline'), {
  ssr: false,
  loading: () => <p className="x-status">Akış hazırlanıyor…</p>,
})

export default function Paylasimlar() {
  return (
    <Layout
      title="Paylaşımlar — TH Tokalı Hukuk"
      description="Tokalı Hukuk & Danışmanlık'ın X hesabındaki güncel paylaşımları ve hukuki değerlendirmeleri."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">Paylaşımlar</p>
          <h1>Güncel değerlendirmeler.</h1>
          <p className="hero-sub">
            Mevzuat değişiklikleri ve güncel kararlar üzerine notlar X hesabımızdan paylaşılır. Aşağıdaki
            akış doğrudan {social.x.label} hesabından gelir.
          </p>
          <div className="hero-actions">
            <a className="btn btn-x" href={social.x.url} target="_blank" rel="noopener noreferrer">
              <XIcon className="btn-icon" />
              X&rsquo;te Takip Edin
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Görüşme Talep Edin
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">X Akışı</span>
            <h2>{social.x.label}</h2>
            <p className="section-lede">
              Paylaşımlar genel bilgilendirme amaçlıdır; somut bir olaya ilişkin hukuki görüş yerine
              geçmez ve avukat–müvekkil ilişkisi kurmaz.
            </p>
          </div>
          <XTimeline />
        </div>
      </section>
    </Layout>
  )
}
