import { s3 } from 'bun'
import { presignExpiresIn } from './config'

export async function checkObjectExists(key: string): Promise<boolean> {
  const exists = await s3.exists(key, { virtualHostedStyle: true })
  return exists
}

export async function generatePresignedUrl(key: string): Promise<string> {
  const url = s3.presign(key, {
    virtualHostedStyle: true,
    expiresIn: presignExpiresIn(),
  })
  return url
}
