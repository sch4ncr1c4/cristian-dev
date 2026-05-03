import { useEffect, useRef } from 'react'

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script'
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let turnstileScriptPromise = null

const loadTurnstileScript = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (turnstileScriptPromise) return turnstileScriptPromise

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID)
    if (existingScript) {
      const check = () => {
        if (window.turnstile) resolve(window.turnstile)
        else reject(new Error('Turnstile script loaded but API is unavailable'))
      }

      existingScript.addEventListener('load', check, { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Turnstile script')),
        { once: true },
      )

      if (window.turnstile) resolve(window.turnstile)
      return
    }

    const script = document.createElement('script')
    script.id = TURNSTILE_SCRIPT_ID
    script.src = TURNSTILE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile)
      else reject(new Error('Turnstile API is unavailable after script load'))
    }
    script.onerror = () => reject(new Error('Failed to load Turnstile script'))
    document.head.appendChild(script)
  })

  return turnstileScriptPromise
}

function TurnstileWidget({ siteKey, action, cData, onTokenChange, onWidgetError }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined

    let cancelled = false
    let widgetId = null

    onTokenChange('')

    const renderWidget = async () => {
      try {
        await loadTurnstileScript()
        if (cancelled || !containerRef.current || !window.turnstile) return

        containerRef.current.innerHTML = ''
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          cData,
          theme: 'dark',
          callback: (token) => onTokenChange(token),
          'expired-callback': () => onTokenChange(''),
          'error-callback': (code) => {
            onTokenChange('')
            onWidgetError?.(code)
          },
        })
      } catch (error) {
        onTokenChange('')
        onWidgetError?.(error?.message || 'turnstile_init_error')
      }
    }

    renderWidget()

    return () => {
      cancelled = true
      if (widgetId && window.turnstile?.remove) {
        window.turnstile.remove(widgetId)
      }
    }
  }, [siteKey, action, cData, onTokenChange, onWidgetError])

  return <div ref={containerRef} />
}

export default TurnstileWidget
