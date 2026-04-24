import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&auto=format&fit=crop'

export default function HeroSection() {
  const { t }              = useTranslation()
  const { lang = 'pt-br' } = useParams()

  const stats = [
    { num: '+200', label: t('hero.stats.projects') },
    { num: '+20',  label: t('hero.stats.experience') },
    { num: '98%',  label: t('hero.stats.satisfaction') },
    { num: '+15',  label: t('hero.stats.awards') },
  ]

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden grain-overlay" aria-label="Hero — Edifica Construtora">
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="Edifícios modernos"
          className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-transparent" />
      </div>

      {/* Floating year */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/3 right-10 lg:right-20 z-10 hidden md:flex flex-col items-end gap-1"
        aria-hidden="true"
      >
        <span className="font-heading text-[7rem] lg:text-[9rem] font-700 text-white/5 leading-none select-none">2004</span>
        <span className="font-body text-xs tracking-[0.3em] text-white/30 uppercase">{t('hero.founded')}</span>
      </motion.div>

      <div className="container-site relative z-10 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight mb-8"
          >
            {t('hero.line1')}<br />
            <em className="not-italic text-gold-400">{t('hero.line2')}</em><br />
            {t('hero.line3')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link to={`/${lang}/projetos`} className="btn-primary group">
              {t('hero.btnProjects')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link to={`/${lang}/contato`} className="btn-outline-light">
              {t('hero.btnQuote')}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap items-center gap-10 mt-16 pt-10 border-t border-white/10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-heading text-3xl text-gold-400 font-300">{stat.num}</span>
              <span className="font-body text-xs text-white/40 tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('sobre-preview')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-gold-400 transition-colors duration-300"
        aria-label="Rolar para baixo"
      >
        <span className="writing-vertical font-body text-[10px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
