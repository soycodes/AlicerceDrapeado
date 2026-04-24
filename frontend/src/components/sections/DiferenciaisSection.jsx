import { Shield, Clock, Award, Users, Leaf, BarChart2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '../ui/AnimatedSection'

const icons = [Shield, Clock, Award, Users, Leaf, BarChart2]

export default function DiferenciaisSection() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const items              = t('differentials.items', { returnObjects: true })

  return (
    <section className="py-24 md:py-36 bg-light-100 overflow-hidden">
      <div className="container-site">
        <AnimatedSection animation="fadeUp" className="text-center max-w-2xl mx-auto mb-20">
          <div className="section-label justify-center">{t('differentials.label')}</div>
          <h2 className="section-title mt-4">
            {t('differentials.title1')}<br />
            <em className="not-italic text-gold-500">{t('differentials.title2')}</em>
          </h2>
          <p className="font-body text-dark-500 text-base leading-relaxed mt-6">{t('differentials.subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(items) && items.map((d, i) => {
            const Icon = icons[i]
            return (
              <AnimatedSection key={d.title} animation="fadeUp" delay={i * 0.1}>
                <article className="group p-8 border border-light-300 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-500 bg-white">
                  <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                    {Icon && <Icon size={20} className="text-gold-500 group-hover:text-white transition-colors duration-300" />}
                  </div>
                  <h3 className="font-heading text-2xl text-dark-900 mb-3">{d.title}</h3>
                  <p className="font-body text-dark-500 text-sm leading-relaxed">{d.desc}</p>
                </article>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection animation="fadeUp" delay={0.2} className="mt-20">
          <div className="bg-dark-900 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-3">
                {t('differentials.ctaTitle')}<br />
                <em className="not-italic text-gold-400">{t('differentials.ctaTitle2')}</em>
              </h3>
              <p className="font-body text-white/50 text-sm">{t('differentials.ctaSubtitle')}</p>
            </div>
            <Link to={`/${lang}/contato`} className="btn-primary whitespace-nowrap flex-shrink-0">
              {t('differentials.ctaBtn')}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
