import { useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import {
  AboutContactSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from './components/Sections.jsx'
import {
  brandName,
  contactItems,
  hero,
  projects,
  skills,
  socials,
} from './data/siteContent.js'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    const minVisibleMs = isMobile ? 0 : 700
    const maxVisibleMs = isMobile ? 350 : 1800
    const startedAt = performance.now()
    let isCancelled = false
    let delayHideId

    const hide = () => {
      if (!isCancelled) setIsLoading(false)
    }

    const finish = () => {
      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, minVisibleMs - elapsed)
      window.clearTimeout(delayHideId)
      delayHideId = window.setTimeout(hide, remaining)
    }

    const maxWaitId = window.setTimeout(finish, maxVisibleMs)

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      isCancelled = true
      window.clearTimeout(maxWaitId)
      window.clearTimeout(delayHideId)
      window.removeEventListener('load', finish)
    }
  }, [])

  useEffect(() => {
    document.body.dataset.loading = isLoading ? 'true' : 'false'
    return () => {
      delete document.body.dataset.loading
    }
  }, [isLoading])

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:rounded-lg focus:bg-[#141a2e] focus:px-4 focus:py-2 focus:text-white">
        Saltar al contenido principal
      </a>
      <Loader visible={isLoading} label={brandName} />
      <Header brandName={brandName} />

      <main id="main-content" className="mx-auto w-[min(1180px,calc(100%-32px))] py-4 max-md:w-[min(100%-20px,1180px)]">
        <HeroSection hero={hero} socials={socials} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <AboutContactSection contactItems={contactItems} />
      </main>
      <footer className="mx-auto mt-32 w-[min(1180px,calc(100%-32px))] border-t border-white/8 pt-10 pb-16 text-[0.95rem] text-[#9aa3cb] max-md:w-[min(100%-20px,1180px)] max-md:mt-24 max-md:pt-8 max-md:pb-12">
        <div className="flex justify-between gap-5 max-md:flex-col max-md:text-center">
          <p className="m-0">
            2026{' '}
            <a href="#home" aria-label="Ir al inicio" className="inline-flex items-center gap-2 text-[1.05rem] font-bold text-[#f4f7ff] no-underline">
              <span>
                Cristian <strong className="text-[var(--color-brand)]">Dev</strong>
              </span>
            </a>
            .
          </p>
          <p className="m-0 inline-flex items-center gap-2 max-md:w-full max-md:justify-center">
            <span>Hecho con</span>
            <span className="text-[1.05rem] font-bold text-[var(--color-brand)]">{'</>'}</span>
            <span>mucho codigo</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
