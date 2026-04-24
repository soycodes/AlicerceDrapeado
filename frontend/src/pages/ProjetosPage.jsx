import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Maximize2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SEOHead from '../hooks/useSEO'
import AnimatedSection from '../components/ui/AnimatedSection'
import { projetos } from '../services/projetosData'

const HERO_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop'

export default function ProjetosPage() {
  const { t }               = useTranslation()
  const [filtro, setFiltro] = useState('all')
  const [selected, setSelected] = useState(null)

  const filterMap = {
    all: null,
    residential: 'Residencial',
    commercial: 'Comercial',
    industrial: 'Industrial',
  }

  const filtered = filterMap[filtro]
    ? projetos.filter(p => p.categoria === filterMap[filtro])
    : projetos

  const filterKeys = ['all', 'residential', 'commercial', 'industrial']

  return (
    <>
      <SEOHead titleKey="seo.projectsTitle" descKey="seo.projectsDesc" pagePath="/projetos" />

      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Portfólio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/20" />
        </div>
        <div className="container-site relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-label text-gold-400">{t('projects.label')}</div>
            <h1 className="section-title-light mt-4">{t('nav.projects')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-light-100 border-b border-light-300">
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {filterKeys.map(key => (
              <button key={key} role="tab" aria-selected={filtro === key}
                onClick={() => setFiltro(key)}
                className={`font-body text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200
                  ${filtro === key ? 'bg-dark-900 text-white' : 'border border-light-300 text-dark-500 hover:border-dark-900 hover:text-dark-900'}`}>
                {t(`projects.filters.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-light-100">
        <div className="container-site">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((projeto) => (
                <motion.article key={projeto.id} layout
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden bg-dark-900 cursor-pointer"
                  onClick={() => setSelected(projeto)}
                  role="button" tabIndex={0}
                  aria-label={`Ver detalhes: ${projeto.titulo}`}
                  onKeyDown={e => e.key === 'Enter' && setSelected(projeto)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={projeto.image} alt={projeto.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-body text-[10px] text-gold-400 tracking-widest uppercase block mb-1">{projeto.categoria}</span>
                    <h2 className="font-heading text-xl text-white leading-tight mb-1">{projeto.titulo}</h2>
                    <div className="flex items-center gap-1 text-white/50 font-body text-xs">
                      <MapPin size={10} /><span>{projeto.local}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={14} className="text-white" />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-sm"
            onClick={() => setSelected(null)} role="dialog" aria-modal="true">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }} className="bg-white max-w-3xl w-full overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="aspect-video overflow-hidden">
                <img src={selected.image} alt={selected.titulo} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-body text-[10px] text-gold-500 tracking-widest uppercase block mb-1">{selected.categoria}</span>
                    <h2 className="font-heading text-3xl text-dark-900">{selected.titulo}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-dark-400 hover:text-dark-900 font-body text-2xl leading-none" aria-label={t('projects.details.close')}>×</button>
                </div>
                <p className="font-body text-dark-500 text-sm leading-relaxed mb-6">{selected.desc}</p>
                <div className="flex flex-wrap gap-6 text-sm font-body">
                  <div><span className="text-dark-400 text-xs tracking-widest uppercase block">{t('projects.details.location')}</span><span className="text-dark-700">{selected.local}</span></div>
                  <div><span className="text-dark-400 text-xs tracking-widest uppercase block">{t('projects.details.year')}</span><span className="text-dark-700">{selected.ano}</span></div>
                  <div><span className="text-dark-400 text-xs tracking-widest uppercase block">{t('projects.details.area')}</span><span className="text-dark-700">{selected.area}</span></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {selected.tags.map(tag => (
                    <span key={tag} className="font-body text-xs px-3 py-1 bg-light-200 text-dark-600">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
