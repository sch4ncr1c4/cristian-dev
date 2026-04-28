# Cristian Dev

## Plataformas usadas en produccion

- Frontend: Cloudflare Pages
- Backend API: Render
- Base de datos PostgreSQL: Supabase
- Email transaccional: Resend
- Rate limiting distribuido: Upstash Redis

## Dashboards

- Cloudflare Pages: https://dash.cloudflare.com/
- Render: https://dashboard.render.com/
- Supabase: https://supabase.com/dashboard
- Resend: https://resend.com/dashboard
- Upstash: https://console.upstash.com/

## Variables por plataforma

### Cloudflare Pages (frontend)

- `VITE_CONTACT_API_URL`
- `VITE_TURNSTILE_SITE_KEY`

### Render (backend)

- `NODE_ENV=production`
- `DATABASE_URL`
- `CORS_ORIGIN`
- `PGSSLMODE`
- `PGSSL_REJECT_UNAUTHORIZED`
- `RESEND_API_KEY`
- `MAIL_FROM`
- `MAIL_TO`
- `MAIL_BRAND_IMAGE_URL`
- `TURNSTILE_SECRET_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Supabase

- Provision de PostgreSQL (fuente de `DATABASE_URL`)
- Tabla de contactos usada por la API

### Resend

- API key (`RESEND_API_KEY`)
- Remitente validado (`MAIL_FROM`)

### Upstash Redis

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Flujo de despliegue

1. Push a `main` en GitHub.
2. Cloudflare Pages build/deploy frontend.
3. Render deploy backend.
4. Validar `/api/health` en Render.
5. Probar envio de formulario y limite de spam.
