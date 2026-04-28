const DEFAULT_WINDOW_MS = 60 * 60 * 1000
const DEFAULT_MAX_REQUESTS = 5

function getClientIp(req) {
  return req.ip || 'unknown'
}

function isUpstashConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

async function upstashRequest(path, body) {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`upstash-http-${response.status}`)
  }

  return response.json()
}

async function isRateLimitedRedis({ key, windowMs, maxRequests }) {
  const bucketKey = `ratelimit:contact:${key}`
  const incrementResult = await upstashRequest(`/incr/${encodeURIComponent(bucketKey)}`)
  const total = Number(incrementResult?.result || 0)

  if (total === 1) {
    await upstashRequest(`/pexpire/${encodeURIComponent(bucketKey)}/${windowMs}`)
  }

  return total > maxRequests
}

function createLocalRateLimiter({ windowMs, maxRequests }) {
  const submissions = new Map()

  return {
    async isLimited(key) {
      const now = Date.now()
      for (const [storedKey, storedValue] of submissions.entries()) {
        if (now - storedValue.start > windowMs) submissions.delete(storedKey)
      }

      const entry = submissions.get(key)
      if (!entry || now - entry.start > windowMs) {
        submissions.set(key, { start: now, count: 1 })
        return false
      }

      entry.count += 1
      submissions.set(key, entry)
      return entry.count > maxRequests
    },
  }
}

export function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || DEFAULT_WINDOW_MS
  const maxRequests = options.maxRequests || DEFAULT_MAX_REQUESTS
  const local = createLocalRateLimiter({ windowMs, maxRequests })
  const useRedis = isUpstashConfigured()

  return {
    getClientKey(req) {
      return getClientIp(req)
    },
    async isLimited(key) {
      if (!useRedis) {
        return local.isLimited(key)
      }

      try {
        return await isRateLimitedRedis({ key, windowMs, maxRequests })
      } catch {
        return local.isLimited(key)
      }
    },
  }
}
