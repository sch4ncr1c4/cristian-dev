const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    await pool.query(
      'insert into contacts(name, email, message) values($1, $2, $3)',
      [name, email, message],
    )
    return res.status(201).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Database error' })
  }
})

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})