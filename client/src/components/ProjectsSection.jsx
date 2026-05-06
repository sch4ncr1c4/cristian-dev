import externalLinkIcon from "../assets/icons/external-link.svg";

const projects = [
  {
    title: "TaskFlow",
    description:
      "App de gestion de tareas con autenticacion, tableros y notificaciones.",
    tags: ["React", "TypeScript", "Tailwind", "PostgreSQL"],
  },
  {
    title: "ShopHub",
    description:
      "E-commerce moderno con carrito, pagos y panel de administracion.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
  },
  {
    title: "FitTrack",
    description:
      "Dashboard de seguimiento de rutinas, ejercicios y estadisticas.",
    tags: ["React", "TypeScript", "Chart.js", "Tailwind"],
  },
];

function ProjectsSection() {
  return (
    <section
      id="proyectos"
      className="card-surface rounded-[2rem] p-5 text-white sm:p-6"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-bold sm:text-xl">
          <span className="h-3 w-3 rounded-full bg-[#5545fa]" />
          Proyectos destacados
        </h2>
        <a
          href="#"
          className="text-sm font-semibold text-[#5545fa] hover:text-[#8072ff] sm:text-base"
        >
          Ver todos
        </a>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-5 lg:grid-cols-3 lg:justify-items-stretch">
        {projects.map((project) => (
          <article
            key={project.title}
            className="card-surface w-full max-w-[34rem] rounded-3xl p-5 sm:max-w-[38rem] lg:max-w-none lg:p-6 lg:transition lg:duration-300 lg:hover:-translate-y-1 lg:hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.7)]"
          >
            <div className="h-44 w-full rounded-2xl bg-white lg:h-48" />

            <div className="mt-4 flex items-start justify-between gap-3">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <a
                href="#"
                aria-label={`Abrir ${project.title}`}
                className="mt-1 lg:transition lg:duration-300 lg:hover:scale-110"
              >
                <img
                  src={externalLinkIcon}
                  alt="Icono de enlace externo"
                  width="20"
                  height="20"
                  className="h-5 w-5"
                  loading="lazy"
                />
              </a>
            </div>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-300 sm:text-base">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#0e162c] px-3 py-1.5 text-xs font-semibold text-gray-300 lg:text-[13px]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;

