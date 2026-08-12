import Layout from '../components/Layout'

const strengths = [
  {
    title: 'Tecrübe',
    description: 'Ceza, infaz, iş, idare ve kira hukuku alanlarında bütünlüklü çözüm önerileri.',
  },
  {
    title: 'Özelleştirilmiş yaklaşım',
    description:
      'Her davanın kendine özgü olduğu fikriyle, süreci sizin hedeflerinize göre şekillendiriyoruz.',
  },
  {
    title: 'Yasal güven',
    description:
      'Hukuki belgeler ve stratejiler, mevzuat ile uyumlu şekilde hazırlanır; haklarınız güçlü bir zemine oturtulur.',
  },
]

export default function About() {
  return (
    <Layout
      title="Hakkında — TH Tokalı Hukuk"
      description="Tokalı Hukuk & Danışmanlık ofisinin deneyimi, yaklaşımı ve misyonu."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">Hakkımızda</p>
          <h1>Hukukun dengesi, deneyimin istikameti.</h1>
          <p className="hero-sub">
            Tokalı Hukuk &amp; Danışmanlık, her dosyada titizlik ve adanmışlık sunar. Hukuki hedefinize
            ulaşmak için strateji, şeffaflık ve dikkatli süreç yönetimi sağlar.
          </p>
        </div>
      </section>

      <section className="section" id="nasil-calisir">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">Misyon</span>
            <h2>Hukuki çözümleri açıklık, güven ve kararlılıkla kuruyoruz.</h2>
            <p className="section-lede">
              Zorlu davalarda doğru yönlendirme ile beklentilerinizi netleştirmek, size gerçekçi tavsiyeler
              sunmak ve süreci kontrollü biçimde yürütmek temel önceliğimizdir.
            </p>
          </div>
          <div className="approach-grid">
            {strengths.map((item) => (
              <div key={item.title} className="approach-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
