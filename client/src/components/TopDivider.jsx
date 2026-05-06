function TopDivider({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full ${className}`.trim()}
    >
      <div className="relative mx-auto h-8 w-full max-w-6xl">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#5545fa]/45 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5545fa] shadow-[0_0_18px_rgba(85,69,250,0.65)]" />
      </div>
    </div>
  );
}

export default TopDivider;

