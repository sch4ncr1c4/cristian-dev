function Loader({ visible, label }) {
  return (
    <div
      className={`fixed inset-0 z-[999] grid place-items-center bg-[#05070e] transition-all duration-700 ${
        visible ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'
      }`}
    >
      <div className="relative grid place-items-center">
        <div className="h-[96px] w-[96px] rounded-full border-2 border-transparent border-t-[var(--color-brand)] border-r-[var(--color-brand)] animate-spin" />
        <div className="mt-6 text-sm font-medium tracking-[0.24em] text-[#cdd4ff]">
          {label}
        </div>
      </div>
    </div>
  )
}

export default Loader
