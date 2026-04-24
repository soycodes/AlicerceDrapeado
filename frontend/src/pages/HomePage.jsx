import SEOHead from '../hooks/useSEO'
import HeroSection from '../components/sections/HeroSection'
import SobrePreviewSection from '../components/sections/SobrePreviewSection'
import ServicosSection from '../components/sections/ServicosSection'
import ProjetosSection from '../components/sections/ProjetosSection'
import DiferenciaisSection from '../components/sections/DiferenciaisSection'
import ContatoSection from '../components/sections/ContatoSection'

export default function HomePage() {
  return (
    <>
      <SEOHead titleKey="seo.homeTitle" descKey="seo.homeDesc" pagePath="" />
      <HeroSection />
      <SobrePreviewSection />
      <ServicosSection />
      <ProjetosSection />
      <DiferenciaisSection />
      <ContatoSection />
    </>
  )
}
