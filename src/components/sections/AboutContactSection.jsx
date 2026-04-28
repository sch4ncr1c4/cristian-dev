import { useEffect } from 'react'
import { useContactForm } from '../../hooks/useContactForm.js'
import { resetAllTiltSurfaces, tiltHandlers } from '../../hooks/useTilt.js'

function AboutContactSection({ contactItems }) {
  const {
    errors,
    fieldClassName,
    formState,
    handleCaptchaConfirm,
    handleChange,
    handleSubmit,
    isCaptchaModalOpen,
    isEmailVisible,
    isTurnstileEnabled,
    setIsCaptchaModalOpen,
    setIsEmailVisible,
    status,
    toast,
    turnstileContainerRef,
    turnstileToken,
  } = useContactForm()

  useEffect(() => {
    const onViewportChange = () => {
      resetAllTiltSurfaces()
    }

    onViewportChange()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('orientationchange', onViewportChange)
    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('orientationchange', onViewportChange)
    }
  }, [])

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
        className="tilt-card tilt-card--right target-ring scroll-mt-28 overflow-hidden rounded-[22px] border border-white/6 bg-[rgba(9,12,20,0.88)] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
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
            <p className="mt-2 mb-4 text-sm text-[#b5bddf]">
              {status === 'sending'
                ? 'Enviando mensaje...'
                : 'Completa el captcha para enviar tu mensaje.'}
            </p>
            <div ref={turnstileContainerRef} className="min-h-[70px] overflow-hidden rounded-xl" />
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setIsCaptchaModalOpen(false)}
                disabled={status === 'sending'}
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
                {status === 'sending' ? 'Enviando...' : 'Validar y enviar'}
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

export default AboutContactSection
