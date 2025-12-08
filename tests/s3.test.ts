import {
  afterEach,
  beforeEach,
  describe,
  expect,
  mock,
  spyOn,
  test,
} from 'bun:test'
import { s3 } from 'bun'
import {
  checkObjectExists,
  generatePresignedUrl,
  clearCache,
} from '../src/s3'

afterEach(() => {
  mock.restore()
  mock.clearAllMocks()
  clearCache()
})

describe('checkObjectExists', () => {
  beforeEach(() => {
    spyOn(s3, 'exists').mockImplementation((key) => {
      return Promise.resolve(key === 'mocked-does-exist')
    })
  })

  test('returns true for existing objects', () => {
    expect(checkObjectExists('mocked-does-exist')).resolves.toBe(true)
  })

  test('returns false for unknown objects', () => {
    expect(checkObjectExists('unknown')).resolves.toBe(false)
  })

  test('uses cache for repeated calls', async () => {
    const existsSpy = spyOn(s3, 'exists').mockResolvedValue(true)
    await checkObjectExists('cached-key')
    await checkObjectExists('cached-key')
    expect(existsSpy).toHaveBeenCalledTimes(1)
  })
})

describe('generatePresignedUrl', () => {
  beforeEach(() => {
    spyOn(s3, 'presign').mockImplementation((key) => {
      return `${key}?mocked-presign`
    })
  })

  test('returns a presigned url', () => {
    expect(generatePresignedUrl('foo')).toBe('foo?mocked-presign')
  })

  test('uses cache for repeated calls', () => {
    const presignSpy = spyOn(s3, 'presign').mockReturnValue('cached-url')
    generatePresignedUrl('bar')
    generatePresignedUrl('bar')
    expect(presignSpy).toHaveBeenCalledTimes(1)
  })
})
