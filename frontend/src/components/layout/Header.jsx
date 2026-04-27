import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../ui/LanguageSwitcher'

export default function Header() {
  const { t }        = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const location     = useLocation()
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHomePage = location.pathname === `/${lang}`

  // Nav links use localised prefix
  const navLinks = [
    { to: `/${lang}`,          label: t('nav.home'),     end: true },
    { to: `/${lang}/sobre`,    label: t('nav.about') },
    { to: `/${lang}/servicos`, label: t('nav.services') },
    { to: `/${lang}/projetos`, label: t('nav.projects') },
    { to: `/${lang}/contato`,  label: t('nav.contact') },
  ]

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => { setMobileOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const headerBg = scrolled || !isHomePage
    ? 'bg-dark-900/98 backdrop-blur-md shadow-2xl'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`} role="banner">
      <div className="container-site">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Logo */}
          <Link to={`/${lang}`} className="flex items-center gap-3 group" aria-label="Alicerce Drapeado Construtora">
            <div className="flex items-end gap-0.5">
              <span className="font-heading text-3xl font-700 text-white leading-none tracking-tight">
                ALICERCE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mb-1 group-hover:scale-150 transition-transform duration-300" aria-hidden="true" />
            </div>
            <span className="hidden sm:block text-white/30 text-xs font-body tracking-[0.25em] uppercase leading-none border-l border-white/20 pl-3 mt-0.5">
              DRAPEADO
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `font-body text-sm tracking-widest uppercase transition-colors duration-200 relative
                  after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-gold-500 after:transition-all after:duration-300
                  ${isActive ? 'text-gold-400 after:w-full' : 'text-white/70 hover:text-white after:w-0 hover:after:w-full'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+351926502295"
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-gold-400 transition-colors duration-200 font-body text-sm"
            >
              <Phone size={14} />
              <span>(351) 926 502 295</span>
            </a>

            {/* Language switcher */}
            <LanguageSwitcher variant="light" />

            <Link to={`/${lang}/contato`} className="hidden lg:block btn-primary text-xs py-3 px-6">
              {t('nav.cta')}
            </Link>

            <button
              className="lg:hidden text-white p-2 rounded transition-colors hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-dark-900 border-t border-white/10 overflow-hidden"
          >
            <nav className="container-site py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `font-heading text-4xl transition-colors duration-200 block
                      ${isActive ? 'text-gold-400' : 'text-white/80 hover:text-white'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <a href="tel:+351926502295" className="text-white/50 font-body text-sm flex items-center gap-2">
                  <Phone size={14} /> (351) 926 502 295
                </a>
                <div className="flex items-center gap-4">
                  <LanguageSwitcher variant="light" />
                  <Link to={`/${lang}/contato`} className="btn-primary text-xs flex-1 justify-center">
                    {t('nav.cta')}
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
