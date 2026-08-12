import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { legalLinks, navLinks, site, social, whatsapp, whatsappUrl } from '../lib/site'
import { WhatsAppIcon, XIcon } from './Icons'
import ThemeSwitch from './ThemeSwitch'

interface LayoutProps {
  title?: string
  description?: string
  children: React.ReactNode
}

export default function Layout({ title = site.defaultTitle, description, children }: LayoutProps) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  const metaDescription = description || site.defaultDescription
  const canonical = site.url + (router.asPath.split(/[?#]/)[0] === '/' ? '' : router.asPath.split(/[?#]/)[0])

  // Menü açıkken rota değişirse (veya masaüstüne geçilirse) menü açık kalmasın.
  useEffect(() => {
    const close = () => setMenuOpen(false)
    router.events.on('routeChangeComplete', close)
    return () => router.events.off('routeChangeComplete', close)
  }, [router.events])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('no-scroll')
    }
  }, [menuOpen])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:locale" content={site.locale} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>

      <a href="#main" className="skip-link">
        İçeriğe geç
      </a>

      <div className="margin-rule" aria-hidden="true" />

      <header className="header">
        <div className="shell header-inner">
          <Link href="/" className="wordmark">
            <strong>{site.shortName}</strong>
            <span>{site.name}</span>
          </Link>

          <nav className={`nav${menuOpen ? ' nav-open' : ''}`} id={menuId} aria-label="Ana menü">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={link.href === '/contact' ? 'nav-cta' : ''}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              className="nav-social"
              href={social.x.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`X'te takip edin: ${social.x.label}`}
            >
              <XIcon className="social-icon" />
              <span className="nav-social-label">X&rsquo;te Takip Et</span>
            </a>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <main id="main">{children}</main>

      <footer className="footer">
        <div className="shell footer-inner">
          <span className="footer-legal">
            © {site.copyrightYear} {site.name} — {site.domain}
          </span>
          <nav aria-label="Yasal bağlantılar">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="footer-social">
            <a
              href={social.x.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`X'te ${social.x.label}`}
            >
              <XIcon className="social-icon" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp: ${whatsapp.display}`}
            >
              <WhatsAppIcon className="social-icon" />
            </a>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp üzerinden yazın: ${whatsapp.display}`}
      >
        <WhatsAppIcon className="whatsapp-fab-icon" />
        <span className="whatsapp-fab-label">WhatsApp</span>
      </a>

      {process.env.NODE_ENV === 'development' && <ThemeSwitch />}
    </>
  )
}
