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
  whatsapp,
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

      <a
        href={whatsapp.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Abrir WhatsApp"
        className="whatsapp-float-shake fixed right-5 bottom-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-[rgba(18,24,40,0.78)] shadow-[0_18px_34px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-white/30 max-md:right-4 max-md:bottom-4"
      >
        <img src={whatsapp.iconSrc} alt="" className="h-8 w-8 object-contain" />
      </a>

      <footer className="mx-auto mt-32 w-[min(1180px,calc(100%-32px))] border-t border-white/8 pt-10 pb-16 text-[0.95rem] text-[#9aa3cb] max-md:w-[min(100%-20px,1180px)] max-md:mt-24 max-md:pt-8 max-md:pb-12">
        <div className="flex justify-between gap-5 max-md:flex-col max-md:text-center">
          <p className="m-0">(c) 2026 Cristian Dev. Todos los derechos reservados.</p>
          <p className="m-0">Hecho con mucho codigo</p>
        </div>
        <p className="m-0 mt-6 text-[0.88rem] text-[#7f89b2] max-md:mt-5 max-md:text-center">
          Desarrollo sistemas y automatizaciones a medida para negocios que quieren crecer con procesos mas eficientes.
        </p>
      </footer>
    </div>
  )
}

export default App
