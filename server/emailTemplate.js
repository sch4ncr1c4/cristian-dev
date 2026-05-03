const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const normalizeBaseUrl = (value) => (typeof value === 'string' ? value.trim().replace(/\/+$/, '') : '')

const buildContactEmail = ({ name, email, subject, message, logoUrl }) => {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />')
  const safeLogoUrl = escapeHtml(logoUrl || '')

  const text = [
    'Nuevo mensaje desde el formulario de contacto',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Asunto: ${subject}`,
    '',
    'Mensaje:',
    message,
  ].join('\n')

  const logoBlock = safeLogoUrl
    ? `<img src="${safeLogoUrl}" alt="Logo" width="30" height="30" style="display:block; border:0; outline:none; text-decoration:none; border-radius:8px;" />`
    : ''

  const html = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nuevo mensaje de contacto</title>
  </head>
  <body style="margin:0; padding:0; background-color:#eef2f8;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      Nuevo mensaje recibido desde tu formulario de contacto.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#eef2f8; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:660px; background-color:#ffffff; border:1px solid #dfe6f2; border-radius:14px; overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(160deg,#0b1428 0%,#09101f 100%); padding:18px 24px; color:#ffffff;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="width:40px; vertical-align:middle;">${logoBlock}</td>
                    <td style="vertical-align:middle;">
                      <p style="margin:0; font:700 18px/1.4 Arial,Helvetica,sans-serif; letter-spacing:0.2px;">Nuevo mensaje de contacto</p>
                      <p style="margin:4px 0 0 0; font:400 12px/1.4 Arial,Helvetica,sans-serif; color:#c7d2fe;">Formulario del portafolio</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 24px 12px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:0 0 12px 0; font:700 12px/1.2 Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:0.08em; color:#55627a;">Nombre</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px 0; font:500 14px/1.5 Arial,Helvetica,sans-serif; color:#111827;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 12px 0; font:700 12px/1.2 Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:0.08em; color:#55627a;">Email</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px 0; font:500 14px/1.5 Arial,Helvetica,sans-serif; color:#111827;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 12px 0; font:700 12px/1.2 Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:0.08em; color:#55627a;">Asunto</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px 0; font:600 14px/1.5 Arial,Helvetica,sans-serif; color:#111827;">${safeSubject}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px 24px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #dbe3f0; border-radius:10px; background-color:#f7f9fd;">
                  <tr>
                    <td style="padding:14px 16px; font:700 12px/1.2 Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:0.08em; color:#55627a; border-bottom:1px solid #dbe3f0;">
                      Mensaje
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px; font:500 14px/1.7 Arial,Helvetica,sans-serif; color:#1f2937;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px 18px 24px; border-top:1px solid #edf1f7; font:400 12px/1.5 Arial,Helvetica,sans-serif; color:#64748b;">
                Enviado desde el formulario de contacto del portafolio.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `

  return { text, html }
}

const getLogoUrl = () => {
  const explicitLogoUrl = normalizeBaseUrl(process.env.RESEND_LOGO_URL)
  if (explicitLogoUrl) return explicitLogoUrl

  const publicSiteUrl = normalizeBaseUrl(process.env.PUBLIC_SITE_URL)
  if (!publicSiteUrl) return ''

  return `${publicSiteUrl}/favicon.svg`
}

module.exports = {
  buildContactEmail,
  getLogoUrl,
}
