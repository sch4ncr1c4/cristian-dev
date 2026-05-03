import { useState } from 'react'
import TurnstileWidget from './TurnstileWidget'

function CaptchaModal({
  open,
  siteKey,
  action,
  cData,
  turnstileToken,
  onTokenChange,
  onClose,
}) {
  const [shouldMountCaptcha, setShouldMountCaptcha] = useState(false)

  if (!open || !siteKey) return null

  const handleClose = () => {
    setShouldMountCaptcha(false)
    onTokenChange('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="card-surface w-full max-w-md rounded-2xl border border-[#242631] p-5 text-white">
        <h3 className="text-lg font-bold">Verificacion de seguridad</h3>
        <p className="mt-2 text-sm text-gray-300">
          Verifica que sos una persona para habilitar el envio.
        </p>

        {!shouldMountCaptcha ? (
          <button
            type="button"
            className="btn-anim mt-4 w-full cursor-pointer rounded-xl bg-[#6959ff] px-4 py-3 text-sm font-semibold hover:bg-[#5b4be6]"
            onClick={() => setShouldMountCaptcha(true)}
            onFocus={() => setShouldMountCaptcha(true)}
          >
            Iniciar verificacion
          </button>
        ) : (
          <div className="mt-4 rounded-xl border border-[#242631] bg-[#0d111c] p-3">
            <TurnstileWidget
              siteKey={siteKey}
              action={action}
              cData={cData}
              onTokenChange={onTokenChange}
            />
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="w-full cursor-pointer rounded-xl border border-[#3a3f51] px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-[#1b2134]"
            onClick={handleClose}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-[#6959ff] px-4 py-3 text-sm font-semibold disabled:opacity-60"
            disabled={!turnstileToken}
            onClick={onClose}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaptchaModal
