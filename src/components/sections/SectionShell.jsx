import { tiltHandlers } from '../../hooks/useTilt.js'

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

export default SectionShell
