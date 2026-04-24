import { Link, useParams } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '../ui/AnimatedSection'
import { projetos } from '../../services/projetosData'

export default function ProjetosSection() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const destaques          = projetos.slice(0, 3)

  return (
    <section className="py-24 md:py-36 bg-light-200 overflow-hidden">
      <div className="container-site">
        <AnimatedSection animation="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label">{t('projects.label')}</div>
            <h2 className="section-title mt-4">
              {t('projects.title1')}<br />
              <em className="not-italic text-gold-500">{t('projects.title2')}</em> {t('projects.title3')}
            </h2>
          </div>
          <Link to={`/${lang}/projetos`} className="btn-outline group self-start md:self-auto">
            {t('projects.ctaAll')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200 ml-2" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {destaques.map((projeto, i) => (
            <AnimatedSection key={projeto.id} animation="scaleIn" delay={i * 0.1}
              className={i === 0 ? 'md:col-span-7' : 'md:col-span-5'}>
              <article className="group relative overflow-hidden bg-dark-900 cursor-pointer">
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                  <img src={projeto.image} alt={projeto.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-body text-[10px] text-gold-400 tracking-[0.25em] uppercase mb-2 block">{projeto.categoria}</span>
                  <h3 className="font-heading text-2xl md:text-3xl text-white mb-2 leading-tight">{projeto.titulo}</h3>
                  <div className="flex items-center gap-1 text-white/50 font-body text-xs">
                    <MapPin size={11} /><span>{projeto.local}</span>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
