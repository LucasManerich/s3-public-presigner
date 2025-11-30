import { useNiceNotFound } from './config'
import { keyFromPathname } from './keys'
import { notFound, redirect } from './response'
import { checkObjectExists, generatePresignedUrl } from './s3'

export async function handleRequest(req: Request) {
  const url = new URL(req.url)
  const key = keyFromPathname(url.pathname)

  if (useNiceNotFound()) {
    const exists = await checkObjectExists(key)
    if (!exists) {
      return notFound()
    }
  }

  const presignedUrl = generatePresignedUrl(key)
  return redirect(presignedUrl)
}
