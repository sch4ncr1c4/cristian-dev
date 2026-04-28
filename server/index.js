import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pool from './db.js'
import { sendContactNotification } from './mail.js'
import { createRateLimiter } from './rateLimit.js'

const app = express()
const port = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5
const rateLimiter = createRateLimiter({ windowMs: WINDOW_MS, maxRequests: MAX_REQUESTS })
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim() || ''

if (process.env.TRUST_PROXY) {
  app.set('trust proxy', process.env.TRUST_PROXY)
} else if (isProduction) {
  app.set('trust proxy', 1)
}

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : isProduction
  ? []
  : ['http://localhost:5173']

if (isProduction && allowedOrigins.length === 0) {
  throw new Error('CORS_ORIGIN is required in production')
}

function logError(code, error, meta = {}) {
  console.error(
    JSON.stringify({
      level: 'error',
      code,
      message: error?.message || 'unknown-error',
      timestamp: new Date().toISOString(),
      ...meta,
    }),
  )
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('CORS_BLOCKED'))
    },
    methods: ['POST', 'GET'],
  }),
)
app.use(express.json({ limit: '10kb', strict: true, type: 'application/json' }))

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateBody(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken.trim() : ''

  const errors = {}
  if (name.length < 2 || name.length > 120) errors.name = true
  if (!EMAIL_RE.test(email) || email.length > 255) errors.email = true
  if (subject.length > 160) errors.subject = true
  if (message.length < 10 || message.length > 4000) errors.message = true
  if (company.length > 0) errors.company = true

  return {
    ok: Object.keys(errors).length === 0,
    values: { name, email, subject: subject || null, message, turnstileToken },
  }
}

async function verifyTurnstile({ token, ip }) {
  if (!turnstileSecret) return true
  if (!token) return false

  const body = new URLSearchParams({
    secret: turnstileSecret,
    response: token,
  })

  if (ip && ip !== 'unknown') {
    body.set('remoteip', ip)
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(5000),
  })

  if (!response.ok) {
    throw new Error(`turnstile-http-${response.status}`)
  }

  const data = await response.json()
  return Boolean(data?.success)
}

app.post('/api/contact', async (req, res) => {
  const requestId = randomUUID()
  const key = rateLimiter.getClientKey(req)

  if (await rateLimiter.isLimited(key)) {
    return res.status(429).json({ ok: false, message: 'Demasiados intentos' })
  }

  const parsed = validateBody(req.body ?? {})
  if (!parsed.ok) {
    return res.status(400).json({ ok: false, message: 'Datos invalidos' })
  }

  try {
    const isHuman = await verifyTurnstile({ token: parsed.values.turnstileToken, ip: key })
    if (!isHuman) {
      return res.status(400).json({ ok: false, message: 'Verificacion anti-spam fallida' })
    }
  } catch (turnstileError) {
    logError('turnstile-verify-failed', turnstileError, { requestId, ip: key })
    return res.status(503).json({ ok: false, message: 'No se pudo validar anti-spam' })
  }

  try {
    const insertResult = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [parsed.values.name, parsed.values.email, parsed.values.subject, parsed.values.message, 'pending'],
    )
    const messageId = insertResult.rows[0]?.id

    try {
      await sendContactNotification(parsed.values)
      if (messageId) {
        await pool.query('UPDATE contact_messages SET status = $1 WHERE id = $2', ['sent', messageId])
      }
    } catch (mailError) {
      logError('contact-mail-failed', mailError, { requestId, messageId, ip: key })
      if (messageId) {
        await pool.query('UPDATE contact_messages SET status = $1 WHERE id = $2', ['email_failed', messageId])
      }
    }

    return res.status(201).json({ ok: true, message: 'Mensaje recibido' })
  } catch (dbError) {
    logError('contact-db-failed', dbError, { requestId, ip: key })
    return res.status(500).json({ ok: false, message: 'No se pudo procesar el mensaje' })
  }
})

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true })
  } catch (error) {
    logError('health-db-failed', error)
    res.status(500).json({ ok: false })
  }
})

app.use((error, _req, res, _next) => {
  void _next
  if (error?.message === 'CORS_BLOCKED') {
    return res.status(403).json({ ok: false, message: 'Origen no permitido' })
  }
  logError('unhandled', error)
  return res.status(500).json({ ok: false, message: 'Error interno del servidor' })
})

app.listen(port, () => {
  console.log(`API listening on ${port}`)
})
