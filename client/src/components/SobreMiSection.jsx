function SobreMiSection() {
  return (
    <section
      id="sobre-mi"
      className="card-surface rounded-[2rem] p-5 text-white sm:p-6"
    >
      <h2 className="mb-6 flex items-center gap-3 text-lg font-bold sm:text-xl">
        <span className="h-3 w-3 rounded-full bg-[#6959ff]" />
        Sobre mi
      </h2>

      <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-[#a1a9ca] sm:text-base">
        <p>
          Desarrollo soluciones web a medida para negocios y equipos que
          necesitan ordenar su operacion, automatizar tareas repetitivas y
          trabajar con mas claridad.
        </p>
        <p>
          Mi foco esta en construir sistemas simples de usar, faciles de
          mantener y pensados para generar impacto real: menos friccion, menos
          errores manuales y decisiones mas rapidas.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="card-surface rounded-3xl p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#a1a9ca]">
            Como trabajo
          </h3>
          <ul className="space-y-3 text-sm text-[#a1a9ca] sm:text-base">
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Analizo el proceso actual y detecto los puntos que consumen
                tiempo.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Propongo una solucion clara, con prioridades y alcance bien
                definidos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Entrego un sistema usable, escalable y alineado al objetivo del
                negocio.
              </span>
            </li>
          </ul>
        </article>

        <article className="card-surface rounded-3xl p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#a1a9ca]">
            Servicios frecuentes
          </h3>
          <ul className="space-y-3 text-sm text-[#a1a9ca] sm:text-base">
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Sistemas internos para gestion operativa
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Automatizacion de tareas administrativas
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Paneles de control con datos en tiempo real
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Integraciones entre herramientas y APIs
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#6959ff]" />
              <span className="lg:transition lg:duration-300 lg:hover:translate-x-1 lg:hover:text-white">
                Formularios y flujos de trabajo personalizados
              </span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default SobreMiSection;
