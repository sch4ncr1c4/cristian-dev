const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const normalizeBaseUrl = (value) =>
  typeof value === 'string' ? value.trim().replace(/\/+$/, '') : ''

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
    ? `
      <img
        src="${safeLogoUrl}"
        alt="Cristian Dev"
        width="36"
        height="36"
        style="display:block; border:0; outline:none; text-decoration:none; border-radius:10px;"
      />
    `
    : `
      <div style="width:36px; height:36px; border-radius:10px; background:#111827; color:#ffffff; font:700 14px Arial,Helvetica,sans-serif; line-height:36px; text-align:center;">
        CD
      </div>
    `

  const html = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nuevo mensaje de contacto</title>
  </head>

  <body style="margin:0; padding:0; background:#f4f7fb;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      Nuevo mensaje recibido desde tu formulario de contacto.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7fb; padding:32px 12px;">
      <tr>
        <td align="center">

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px; background:#ffffff; border:1px solid #e6ecf5; border-radius:18px; overflow:hidden;">

            <tr>
              <td style="background:#0b1220; padding:24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="width:48px; vertical-align:middle;">
                      ${logoBlock}
                    </td>
                    <td style="vertical-align:middle;">
                      <p style="margin:0; font:700 18px/1.3 Arial,Helvetica,sans-serif; color:#ffffff;">
                        Cristian Dev
                      </p>
                      <p style="margin:4px 0 0; font:400 13px/1.4 Arial,Helvetica,sans-serif; color:#94a3b8;">
                        Automatizaciones & Desarrollo Web
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 28px 8px 28px;">
                <p style="margin:0; font:700 22px/1.3 Arial,Helvetica,sans-serif; color:#111827;">
                  Nuevo mensaje recibido
                </p>
                <p style="margin:8px 0 0; font:400 14px/1.6 Arial,Helvetica,sans-serif; color:#64748b;">
                  Alguien completó el formulario de contacto de tu portfolio.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px 24px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8fafc; border:1px solid #e5eaf2; border-radius:14px;">
                  <tr>
                    <td style="padding:18px;">

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding:0 0 12px 0; font:700 12px/1.2 Arial,Helvetica,sans-serif; color:#64748b; text-transform:uppercase; letter-spacing:0.08em;">
                            Nombre
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 18px 0; font:600 15px/1.5 Arial,Helvetica,sans-serif; color:#111827;">
                            ${safeName}
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:0 0 12px 0; font:700 12px/1.2 Arial,Helvetica,sans-serif; color:#64748b; text-transform:uppercase; letter-spacing:0.08em;">
                            Email
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 18px 0; font:600 15px/1.5 Arial,Helvetica,sans-serif; color:#111827;">
                            <a href="mailto:${safeEmail}" style="color:#111827; text-decoration:none;">
                              ${safeEmail}
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:0 0 12px 0; font:700 12px/1.2 Arial,Helvetica,sans-serif; color:#64748b; text-transform:uppercase; letter-spacing:0.08em;">
                            Asunto
                          </td>
                        </tr>
                        <tr>
                          <td style="font:600 15px/1.5 Arial,Helvetica,sans-serif; color:#111827;">
                            ${safeSubject}
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 26px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5eaf2; border-radius:14px; overflow:hidden;">
                  <tr>
                    <td style="padding:15px 18px; background:#ffffff; border-bottom:1px solid #e5eaf2; font:700 12px/1.2 Arial,Helvetica,sans-serif; color:#64748b; text-transform:uppercase; letter-spacing:0.08em;">
                      Mensaje
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px; background:#ffffff; font:400 15px/1.7 Arial,Helvetica,sans-serif; color:#1f2937;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:0 28px 30px 28px;">
                <a href="mailto:${safeEmail}?subject=Re:%20${safeSubject}"
                  style="display:inline-block; background:#111827; color:#ffffff; padding:13px 22px; border-radius:10px; text-decoration:none; font:700 14px/1 Arial,Helvetica,sans-serif;">
                  Responder mensaje
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px; border-top:1px solid #eef2f7; background:#fbfdff;">
                <p style="margin:0; font:400 12px/1.5 Arial,Helvetica,sans-serif; color:#94a3b8;">
                  Enviado desde el formulario de contacto del portfolio.
                </p>
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