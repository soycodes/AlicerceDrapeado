import { motion } from 'framer-motion'
import { CheckCircle, Users, Building2, Award, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import SEOHead from '../hooks/useSEO'
import AnimatedSection from '../components/ui/AnimatedSection'

const timeline = [
  { ano: '2004', titulo: 'Fundação',             desc: 'Nasce a Edifica Construtora com foco em obras residenciais na Grande São Paulo.' },
  { ano: '2008', titulo: 'Expansão Comercial',   desc: 'Entrada no segmento comercial com a entrega do primeiro centro empresarial.' },
  { ano: '2012', titulo: 'Certificação ISO 9001', desc: 'Conquistamos a certificação de qualidade, elevando nossos processos ao padrão internacional.' },
  { ano: '2016', titulo: 'Projetos Industriais', desc: 'Início das operações em galpões logísticos e complexos industriais.' },
  { ano: '2020', titulo: 'Sustentabilidade',     desc: 'Adoção do programa de construção sustentável com redução de 30% no desperdício.' },
  { ano: '2024', titulo: '20 anos & além',       desc: 'Comemoramos duas décadas e mais de 200 projetos entregues com excelência.' },
]

const numeros = [
  { icon: Building2,  valor: '+200', labelKey: 'hero.stats.projects' },
  { icon: Users,      valor: '+150', labelKey: 'about.badge' },
  { icon: Award,      valor: '12',   labelKey: 'hero.stats.awards' },
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
          <img src={HERO_IMG} alt="Equipe Edifica" className="w-full h-full object-cover" />
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
                <img src={TEAM_IMG} alt="Time da Edifica" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-500/30" aria-hidden="true" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
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

      <section className="py-24 md:py-36 bg-light-200">
        <div className="container-site">
          <AnimatedSection animation="fadeUp" className="text-center mb-20">
            <div className="section-label justify-center">Trajetória</div>
            <h2 className="section-title mt-4">20 anos de <em className="not-italic text-gold-500">história.</em></h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-light-300 hidden md:block" aria-hidden="true" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.ano} animation="fadeUp" delay={i * 0.1}>
                  <div className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                      <div className="bg-white p-8 shadow-sm border border-light-300">
                        <h3 className="font-heading text-2xl text-dark-900 mb-2">{item.titulo}</h3>
                        <p className="font-body text-dark-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-20 flex-shrink-0 items-center justify-center">
                      <div className="w-16 h-16 bg-gold-500 flex items-center justify-center rounded-full shadow-lg shadow-gold-500/20">
                        <span className="font-body text-[10px] font-600 text-white">{item.ano}</span>
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
