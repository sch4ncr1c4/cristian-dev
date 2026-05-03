import TurnstileWidget from './TurnstileWidget'

function CaptchaChallengePanel({
  siteKey,
  action,
  cData,
  executeTrigger,
  onTokenChange,
  onReady,
}) {
  if (!siteKey) return null

  return (
    <div className="space-y-2 rounded-xl border border-[#242631] bg-[#0d111c] p-3">
      <p className="text-xs text-gray-400">Verificacion de seguridad</p>
      <TurnstileWidget
        siteKey={siteKey}
        action={action}
        cData={cData}
        executeTrigger={executeTrigger}
        onTokenChange={onTokenChange}
        onReady={onReady}
      />
    </div>
  )
}

export default CaptchaChallengePanel
