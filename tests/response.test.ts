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
  test('returns status 302', () => {
    expect(redirect('/foo').status).toBe(302)
  })

  test('redirects to the provided url', () => {
    expect(redirect('/foo').headers.get('location')).toBe('/foo')
  })
})
