import boltGreenIcon from "../assets/icons/bolt-green.svg";
import reloadIcon from "../assets/icons/reload.svg";
import graphIcon from "../assets/icons/graph.svg";

function SobreMiSection() {
  const highlights = [
    {
      icon: boltGreenIcon,
      title: "Procesos más rápidos",
      description:
        "Reduzco trabajo manual y elimino tareas repetitivas para mejorar los tiempos operativos.",
    },
    {
      icon: reloadIcon,
      title: "Automatizaciones inteligentes",
      description:
        "Creo flujos y sistemas web que ejecutan procesos con menos fricción y mayor precisión.",
    },
    {
      icon: graphIcon,
      title: "Sistemas escalables",
      description:
        "Desarrollo soluciones modernas y fáciles de mantener, preparadas para crecer con tu negocio.",
    },
  ];

  const workflow = [
    {
      step: "1",
      title: "Analizo procesos y detecto puntos de fricción operativa.",
      description:
        "Entiendo cómo funciona tu operación para encontrar oportunidades reales de mejora.",
    },
    {
      step: "2",
      title: "Diseño soluciones claras y alineadas al objetivo.",
      description:
        "Defino prioridades y una arquitectura simple para lograr resultados medibles.",
    },
    {
      step: "3",
      title: "Desarrollo sistemas modernos y fáciles de mantener.",
      description:
        "Entrego soluciones escalables, usables y listas para acompañar el crecimiento.",
    },
  ];

  const services = [
    "Sistemas internos para gestión operativa",
    "Automatización de procesos administrativos",
    "Paneles y visualización de datos en tiempo real",
    "Integraciones entre APIs y herramientas digitales",
    "Formularios y flujos de trabajo personalizados",
  ];

  return (
    <section
      id="sobre-mi"
      className="card-surface rounded-[2rem] p-5 text-white sm:p-6"
    >
      <h2 className="mb-6 flex items-center gap-3 text-lg font-bold sm:text-xl">
        <span className="h-3 w-3 rounded-full bg-[#5545fa]" />
        Mi enfoque
      </h2>

      <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-[#a1a9ca] sm:text-base">
        <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
          Construyo sistemas que simplifican operaciones
        </h3>
        <p>
          Ayudo a negocios y equipos a optimizar procesos mediante sistemas web
          y automatizaciones diseñadas para reducir trabajo manual, mejorar la
          organización y ahorrar tiempo operativo.
        </p>
        <p>
          Desarrollo soluciones modernas, escalables y fáciles de mantener,
          enfocadas en resolver problemas reales y aportar claridad en el día a
          día de cada operación.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="card-surface group rounded-2xl border border-white/10 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#5545fa]/55 hover:shadow-[0_10px_30px_rgba(85,69,250,0.2)]"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="highlight-badge inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#5545fa]/40 bg-[#5545fa]/15 transition duration-300 group-hover:scale-105 group-hover:border-[#8f84ff]/60 group-hover:bg-[#5545fa]/25">
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  width="20"
                  height="20"
                  className="h-5 w-5"
                  loading="lazy"
                />
              </span>
              <h3 className="text-base font-semibold text-white transition duration-300 group-hover:text-[#d8d3ff]">
                {item.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#a1a9ca] transition duration-300 group-hover:text-[#bcc4e6]">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="card-surface rounded-3xl border border-white/10 p-4 sm:p-5">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#a1a9ca]">
            Cómo trabajo
          </h3>
          <ul className="space-y-4">
            {workflow.map((item) => (
              <li key={item.step} className="flex gap-3">
                <span className="workflow-step mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5545fa] text-xs font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#a1a9ca]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="card-surface rounded-3xl border border-[#5545fa]/30 p-4 sm:p-5">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#a1a9ca]">
            Servicios frecuentes
          </h3>
          <ul className="space-y-3 text-sm text-[#c7cff1] sm:text-base">
            {services.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#5545fa]" />
                <span className="leading-relaxed transition duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default SobreMiSection;

