const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { Resend } = require('resend')
const { buildContactEmail, getLogoUrl } = require('./emailTemplate')

dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const mailFrom = process.env.RESEND_FROM
const mailTo = process.env.RESEND_TO
const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS)
const trustProxy = Number.isInteger(trustProxyHops) && trustProxyHops >= 1 ? trustProxyHops : false
const isProduction = process.env.NODE_ENV === 'production'
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : []

if (!isProduction && allowedOrigins.length === 0) {
  allowedOrigins.push('http://localhost:5173')
}

if (isProduction && allowedOrigins.length === 0) {
  throw new Error('CORS_ORIGIN debe estar definido en producción')
}

if (isProduction && !process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY debe estar definido en producción')
}

if (isProduction && (!mailFrom || !mailTo)) {
  throw new Error('RESEND_FROM y RESEND_TO deben estar definidos en producción')
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const CONTACT_LIMITS = {
  name: 40,
  email: 150,
  subject: 120,
  message: 1000,
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
  statusCode: 429,
  message: { error: 'Too many requests, please try again later' },
  skip: (req) => req.method === 'OPTIONS',
})

app.use(helmet())
app.set('trust proxy', trustProxy)
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

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  if (!mailFrom || !mailTo || !resend) {
    return res.status(500).json({ error: 'Email service is not configured' })
  }

  try {
    const { text, html } = buildContactEmail({
      name,
      email,
      subject,
      message,
      logoUrl: getLogoUrl(),
    })

    await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      subject: `Nuevo contacto | ${subject}`,
      replyTo: email,
      text,
      html,
    })

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Contact endpoint error:', {
      message: error?.message,
      name: error?.name,
      ...(isProduction ? {} : { stack: error?.stack }),
    })
    return res.status(500).json({ error: 'Email error' })
  }
})

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})
