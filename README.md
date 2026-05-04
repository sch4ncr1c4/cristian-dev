# cristian-dev

Personal portfolio with a production-ready contact form.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Email delivery: Resend
- Security middleware: Helmet + CORS allowlist + rate limiting

## Project Structure

- `client/`: frontend app
- `server/`: backend API

## Contact Flow

1. A user submits the form on the frontend.
2. The frontend sends a `POST` request to `/api/contact`.
3. The backend sanitizes and validates input.
4. The backend applies rate limiting.
5. The backend sends the email using Resend.

## Environment Variables

### Frontend

- `VITE_API_URL=https://your-backend-domain.com`

### Backend

- `NODE_ENV=production`
- `PORT=4000`
- `TRUST_PROXY_HOPS=1` (set this only when running behind a trusted proxy)
- `CORS_ORIGIN=https://your-frontend.pages.dev,https://yourdomain.com`
- `RESEND_API_KEY=re_...`
- `RESEND_FROM=Portfolio <onboarding@resend.dev>` (or your verified domain sender)
- `RESEND_TO=your-email@domain.com`
- `PUBLIC_SITE_URL=https://your-frontend.pages.dev` (used to build the fallback logo URL)
- `RESEND_LOGO_URL=https://your-frontend.pages.dev/favicon.svg` (optional override)

See `server/.env.example` and `client/.env.example` for templates.

## Local Development

Install dependencies:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Run backend:

```bash
npm run dev
```

Run frontend in another terminal:

```bash
npm run dev:client
```

## Deployment

### Frontend (Cloudflare Pages)

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

### Backend (Render)

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

## Notes

- The project does not store contact submissions in a database.
- Hero images currently used in `InicioCard` are:
  - `banner-v2-320.*`
  - `banner-v2-480.*`
  - `banner-v2-640.*`
  - `banner-v2-960.*`
  - `banner-v2-1160.*`
