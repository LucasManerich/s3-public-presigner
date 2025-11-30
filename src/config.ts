export const presignExpiresIn = () => {
  return parseInt(process.env.PRESIGNED_URL_EXPIRATION_SECONDS || '3600', 10)
}

export const useNiceNotFound = () => {
  return process.env.USE_NICE_NOT_FOUND === '1'
}
