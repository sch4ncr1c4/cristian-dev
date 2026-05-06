import reactIcon from "../assets/skills/react.svg";
import tsIcon from "../assets/skills/typescript.svg";
import nodeIcon from "../assets/skills/nodejs.svg";
import expressIcon from "../assets/skills/express.svg";
import tailwindIcon from "../assets/skills/tailwind.svg";
import postgresIcon from "../assets/skills/postgresql.svg";
import boltIcon from "../assets/icons/bolt.svg";
import chainIcon from "../assets/icons/chain.svg";
import dashboardIcon from "../assets/icons/dashboard.svg";
import extensionIcon from "../assets/icons/extension.svg";
import formIcon from "../assets/icons/form.svg";
import cloudIcon from "../assets/icons/cloud.svg";

const stackSkills = [
  { name: "React", icon: reactIcon },
  { name: "TypeScript", icon: tsIcon },
  { name: "Node.js", icon: nodeIcon },
  { name: "Express", icon: expressIcon },
  { name: "Tailwind", icon: tailwindIcon },
  { name: "PostgreSQL", icon: postgresIcon },
];

const capabilityCards = [
  { label: "Automatización", icon: boltIcon },
  { label: "APIs REST", icon: chainIcon },
  { label: "Dashboards", icon: dashboardIcon },
  { label: "Integraciones", icon: extensionIcon },
  { label: "Formularios avanzados", icon: formIcon },
  { label: "Cloud & Despliegue", icon: cloudIcon },
];

function SkillsSection() {
  return (
    <section
      id="habilidades"
      className="card-surface rounded-[2rem] border border-white/10 p-5 text-white sm:p-8"
    >
      <div className="max-w-3xl">
        <h2 className="mb-4 flex items-center gap-3 text-lg font-bold sm:text-xl">
          <span className="h-3 w-3 rounded-full bg-[#5545fa]" />
          Tecnologías Principales
        </h2>
        <p className="text-3xl font-black leading-tight text-white sm:text-5xl">
          Stack <span className="text-[#5545fa]">tecnológico</span>
        </p>
        <p className="mt-5 text-base leading-relaxed text-[#a1a9ca] sm:text-lg">
          Trabajo con herramientas modernas y eficientes para construir
          sistemas web escalables, automatizaciones e integraciones robustas.
        </p>
      </div>

      <div className="mt-9">
        <h3 className="mb-5 text-2xl font-bold text-white">
          Desarrollo web y backend
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stackSkills.map((skill) => (
            <article
              key={skill.name}
              className="group rounded-2xl border border-slate-600/30 bg-gradient-to-b from-[#060b16] to-[#03070f] px-3 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#5545fa]/45 hover:shadow-[0_10px_28px_rgba(85,69,250,0.2)]"
            >
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-500/25 bg-[#090f1d] transition duration-300 group-hover:border-[#5545fa]/45 group-hover:bg-[#0d1324]">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  width="42"
                  height="42"
                  className="h-11 w-11"
                  loading="lazy"
                />
              </div>

              <h4 className="text-sm font-semibold leading-tight text-white sm:text-base">
                {skill.name}
              </h4>
              <span className="mx-auto mt-4 block h-[3px] w-14 origin-center scale-x-75 rounded-full bg-[#5545fa] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>

      <div className="mt-11">
        <h3 className="mb-5 text-2xl font-bold text-white">
          Automatización e integraciones
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {capabilityCards.map((item) => (
            <article
              key={item.label}
              className="group rounded-2xl border border-slate-600/30 bg-gradient-to-b from-[#060b16] to-[#03070f] px-3 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#5545fa]/45 hover:shadow-[0_10px_28px_rgba(85,69,250,0.2)]"
            >
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-500/25 bg-[#090f1d] transition duration-300 group-hover:border-[#5545fa]/45 group-hover:bg-[#0d1324]">
                <img
                  src={item.icon}
                  alt={item.label}
                  width="44"
                  height="44"
                  className="h-11 w-11"
                  loading="lazy"
                />
              </div>

              <h4 className="text-sm font-semibold leading-tight text-white sm:text-base">
                {item.label}
              </h4>
              <span className="mx-auto mt-4 block h-[3px] w-14 origin-center scale-x-75 rounded-full bg-[#5545fa] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;

