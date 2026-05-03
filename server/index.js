const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { Resend } = require('resend')

dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const resend = new Resend(process.env.RESEND_API_KEY)
const mailFrom = process.env.RESEND_FROM
const mailTo = process.env.RESEND_TO
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const expectedTurnstileHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME || ''
const expectedTurnstileAction = process.env.TURNSTILE_EXPECTED_ACTION || 'contact_form'

const CONTACT_LIMITS = {
  name: 80,
  email: 120,
  subject: 120,
  message: 2000,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sanitizeText = (value) =>
  value
    .replace(/[<>"'`]/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()

const normalizeField = (value, maxLen) => {
  if (typeof value !== 'string') return ''
  return sanitizeText(value).slice(0, maxLen)
}

const contactRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
})

const verifyTurnstileToken = async (token, remoteIp) => {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: turnstileSecretKey,
      response: token,
      remoteip: remoteIp || '',
    }),
  })

  if (!response.ok) return null

  return response.json()
}

app.use(helmet())
app.set('trust proxy', 1)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST'],
  }),
)
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', contactRateLimit, async (req, res) => {
  const name = normalizeField(req.body?.name, CONTACT_LIMITS.name)
  const email = normalizeField(req.body?.email, CONTACT_LIMITS.email).toLowerCase()
  const subject = normalizeField(req.body?.subject, CONTACT_LIMITS.subject)
  const message = normalizeField(req.body?.message, CONTACT_LIMITS.message)
  const turnstileToken = normalizeField(req.body?.turnstileToken, 2048)
  const turnstileCData = normalizeField(req.body?.turnstileCData, 255)

  if (!name || !email || !subject || !message || !turnstileToken || !turnstileCData) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  if (!mailFrom || !mailTo || !process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured' })
  }

  if (!turnstileSecretKey) {
    return res.status(500).json({ error: 'Turnstile is not configured' })
  }

  try {
    const turnstileResult = await verifyTurnstileToken(turnstileToken, req.ip)
    const isHuman = Boolean(turnstileResult?.success)
    const validHostname =
      !expectedTurnstileHostname || turnstileResult?.hostname === expectedTurnstileHostname
    const validAction = turnstileResult?.action === expectedTurnstileAction
    const validCData = turnstileResult?.cdata === turnstileCData

    if (!isHuman || !validHostname || !validAction || !validCData) {
      return res.status(400).json({ error: 'Turnstile verification failed' })
    }

    await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      subject: `Nuevo contacto: ${subject}`,
      replyTo: email,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Asunto: ${subject}`,
        '',
        'Mensaje:',
        message,
      ].join('\n'),
    })

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Contact endpoint error:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    })
    return res.status(500).json({
      error: 'Email error',
      details: error?.message || 'unknown_error',
    })
  }
})

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
