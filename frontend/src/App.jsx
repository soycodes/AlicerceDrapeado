import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ScrollToTop from './components/ui/ScrollToTop'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLangFromPath } from './i18n'

// Lazy-loaded pages
const HomePage     = lazy(() => import('./pages/HomePage'))
const SobrePage    = lazy(() => import('./pages/SobrePage'))
const ServicosPage = lazy(() => import('./pages/ServicosPage'))
const ProjetosPage = lazy(() => import('./pages/ProjetosPage'))
const ContatoPage  = lazy(() => import('./pages/ContatoPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/**
 * LanguageRoute — validates :lang param and syncs i18n.
 * If the lang is invalid, redirects to the default locale.
 */
function LanguageRoute({ children }) {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const navigate  = useNavigate()

  const isValid = SUPPORTED_LANGUAGES.some(l => l.code === lang?.toLowerCase())

  useEffect(() => {
    if (!isValid) return
    const code = lang.toLowerCase()
    if (i18n.language !== code) {
      i18n.changeLanguage(code)
    }
  }, [lang, i18n, isValid])

  if (!isValid) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />
  }

  return children
}

/**
 * RootRedirect — redirects bare "/" to the correct language prefix.
 */
function RootRedirect() {
  const { i18n } = useTranslation()
  const lang = i18n.language || DEFAULT_LANGUAGE
  return <Navigate to={`/${lang}`} replace />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Root → redirect to detected language */}
          <Route path="/" element={<RootRedirect />} />

          {/* Localised routes: /:lang/* */}
          <Route
            path="/:lang"
            element={
              <LanguageRoute>
                <Layout><HomePage /></Layout>
              </LanguageRoute>
            }
          />
          <Route
            path="/:lang/sobre"
            element={
              <LanguageRoute>
                <Layout><SobrePage /></Layout>
              </LanguageRoute>
            }
          />
          <Route
            path="/:lang/servicos"
            element={
              <LanguageRoute>
                <Layout><ServicosPage /></Layout>
              </LanguageRoute>
            }
          />
          <Route
            path="/:lang/projetos"
            element={
              <LanguageRoute>
                <Layout><ProjetosPage /></Layout>
              </LanguageRoute>
            }
          />
          <Route
            path="/:lang/contato"
            element={
              <LanguageRoute>
                <Layout><ContatoPage /></Layout>
              </LanguageRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
