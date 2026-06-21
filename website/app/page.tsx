import HeroSection      from '@/components/sections/HeroSection'
import StatsSection     from '@/components/sections/StatsSection'
import ProgramsSection  from '@/components/sections/ProgramsSection'
import AdmissionsStrip  from '@/components/sections/AdmissionsStrip'
import AboutStrip       from '@/components/sections/AboutStrip'
import PortalsSection   from '@/components/sections/PortalsSection'
import PartnersSection  from '@/components/sections/PartnersSection'
import CTASection       from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <AdmissionsStrip />
      <AboutStrip />
      <PortalsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
