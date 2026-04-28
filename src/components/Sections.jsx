import externalLinkIcon from '../assets/icons/external-link.svg'
import mailIcon from '../assets/icons/mail-svgrepo-com.svg'
import arrowSmRightIcon from '../assets/icons/arrow-sm-right-svgrepo-com.svg'
import { submitContactForm, validateContactForm } from '../lib/contact.js'
import { useEffect, useRef, useState } from 'react'

const tiltMediaQuery = '(hover: hover) and (pointer: fine)'

const canTilt = () =>
  typeof window !== 'undefined' &&
  window.innerWidth > 1024 &&
  window.matchMedia(tiltMediaQuery).matches

const resetTilt = (element) => {
  if (element.__tiltFrame) {
    window.cancelAnimationFrame(element.__tiltFrame)
    element.__tiltFrame = 0
  }

  element.style.setProperty('--tilt-x', '0')
  element.style.setProperty('--tilt-y', '0')
  element.style.willChange = 'auto'
  element.__tiltRect = null
}

const measureTiltRect = (element) => {
  element.__tiltRect = element.getBoundingClientRect()
  return element.__tiltRect
}

const handleTiltPointerMove = (event) => {
  if (!canTilt()) return

  const element = event.currentTarget
  const { clientX, clientY } = event

  if (element.__tiltFrame) {
    element.__tiltPointer = { clientX, clientY }
    return
  }

  element.__tiltPointer = { clientX, clientY }
  element.style.willChange = 'transform'

  element.__tiltFrame = window.requestAnimationFrame(() => {
    const rect = element.__tiltRect || measureTiltRect(element)
    const pointer = element.__tiltPointer
    const x = ((pointer.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((pointer.clientY - rect.top) / rect.height - 0.5) * 2

    element.style.setProperty('--tilt-x', `${Math.max(-1, Math.min(1, x))}`)
    element.style.setProperty('--tilt-y', `${Math.max(-1, Math.min(1, y))}`)
    element.__tiltFrame = 0
  })
}

const handleTiltPointerLeave = (event) => {
  resetTilt(event.currentTarget)
}

const handleTiltPointerEnter = (event) => {
  if (!canTilt()) return
  measureTiltRect(event.currentTarget)
}

const tiltHandlers = {
  onPointerEnter: handleTiltPointerEnter,
  onPointerMove: handleTiltPointerMove,
  onPointerLeave: handleTiltPointerLeave,
}

const resetAllTiltSurfaces = () => {
  if (typeof document === 'undefined') return
  const elements = document.querySelectorAll('.tilt-surface, .tilt-card')
  elements.forEach((element) => resetTilt(element))
}

function SectionShell({ id, title, children, action }) {
  return (
    <section
      id={id}
      {...tiltHandlers}
      className={`tilt-surface ${id === 'projects' ? 'tilt-surface--right' : 'tilt-surface--left'} target-ring mt-24 scroll-mt-28 rounded-3xl border border-white/6 bg-[rgba(8,10,18,0.92)] p-[26px] shadow-[0_24px_60px_rgba(0,0,0,0.28)] max-md:mt-12 max-md:p-5`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-[10px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--color-brand)] shadow-[0_0_18px_rgba(123,92,255,0.8)]" />
          <h3 className="m-0 text-xl font-semibold text-white">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export function HeroSection({ hero, socials }) {
  return (
    <section
      id="home"
      {...tiltHandlers}
      className="tilt-surface tilt-surface--right target-ring relative mt-24 scroll-mt-28 grid w-full max-w-full overflow-hidden rounded-[28px] border border-white/6 bg-[rgba(8,10,18,0.92)] px-[46px] pt-[54px] shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:grid-cols-[1.1fr_0.9fr] max-[1160px]:!grid-cols-1 max-[1160px]:px-7 max-[1160px]:pt-8 max-md:mt-20 max-md:px-4 max-md:pt-5 max-md:pb-0"
    >
      <div className="hero-copy relative z-[1] pb-11 max-[1160px]:pb-6 max-md:pb-3">
        <p className="mb-2 text-[2rem] font-bold text-[var(--color-brand)]">Hola, soy</p>
        <h1 className="m-0 text-[clamp(3.1rem,8vw,6rem)] leading-[0.95] font-bold text-white max-md:text-[clamp(2.2rem,11vw,2.9rem)]">
          {hero.title.split(' ')[0]} <span className="text-[#7058ff]">Dev</span>
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
            <img src={arrowSmRightIcon} alt="Icono flecha derecha" className="ml-2 h-5 w-5 object-contain max-md:h-4 max-md:w-4" />
          </a>
          <div className="hero-actions__group flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-[22px] py-[14px] font-semibold text-[#ebe9ff] no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm">
              Contactarme
              <img src={mailIcon} alt="Icono de Email" className="ml-2 h-5 w-5 object-contain max-md:h-4 max-md:w-4" />
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
              <img src={social.iconSrc} alt={`Logo de ${social.name} de Cristian Dev`} className="h-7 w-7 object-contain max-md:h-5 max-md:w-5" />
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

export function SkillsSection({ skills }) {
  return (
    <SectionShell id="skills" title="Habilidades">
      <div className="mt-[22px] grid gap-[18px] md:grid-cols-3 xl:grid-cols-6">
        {skills.map((skill, index) => (
        <article
          key={skill.name}
          {...tiltHandlers}
          className={`tilt-card ${index % 2 === 0 ? 'tilt-card--left' : 'tilt-card--right'} rounded-[18px] border border-white/6 bg-[rgba(9,12,20,0.88)] px-4 pt-[22px] pb-4 text-center`}
        >
            <div className="mx-auto mb-4 grid h-[62px] w-[62px] place-items-center rounded-[18px] border border-white/8 bg-linear-to-b from-white/5 to-[rgba(123,92,255,0.08)] text-[1.8rem] font-extrabold text-[#7bd3ff]">
              {skill.iconSrc ? (
                <img src={skill.iconSrc} alt={`Logo de ${skill.name}`} className="h-9 w-9 object-contain" />
              ) : (
                skill.icon
              )}
            </div>
            <h4 className="mb-[14px] text-lg font-semibold text-white">{skill.name}</h4>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export function ProjectsSection({ projects }) {
  return (
    <SectionShell
      id="projects"
      title="Proyectos destacados"
      action={
        <a href="#contact" className="text-[var(--color-brand)] no-underline">
          Ver todos
        </a>
      }
    >
      <div className="mt-[22px] grid gap-[18px] lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.title}
            {...tiltHandlers}
            className={`tilt-card ${index % 2 === 0 ? 'tilt-card--left' : 'tilt-card--right'} rounded-[22px] border border-white/6 bg-[rgba(9,12,20,0.88)] shadow-[0_24px_60px_rgba(0,0,0,0.28)]`}
          >
            <div
              className={[
                'h-[220px] border-b border-white/6',
                index === 0 && 'bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(220,227,255,0.92)),linear-gradient(90deg,#ffffff,#e6ecff)]',
                index === 1 && 'bg-[radial-gradient(circle_at_30%_60%,rgba(255,209,102,0.9),transparent_20%),linear-gradient(135deg,#0f1222,#1a2138_55%,#111524)]',
                index === 2 && 'bg-[radial-gradient(circle_at_78%_20%,rgba(143,68,255,0.55),transparent_24%),linear-gradient(135deg,#18112d,#0c0e17_60%,#171028)]',
              ]
                .filter(Boolean)
                .join(' ')}
            />
            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <h4 className="m-0 text-[1.45rem] font-semibold text-white">{project.title}</h4>
                <a
                  href={project.url}
                  aria-label={`Abrir ${project.title}`}
                  className="inline-flex cursor-pointer items-center justify-center rounded-md p-1 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-white/10 active:translate-y-0"
                >
                  <img src={externalLinkIcon} alt={`Icono para abrir ${project.title} en una nueva vista`} className="h-5 w-5 opacity-90" />
                </a>
              </div>
              <p className="mt-3 leading-[1.8] text-[var(--color-copy)]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-[10px]">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/[0.04] px-[11px] py-[7px] text-[0.85rem] text-[#93d8ff]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export function AboutContactSection({ contactItems }) {
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || ''
  const isTurnstileEnabled = Boolean(turnstileSiteKey)
  const turnstileContainerRef = useRef(null)
  const turnstileWidgetIdRef = useRef(null)
  const pendingSubmissionRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isCaptchaModalOpen, setIsCaptchaModalOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState({ visible: false, type: 'error', message: '' })
  const [isEmailVisible, setIsEmailVisible] = useState(false)
  const isDebugEnabled =
    import.meta.env.DEV ||
    (typeof window !== 'undefined' && window.localStorage?.getItem('debug-cards') === '1')

  useEffect(() => {
    const onViewportChange = () => {
      resetAllTiltSurfaces()
      if (isDebugEnabled) {
        console.info('[cards-debug] tilt-reset-on-viewport-change', {
          width: window.innerWidth,
          height: window.innerHeight,
          at: new Date().toISOString(),
        })
      }
    }

    onViewportChange()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('orientationchange', onViewportChange)
    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('orientationchange', onViewportChange)
    }
  }, [isDebugEnabled])

  useEffect(() => {
    if (!toast.visible) return undefined
    const timeoutId = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }))
    }, 3200)
    return () => window.clearTimeout(timeoutId)
  }, [toast.visible])

  useEffect(() => {
    if (status !== 'success') return undefined
    const timeoutId = window.setTimeout(() => {
      setStatus('idle')
    }, 2600)
    return () => window.clearTimeout(timeoutId)
  }, [status])

  useEffect(() => {
    if (!isTurnstileEnabled) return undefined

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainerRef.current || turnstileWidgetIdRef.current) return
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      })
    }

    if (window.turnstile) {
      renderWidget()
      return undefined
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = renderWidget
    document.head.appendChild(script)

    return () => {
      script.onload = null
      if (turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
      }
      turnstileWidgetIdRef.current = null
      setTurnstileToken('')
    }
  }, [isTurnstileEnabled, turnstileSiteKey])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const submitValidatedForm = async (values) => {
    try {
      setStatus('sending')
      await submitContactForm({ ...values, turnstileToken })
      setFormState({ name: '', email: '', subject: '', message: '', company: '' })
      setErrors({})
      pendingSubmissionRef.current = null
      setIsCaptchaModalOpen(false)
      setTurnstileToken('')
      if (isTurnstileEnabled && turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current)
      }
      setStatus('success')
      setToast({ visible: false, type: 'error', message: '' })
    } catch (error) {
      setStatus('error')
      const isRateLimit = error?.status === 429
      setToast({
        visible: true,
        type: 'error',
        message: isRateLimit
          ? 'Demasiados intentos. Espera un momento antes de enviar otro mensaje.'
          : 'No se pudo enviar el mensaje. Reintenta en unos minutos.',
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('idle')

    const result = validateContactForm(formState)
    setErrors(result.errors)

    if (!result.ok) {
      setToast({
        visible: true,
        type: 'error',
        message: 'Revisa los campos marcados antes de enviar.',
      })
      return
    }

    if (isTurnstileEnabled && !turnstileToken) {
      pendingSubmissionRef.current = result.values
      setIsCaptchaModalOpen(true)
      return
    }

    await submitValidatedForm(result.values)
  }

  const handleCaptchaConfirm = async () => {
    if (!turnstileToken) return
    const result = validateContactForm(formState)
    setErrors(result.errors)
    if (!result.ok) return
    await submitValidatedForm(pendingSubmissionRef.current || result.values)
  }

  const fieldClassName = (fieldName) =>
    `w-full rounded-[16px] border bg-[rgba(9,12,22,0.96)] px-4 py-[15px] text-[15px] text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm placeholder:text-[#7f89b2] transition-all duration-200 ease-out focus:-translate-y-px focus:shadow-[0_0_0_1px_rgba(123,92,255,0.75),0_12px_28px_rgba(0,0,0,0.18)] ${
      errors[fieldName]
        ? 'border-[#ff6b6b]/80 focus:border-[#ff7d7d]'
        : 'border-white/8 focus:border-[rgba(123,92,255,0.8)]'
    }`

  return (
    <section className="mt-24 grid gap-24 max-md:mt-12 max-md:gap-12">
      <article
        id="about"
        {...tiltHandlers}
        className="tilt-card tilt-card--left target-ring scroll-mt-28 rounded-[22px] border border-white/6 bg-[rgba(9,12,20,0.88)] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center gap-[10px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--color-brand)] shadow-[0_0_18px_rgba(123,92,255,0.8)]" />
          <h3 className="m-0 text-xl font-semibold text-white">Sobre mi</h3>
        </div>
        <p className="mt-4 max-w-[760px] text-[1.05rem] leading-[1.85] text-[var(--color-copy)]">
          Desarrollo soluciones web a medida para negocios y equipos que necesitan ordenar su operacion, automatizar tareas repetitivas y trabajar con mas claridad.
        </p>
        <p className="mt-4 max-w-[760px] text-[1.05rem] leading-[1.85] text-[var(--color-copy)]">
          Mi foco esta en construir sistemas simples de usar, faciles de mantener y pensados para generar impacto real: menos friccion, menos errores manuales y decisiones mas rapidas.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.05fr]">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
            <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-[#9aa3cb]">Como trabajo</p>
            <div className="mt-4 grid gap-3 text-[var(--color-copy)]">
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_14px_rgba(123,92,255,0.7)]" />
                <p className="m-0">Analizo el proceso actual y detecto los puntos que consumen tiempo.</p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_14px_rgba(123,92,255,0.7)]" />
                <p className="m-0">Propongo una solucion clara, con prioridades y alcance bien definidos.</p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_14px_rgba(123,92,255,0.7)]" />
                <p className="m-0">Entrego un sistema usable, escalable y alineado al objetivo del negocio.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[rgba(123,92,255,0.18)] bg-[rgba(123,92,255,0.06)] p-5">
            <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-[#9aa3cb]">Servicios frecuentes</p>
            <ul className="mt-4 grid gap-2 p-0 list-none text-[var(--color-copy)]">
              <li className="modal-list-item">Sistemas internos para gestion operativa</li>
              <li className="modal-list-item">Automatizacion de tareas administrativas</li>
              <li className="modal-list-item">Paneles de control con datos en tiempo real</li>
              <li className="modal-list-item">Integraciones entre herramientas y APIs</li>
              <li className="modal-list-item">Formularios y flujos de trabajo personalizados</li>
            </ul>
          </div>
        </div>
      </article>

      <div
        id="contact"
        {...tiltHandlers}
        className="tilt-card tilt-card--right target-ring scroll-mt-28 rounded-[22px] border border-white/6 bg-[rgba(9,12,20,0.88)] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="grid gap-[18px] lg:grid-cols-2">
          <article>
            <div className="flex items-center gap-[10px]">
              <span className="h-[10px] w-[10px] rounded-full bg-[var(--color-brand)] shadow-[0_0_18px_rgba(123,92,255,0.8)]" />
              <h3 className="m-0 text-xl font-semibold text-white">Contacto</h3>
            </div>
            <ul className="mt-4 grid gap-3 list-none p-0">
              {contactItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3 py-1">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg">
                    <img src={item.iconSrc} alt={`Icono de ${item.label}`} className="h-5 w-5 object-contain" />
                  </span>
                  <span className="grid gap-0.5">
                    <span className="text-xs uppercase tracking-[0.08em] text-[#9aa3cb]">{item.label}</span>
                    {item.id === 'mail' && !isEmailVisible ? (
                      <button
                        type="button"
                        onClick={() => setIsEmailVisible(true)}
                        className="w-fit rounded-lg border border-[rgba(123,92,255,0.42)] bg-[rgba(123,92,255,0.08)] px-3 py-1.5 text-left text-sm font-medium text-[#d9deff] transition-all duration-200 ease-out hover:border-[rgba(123,92,255,0.72)] hover:bg-[rgba(123,92,255,0.16)] max-md:w-full max-md:px-2.5 max-md:py-2 max-md:text-xs"
                      >
                        Mostrar mail
                      </button>
                    ) : (
                      <span className={`text-[var(--color-copy)] ${item.id === 'mail' ? 'break-all' : ''}`}>{item.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <form onSubmit={handleSubmit} className="grid gap-[14px]" aria-label="Formulario de contacto para solicitar propuesta">
            <input
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formState.company}
              onChange={handleChange}
              className="absolute left-[-9999px] h-px w-px opacity-0"
              aria-hidden="true"
            />
            <input
              name="name"
              type="text"
              aria-label="Nombre"
              aria-invalid={Boolean(errors.name)}
              value={formState.name}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Nombre"
              maxLength={120}
              className={`${fieldClassName('name')} appearance-none`}
            />
            {errors.name ? <p className="m-0 text-sm text-[#ff8f8f]">{errors.name}</p> : null}
            <input
              name="email"
              type="email"
              aria-label="Correo electronico"
              aria-invalid={Boolean(errors.email)}
              value={formState.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Correo electronico"
              maxLength={255}
              className={`${fieldClassName('email')} appearance-none`}
            />
            {errors.email ? <p className="m-0 text-sm text-[#ff8f8f]">{errors.email}</p> : null}
            <input
              name="subject"
              type="text"
              aria-label="Asunto"
              aria-invalid={Boolean(errors.subject)}
              value={formState.subject}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Asunto"
              maxLength={160}
              className={`${fieldClassName('subject')} appearance-none`}
            />
            {errors.subject ? <p className="m-0 text-sm text-[#ff8f8f]">{errors.subject}</p> : null}
            <textarea
              name="message"
              aria-label="Mensaje"
              aria-invalid={Boolean(errors.message)}
              value={formState.message}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Contame tu proceso actual y te digo que se puede automatizar"
              rows="5"
              maxLength={4000}
              className={`${fieldClassName('message')} min-h-[150px] resize-y py-4 leading-[1.7] appearance-none`}
            />
            {errors.message ? <p className="m-0 text-sm text-[#ff8f8f]">{errors.message}</p> : null}
            {errors.company ? <p className="m-0 text-sm text-[#ff8f8f]">No se pudo enviar el mensaje.</p> : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`inline-flex w-full items-center justify-center rounded-2xl px-[22px] py-[14px] font-semibold text-white transition-all duration-300 ease-out active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 ${
                status === 'success'
                  ? 'bg-linear-to-r from-[#0fa958] to-[#10c768] ring-1 ring-transparent hover:-translate-y-0.5 hover:scale-[1.01] hover:from-[#0e9c52] hover:to-[#0fbf63] hover:ring-white/12 active:scale-[0.99]'
                  : 'bg-linear-to-r from-[#5f5cff] to-[#8f44ff] ring-1 ring-transparent hover:-translate-y-0.5 hover:scale-[1.01] hover:from-[#5857ee] hover:to-[#8640f0] hover:ring-white/12 active:scale-[0.99]'
              }`}
            >
              {status === 'sending' ? 'Enviando...' : status === 'success' ? 'Propuesta solicitada' : 'Solicitar propuesta'}
            </button>
          </form>
        </div>
      </div>
      {isTurnstileEnabled ? (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center px-4 transition-all duration-200 ${
            isCaptchaModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!isCaptchaModalOpen}
        >
          <div
            className={`absolute inset-0 bg-[rgba(2,4,10,0.72)] backdrop-blur-sm transition-opacity duration-250 ${
              isCaptchaModalOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsCaptchaModalOpen(false)}
          />
          <div
            className={`relative z-[1] w-full max-w-[420px] rounded-2xl border border-white/10 bg-[rgba(9,12,22,0.98)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.4)] transition-all duration-250 ease-out ${
              isCaptchaModalOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.97] opacity-0'
            }`}
          >
            <p className="m-0 text-lg font-semibold text-white">Verificacion anti-spam</p>
            <p className="mt-2 mb-4 text-sm text-[#b5bddf]">Completa el captcha para enviar tu mensaje.</p>
            <div ref={turnstileContainerRef} className="min-h-[70px] overflow-hidden rounded-xl" />
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setIsCaptchaModalOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#d8ddf7] transition-all duration-200 hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCaptchaConfirm}
                disabled={!turnstileToken || status === 'sending'}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-linear-to-r from-[#5f5cff] to-[#8f44ff] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Validar y enviar
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`pointer-events-none fixed right-5 bottom-5 z-50 max-w-[360px] rounded-xl border px-4 py-3 text-sm font-medium text-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
          toast.visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0'
        } ${toast.type === 'error' ? 'border-red-400/40 bg-red-500/90' : 'border-emerald-400/40 bg-emerald-500/90'}`}
      >
        {toast.message}
      </div>
    </section>
  )
}
