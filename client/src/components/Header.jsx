import { useEffect, useState } from 'react'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mi', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
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
    <header className="sticky top-0 z-50 border-b border-[#6959ff]/30 bg-[#070d1d] text-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
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
          className="relative flex h-10 w-10 items-center justify-center rounded-md border border-[#6959ff] lg:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 bg-white transition ${open ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transition ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transition ${open ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <nav
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(85vw,22rem)] flex-col border-l border-[#6959ff]/30 bg-[#070d1d] shadow-2xl transition-transform duration-300 ease-out will-change-transform lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-[#6959ff]/30 px-5 py-4">
          <span className="text-sm font-semibold text-white/90">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-anim inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#6959ff] text-xl font-semibold leading-none text-white hover:bg-white/10"
            aria-label="Cerrar menu"
          >
            ×
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-2 px-4 py-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  goToSection(link.href)
                }}
                className="block rounded-md px-2 py-3 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header




