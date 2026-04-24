import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '../ui/AnimatedSection'

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop'

export default function SobrePreviewSection() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const differentials      = t('about.differentials', { returnObjects: true })

  return (
    <section id="sobre-preview" className="py-24 md:py-36 bg-light-100 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <AnimatedSection animation="slideRight" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={ABOUT_IMAGE} alt="Equipe da Edifica" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold-500/30 -z-10" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-4 left-8 bg-dark-900 text-white px-8 py-6 shadow-2xl" aria-hidden="true">
              <span className="font-heading text-5xl text-gold-400 block leading-none">20+</span>
              <span className="font-body text-xs text-white/50 tracking-widest uppercase mt-1 block">{t('about.badge')}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft" delay={0.15}>
            <div className="section-label">{t('about.label')}</div>
            <h2 className="section-title mt-4 mb-8">
              {t('about.title1')}<br />
              <em className="not-italic text-gold-500">{t('about.title2')}</em> {t('about.title3')}
            </h2>
            <p className="font-body text-dark-500 text-base leading-relaxed mb-6">{t('about.p1')}</p>
            <p className="font-body text-dark-500 text-base leading-relaxed mb-10">{t('about.p2')}</p>
            <ul className="space-y-3 mb-12" role="list">
              {Array.isArray(differentials) && differentials.map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-sm text-dark-700">
                  <CheckCircle size={16} className="text-gold-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={`/${lang}/sobre`} className="btn-outline group">
              {t('about.cta')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
