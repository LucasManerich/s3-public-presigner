import { presignExpiresIn } from './config'

export function notFound() {
  return new Response('File not found', {
    status: 404,
    headers: {
      'Cache-Control': 'public, max-age=60', // Cache 404s briefly to avoid repeated lookups
    },
  })
}

export function redirect(url: string) {
  // Use 307 for temporary redirect - allows browsers/CDNs to cache the redirect
  // Cache time is set to 80% of presign expiration to ensure URL validity
  const cacheMaxAge = Math.floor(presignExpiresIn() * 0.8)

  return new Response(null, {
    status: 307,
    headers: {
      Location: url,
      'Cache-Control': `public, max-age=${cacheMaxAge}`,
    },
  })
}
