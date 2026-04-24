import { motion } from 'framer-motion'
import { Building2, Home, Wrench, BarChart3, Factory, HardHat, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../hooks/useSEO'
import AnimatedSection from '../components/ui/AnimatedSection'

const icons = [Home, Building2, Factory, Wrench, BarChart3, HardHat]
const images = [
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80&auto=format&fit=crop',
]
const bullets = [
  ['Casas de alto padrão','Condomínios fechados','Edifícios residenciais','Chalés e casas de campo'],
  ['Edifícios corporativos','Centros comerciais','Hotéis e resorts','Restaurantes e bares'],
  ['Galpões logísticos','Fábricas e plantas','Centros de distribuição','Hangares e terminais'],
  ['Retrofit de fachadas','Modernização de instalações','Reformas internas','Acessibilidade'],
  ['Planejamento e cronograma','Controle de orçamento','Gestão de fornecedores','Relatórios periódicos'],
  ['Laudos estruturais','Vistorias de imóveis','Análise de projetos','Conformidade NR-18'],
]

const HERO_IMG = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop'

export default function ServicosPage() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()
  const items              = t('services.items', { returnObjects: true })

  return (
    <>
      <SEOHead titleKey="seo.servicesTitle" descKey="seo.servicesDesc" pagePath="/servicos" />
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Canteiro de obras" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/20" />
        </div>
        <div className="container-site relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-label text-gold-400">{t('services.label')}</div>
            <h1 className="section-title-light mt-4">{t('nav.services')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-36 bg-light-100">
        <div className="container-site space-y-24">
          {Array.isArray(items) && items.map((s, i) => {
            const Icon = icons[i]
            return (
              <AnimatedSection key={s.title} animation="fadeUp" delay={0.1}>
                <article className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                  <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img src={images[i]} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-6 left-6 w-14 h-14 bg-gold-500 flex items-center justify-center">
                      {Icon && <Icon size={22} className="text-white" />}
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="font-heading text-4xl md:text-5xl text-dark-900 mb-6 leading-tight">{s.title}</h2>
                    <p className="font-body text-dark-500 text-base leading-relaxed mb-8">{s.desc}</p>
                    <ul className="space-y-3 mb-10">
                      {bullets[i]?.map(item => (
                        <li key={item} className="flex items-center gap-3 font-body text-sm text-dark-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      <section className="py-20 bg-dark-900">
        <div className="container-site text-center">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title-light mb-6">{t('differentials.ctaTitle')} {t('differentials.ctaTitle2')}</h2>
            <p className="font-body text-white/50 text-base max-w-xl mx-auto mb-10">{t('differentials.ctaSubtitle')}</p>
            <Link to={`/${lang}/contato`} className="btn-primary">{t('differentials.ctaBtn')}</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
