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

export async function sendContactNotification({ name, email, subject, message }) {
  if (!resend || !process.env.MAIL_FROM || !process.env.MAIL_TO) {
    throw new Error('mail-not-configured')
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'Sin asunto')
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>')
  const brandImageUrl = process.env.MAIL_BRAND_IMAGE_URL?.trim()
  const brandImageHtml = brandImageUrl
    ? `<img src="${escapeHtml(brandImageUrl)}" alt="Portfolio" style="display:block;width:120px;height:auto;margin:0 auto 16px auto;border-radius:12px;" />`
    : ''

  await resend.emails.send({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `Nuevo mensaje portfolio: ${subject || 'Sin asunto'}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">${brandImageHtml}<h2>Nuevo mensaje desde tu portfolio</h2><p><strong>Nombre:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Asunto:</strong> ${safeSubject}</p><p><strong>Mensaje:</strong><br/>${safeMessage}</p></div>`,
    replyTo: email,
  })
}
