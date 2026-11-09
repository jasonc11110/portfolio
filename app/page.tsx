import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Work } from '@/components/work'
import { About } from '@/components/about'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Footer />
    </div>
  )
}
