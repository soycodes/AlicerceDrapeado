/**
 * src/i18n.js
 * ─────────────────────────────────────────────────────────────────
 * Configuração centralizada do i18next com:
 *  • 4 idiomas: pt-BR, pt, es, en
 *  • Detecção automática pelo path da URL (/pt-br, /pt, /es, /en)
 *  • Persistência no localStorage
 *  • Fallback para pt-BR
 *  • Sem texto hardcoded nos componentes
 * ─────────────────────────────────────────────────────────────────
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBR from './locales/pt-br.json'
import pt   from './locales/pt.json'
import es   from './locales/es.json'
import en   from './locales/en.json'

// ─── Suported locales ─────────────────────────────────────────────
export const SUPPORTED_LANGUAGES = [
  { code: 'pt-br', label: 'PT-BR', flag: '🇧🇷', full: 'Português (BR)' },
  { code: 'pt',    label: 'PT',    flag: '🇵🇹', full: 'Português (PT)' },
  { code: 'es',    label: 'ES',    flag: '🇪🇸', full: 'Español' },
  { code: 'en',    label: 'EN',    flag: '🇺🇸', full: 'English' },
]

export const DEFAULT_LANGUAGE = 'pt-br'

/**
 * Reads the current language from the URL prefix.
 * /pt-br/... → 'pt-br' | /en/... → 'en' | / → null
 */
export function getLangFromPath(pathname = window.location.pathname) {
  const segment = pathname.split('/')[1]?.toLowerCase()
  return SUPPORTED_LANGUAGES.find(l => l.code === segment)?.code ?? null
}

/**
 * Returns the persisted language from localStorage, if valid.
 */
function getStoredLanguage() {
  const stored = localStorage.getItem('edifica_lang')
  return SUPPORTED_LANGUAGES.find(l => l.code === stored)?.code ?? null
}

/**
 * Detects the best language to use:
 * 1. URL path  2. localStorage  3. Browser preference  4. Default fallback
 */
function detectLanguage() {
  // 1. URL path takes highest priority (SEO + explicit user choice)
  const fromPath = getLangFromPath()
  if (fromPath) return fromPath

  // 2. Persisted preference
  const fromStore = getStoredLanguage()
  if (fromStore) return fromStore

  // 3. Browser language
  const browser = (navigator.language || navigator.languages?.[0] || '').toLowerCase()
  if (browser.startsWith('pt-br') || browser === 'pt-br') return 'pt-br'
  if (browser.startsWith('pt'))  return 'pt'
  if (browser.startsWith('es'))  return 'es'
  if (browser.startsWith('en'))  return 'en'

  // 4. Fallback
  return DEFAULT_LANGUAGE
}

// ─── Init ─────────────────────────────────────────────────────────
i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-br': { translation: ptBR },
      'pt':    { translation: pt   },
      'es':    { translation: es   },
      'en':    { translation: en   },
    },
    lng:            detectLanguage(),
    fallbackLng:    DEFAULT_LANGUAGE,
    interpolation:  { escapeValue: false }, // React already escapes
    react:          { useSuspense: true },
  })

/**
 * Changes the active language, persists to localStorage,
 * and navigates to the correct URL prefix.
 */
export function changeLanguage(langCode, navigate, currentPath) {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === langCode)
  if (!lang) return

  i18n.changeLanguage(langCode)
  localStorage.setItem('edifica_lang', langCode)

  // Rebuild URL: strip current lang prefix, add new one
  const withoutPrefix = stripLangPrefix(currentPath)
  navigate(`/${langCode}${withoutPrefix}`, { replace: true })
}

/**
 * Strips the language prefix from a pathname.
 * '/pt-br/sobre' → '/sobre'  |  '/sobre' → '/sobre'
 */
export function stripLangPrefix(pathname) {
  const segment = pathname.split('/')[1]?.toLowerCase()
  const isLang = SUPPORTED_LANGUAGES.some(l => l.code === segment)
  if (isLang) {
    const rest = pathname.slice(segment.length + 1)
    return rest || '/'
  }
  return pathname
}

export default i18n
