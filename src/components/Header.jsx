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
  const [isNavOverflowing, setIsNavOverflowing] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

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

      const hasOverflow = navEl.scrollWidth > navEl.clientWidth + 1
      setIsNavOverflowing(hasOverflow)
    }

    const rafId = window.requestAnimationFrame(updateIndicator)
    window.addEventListener('resize', updateIndicator)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeHref])

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
        return
      }

      const scrollMarker = window.scrollY + 180
      let current = sections[0]

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
      <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] flex-wrap items-center justify-between gap-5 py-4 max-md:w-[min(100%-20px,1180px)] max-md:justify-center max-[869px]:justify-center max-[869px]:gap-3">
        <a href="#home" className="flex items-center gap-3 text-[1.35rem] font-bold text-[#f4f7ff] no-underline">
          <span className="text-2xl text-[var(--color-brand)]">{'</>'}</span>
          <span>
            {brandName.split(' ')[0]} <strong className="text-[var(--color-brand)]">Dev</strong>
          </span>
        </a>

        <nav ref={navRef} className={`relative flex flex-wrap justify-center gap-4 md:gap-8 max-md:w-full max-md:flex-nowrap max-md:gap-5 max-md:overflow-x-auto max-md:overflow-y-hidden max-md:whitespace-nowrap max-md:px-1 max-md:pb-2 no-scrollbar ${isNavOverflowing ? 'max-md:justify-start' : 'max-md:justify-center'}`}>
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
          className="inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-5 py-3 font-semibold text-[#ebe9ff] no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-[869px]:self-center max-[869px]:rounded-xl max-[869px]:px-4 max-[869px]:py-2 max-[869px]:text-sm"
        >
          Descargar CV
        </a>
      </div>
    </header>
  )
}

export default Header
