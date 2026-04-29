function Loader({ visible, label = 'Cristian Dev' }) {
  const [firstWord = 'Cristian', secondWord = 'Dev'] = label.trim().split(/\s+/)

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[999] grid place-items-center bg-[#05070e] transition-all duration-500 ${
        visible ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'
      }`}
    >
      <div className="relative grid place-items-center gap-5">
        <div className="loader-spinner relative h-[108px] w-[108px]" aria-hidden="true">
          <span className="loader-ring loader-ring-track" />
          <span className="loader-ring loader-ring-spin" />
          <span className="loader-ring loader-ring-spin-reverse" />
          <span className="loader-center-dot" />
        </div>
        <div className="loader-dots text-[0.68rem] font-semibold tracking-[0.24em] text-[#cdd4ff] uppercase">
          Cargando
        </div>
        <div className="text-sm font-medium tracking-[0.06em] text-[#cdd4ff]" role="status" aria-live="polite">
          <span className="inline-flex items-center gap-2 text-[1.1rem] text-[#f4f7ff]">
            <span className="text-[1.25rem] text-[var(--color-brand)]">{'</>'}</span>
            <span>
              {firstWord} <strong className="text-[var(--color-brand)]">{secondWord}</strong>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loader
