import { motion } from 'framer-motion'
import { CheckCircle, Users, Building2, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import SEOHead from '../hooks/useSEO'
import AnimatedSection from '../components/ui/AnimatedSection'

const numeros = [
  { icon: Building2,  valor: '+200', labelKey: 'hero.stats.projects' },
  { icon: Users,      valor: '+50',  labelKey: 'about.badge' },
  { icon: TrendingUp, valor: '97%',  labelKey: 'hero.stats.satisfaction' },
]

const HERO_IMG = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop'
const TEAM_IMG = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop'

export default function SobrePage() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const differentials      = t('about.differentials', { returnObjects: true })

  return (
    <>
      <SEOHead titleKey="seo.aboutTitle" descKey="seo.aboutDesc" pagePath="/sobre" />

      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Equipe Alicerce Drapeado" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/30" />
        </div>
        <div className="container-site relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-label text-gold-400">{t('about.label')}</div>
            <h1 className="section-title-light mt-4">{t('nav.about')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-36 bg-light-100">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideRight">
              <div className="section-label">{t('about.label')}</div>
              <h2 className="section-title mt-4 mb-8">
                {t('about.title1')}<br /><em className="not-italic text-gold-500">{t('about.title2')}</em> {t('about.title3')}
              </h2>
              <p className="font-body text-dark-500 text-base leading-relaxed mb-6">{t('about.p1')}</p>
              <p className="font-body text-dark-500 text-base leading-relaxed mb-10">{t('about.p2')}</p>
              {Array.isArray(differentials) && differentials.map(v => (
                <div key={v} className="flex items-center gap-3 mb-3 font-body text-sm text-dark-700">
                  <CheckCircle size={16} className="text-gold-500 flex-shrink-0" />{v}
                </div>
              ))}
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={TEAM_IMG} alt="Time da Alicerce Drapeado" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-500/30" aria-hidden="true" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 max-w-3xl mx-auto">
            {numeros.map(({ icon: Icon, valor, labelKey }, i) => (
              <AnimatedSection key={labelKey} animation="fadeUp" delay={i * 0.1}>
                <div className="bg-dark-800 p-10 text-center">
                  <Icon size={24} className="text-gold-500 mx-auto mb-4" />
                  <span className="font-heading text-5xl text-gold-400 block mb-2">{valor}</span>
                  <span className="font-body text-xs text-white/40 tracking-widest uppercase">{t(labelKey)}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
