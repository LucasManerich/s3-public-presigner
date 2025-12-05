export function keyFromPathname(pathname: string) {
  const key = pathname.startsWith('/') ? pathname.slice(1) : pathname
  return decodeURIComponent(key)
}
