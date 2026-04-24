import { Link, useParams } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const year               = new Date().getFullYear()

  const footerLinks = [
    { to: `/${lang}/sobre`,    label: t('nav.about') },
    { to: `/${lang}/projetos`, label: t('nav.projects') },
    { to: `/${lang}/servicos`, label: t('nav.services') },
    { to: `/${lang}/contato`,  label: t('nav.contact') },
  ]

  const servicesList = t('footer.servicesList', { returnObjects: true })

  return (
    <footer className="bg-dark-900 text-white" role="contentinfo">
      <div className="container-site py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to={`/${lang}`} className="inline-flex items-end gap-0.5 mb-6">
              <span className="font-heading text-2xl font-700 text-white">EDIFICA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mb-0.5" aria-hidden="true" />
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold-500 hover:text-gold-400 transition-all duration-300"
                aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold-500 hover:text-gold-400 transition-all duration-300"
                aria-label="LinkedIn">
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-body text-xs font-600 tracking-[0.25em] uppercase text-white/40 mb-6">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="font-body text-sm text-white/60 hover:text-gold-400 transition-colors duration-200 flex items-center gap-2 group">
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-body text-xs font-600 tracking-[0.25em] uppercase text-white/40 mb-6">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3" role="list">
              {Array.isArray(servicesList) && servicesList.map((item) => (
                <li key={item}>
                  <span className="font-body text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs font-600 tracking-[0.25em] uppercase text-white/40 mb-6">
              {t('footer.contact')}
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/60 leading-relaxed">
                  Av. Paulista, 1000<br />São Paulo – SP, 01310-100
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-gold-500 flex-shrink-0" />
                <a href="tel:+551199990000" className="font-body text-sm text-white/60 hover:text-gold-400 transition-colors duration-200">
                  (11) 9999-0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-gold-500 flex-shrink-0" />
                <a href="mailto:contato@construtoraedifica.com.br" className="font-body text-sm text-white/60 hover:text-gold-400 transition-colors duration-200">
                  contato@construtoraedifica.com.br
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {year} Edifica Construtora. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link to={`/${lang}/privacidade`} className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to={`/${lang}/termos`} className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">
              {t('footer.terms')}
            </Link>
            <span className="font-body text-xs text-white/20">CREA SP 000000-0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
