import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const navItems = [
  { href: '#home', label: 'Inicio' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#about', label: 'Sobre mi' },
  { href: '#contact', label: 'Contacto' },
]

function Header({ brandName }) {
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const navLockRef = useRef({ active: false, target: '#home' })
  const [activeHref, setActiveHref] = useState('#home')
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const navEl = navRef.current
      const activeEl = itemRefs.current[activeHref]

      if (!navEl || !activeEl) return

      const navRect = navEl.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()

      setIndicator({
        left: activeRect.left - navRect.left + navEl.scrollLeft,
        width: activeRect.width,
        opacity: 1,
      })

    }

    const rafId = window.requestAnimationFrame(updateIndicator)
    window.addEventListener('resize', updateIndicator)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeHref])

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 925) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeMenuOnDesktop)
    return () => {
      window.removeEventListener('resize', closeMenuOnDesktop)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)
      .sort((a, b) => a.offsetTop - b.offsetTop)

    if (!sections.length) return undefined

    const releaseNavLock = () => {
      const lock = navLockRef.current
      if (!lock.active) return
      lock.active = false
      handleScroll()
    }

    const updateActiveByScroll = () => {
      const lock = navLockRef.current
      if (lock.active) {
        const targetSection = document.querySelector(lock.target)
        if (targetSection) {
          const targetTop = targetSection.offsetTop
          const currentTop = window.scrollY + 112
          if (Math.abs(currentTop - targetTop) <= 24) {
            lock.active = false
          } else {
            return
          }
        } else {
          lock.active = false
        }
      }

      if (lock.active) {
        return
      }

      const scrollMarker = window.scrollY + 180
      const viewportBottom = window.scrollY + window.innerHeight
      const pageBottom = document.documentElement.scrollHeight
      let current = sections[0]

      if (viewportBottom >= pageBottom - 8) {
        const lastSection = sections[sections.length - 1]
        setActiveHref(`#${lastSection.id}`)
        return
      }

      for (const section of sections) {
        if (scrollMarker >= section.offsetTop - 1) {
          current = section
        }
      }

      setActiveHref(`#${current.id}`)
    }

    let rafId = 0

    const handleScroll = () => {
      window.cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(updateActiveByScroll)
    }

    const handleUserIntent = (event) => {
      if (event.type === 'keydown') {
        const navigationKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', 'Space']
        if (!navigationKeys.includes(event.code) && !navigationKeys.includes(event.key)) {
          return
        }
      }

      releaseNavLock()
    }

    updateActiveByScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.addEventListener('wheel', handleUserIntent, { passive: true })
    window.addEventListener('touchmove', handleUserIntent, { passive: true })
    window.addEventListener('keydown', handleUserIntent)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('wheel', handleUserIntent)
      window.removeEventListener('touchmove', handleUserIntent)
      window.removeEventListener('keydown', handleUserIntent)
    }
  }, [])

  return (
    <header className="sticky top-0 z-10 w-full bg-[rgba(8,10,20,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] flex-wrap items-center justify-between gap-5 py-4 max-[925px]:w-[min(100%-20px,1180px)] max-[925px]:gap-3">
        <a href="#home" aria-label="Ir al inicio" className="flex items-center gap-3 text-[1.35rem] font-bold text-[#f4f7ff] no-underline">
          <span className="text-2xl text-[var(--color-brand)]">{'</>'}</span>
          <span>
            {brandName.split(' ')[0]} <strong className="text-[var(--color-brand)]">Dev</strong>
          </span>
        </a>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="hidden h-11 w-11 items-center justify-center rounded-xl border border-[rgba(123,92,255,0.42)] bg-[rgba(12,16,28,0.92)] text-[#e8ecff] transition-all duration-300 hover:border-[rgba(123,92,255,0.78)] hover:bg-[rgba(18,23,40,0.96)] max-[925px]:inline-flex"
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 top-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 top-[14px] block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>

        <nav ref={navRef} aria-label="Navegacion principal" className={`relative flex flex-wrap justify-center gap-4 md:gap-8 max-[925px]:hidden`}>
          <span
            className="absolute bottom-0 md:bottom-[-9px] h-[2px] rounded-full bg-linear-to-r from-[#7b5cff] to-[#ac47ff] transition-[transform,width,opacity] duration-200 ease-out will-change-[transform,width,opacity]"
            style={{
              left: 0,
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />
          {navItems.map((item) => (
            <a
              key={item.href}
              ref={(node) => {
                if (node) itemRefs.current[item.href] = node
              }}
              href={item.href}
              onClick={() => {
                const lock = navLockRef.current
                lock.active = true
                lock.target = item.href
                setActiveHref(item.href)
              }}
              className={`py-2 no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                activeHref === item.href ? 'text-white' : 'text-[#d2d7f3]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-5 py-3 font-semibold text-[#ebe9ff] no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-[925px]:hidden"
        >
          Solicitar propuesta
        </a>
      </div>

      <div
        className={`fixed inset-0 z-20 bg-[rgba(2,4,10,0.58)] transition-opacity duration-300 max-[925px]:block ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        id="mobile-navigation"
        role="dialog"
        aria-label="Menu de navegacion"
        className={`fixed right-0 top-0 z-30 h-screen w-[min(84vw,340px)] border-l border-[rgba(123,92,255,0.22)] bg-[rgba(8,11,20,0.98)] p-6 shadow-[0_0_46px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 ease-out max-[925px]:block ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } hidden`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b9c3ff]">Menu</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-xl text-[#e8ecff] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:rotate-90 hover:scale-105 hover:border-[rgba(123,92,255,0.75)] hover:bg-[rgba(123,92,255,0.14)] active:translate-y-0 active:scale-95"
            aria-label="Cerrar menu"
          >X</button>
        </div>

        <nav aria-label="Navegacion movil" className="flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={`mobile-${item.href}`}
              href={item.href}
              onClick={() => {
                const lock = navLockRef.current
                lock.active = true
                lock.target = item.href
                setActiveHref(item.href)
                setIsMobileMenuOpen(false)
              }}
              className={`rounded-xl border px-4 py-3 text-base font-medium no-underline transition-all duration-300 ${
                activeHref === item.href
                  ? 'border-[rgba(123,92,255,0.72)] bg-[rgba(123,92,255,0.14)] text-white hover:border-[rgba(123,92,255,0.92)] hover:bg-[rgba(123,92,255,0.24)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-[#d2d7f3] hover:-translate-y-0.5 hover:border-[rgba(123,92,255,0.55)] hover:bg-[rgba(123,92,255,0.12)] hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </header>
  )
}

export default Header
