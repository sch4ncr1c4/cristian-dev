import arrowIcon from '../assets/icons/arrow-sm-right-svgrepo-com.svg'
import githubIcon from '../assets/icons/github.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'

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
            <p className="text-base font-bold text-white sm:text-lg">Sistemas web y automatizaciones a medida</p>
            <p className="mx-auto max-w-xl text-sm text-gray-300 sm:text-base lg:mx-0">
              Desarrollo sistemas y automatizaciones a medida para ordenar procesos, reducir trabajo
              manual y ahorrar tiempo.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <a
              href="#proyectos"
              className="btn-anim inline-flex items-center gap-2 rounded-xl bg-[#6959ff] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#5b4be6]"
            >
              Ver mis proyectos
              <img src={arrowIcon} alt="Flecha hacia la derecha" className="h-4 w-4" loading="lazy" />
            </a>
            <a
              href="#contacto"
              className="btn-anim inline-flex items-center gap-2 rounded-xl border border-[#6959ff] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#6959ff]/10"
            >
              Contactarme
            </a>
          </div>

          <div className="mt-5 flex justify-center gap-3 lg:justify-start">
            <a href="#" aria-label="GitHub" className="rounded-2xl bg-[#0a1122] p-4 transition duration-300 ease-out hover:bg-white/5 lg:hover:-translate-y-0.5">
              <img src={githubIcon} alt="Icono de GitHub" className="h-6 w-6" loading="lazy" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-2xl bg-[#0a1122] p-4 transition duration-300 ease-out hover:bg-white/5 lg:hover:-translate-y-0.5">
              <img src={instagramIcon} alt="Icono de Instagram" className="h-6 w-6" loading="lazy" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-2xl bg-[#0a1122] p-4 transition duration-300 ease-out hover:bg-white/5 lg:hover:-translate-y-0.5">
              <img src={linkedinIcon} alt="Icono de LinkedIn" className="h-6 w-6" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="self-end lg:flex lg:justify-end">
          <picture>
            <source media="(min-width: 1280px)" srcSet="/banner-660.webp" />
            <source media="(min-width: 768px)" srcSet="/banner-480.webp" />
            <img
              src="/banner-320.webp"
              srcSet="/banner-256.webp 256w, /banner-320.webp 320w"
              sizes="(max-width: 767px) 100vw, 320px"
              alt="Banner de Cristian Dev"
              className="mx-auto h-auto w-full max-w-[250px] sm:max-w-[290px] md:max-w-[340px] lg:mx-0 lg:max-w-[520px] xl:max-w-[580px]"
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




