/**
 * useSEO.jsx — SEO head with hreflang alternate links for all supported languages.
 * Uses react-helmet-async.
 */
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../i18n'

const BASE_URL = 'https://www.alicercedrapeado.com'

/**
 * @param {string} titleKey   - i18n key e.g. 'seo.homeTitle'
 * @param {string} descKey    - i18n key e.g. 'seo.homeDesc'
 * @param {string} pagePath   - path without lang prefix, e.g. '' | '/sobre' | '/contato'
 * @param {string} ogImage
 */
export default function SEOHead({ titleKey, descKey, pagePath = '', ogImage = `${BASE_URL}/og-image.jpg` }) {
  const { t, i18n } = useTranslation()

  const title       = t(titleKey)
  const description = t(descKey)
  const lang        = i18n.language || 'pt-br'
  const canonical   = `${BASE_URL}/${lang}${pagePath}`

  // Map our lang codes to BCP-47 for hreflang
  const hreflangMap = { 'pt-br': 'pt-BR', 'pt': 'pt-PT', 'es': 'es', 'en': 'en' }

  return (
    <Helmet>
      <html lang={hreflangMap[lang] || lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternate links — essential for multilingual SEO */}
      {SUPPORTED_LANGUAGES.map(l => (
        <link
          key={l.code}
          rel="alternate"
          hrefLang={hreflangMap[l.code] || l.code}
          href={`${BASE_URL}/${l.code}${pagePath}`}
        />
      ))}
      {/* x-default points to the primary variant */}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/pt-br${pagePath}`} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:locale"      content={hreflangMap[lang]?.replace('-', '_') || lang} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  )
}
