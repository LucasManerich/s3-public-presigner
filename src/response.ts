export function notFound() {
  return new Response('File not found', { status: 404 })
}

export function redirect(url: string) {
  return Response.redirect(url, 302)
}
