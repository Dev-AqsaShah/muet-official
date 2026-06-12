import HeroSection      from '@/components/sections/HeroSection'
import StatsSection     from '@/components/sections/StatsSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ProgramsSection  from '@/components/sections/ProgramsSection'
import AboutStrip       from '@/components/sections/AboutStrip'
import PortalsSection   from '@/components/sections/PortalsSection'
import PartnersSection  from '@/components/sections/PartnersSection'
import LatestNews       from '@/components/sections/LatestNews'
import CTASection       from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <ProgramsSection />
      <AboutStrip />
      <PortalsSection />
      <PartnersSection />
      <LatestNews />
      <CTASection />
    </>
  )
}
