import pkg from 'pg'

const { Pool } = pkg

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

const sslMode = (process.env.PGSSLMODE || 'disable').toLowerCase()
const rejectUnauthorized = process.env.PGSSL_REJECT_UNAUTHORIZED !== 'false'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslMode === 'disable' ? false : { rejectUnauthorized },
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
})

export default pool
