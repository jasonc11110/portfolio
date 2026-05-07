import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectTimeline } from "@/components/project-timeline"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-indicator"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ProjectTimeline />
      <Footer />
      <ScrollIndicator />
    </main>
  )
}
