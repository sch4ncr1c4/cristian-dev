const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5
const submissions = new Map()

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
  })
}

function getClientKey(request) {
  return request.headers.get('CF-Connecting-IP') || 'unknown'
}

function isRateLimited(key) {
  const now = Date.now()
  for (const [storedKey, storedValue] of submissions.entries()) {
    if (now - storedValue.start > WINDOW_MS) submissions.delete(storedKey)
  }
  const entry = submissions.get(key)
  if (!entry || now - entry.start > WINDOW_MS) {
    submissions.set(key, { start: now, count: 1 })
    return false
  }
  entry.count += 1
  submissions.set(key, entry)
  return entry.count > MAX_REQUESTS
}

function validateBody(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''

  const errors = {}
  if (name.length < 2 || name.length > 120) errors.name = true
  if (!EMAIL_RE.test(email) || email.length > 255) errors.email = true
  if (subject.length > 160) errors.subject = true
  if (message.length < 10 || message.length > 4000) errors.message = true
  if (company.length > 0) errors.company = true

  return {
    ok: Object.keys(errors).length === 0,
    values: { name, email, subject: subject || null, message },
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

async function sendContactNotification(env, { name, email, subject, message }) {
  const apiKey = env.RESEND_API_KEY
  const mailFrom = env.MAIL_FROM
  const mailTo = env.MAIL_TO

  if (!apiKey || !mailFrom || !mailTo) throw new Error('mail-not-configured')

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'Sin asunto')
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>')
  const brandImageUrl = env.MAIL_BRAND_IMAGE_URL?.trim()
  const brandImageHtml = brandImageUrl
    ? `<img src="${escapeHtml(brandImageUrl)}" alt="Portfolio" style="display:block;width:120px;height:auto;margin:0 auto 16px auto;border-radius:12px;" />`
    : ''

  await resend.emails.send({
    from: mailFrom,
    to: mailTo,
    subject: `Nuevo mensaje portfolio: ${subject || 'Sin asunto'}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">${brandImageHtml}<h2>Nuevo mensaje desde tu portfolio</h2><p><strong>Nombre:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Asunto:</strong> ${safeSubject}</p><p><strong>Mensaje:</strong><br/>${safeMessage}</p></div>`,
    replyTo: email,
  })
}

async function getPool(env) {
  const { Pool } = await import('pg')
  if (!env.DATABASE_URL) throw new Error('DATABASE_URL is required')
  const sslMode = (env.PGSSLMODE || 'disable').toLowerCase()
  const rejectUnauthorized = env.PGSSL_REJECT_UNAUTHORIZED !== 'false'

  return new Pool({
    connectionString: env.DATABASE_URL,
    ssl: sslMode === 'disable' ? false : { rejectUnauthorized },
    max: 10,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  })
}

async function logError(code, error, meta = {}) {
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

export async function handleContactRequest(request, env) {
  const requestId = crypto.randomUUID()
  const key = getClientKey(request)

  if (isRateLimited(key)) {
    return json({ ok: false, message: 'Demasiados intentos' }, 429)
  }

  let body = {}
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const parsed = validateBody(body ?? {})
  if (!parsed.ok) {
    return json({ ok: false, message: 'Datos invalidos' }, 400)
  }

  const pool = await getPool(env)

  try {
    const insertResult = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [parsed.values.name, parsed.values.email, parsed.values.subject, parsed.values.message, 'pending'],
    )
    const messageId = insertResult.rows[0]?.id

    try {
      await sendContactNotification(env, parsed.values)
      if (messageId) {
        await pool.query('UPDATE contact_messages SET status = $1 WHERE id = $2', ['sent', messageId])
      }
    } catch (mailError) {
      await logError('contact-mail-failed', mailError, { requestId, messageId, ip: key })
      if (messageId) {
        await pool.query('UPDATE contact_messages SET status = $1 WHERE id = $2', ['email_failed', messageId])
      }
    }

    return json({ ok: true, message: 'Mensaje recibido' }, 201)
  } catch (dbError) {
    await logError('contact-db-failed', dbError, { requestId, ip: key })
    return json({ ok: false, message: 'No se pudo procesar el mensaje' }, 500)
  } finally {
    await pool.end().catch(() => {})
  }
}

export async function handleHealthRequest(_request, env) {
  try {
    const pool = await getPool(env)
    await pool.query('SELECT 1')
    await pool.end().catch(() => {})
    return json({ ok: true })
  } catch (error) {
    await logError('health-db-failed', error)
    return json({ ok: false }, 500)
  }
}
