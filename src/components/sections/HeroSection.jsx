import arrowSmRightIcon from '../../assets/icons/arrow-sm-right-svgrepo-com.svg'
import mailIcon from '../../assets/icons/mail-svgrepo-com.svg'
import { tiltHandlers } from '../../hooks/useTilt.js'

function HeroSection({ hero, socials }) {
  const titleFirstWord = String(hero?.title || 'Cristian Dev').trim().split(/\s+/)[0] || 'Cristian'
  return (
    <section
      id="home"
      {...tiltHandlers}
      className="tilt-surface tilt-surface--right target-ring relative mt-24 scroll-mt-28 grid w-full max-w-full overflow-hidden rounded-[28px] border border-white/6 bg-[rgba(8,10,18,0.92)] px-[46px] pt-[54px] shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:grid-cols-[1.1fr_0.9fr] max-[1160px]:!grid-cols-1 max-[1160px]:px-7 max-[1160px]:pt-8 max-md:mt-20 max-md:px-4 max-md:pt-5 max-md:pb-0"
    >
      <div className="hero-copy relative z-[1] pb-11 max-[1160px]:pb-6 max-md:pb-3">
        <p className="mb-2 text-[2rem] font-bold text-[var(--color-brand)]">Hola, soy</p>
        <h1 className="m-0 text-[clamp(3.1rem,8vw,6rem)] leading-[0.95] font-bold text-white max-md:text-[clamp(2.2rem,11vw,2.9rem)]">
          {titleFirstWord} <span className="text-[#7058ff]">Dev</span>
        </h1>
        <h2 className="mt-[18px] mb-5 text-[1.5rem] font-semibold text-white md:text-[2rem] max-[1160px]:text-[1.7rem] max-md:text-[1.2rem]">
          {hero.role}
        </h2>
        <p className="max-w-[520px] text-[1.18rem] leading-[1.8] text-[var(--color-copy)] max-md:text-[1rem] max-md:leading-[1.65]">
          {hero.description}
        </p>
        <div className="hero-actions mt-[34px] mb-[22px] flex flex-wrap gap-4">
          <a href="#projects" className="group inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#5f5cff] to-[#8f44ff] px-[22px] py-[14px] font-semibold text-white no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:from-[#5857ee] hover:to-[#8640f0] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm">
            Ver mis proyectos
            <img src={arrowSmRightIcon} alt="Icono flecha derecha" loading="lazy" decoding="async" className="ml-2 h-5 w-5 object-contain max-md:h-4 max-md:w-4" />
          </a>
          <div className="hero-actions__group flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-[22px] py-[14px] font-semibold text-[#ebe9ff] no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm">
              Contactarme
              <img src={mailIcon} alt="Icono de Email" loading="lazy" decoding="async" className="ml-2 h-5 w-5 object-contain max-md:h-4 max-md:w-4" />
            </a>
          </div>
        </div>
        <div className="hero-actions__socials flex flex-wrap gap-3 max-md:mb-1">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Abrir perfil de ${social.name} de Cristian Dev`}
              className="grid h-[64px] w-[64px] place-items-center rounded-[18px] border border-white/6 bg-white/[0.03] text-white no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/[0.08] max-md:h-[48px] max-md:w-[48px] max-md:rounded-[14px]"
            >
              <img src={social.iconSrc} alt={`Logo de ${social.name} de Cristian Dev`} loading="lazy" decoding="async" className="h-7 w-7 object-contain max-md:h-5 max-md:w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="relative flex min-h-[420px] items-end justify-center lg:min-h-[560px] max-[1160px]:mt-8 max-[1160px]:min-h-[500px] max-md:mt-0 max-md:min-h-[320px]">
        <div className="hero-badge-code absolute top-[120px] right-5 z-[2] flex h-[92px] w-[92px] items-center justify-center rounded-[20px] border border-white/8 bg-[rgba(14,17,30,0.95)] text-[2rem] font-extrabold text-[#8f44ff] shadow-[0_20px_40px_rgba(0,0,0,0.24)] md:max-[1160px]:top-[20%] md:max-[1160px]:right-[18%] max-md:top-[88px] max-md:right-4 max-md:h-[64px] max-md:w-[64px] max-md:rounded-[14px] max-md:text-[1.3rem]">
          <span className="coding-text inline-flex items-center justify-center font-mono leading-none tracking-tight">
            <span className="char c1">{'<'}</span>
            <span className="char c2">/</span>
            <span className="char c3">{'>'}</span>
          </span>
        </div>
        <div className="hero-badge-type typing-shell absolute bottom-[110px] left-[30px] z-[2] grid h-[92px] w-[92px] place-items-center rounded-[20px] border border-white/8 bg-[rgba(14,17,30,0.95)] text-[2rem] font-extrabold text-[#7bff78] shadow-[0_20px_40px_rgba(0,0,0,0.24)] md:max-[1160px]:bottom-[18%] md:max-[1160px]:left-[18%] max-md:bottom-[72px] max-md:left-4 max-md:h-[64px] max-md:w-[64px] max-md:rounded-[14px] max-md:text-[1.3rem]">
          <span className="typing-text font-mono leading-none tracking-tight">{'>'}_</span>
        </div>
        <img
          src={hero.image}
          srcSet="/banner-320.webp 320w, /banner-480.webp 480w, /banner-660.webp 660w"
          sizes="(max-width: 640px) 320px, (max-width: 1160px) 480px, 660px"
          alt="Retrato de Cristian Dev en la portada del portfolio profesional"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="relative z-[1] w-full max-w-[660px] object-contain"
        />
      </div>
    </section>
  )
}

export default HeroSection
