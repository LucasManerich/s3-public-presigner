import { describe, expect, test } from 'bun:test'
import { notFound, redirect } from '../src/response'

describe('notFound', () => {
  test('returns status 404', () => {
    expect(notFound().status).toBe(404)
  })

  test('has a plain text body', () => {
    expect(notFound().text()).resolves.toBe('File not found')
  })
})

describe('redirect', () => {
  test('returns status 307', () => {
    expect(redirect('/foo').status).toBe(307)
  })

  test('redirects to the provided url', () => {
    expect(redirect('/foo').headers.get('location')).toBe('/foo')
  })

  test('includes cache-control header', () => {
    const response = redirect('/foo')
    const cacheControl = response.headers.get('cache-control')
    expect(cacheControl).toContain('public')
    expect(cacheControl).toContain('max-age=')
  })
})
