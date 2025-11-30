import { describe, expect, test } from 'bun:test'
import { keyFromPathname } from '../src/keys'

describe('keyFromPathname', () => {
  test('removes leading slashes', () => {
    expect(keyFromPathname('/foo/bar')).toBe('foo/bar')
  })

  test('returns as-is without leading slashes', () => {
    expect(keyFromPathname('foo/bar')).toBe('foo/bar')
  })

  test('returns empty string for root', () => {
    expect(keyFromPathname('/')).toBe('')
  })
})
