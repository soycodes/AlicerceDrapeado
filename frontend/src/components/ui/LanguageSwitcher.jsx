/**
 * LanguageSwitcher.jsx
 * Dropdown elegante para troca de idioma com persistência e navegação por URL.
 */
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SUPPORTED_LANGUAGES, changeLanguage } from '../../i18n'

export default function LanguageSwitcher({ variant = 'light' }) {
  const { i18n } = useTranslation()
  const navigate  = useNavigate()
  const location  = useLocation()
  const [open, setOpen]   = useState(false)
  const dropdownRef       = useRef(null)

  const current = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language)
    ?? SUPPORTED_LANGUAGES[0]

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (code) => {
    setOpen(false)
    changeLanguage(code, navigate, location.pathname)
  }

  const isLight = variant === 'light'
  const btnBase  = isLight
    ? 'text-white/70 hover:text-white border-white/20 hover:border-white/50'
    : 'text-dark-700 hover:text-dark-900 border-dark-300 hover:border-dark-500'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Selecionar idioma"
        className={`flex items-center gap-1.5 px-3 py-2 border transition-all duration-200 font-body text-xs tracking-widest uppercase ${btnBase}`}
      >
        <Globe size={12} />
        <span>{current.label}</span>
        <ChevronDown
          size={11}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Idiomas disponíveis"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-white/10 shadow-2xl overflow-hidden z-50"
          >
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = lang.code === i18n.language
              return (
                <li key={lang.code}>
                  <button
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 font-body text-xs tracking-wider transition-colors duration-150
                      ${isActive
                        ? 'bg-gold-500/20 text-gold-400'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.full}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
