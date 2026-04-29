import { tiltHandlers } from '../../hooks/useTilt.js'
import SectionShell from './SectionShell.jsx'

function SkillsSection({ skills }) {
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
                <img src={skill.iconSrc} alt={`Logo de ${skill.name}`} loading="lazy" decoding="async" className="h-9 w-9 object-contain" />
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

export default SkillsSection
