const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values) {
  const errors = {}

  const name = typeof values.name === 'string' ? values.name.trim() : ''
  const email = typeof values.email === 'string' ? values.email.trim() : ''
  const subject = typeof values.subject === 'string' ? values.subject.trim() : ''
  const message = typeof values.message === 'string' ? values.message.trim() : ''
  const company = typeof values.company === 'string' ? values.company.trim() : ''

  if (name.length < 2 || name.length > 120) errors.name = 'Ingresa un nombre valido.'
  if (!EMAIL_RE.test(email) || email.length > 255) errors.email = 'Ingresa un correo valido.'
  if (subject && subject.length > 160) errors.subject = 'El asunto es demasiado largo.'
  if (message.length < 10 || message.length > 4000) errors.message = 'Escribe un mensaje mas claro.'
  if (company.length > 0) errors.company = 'Error de validacion.'

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    values: { name, email, subject, message, company },
  }
}

export async function submitContactForm(values) {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL || `${window.location.origin}/api/contact`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data?.message || 'request-failed')
    error.status = response.status
    throw error
  }

  return data
}
