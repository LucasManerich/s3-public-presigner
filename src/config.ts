// Cache config values at startup to avoid repeated env var reads
const PRESIGN_EXPIRES_IN = parseInt(
  process.env.PRESIGNED_URL_EXPIRATION_SECONDS || '3600',
  10
)
const USE_NICE_NOT_FOUND = process.env.USE_NICE_NOT_FOUND === '1'

// Cache TTL should be less than presign expiration to ensure URLs are still valid
// Using 80% of expiration time as cache TTL
const CACHE_TTL_MS = Math.floor(PRESIGN_EXPIRES_IN * 0.8 * 1000)

export const presignExpiresIn = () => PRESIGN_EXPIRES_IN
export const useNiceNotFound = () => USE_NICE_NOT_FOUND
export const cacheTtlMs = () => CACHE_TTL_MS
