import { Seo } from '../components/Seo'
import { PAGES } from '../lib/seo'
import { Customization } from '../sections/home/Customization'
import { Faq } from '../sections/home/Faq'
import { Hero } from '../sections/home/Hero'
import { Process } from '../sections/home/Process'
import { ProjectsShowcase } from '../sections/home/ProjectsShowcase'
import { QuoteSection } from '../sections/home/QuoteSection'
import { Solutions } from '../sections/home/Solutions'
import { WhyUs } from '../sections/home/WhyUs'

export default function Home() {
  return (
    <>
      <Seo page={PAGES.home} />
      <Hero />
      <Solutions />
      <Process />
      <Customization />
      <WhyUs />
      <ProjectsShowcase />
      <Faq />
      <QuoteSection />
    </>
  )
}
