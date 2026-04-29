import externalLinkIcon from '../../assets/icons/external-link.svg'
import { tiltHandlers } from '../../hooks/useTilt.js'
import SectionShell from './SectionShell.jsx'

function ProjectsSection({ projects }) {
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
                  <img src={externalLinkIcon} alt={`Icono para abrir ${project.title} en una nueva vista`} decoding="async" className="h-5 w-5 opacity-90" />
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

export default ProjectsSection
