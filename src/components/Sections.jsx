import externalLinkIcon from '../assets/icons/external-link.svg'
import { submitContactForm, validateContactForm } from '../lib/contact.js'
import { useEffect, useRef, useState } from 'react'

function SectionShell({ id, title, children, action }) {
  const handlePointerMove = (event) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2

    element.style.setProperty('--tilt-x', `${Math.max(-1, Math.min(1, x))}`)
    element.style.setProperty('--tilt-y', `${Math.max(-1, Math.min(1, y))}`)
  }

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0')
    event.currentTarget.style.setProperty('--tilt-y', '0')
  }

  return (
    <section
      id={id}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`tilt-surface ${id === 'skills' ? 'tilt-surface--right' : 'tilt-surface--left'} target-ring mt-24 scroll-mt-28 rounded-3xl border border-white/6 bg-[rgba(11,14,24,0.86)] p-[26px] shadow-[0_24px_60px_rgba(0,0,0,0.28)] max-md:mt-12 max-md:p-5`}
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
  const handlePointerMove = (event) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2

    element.style.setProperty('--tilt-x', `${Math.max(-1, Math.min(1, x))}`)
    element.style.setProperty('--tilt-y', `${Math.max(-1, Math.min(1, y))}`)
  }

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0')
    event.currentTarget.style.setProperty('--tilt-y', '0')
  }

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="tilt-surface tilt-surface--left target-ring relative mt-24 scroll-mt-28 grid overflow-hidden rounded-[28px] border border-white/6 bg-[rgba(11,14,24,0.86)] px-[46px] pt-[54px] shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:grid-cols-[1.1fr_0.9fr] max-md:mt-12 max-md:px-5 max-md:pt-5 max-md:pb-[30px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(123,92,255,0.18),transparent_22%),radial-gradient(circle_at_30%_18%,rgba(60,89,255,0.12),transparent_30%)]" />
      <div className="relative z-[1] pb-11">
        <p className="mb-3 inline-flex rounded-full border border-[rgba(123,92,255,0.22)] bg-[rgba(123,92,255,0.08)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#c9c3ff]">
          Automatizacion y sistemas para negocios
        </p>
        <p className="mb-2 text-[2rem] font-bold text-[var(--color-brand)]">Hola, soy</p>
        <h1 className="m-0 text-[clamp(3.1rem,8vw,6rem)] leading-[0.95] font-bold text-white">
          {hero.title.split(' ')[0]} <span className="text-[#7058ff]">Dev</span>
        </h1>
        <h2 className="mt-[18px] mb-5 text-[1.5rem] font-semibold text-white md:text-[2rem]">
          {hero.role}
        </h2>
        <p className="max-w-[520px] text-[1.18rem] leading-[1.8] text-[var(--color-copy)]">
          {hero.description}
        </p>
        <div className="mt-[34px] mb-[22px] flex flex-wrap gap-4">
          <a href="#projects" className="group inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#5f5cff] to-[#8f44ff] px-[22px] py-[14px] font-semibold text-white no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:from-[#5857ee] hover:to-[#8640f0] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm">
            Ver mis proyectos
          </a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-[22px] py-[14px] font-semibold text-[#ebe9ff] no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm">
            Contactarme
          </a>
        </div>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              className="grid h-[52px] w-[52px] place-items-center rounded-[14px] border border-white/6 bg-white/[0.03] text-white no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/[0.08]"
            >
              <img src={social.iconSrc} alt={`${social.name} icon`} className="h-6 w-6 object-contain" />
            </a>
          ))}
        </div>
      </div>
      <div className="relative flex min-h-[420px] items-end justify-center md:min-h-[560px]">
        <div className="absolute top-[70px] right-[10px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(105,90,255,0.95)_0%,rgba(36,63,146,0.55)_45%,rgba(0,0,0,0)_72%)] blur-[4px]" />
        <div className="absolute top-[120px] right-5 z-[2] flex h-[92px] w-[92px] items-center justify-center rounded-[20px] border border-white/8 bg-[rgba(14,17,30,0.95)] text-[2rem] font-extrabold text-[#8f44ff] shadow-[0_20px_40px_rgba(0,0,0,0.24)]">
          <span className="coding-text inline-flex items-center justify-center font-mono leading-none tracking-tight">
            <span className="char c1">{'<'}</span>
            <span className="char c2">/</span>
            <span className="char c3">{'>'}</span>
          </span>
        </div>
        <div className="typing-shell absolute bottom-[110px] left-[30px] z-[2] grid h-[92px] w-[92px] place-items-center rounded-[20px] border border-white/8 bg-[rgba(14,17,30,0.95)] text-[2rem] font-extrabold text-[#7bff78] shadow-[0_20px_40px_rgba(0,0,0,0.24)]">
          <span className="typing-text font-mono leading-none tracking-tight">{'>'}_</span>
        </div>
        <img src={hero.image} alt="Developer portrait" className="relative z-[1] w-full max-w-[520px] object-contain" />
      </div>
    </section>
  )
}

export function SkillsSection({ skills }) {
  return (
    <SectionShell id="skills" title="Habilidades">
      <div className="mt-[22px] grid gap-[18px] md:grid-cols-3 xl:grid-cols-6">
        {skills.map((skill) => (
        <article key={skill.name} className="tilt-card tilt-card--right rounded-[18px] border border-white/6 bg-white/[0.03] px-4 pt-[22px] pb-4 text-center">
            <div className="mx-auto mb-4 grid h-[62px] w-[62px] place-items-center rounded-[18px] border border-white/8 bg-linear-to-b from-white/5 to-[rgba(123,92,255,0.08)] text-[1.8rem] font-extrabold text-[#7bd3ff]">
              {skill.iconSrc ? (
                <img src={skill.iconSrc} alt={`${skill.name} icon`} className="h-9 w-9 object-contain" />
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
          <article key={project.title} className={`tilt-card ${index % 2 === 0 ? 'tilt-card--left' : 'tilt-card--right'} rounded-[22px] border border-white/6 bg-white/[0.03] shadow-[0_24px_60px_rgba(0,0,0,0.28)]`}>
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
                  <img src={externalLinkIcon} alt="" className="h-5 w-5 opacity-90" />
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
  const aboutModalPanelRef = useRef(null)

  const handlePointerMove = (event) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2

    element.style.setProperty('--tilt-x', `${Math.max(-1, Math.min(1, x))}`)
    element.style.setProperty('--tilt-y', `${Math.max(-1, Math.min(1, y))}`)
  }

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0')
    event.currentTarget.style.setProperty('--tilt-y', '0')
  }

  const handleAboutModalPointerMove = (event) => {
    const panel = aboutModalPanelRef.current
    if (!panel) return

    const rect = panel.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    panel.style.setProperty('--modal-tilt-x', `${Math.max(-1, Math.min(1, x))}`)
  }

  const handleAboutModalPointerLeave = () => {
    aboutModalPanelRef.current?.style.setProperty('--modal-tilt-x', '0')
  }

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState({ visible: false, type: 'error', message: '' })
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isAboutModalClosing, setIsAboutModalClosing] = useState(false)

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
    if (!isAboutModalOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsAboutModalClosing(true)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAboutModalOpen])

  useEffect(() => {
    if (!isAboutModalClosing) return undefined

    const timeoutId = window.setTimeout(() => {
      setIsAboutModalOpen(false)
      setIsAboutModalClosing(false)
    }, 220)

    return () => window.clearTimeout(timeoutId)
  }, [isAboutModalClosing])

  const closeAboutModal = () => {
    if (!isAboutModalOpen || isAboutModalClosing) return
    setIsAboutModalClosing(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
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

    try {
      setStatus('sending')
      await submitContactForm(result.values)
      setFormState({ name: '', email: '', subject: '', message: '', company: '' })
      setErrors({})
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
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="tilt-card tilt-card--right target-ring scroll-mt-28 rounded-[22px] border border-white/6 bg-white/[0.03] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center gap-[10px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[var(--color-brand)] shadow-[0_0_18px_rgba(123,92,255,0.8)]" />
          <h3 className="m-0 text-xl font-semibold text-white">Sobre mi</h3>
        </div>
        <p className="mt-4 leading-[1.8] text-[var(--color-copy)]">
          Desarrollo soluciones web a medida para negocios y equipos que necesitan ordenar su operacion, automatizar tareas repetitivas y trabajar con mas claridad. Creo herramientas pensadas para adaptarse a cada proceso, reducir errores manuales, ahorrar tiempo y convertir tareas que hoy consumen energia en flujos simples, utiles y faciles de usar.
        </p>
          <button
            type="button"
            onClick={() => {
              setIsAboutModalClosing(false)
              setIsAboutModalOpen(true)
            }}
            className="mt-4 inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-[22px] py-[14px] font-semibold text-[#ebe9ff] no-underline ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm"
          >
          Mas sobre mi
        </button>
      </article>

      <div
        id="contact"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="tilt-card tilt-card--left target-ring scroll-mt-28 rounded-[22px] border border-white/6 bg-white/[0.03] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
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
                    <img src={item.iconSrc} alt="" className="h-5 w-5 object-contain" />
                  </span>
                  <span className="grid gap-0.5">
                    <span className="text-xs uppercase tracking-[0.08em] text-[#9aa3cb]">{item.label}</span>
                    <span className="text-[var(--color-copy)]">{item.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <form onSubmit={handleSubmit} className="grid gap-[14px]">
            <input
              name="hidden_company"
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
      <div
        className={`pointer-events-none fixed right-5 bottom-5 z-50 max-w-[360px] rounded-xl border px-4 py-3 text-sm font-medium text-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
          toast.visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0'
        } ${toast.type === 'error' ? 'border-red-400/40 bg-red-500/90' : 'border-emerald-400/40 bg-emerald-500/90'}`}
      >
        {toast.message}
      </div>

      {isAboutModalOpen ? (
        <div
          className={`about-modal-overlay fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(3,5,12,0.72)] px-4 py-6 backdrop-blur-md ${
            isAboutModalClosing ? 'about-modal-overlay--closing' : ''
          }`}
          onMouseDown={closeAboutModal}
          onPointerMove={handleAboutModalPointerMove}
          onPointerLeave={handleAboutModalPointerLeave}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            ref={aboutModalPanelRef}
            className={`about-modal-panel about-modal-panel--tilted-right relative w-full max-w-[760px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,32,0.98),rgba(9,12,22,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.55)] ${
              isAboutModalClosing ? 'about-modal-panel--closing' : ''
            }`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(123,92,255,0.16),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(90,201,255,0.12),transparent_26%)]" />
            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.16em] text-[#93a0cf]">Sobre mi</p>
                  <h4 id="about-modal-title" className="m-0 text-2xl font-semibold text-white md:text-[2rem]">
                    Soluciones web para ahorrar tiempo y escalar procesos
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={closeAboutModal}
                  className="inline-flex items-center justify-center rounded-2xl border border-[rgba(123,92,255,0.7)] bg-[rgba(123,92,255,0.08)] px-[22px] py-[14px] font-semibold text-[#ebe9ff] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[rgba(123,92,255,0.95)] hover:bg-[rgba(123,92,255,0.14)] hover:ring-white/12 active:translate-y-0 active:scale-[0.99] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm"
                  aria-label="Cerrar modal"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                <div className="modal-panel-card rounded-[22px] border border-white/8 bg-white/[0.03] p-5">
                  <p className="m-0 leading-[1.8] text-[var(--color-copy)]">
                    Diseno y desarrollo sistemas web a medida para automatizar tareas repetitivas, reducir errores manuales y mejorar la operacion diaria de tu negocio.
                  </p>
                  <p className="mt-4 m-0 leading-[1.8] text-[var(--color-copy)]">
                    El objetivo no es solo "tener una app", sino implementar una solucion que te ahorre tiempo real, ordene el trabajo y te permita tomar mejores decisiones.
                  </p>

                  <div className="mt-5 grid gap-3 text-[var(--color-copy)]">
                    <p className="m-0 text-sm uppercase tracking-[0.12em] text-[#9aa3cb]">Como trabajo</p>
                    <p className="m-0"><strong className="text-white">1.</strong> Entiendo tu proceso actual y detecto cuellos de botella.</p>
                    <p className="m-0"><strong className="text-white">2.</strong> Diseno una solucion simple, priorizando impacto y velocidad.</p>
                    <p className="m-0"><strong className="text-white">3.</strong> Entrego un sistema usable, escalable y enfocado en resultados.</p>
                  </div>
                </div>

                <div className="modal-accent-card rounded-[22px] border border-[rgba(123,92,255,0.18)] bg-[rgba(123,92,255,0.06)] p-5">
                  <h5 className="m-0 text-base font-semibold text-white">Servicios que suelen pedir mis clientes</h5>
                  <ul className="mt-4 grid gap-3 p-0 list-none text-[var(--color-copy)]">
                    <li className="modal-list-item">Sistemas internos para gestion operativa</li>
                    <li className="modal-list-item">Automatizacion de tareas administrativas</li>
                    <li className="modal-list-item">Paneles de control con datos en tiempo real</li>
                    <li className="modal-list-item">Integraciones entre herramientas y APIs</li>
                    <li className="modal-list-item">Formularios y flujos de trabajo personalizados</li>
                  </ul>

                  <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="m-0 text-sm uppercase tracking-[0.12em] text-[#9aa3cb]">Ideal para</p>
                    <p className="mt-2 m-0 leading-[1.7] text-[var(--color-copy)]">
                      Negocios y equipos que ya validaron su operacion y necesitan una herramienta propia para crecer sin depender de procesos manuales.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={closeAboutModal}
                  className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#5f5cff] to-[#8f44ff] px-[22px] py-[14px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm"
                >
                  Ver como trabajamos
                </button>
                <a
                  href="#contact"
                  onClick={closeAboutModal}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-[22px] py-[14px] font-semibold text-[#ebe9ff] no-underline transition-all duration-200 ease-out hover:bg-white/[0.06] max-md:rounded-xl max-md:px-4 max-md:py-2 max-md:text-sm"
                >
                  Quiero una propuesta
                </a>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  )
}
