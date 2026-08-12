import Link from 'next/link'
import Layout from '../components/Layout'
import { contact, site } from '../lib/site'

export default function Kvkk() {
  return (
    <Layout
      title="KVKK Aydınlatma Metni — TH Tokalı Hukuk"
      description="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Tokalı Hukuk & Danışmanlık aydınlatma metni."
    >
      <section className="section hero hero-small">
        <div className="shell hero-inner">
          <p className="hero-eyebrow">Yasal</p>
          <h1>KVKK Aydınlatma Metni</h1>
          <p className="hero-sub">
            6698 sayılı Kişisel Verilerin Korunması Kanunu&rsquo;nun 10. maddesi uyarınca hazırlanmıştır.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="legal">
            <p className="legal-updated">Son güncelleme: {site.copyrightYear}</p>

            <h2>1. Veri Sorumlusu</h2>
            <p>
              Kişisel verileriniz, veri sorumlusu sıfatıyla {site.name} tarafından aşağıda açıklanan
              kapsamda işlenmektedir. İletişim: <a href={`mailto:${contact.email}`}>{contact.email}</a>,{' '}
              {contact.address}.
            </p>

            <h2>2. İşlenen Kişisel Veriler</h2>
            <p>
              Bu internet sitesi üzerinden yalnızca sizin ilettiğiniz veriler işlenir. İletişim formunu
              kullandığınızda form, tarayıcınızdaki e-posta uygulamasında bir taslak oluşturur; verileriniz
              site sunucusunda saklanmaz ve bir veri tabanına kaydedilmez.
            </p>
            <ul>
              <li>Kimlik verisi: ad ve soyad.</li>
              <li>İletişim verisi: e-posta adresi, telefon veya WhatsApp numarası.</li>
              <li>Talebinizin içeriğinde tarafınızca paylaşılan diğer bilgiler.</li>
            </ul>

            <h2>3. İletişim Kanallarına İlişkin Özel Açıklamalar</h2>
            <p>
              <strong>WhatsApp:</strong> WhatsApp üzerinden yazmayı tercih ederseniz mesajlarınız uçtan uca
              şifrelenmiş olsa da, numaranız ve iletişim üstverisi hizmet sağlayıcı WhatsApp Ireland Ltd.
              (Meta) tarafından kendi politikaları kapsamında işlenir ve bu kapsamda yurt dışına aktarım söz
              konusu olur. Bu kanalı kullanmak tamamen isteğinize bağlıdır; hassas bilgilerinizi ve dosya
              ayrıntılarını paylaşmak için telefon görüşmesi veya yüz yüze görüşmeyi tercih etmenizi öneririz.
            </p>
            <p>
              <strong>X (Twitter):</strong> Paylaşımlar sayfasındaki X akışı yalnızca sizin onayınızla
              yüklenir ve onay verdiğinizde IP adresiniz X Corp. ile paylaşılır. Ayrıntı için{' '}
              <Link href="/cerez-politikasi">Çerez Politikası</Link> sayfasına bakınız. X üzerinden bize
              gönderdiğiniz mesajlar da ilgili platformun koşullarına tabidir.
            </p>
            <p>
              Hangi kanalı kullanırsanız kullanın, ilk iletişim tek başına avukat–müvekkil ilişkisi kurmaz;
              gizlilik yükümlülüğümüz ise ilk görüşmeden itibaren geçerlidir.
            </p>

            <h2>4. İşleme Amaçları</h2>
            <ul>
              <li>Başvuru ve görüşme taleplerinin karşılanması, tarafınıza dönüş sağlanması.</li>
              <li>Hukuki danışmanlık ve vekillik hizmetlerinin yürütülmesi.</li>
              <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi.</li>
            </ul>

            <h2>5. Hukuki Sebep ve Toplama Yöntemi</h2>
            <p>
              Verileriniz; e-posta, telefon, WhatsApp veya X üzerinden tarafınızca iletilen mesajlar yoluyla
              elektronik ortamda toplanır. İşleme, Kanun&rsquo;un 5. maddesinde yer alan &ldquo;bir
              sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&rdquo;, &ldquo;hukuki
              yükümlülüğün yerine getirilmesi&rdquo; ve &ldquo;meşru menfaat&rdquo; hukuki sebeplerine
              dayanır. Paylaşımlar sayfasındaki X akışı bakımından ise dayanak, Kanun&rsquo;un 5/1.
              maddesindeki açık rızanızdır; bu rızayı dilediğiniz an geri alabilirsiniz.
            </p>

            <h2>6. Aktarım</h2>
            <p>
              Kişisel verileriniz, hukuki yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve
              kuruluşları ile adli mercilere aktarılabilir. Bunun dışında pazarlama veya benzeri amaçlarla
              üçüncü kişilere aktarılmaz.
            </p>
            <p>
              <strong>Yurt dışına aktarım:</strong> Büromuz kendiliğinden yurt dışına veri aktarımı yapmaz.
              Ancak yukarıda 3. bölümde açıklandığı üzere, WhatsApp üzerinden iletişim kurmayı seçmeniz veya
              X akışının yüklenmesine onay vermeniz hâlinde, ilgili veriler bu platformların yurt dışındaki
              sunucularına aktarılmış olur. Bu aktarımlar tercihinize bağlıdır; bunun yerine telefon veya
              e-posta kanallarını kullanabilirsiniz.
            </p>

            <h2>7. Saklama Süresi</h2>
            <p>
              Verileriniz, ilgili mevzuatta öngörülen süreler ile Avukatlık Kanunu ve ilgili düzenlemelerden
              doğan saklama yükümlülükleri boyunca muhafaza edilir; sürelerin dolmasının ardından silinir,
              yok edilir veya anonim hâle getirilir.
            </p>

            <h2>8. İlgili Kişinin Hakları</h2>
            <p>
              Kanun&rsquo;un 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, buna
              ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
              eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini, şartları oluştuğunda silinmesini veya
              yok edilmesini isteme, bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini
              isteme, işlenen verilerin münhasıran otomatik sistemlerle analizi sonucu aleyhinize bir sonuç
              doğmasına itiraz etme ve kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın
              giderilmesini talep etme haklarına sahipsiniz.
            </p>
            <p>
              Taleplerinizi <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine iletebilirsiniz.
              Başvurunuz en geç otuz gün içinde sonuçlandırılır.
            </p>

            <div className="legal-callout">
              <strong>Yayın öncesi tamamlanacak:</strong> Veri sorumlusunun ticari unvanı, açık adresi, varsa
              VERBİS kayıt bilgisi ve bağlı bulunulan baro/sicil numarası bu metne eklenmelidir. Metnin
              büronun fiili veri işleme süreçleriyle birebir örtüştüğü teyit edilmelidir.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
