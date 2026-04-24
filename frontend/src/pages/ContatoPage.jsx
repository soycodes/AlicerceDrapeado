import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SEOHead from '../hooks/useSEO'
import ContatoSection from '../components/sections/ContatoSection'

const HERO_IMG = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80&auto=format&fit=crop'

export default function ContatoPage() {
  const { t } = useTranslation()
  return (
    <>
      <SEOHead titleKey="seo.contactTitle" descKey="seo.contactDesc" pagePath="/contato" />
      <section className="relative h-[45vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Entre em contato" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
        </div>
        <div className="container-site relative z-10 pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-label text-gold-400">{t('contact.label')}</div>
            <h1 className="section-title-light mt-4">{t('nav.contact')}</h1>
          </motion.div>
        </div>
      </section>
      <ContatoSection />
    </>
  )
}
