import { s3 } from 'bun'
import { cacheTtlMs, presignExpiresIn } from './config'

// LRU-style cache for presigned URLs
interface CacheEntry {
  url: string
  expiresAt: number
}

const urlCache = new Map<string, CacheEntry>()
const existsCache = new Map<string, { exists: boolean; expiresAt: number }>()

// For testing purposes
export function clearCache() {
  urlCache.clear()
  existsCache.clear()
}

// Cleanup stale entries periodically (every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of urlCache) {
    if (entry.expiresAt <= now) {
      urlCache.delete(key)
    }
  }
  for (const [key, entry] of existsCache) {
    if (entry.expiresAt <= now) {
      existsCache.delete(key)
    }
  }
}, CLEANUP_INTERVAL)

export async function checkObjectExists(key: string): Promise<boolean> {
  const now = Date.now()
  const cached = existsCache.get(key)

  if (cached && cached.expiresAt > now) {
    return cached.exists
  }

  const exists = await s3.exists(key, { virtualHostedStyle: true })

  // Cache exists result for same TTL as URLs
  existsCache.set(key, {
    exists,
    expiresAt: now + cacheTtlMs(),
  })

  return exists
}

export function generatePresignedUrl(key: string): string {
  const now = Date.now()
  const cached = urlCache.get(key)

  // Return cached URL if still valid
  if (cached && cached.expiresAt > now) {
    return cached.url
  }

  const url = s3.presign(key, {
    virtualHostedStyle: true,
    expiresIn: presignExpiresIn(),
  })

  // Cache the URL
  urlCache.set(key, {
    url,
    expiresAt: now + cacheTtlMs(),
  })

  return url
}
