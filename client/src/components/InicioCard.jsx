import arrowIcon from '../assets/icons/arrow-sm-right-svgrepo-com.svg'
import githubIcon from '../assets/icons/github.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import mailIcon from '../assets/icons/mail-svgrepo-com.svg'

function InicioCard() {
  return (
    <section className="card-surface overflow-hidden rounded-[2rem] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-8">
        <div className="p-5 sm:p-6">
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-2xl font-extrabold leading-tight text-[#6959ff] sm:text-3xl">Hola, soy</p>
            <h1 className="flex items-baseline justify-center gap-2 whitespace-nowrap text-3xl font-extrabold leading-tight sm:text-4xl lg:justify-start lg:text-[5.625rem] lg:leading-[1]">
              Cristian <span className="text-[#6959ff]">Dev</span>
            </h1>
            <p className="text-xl font-bold text-white sm:text-2xl">Sistemas web y automatizaciones a medida</p>
            <p className="mx-auto max-w-xl text-base text-gray-300 sm:text-lg lg:mx-0">
              Desarrollo sistemas y automatizaciones a medida para ordenar procesos, reducir trabajo
              manual y ahorrar tiempo.
            </p>
          </div>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
            <a
              href="#proyectos"
              className="btn-anim inline-flex items-center gap-1.5 rounded-xl bg-[#6959ff] px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#5b4be6] sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
            >
              Ver mis proyectos
              <img src={arrowIcon} alt="Flecha hacia la derecha" className="h-4 w-4" loading="lazy" />
            </a>
            <a
              href="#contacto"
              className="btn-anim inline-flex items-center gap-1.5 rounded-xl border border-[#6959ff] px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#6959ff]/10 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
            >
              Contactarme
              <img src={mailIcon} alt="Icono de correo electronico" className="h-4 w-4" loading="lazy" />
            </a>
          </div>

          <div className="mt-5 flex justify-center gap-3 lg:justify-start">
            <a href="#" aria-label="GitHub" className="rounded-2xl bg-[#0a1122] p-4 transition duration-300 ease-out hover:bg-white/5 lg:hover:-translate-y-0.5">
              <img src={githubIcon} alt="Icono de GitHub" className="h-8 w-8" loading="lazy" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-2xl bg-[#0a1122] p-4 transition duration-300 ease-out hover:bg-white/5 lg:hover:-translate-y-0.5">
              <img src={instagramIcon} alt="Icono de Instagram" className="h-8 w-8" loading="lazy" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-2xl bg-[#0a1122] p-4 transition duration-300 ease-out hover:bg-white/5 lg:hover:-translate-y-0.5">
              <img src={linkedinIcon} alt="Icono de LinkedIn" className="h-8 w-8" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="self-end lg:flex lg:justify-end">
          <picture>
            <img
              src="/p-v2.png"
              sizes="(max-width: 767px) 92vw, (max-width: 1279px) 500px, 580px"
              alt="Banner de Cristian Dev"
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




