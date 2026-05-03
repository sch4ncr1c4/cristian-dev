import { useEffect, useState } from 'react'
import Header from './components/Header'
import HabilidadesSection from './components/HabilidadesSection'
import InicioCard from './components/InicioCard'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import SobreMiSection from './components/SobreMiSection'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
const TURNSTILE_ACTION = 'contact_form'

const buildCData = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `contact_${Math.random().toString(36).slice(2, 18)}`
}

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileCData, setTurnstileCData] = useState(buildCData)
  const [captchaVisible, setCaptchaVisible] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const sendContact = async () => {
    setSending(true)
    setStatus('')

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          turnstileToken,
          turnstileCData,
        }),
      })

      if (!response.ok) throw new Error('Error')

      setForm(initialForm)
      setTurnstileToken('')
      setTurnstileCData(buildCData())
      setCaptchaVisible(false)
      setStatus('Mensaje enviado.')
    } catch {
      setStatus('No se pudo enviar el mensaje.')
    } finally {
      setSending(false)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!turnstileToken) {
      setStatus('Completa la verificacion de seguridad para enviar.')
      return
    }
    await sendContact()
  }

  const onRequestVerification = () => {
    setStatus('Completa la verificacion de seguridad para continuar.')
    setCaptchaVisible(true)
  }

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal-mobile')
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section id="inicio" className="reveal-mobile from-right py-[30px]">
          <InicioCard />
        </section>

        <section className="reveal-mobile from-left py-[30px]">
          <HabilidadesSection />
        </section>

        <section className="reveal-mobile from-right py-[30px]">
          <ProjectsSection />
        </section>

        <section className="reveal-mobile from-left py-[30px]">
          <SobreMiSection />
        </section>

        <section id="contacto" className="reveal-mobile from-right py-[30px]">
          <ContactSection
            form={form}
            sending={sending}
            status={status}
            turnstileSiteKey={TURNSTILE_SITE_KEY}
            turnstileAction={TURNSTILE_ACTION}
            turnstileCData={turnstileCData}
            captchaVisible={captchaVisible}
            turnstileToken={turnstileToken}
            onCaptchaReady={() => setStatus('Captcha listo. Completa la verificacion.')}
            onRequestVerification={onRequestVerification}
            onTurnstileChange={setTurnstileToken}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App


