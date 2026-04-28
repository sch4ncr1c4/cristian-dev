import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeBaseUrl(value) {
  return value ? value.trim().replace(/\/+$/, '') : ''
}

function resolveBrandImageUrl() {
  const explicitUrl = process.env.MAIL_BRAND_IMAGE_URL?.trim()
  if (explicitUrl) return explicitUrl

  const baseUrl = normalizeBaseUrl(
    process.env.PUBLIC_BASE_URL ||
      process.env.FRONTEND_URL ||
      process.env.CORS_ORIGIN ||
      ''
  )

  return baseUrl ? `${baseUrl}/favicon.png` : ''
}

export async function sendContactNotification({ name, email, subject, message }) {
  if (!resend || !process.env.MAIL_FROM || !process.env.MAIL_TO) {
    throw new Error('mail-not-configured')
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'Sin asunto')
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>')
  const brandImageUrl = resolveBrandImageUrl()
  const brandImageHtml = brandImageUrl
    ? `<img src="${escapeHtml(brandImageUrl)}" alt="Cristian Dev" style="display:block;width:56px;height:56px;margin:0 auto 14px auto;border-radius:14px;" />`
    : ''

  const html = `
  <div style="margin:0;padding:24px;background:#f3f4f6;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:24px 24px 12px 24px;font-family:Arial,sans-serif;color:#111827;">
          ${brandImageHtml}
          <h2 style="margin:0 0 6px 0;font-size:22px;line-height:1.25;">Nuevo mensaje desde tu portfolio</h2>
          <p style="margin:0;color:#6b7280;font-size:14px;">Recibiste una nueva consulta desde el formulario de contacto.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 24px 24px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">Nombre</td>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;text-align:right;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;text-align:right;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">Asunto</td>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;text-align:right;">${safeSubject}</td>
            </tr>
          </table>
          <div style="margin-top:18px;padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;font-family:Arial,sans-serif;color:#111827;font-size:14px;line-height:1.6;">
            ${safeMessage}
          </div>
        </td>
      </tr>
    </table>
  </div>
  `.trim()

  const text = `Nuevo mensaje desde tu portfolio\n\nNombre: ${name}\nEmail: ${email}\nAsunto: ${subject || 'Sin asunto'}\n\nMensaje:\n${message}`

  await resend.emails.send({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `Nuevo mensaje portfolio: ${subject || 'Sin asunto'}`,
    html,
    text,
    replyTo: email,
  })
}
