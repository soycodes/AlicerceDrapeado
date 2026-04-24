import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Building2, Home, Wrench, BarChart3, Factory, HardHat } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '../ui/AnimatedSection'

const icons = [Home, Building2, Factory, Wrench, BarChart3, HardHat]

export default function ServicosSection() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const items              = t('services.items', { returnObjects: true })

  return (
    <section className="py-24 md:py-36 bg-dark-900 overflow-hidden" aria-label={t('services.label')}>
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <AnimatedSection animation="fadeUp">
            <div className="section-label text-gold-400">{t('services.label')}</div>
            <h2 className="section-title-light mt-4">
              {t('services.title1')}<br />
              <em className="not-italic text-gold-400">{t('services.title2')}</em>
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fadeIn" delay={0.2} className="md:max-w-xs">
            <p className="font-body text-white/50 text-base leading-relaxed">{t('services.subtitle')}</p>
            <Link to={`/${lang}/servicos`} className="btn-outline-light mt-6 text-xs py-3 px-6 inline-flex">
              {t('services.ctaAll')} <ArrowRight size={14} className="ml-2" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {Array.isArray(items) && items.map((s, i) => {
            const Icon = icons[i]
            return (
              <AnimatedSection key={s.title} animation="fadeUp" delay={i * 0.08}>
                <article className="bg-dark-900 p-10 group hover:bg-dark-800 transition-colors duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center mb-8 group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-all duration-300">
                    {Icon && <Icon size={20} className="text-gold-500" />}
                  </div>
                  <h3 className="font-heading text-2xl text-white mb-4 leading-tight">{s.title}</h3>
                  <p className="font-body text-white/40 text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="w-8 h-px bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-300 mt-8" aria-hidden="true" />
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
