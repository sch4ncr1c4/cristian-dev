import { useEffect, useState } from 'react'

const links = [
  { label: 'Inicio', href: '#inicio', hint: 'Presentacion principal' },
  { label: 'Habilidades', href: '#habilidades', hint: 'Stack y fortalezas' },
  { label: 'Proyectos', href: '#proyectos', hint: 'Trabajos destacados' },
  { label: 'Sobre mi', href: '#sobre-mi', hint: 'Perfil y experiencia' },
  { label: 'Contacto', href: '#contacto', hint: 'Hablemos de tu idea' },
]

function Header() {
  const [open, setOpen] = useState(false)

  const goToSection = (href) => {
    const target = document.querySelector(href)
    if (!target) return

    const runScroll = () => {
      const headerOffset = 96
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      })

      window.history.replaceState(null, '', href)
    }

    if (open) {
      setOpen(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(runScroll)
      })
      return
    }

    runScroll()
  }

  useEffect(() => {
    if (!open) return undefined

    const originalBodyStyles = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }

    // Lock scroll and compensate scrollbar width to avoid page movement.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalBodyStyles.overflow
      document.body.style.paddingRight = originalBodyStyles.paddingRight
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <>
      <div aria-hidden className="h-[72px]" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-gradient-to-b from-[#050b16]/82 to-[#030811]/72 text-white backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <a href="#inicio" className="text-sm font-semibold">
            <span className="mr-1 text-[#6959ff] text-base">{"</>"}</span>
            <span className="text-white text-base">Cristian </span>
            <span className="text-[#6959ff] text-base">Dev</span>
          </a>

          <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="relative flex items-center gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      goToSection(link.href)
                    }}
                    className="relative block px-1 py-2 text-sm font-semibold text-white/80 transition hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#6959ff] after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contacto"
            onClick={(event) => {
              event.preventDefault()
              goToSection('#contacto')
            }}
            className="btn-anim hidden rounded-xl border border-[#6959ff] px-6 py-2 text-sm font-semibold text-white hover:bg-[#6959ff]/10 lg:inline-flex"
          >
            Solicitar propuesta
          </a>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="relative flex h-12 w-12 items-center justify-center bg-transparent lg:hidden"
          >
            <span
              className={`absolute h-[2.5px] w-[22px] rounded-full bg-slate-100 transition-all duration-300 ${open ? 'translate-y-0 rotate-45' : '-translate-y-[7px]'}`}
            />
            <span
              className={`absolute h-[2.5px] w-[22px] rounded-full bg-slate-100 transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
            />
            <span
              className={`absolute h-[2.5px] w-[22px] rounded-full bg-slate-100 transition-all duration-300 ${open ? 'translate-y-0 -rotate-45' : 'translate-y-[7px]'}`}
            />
          </button>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-[#01040c]/65 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <nav
        className={`fixed inset-y-0 right-0 z-[70] flex h-[100dvh] min-h-screen w-[min(88vw,24rem)] flex-col border-l border-slate-500/25 bg-gradient-to-b from-[#050b16]/82 to-[#030811]/72 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-out will-change-transform lg:hidden ${open ? 'visible translate-x-0 opacity-100' : 'pointer-events-none invisible translate-x-[105%] opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="border-b border-slate-500/25 px-5 py-4">
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8ea3ff]">
                Navegacion
              </p>
            </div>
          
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 w-12 items-center justify-center bg-transparent text-slate-100 transition hover:text-white active:scale-95"
            aria-label="Cerrar menu"
          >
            <span className="text-3xl leading-none">×</span>
          </button>
          </div>
        </div>

        <ul className="flex flex-1 flex-col gap-3 px-4 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  goToSection(link.href)
                }}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3.5 transition hover:border-slate-300/30 hover:bg-[#0e1a31] active:scale-[0.99]"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold text-white">{link.label}</span>
                  <span className="truncate text-xs text-white/65 transition group-hover:text-white/80">
                    {link.hint}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-500/25 px-4 py-4">
          <a
            href="#contacto"
            onClick={(event) => {
              event.preventDefault()
              goToSection('#contacto')
            }}
            className="btn-anim inline-flex w-full items-center justify-center rounded-xl border border-slate-300/30 bg-[#15233f]/85 px-4 py-3 text-sm font-semibold text-white hover:bg-[#1b2d4f]"
          >
            Solicitar propuesta
          </a>
        </div>
      </nav>
    </>
  )
}

export default Header

