import { handleRequest } from './handler'
import { notFound } from './response'

const PORT = process.env.PORT || 3000

Bun.serve({
  port: PORT,
  routes: {
    '/': () => notFound(),
    '/favicon.ico': () => notFound(),
  },
  fetch: (req) => handleRequest(req),
})

console.log(`Server running on http://localhost:${PORT}`)
