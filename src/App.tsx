import { lazy, Suspense } from 'react'
import Navigation from './components/Navigation'
import ParticleField from './components/ParticleField'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Footer from './components/Footer'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const AIPassion = lazy(() => import('./components/AIPassion'))
const Contact = lazy(() => import('./components/Contact'))

function SectionFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-indigo border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <div className="noise relative min-h-screen bg-bg-primary text-text-primary">
      <ParticleField />
      <ScrollProgress />
      <Navigation />

      <main className="relative z-10">
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <AIPassion />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
