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
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

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

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

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

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  if (!mailFrom || !mailTo || !process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured' })
  }

  try {
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

    await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      subject: `Nuevo contacto | ${subject}`,
      replyTo: email,
      text: [
        'Nuevo mensaje desde el formulario de contacto',
        '',
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Asunto: ${subject}`,
        '',
        'Mensaje:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6fb; padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e6e8ef; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="background:#111827; color:#ffffff; padding:18px 22px;">
                <h1 style="margin:0; font-size:18px; line-height:1.4;">Nuevo mensaje de contacto</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 22px; color:#111827;">
                <p style="margin:0 0 14px 0; font-size:14px;"><strong>Nombre:</strong> ${safeName}</p>
                <p style="margin:0 0 14px 0; font-size:14px;"><strong>Email:</strong> ${safeEmail}</p>
                <p style="margin:0 0 18px 0; font-size:14px;"><strong>Asunto:</strong> ${safeSubject}</p>
                <div style="margin:0; padding:14px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; line-height:1.6;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    })

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Contact endpoint error:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    })
    return res.status(500).json({ error: 'Email error' })
  }
})

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
