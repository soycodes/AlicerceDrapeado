import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SEOHead from '../hooks/useSEO'

export default function NotFoundPage() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  return (
    <>
      <SEOHead titleKey="notFound.title" descKey="notFound.desc" pagePath="/404" />
      <section className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          <span className="font-heading text-[12rem] text-white/5 leading-none block">404</span>
          <h1 className="font-heading text-4xl text-white -mt-12 mb-4">{t('notFound.title')}</h1>
          <p className="font-body text-white/40 text-base mb-10">{t('notFound.desc')}</p>
          <Link to={`/${lang}`} className="btn-primary">{t('notFound.cta')}</Link>
        </motion.div>
      </section>
    </>
  )
}
