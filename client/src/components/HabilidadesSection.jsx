import reactIcon from '../assets/skills/react.svg'
import tsIcon from '../assets/skills/typescript.svg'
import nodeIcon from '../assets/skills/nodejs.svg'
import expressIcon from '../assets/skills/express.svg'
import tailwindIcon from '../assets/skills/tailwind.svg'
import postgresIcon from '../assets/skills/postgresql.svg'

const skills = [
  { name: 'React', icon: reactIcon },
  { name: 'TypeScript', icon: tsIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'Express', icon: expressIcon },
  { name: 'Tailwind', icon: tailwindIcon },
  { name: 'PostgreSQL', icon: postgresIcon },
]

function HabilidadesSection() {
  return (
    <section id="habilidades" className="card-surface rounded-[2rem] p-5 text-white sm:p-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-3 text-lg font-bold sm:text-[1.75rem]">
          <span className="h-3 w-3 rounded-full bg-[#6959ff]" />
          Habilidades
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {skills.map((skill) => (
          <article
            key={skill.name}
            className="group rounded-2xl border border-[#6959ff]/15 bg-[#060b1a] px-3 py-5 text-center lg:transition lg:duration-300 lg:hover:-translate-y-1 lg:hover:border-[#6959ff]/40"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#6959ff]/20 bg-[#11162a]">
              <img src={skill.icon} alt={skill.name} className="h-9 w-9" loading="lazy" />
            </div>

            <h3 className="text-lg font-semibold leading-none text-white sm:text-[1.1rem]">{skill.name}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HabilidadesSection




