# cristian-dev

Portfolio personal con formulario de contacto en produccion.

## Stack

- Frontend: React + Vite (Cloudflare Pages)
- Backend: Node.js + Express (Render)
- Email: Resend

## Estructura

- `client/`: app frontend
- `server/`: API backend

## Flujo de contacto

1. El usuario completa el formulario en el frontend.
2. El frontend hace `POST` a `/api/contact`.
3. El backend valida campos, aplica rate limit y envia email con Resend.

## Variables de entorno

### Frontend (`Cloudflare Pages`)

- `VITE_API_URL=https://TU-BACKEND.onrender.com`

### Backend (`Render`)

- `NODE_ENV=production`
- `PORT=4000`
- `CORS_ORIGIN=https://TU-PROYECTO.pages.dev`
- `RESEND_API_KEY=re_...`
- `RESEND_FROM=Portfolio <onboarding@resend.dev>` (o dominio propio verificado)
- `RESEND_TO=tu-email@dominio.com`

## Desarrollo local

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## Deploy

### Cloudflare Pages

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

### Render

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

## Notas

- El proyecto no almacena contactos en base de datos.
- Los banners `banner-256/320/480/660.webp` se usan activamente en `InicioCard` y `index.html`.
