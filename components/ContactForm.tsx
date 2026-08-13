import { useId, useState } from 'react'
import { contact } from '../lib/site'

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', email: '', message: '' }

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Lütfen adınızı yazın.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Geçerli bir e-posta adresi yazın.'
  if (values.message.trim().length < 10)
    errors.message = 'Lütfen en az 10 karakterlik bir açıklama bırakın.'
  return errors
}

/** Sunucudaki PHP alıcısı. Yalnızca All-Inkl'de çalışır. */
const ENDPOINT = '/iletisim.php'

type Status = 'idle' | 'sending' | 'sent' | 'drafted' | 'error'

/**
 * Sunucu erişilemezse (örn. Vercel önizlemesinde PHP yok) kullanılan yedek:
 * ziyaretçinin kendi e-posta uygulamasını hazır taslakla açar.
 */
function buildMailto({ name, email, message }: Fields) {
  const subject = `Web sitesi üzerinden görüşme talebi — ${name.trim()}`
  const body = [
    `Ad Soyad: ${name.trim()}`,
    `E-posta: ${email.trim()}`,
    '',
    message.trim(),
  ].join('\n')
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm() {
  const fieldId = useId()
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  /* Bal küpü — gerçek ziyaretçi göremez, botlar doldurur. */
  const [website, setWebsite] = useState('')

  const update = (field: keyof Fields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setStatus('idle')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website }),
      })

      if (response.ok) {
        setValues(EMPTY)
        setStatus('sent')
        return
      }

      /* 422 sunucunun doğrulaması: mesaj gerçekten hatalı, mailto'ya düşmek yanlış olur. */
      if (response.status === 422) {
        setStatus('error')
        return
      }
      throw new Error(String(response.status))
    } catch {
      /* Sunucu yok ya da ulaşılamıyor: taslağa düş, ziyaretçi elde kalmasın. */
      window.location.href = buildMailto(values)
      setStatus('drafted')
    }
  }

  const describedBy = (field: keyof Fields) => (errors[field] ? `${fieldId}-${field}-error` : undefined)

  return (
    <section className="contact-form" aria-labelledby={`${fieldId}-heading`}>
      <h3 id={`${fieldId}-heading`} className="contact-form-title">
        Mesaj bırakın
      </h3>
      <p className="contact-form-lede">
        Mesajınız doğrudan {contact.email} adresine iletilir. En kısa sürede size geri döneriz.
      </p>

      <form onSubmit={handleSubmit} className="contact-form-inner" noValidate>
        {/* Bal küpü: ekran okuyucudan ve gözden gizli, yalnızca botlar doldurur. */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor={`${fieldId}-website`}>Bu alanı boş bırakın</label>
          <input
            id={`${fieldId}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor={`${fieldId}-name`}>Adınız</label>
          <input
            id={`${fieldId}-name`}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Adınızı yazın"
            value={values.name}
            onChange={update('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
          />
          {errors.name && (
            <span className="field-error" id={`${fieldId}-name-error`}>
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${fieldId}-email`}>E-posta</label>
          <input
            id={`${fieldId}-email`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="ornek@ornek.com"
            value={values.email}
            onChange={update('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
          />
          {errors.email && (
            <span className="field-error" id={`${fieldId}-email-error`}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${fieldId}-message`}>Mesajınız</label>
          <textarea
            id={`${fieldId}-message`}
            name="message"
            rows={5}
            placeholder="Kısa bir açıklama bırakın"
            value={values.message}
            onChange={update('message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message')}
          />
          {errors.message && (
            <span className="field-error" id={`${fieldId}-message-error`}>
              {errors.message}
            </span>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Gönderiliyor…' : 'Mesajı Gönder'}
        </button>

        <p className="form-note" role="status">
          {status === 'sent' && (
            <>
              <strong className="form-ok">Mesajınız iletildi.</strong> En kısa sürede
              dönüş yapacağız.
            </>
          )}
          {status === 'drafted' && (
            <>
              Sunucuya ulaşılamadı, bunun yerine e-posta uygulamanız hazır bir taslakla açıldı.
              Açılmadıysa doğrudan <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine
              yazabilirsiniz.
            </>
          )}
          {status === 'error' && (
            <>
              Mesaj gönderilemedi. Lütfen tekrar deneyin veya{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine yazın.
            </>
          )}
          {(status === 'idle' || status === 'sending') && (
            <>
              Paylaştığınız bilgiler yalnızca talebinizi yanıtlamak için kullanılır. Bu form üzerinden
              gönderilen mesajlar avukat–müvekkil ilişkisi kurmaz.
            </>
          )}
        </p>
      </form>
    </section>
  )
}
