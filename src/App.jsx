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
    const hideLoader = () => setIsLoading(false)

    if (document.readyState === 'complete') {
      hideLoader()
      return undefined
    }

    window.addEventListener('load', hideLoader)
    return () => window.removeEventListener('load', hideLoader)
  }, [])

  useEffect(() => {
    document.body.dataset.loading = isLoading ? 'true' : 'false'
    return () => {
      delete document.body.dataset.loading
    }
  }, [isLoading])

  return (
    <div className="min-h-screen">
      <Loader visible={isLoading} label={brandName} />
      <Header brandName={brandName} />

      <main className="mx-auto w-[min(1180px,calc(100%-32px))] py-4 max-md:w-[min(100%-20px,1180px)]">
        <HeroSection hero={hero} socials={socials} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <AboutContactSection contactItems={contactItems} />
      </main>

      <footer className="mx-auto mt-[18px] flex w-[min(1180px,calc(100%-32px))] justify-between gap-5 py-6 pb-[34px] text-[0.95rem] text-[#9aa3cb] max-md:w-[min(100%-20px,1180px)] max-md:flex-col max-md:text-center">
        <p className="m-0">© 2026 Cristian Dev. Todos los derechos reservados.</p>
        <p className="m-0">Hecho con mucho codigo</p>
      </footer>
    </div>
  )
}

export default App
