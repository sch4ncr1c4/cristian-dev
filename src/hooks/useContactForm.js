import { useEffect, useRef, useState } from 'react'
import { submitContactForm, validateContactForm } from '../lib/contact.js'

export function useContactForm() {
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || ''
  const isTurnstileEnabled = Boolean(turnstileSiteKey)
  const turnstileContainerRef = useRef(null)
  const turnstileWidgetIdRef = useRef(null)
  const pendingSubmissionRef = useRef(null)

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isCaptchaModalOpen, setIsCaptchaModalOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState({ visible: false, type: 'error', message: '' })
  const [isEmailVisible, setIsEmailVisible] = useState(false)

  useEffect(() => {
    if (!toast.visible) return undefined
    const timeoutId = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }))
    }, 3200)
    return () => window.clearTimeout(timeoutId)
  }, [toast.visible])

  useEffect(() => {
    if (status !== 'success') return undefined
    const timeoutId = window.setTimeout(() => {
      setStatus('idle')
    }, 2600)
    return () => window.clearTimeout(timeoutId)
  }, [status])

  useEffect(() => {
    if (!isTurnstileEnabled) return undefined

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainerRef.current || turnstileWidgetIdRef.current) return
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      })
    }

    if (window.turnstile) {
      renderWidget()
      return undefined
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = renderWidget
    document.head.appendChild(script)

    return () => {
      script.onload = null
      if (turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
      }
      turnstileWidgetIdRef.current = null
      setTurnstileToken('')
    }
  }, [isTurnstileEnabled, turnstileSiteKey])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const submitValidatedForm = async (values) => {
    try {
      setStatus('sending')
      await submitContactForm({ ...values, turnstileToken })
      setFormState({ name: '', email: '', subject: '', message: '', company: '' })
      setErrors({})
      pendingSubmissionRef.current = null
      setIsCaptchaModalOpen(false)
      setTurnstileToken('')
      if (isTurnstileEnabled && turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current)
      }
      setStatus('success')
      setToast({ visible: false, type: 'error', message: '' })
    } catch (error) {
      setStatus('error')
      const isRateLimit = error?.status === 429
      setToast({
        visible: true,
        type: 'error',
        message: isRateLimit
          ? 'Demasiados intentos. Espera un momento antes de enviar otro mensaje.'
          : 'No se pudo enviar el mensaje. Reintenta en unos minutos.',
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('idle')

    const result = validateContactForm(formState)
    setErrors(result.errors)

    if (!result.ok) {
      setToast({
        visible: true,
        type: 'error',
        message: 'Revisa los campos marcados antes de enviar.',
      })
      return
    }

    if (isTurnstileEnabled && !turnstileToken) {
      pendingSubmissionRef.current = result.values
      setIsCaptchaModalOpen(true)
      return
    }

    await submitValidatedForm(result.values)
  }

  const handleCaptchaConfirm = async () => {
    if (!turnstileToken) return
    const result = validateContactForm(formState)
    setErrors(result.errors)
    if (!result.ok) return
    await submitValidatedForm(pendingSubmissionRef.current || result.values)
  }

  const fieldClassName = (fieldName) =>
    `w-full rounded-[16px] border bg-[rgba(9,12,22,0.96)] px-4 py-[15px] text-[15px] text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm placeholder:text-[#7f89b2] transition-all duration-200 ease-out focus:-translate-y-px focus:shadow-[0_0_0_1px_rgba(123,92,255,0.75),0_12px_28px_rgba(0,0,0,0.18)] ${
      errors[fieldName]
        ? 'border-[#ff6b6b]/80 focus:border-[#ff7d7d]'
        : 'border-white/8 focus:border-[rgba(123,92,255,0.8)]'
    }`

  return {
    errors,
    fieldClassName,
    formState,
    handleCaptchaConfirm,
    handleChange,
    handleSubmit,
    isCaptchaModalOpen,
    isEmailVisible,
    isTurnstileEnabled,
    setIsCaptchaModalOpen,
    setIsEmailVisible,
    status,
    toast,
    turnstileContainerRef,
    turnstileToken,
  }
}
