import { useState } from 'react'
import calenderIcon from '../assets/icons/calender-svgrepo-com.svg'
import locationIcon from '../assets/icons/location-svgrepo-com.svg'
import mailIcon from '../assets/icons/mail-svgrepo-com.svg'

function ContactSection({ form, sending, status, onChange, onSubmit }) {
  const [showEmail, setShowEmail] = useState(false)

  return (
    <section className="card-surface rounded-[2rem] p-5 text-white sm:p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-5 text-gray-300">
          <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-white sm:text-xl">
            <span className="h-3 w-3 rounded-full bg-[#6959ff]" />
            Contacto
          </h2>

          <div className="flex items-start gap-4">
            <img src={mailIcon} alt="Icono de correo electronico" className="mt-1 h-6 w-6" loading="lazy" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Email</p>
              {!showEmail ? (
                <button
                  type="button"
                  onClick={() => setShowEmail(true)}
                  className="btn-anim mt-2 rounded-xl border border-[#6959ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6959ff]/10"
                >
                  Mostrar mail
                </button>
              ) : (
                <a
                  href="mailto:crschinocca@gmail.com"
                  className="mt-2 inline-block text-sm font-medium text-[#a8b5d8] hover:text-white"
                >
                  crschinocca@gmail.com
                </a>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src={locationIcon} alt="Icono de ubicacion" className="mt-1 h-6 w-6" loading="lazy" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Ubicacion</p>
              <p className="text-sm font-medium text-[#a8b5d8] sm:text-base">Buenos Aires, Argentina</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src={calenderIcon} alt="Icono de calendario" className="mt-1 h-6 w-6" loading="lazy" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Disponibilidad</p>
              <p className="text-sm font-medium text-[#a8b5d8] sm:text-base">Agenda abierta para nuevos proyectos</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} autoComplete="off" className="self-start space-y-4">
          <input
            className="w-full rounded-xl border border-[#242631] bg-[#111420] px-5 py-4 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 hover:border-[#6959ff] focus:border-[#6959ff] active:border-[#6959ff] sm:text-base"
            name="name"
            placeholder="Nombre"
            autoComplete="off"
            value={form.name}
            onChange={onChange}
            required
          />

          <input
            className="w-full rounded-xl border border-[#242631] bg-[#111420] px-5 py-4 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 hover:border-[#6959ff] focus:border-[#6959ff] active:border-[#6959ff] sm:text-base"
            name="email"
            type="email"
            placeholder="Correo electronico"
            autoComplete="off"
            value={form.email}
            onChange={onChange}
            required
          />

          <input
            className="w-full rounded-xl border border-[#242631] bg-[#111420] px-5 py-4 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 hover:border-[#6959ff] focus:border-[#6959ff] active:border-[#6959ff] sm:text-base"
            name="subject"
            placeholder="Asunto"
            autoComplete="off"
            value={form.subject}
            onChange={onChange}
            required
          />

          <textarea
            className="h-32 w-full resize-none rounded-xl border border-[#242631] bg-[#111420] px-5 py-4 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 hover:border-[#6959ff] focus:border-[#6959ff] active:border-[#6959ff] sm:text-base"
            name="message"
            placeholder="Contame tu proceso actual y te digo que se puede automatizar"
            autoComplete="off"
            value={form.message}
            onChange={onChange}
            required
          />

          <button
            className="btn-anim w-full cursor-pointer rounded-3xl bg-[#6959ff] px-6 py-4 text-base font-bold text-white hover:bg-[#5b4be6] disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
            disabled={sending}
            type="submit"
          >
            {sending ? 'Enviando...' : 'Solicitar propuesta'}
          </button>

          {status && <p className="text-sm text-gray-300">{status}</p>}
        </form>
      </div>
    </section>
  )
}

export default ContactSection




