import arrowIcon from '../assets/icons/arrow-sm-right-svgrepo-com.svg'
import githubIcon from '../assets/icons/github.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import mailIcon from '../assets/icons/mail-svgrepo-com.svg'

function InicioCard() {
  const goToSection = (href) => {
    const target = document.querySelector(href)
    if (!target) return

    const headerOffset = 96
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    })

    window.history.replaceState(null, '', href)
  }

  return (
    <section className="card-surface overflow-hidden rounded-[2rem] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-8">
        <div className="p-5 sm:p-6">
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-2xl font-extrabold leading-tight text-[#6959ff] sm:text-3xl">Hola, soy</p>
            <h1 className="flex items-baseline justify-center gap-2 whitespace-nowrap text-4xl font-extrabold leading-tight sm:text-4xl lg:justify-start lg:text-[5.625rem] lg:leading-[1]">
              Cristian <span className="text-[#6959ff]">Dev</span>
            </h1>
            <p className="text-xl font-bold text-white sm:text-2xl">Sistemas web y automatizaciones a medida</p>
            <p className="mx-auto max-w-xl text-base text-gray-300 sm:text-lg lg:mx-0">
              Desarrollo sistemas y automatizaciones a medida para ordenar procesos, reducir trabajo
              manual y ahorrar tiempo.
            </p>
          </div>

          <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2 lg:justify-start">
            <a
              href="#proyectos"
              onClick={(event) => {
                event.preventDefault()
                goToSection('#proyectos')
              }}
              className="btn-anim inline-flex items-center gap-1.5 rounded-xl bg-[#6959ff] px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#5b4be6] sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
            >
              Ver mis proyectos
              <img src={arrowIcon} alt="Flecha hacia la derecha" width="16" height="16" className="h-4 w-4" loading="lazy" />
            </a>
            <a
              href="#contacto"
              onClick={(event) => {
                event.preventDefault()
                goToSection('#contacto')
              }}
              className="btn-anim inline-flex items-center gap-1.5 rounded-xl border border-[#6959ff] px-3.5 py-2.5 text-center text-sm font-semibold text-[#6959ff] hover:bg-[#6959ff]/10 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
            >
              Contactarme
              <img src={mailIcon} alt="Icono de correo electronico" width="16" height="16" className="h-4 w-4" loading="lazy" />
            </a>
          </div>

          <div className="mt-5 flex justify-center gap-3 lg:justify-start">
            <a href="#" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a1122] transition duration-300 ease-out hover:bg-white/5 sm:h-12 sm:w-12 sm:rounded-2xl lg:hover:-translate-y-0.5">
              <img src={githubIcon} alt="Icono de GitHub" width="32" height="32" className="block h-6 w-6 sm:h-7 sm:w-7" loading="lazy" />
            </a>
            <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a1122] transition duration-300 ease-out hover:bg-white/5 sm:h-12 sm:w-12 sm:rounded-2xl lg:hover:-translate-y-0.5">
              <img src={instagramIcon} alt="Icono de Instagram" width="32" height="32" className="block h-6 w-6 sm:h-7 sm:w-7" loading="lazy" />
            </a>
            <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a1122] transition duration-300 ease-out hover:bg-white/5 sm:h-12 sm:w-12 sm:rounded-2xl lg:hover:-translate-y-0.5">
              <img src={linkedinIcon} alt="Icono de LinkedIn" width="32" height="32" className="block h-6 w-6 sm:h-7 sm:w-7" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="self-end lg:flex lg:justify-end">
          <picture>
            <source
              type="image/avif"
              srcSet="/p-v2-320.avif 320w, /p-v2-480.avif 480w, /p-v2-640.avif 640w, /p-v2-960.avif 960w, /p-v2-1160.avif 1160w"
              sizes="(max-width: 767px) 92vw, (max-width: 1279px) 500px, 580px"
            />
            <source
              type="image/webp"
              srcSet="/p-v2-320.webp 320w, /p-v2-480.webp 480w, /p-v2-640.webp 640w, /p-v2-960.webp 960w, /p-v2-1160.webp 1160w"
              sizes="(max-width: 767px) 92vw, (max-width: 1279px) 500px, 580px"
            />
            <img
              src="/p-v2-640.jpg"
              srcSet="/p-v2-320.jpg 320w, /p-v2-640.jpg 640w, /p-v2-1160.jpg 1160w"
              sizes="(max-width: 767px) 92vw, (max-width: 1279px) 500px, 580px"
              alt="Banner de Cristian Dev"
              width="1160"
              height="1227"
              className="mx-auto h-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:mx-0 lg:max-w-[560px] xl:max-w-[580px]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}

export default InicioCard




