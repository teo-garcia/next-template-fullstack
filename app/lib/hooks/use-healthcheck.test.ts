import { renderHook, waitFor } from '@/lib/test/render'

import { useHealthcheck } from './use-healthcheck'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

test('useHealthcheck returns the parsed health payload', async () => {
  globalThis.fetch = (() =>
    Promise.resolve(
      Response.json({ status: 'ok', timestamp: '2026-03-15T00:00:00.000Z' })
    )) as typeof globalThis.fetch

  const { result } = renderHook(() => useHealthcheck())

  await waitFor(() => expect(result.current.isSuccess).toBe(true))

  expect(result.current.data?.status).toBe('ok')
})

test('useHealthcheck surfaces a failed health request', async () => {
  globalThis.fetch = (() =>
    Promise.resolve(
      new Response('', { status: 503 })
    )) as typeof globalThis.fetch

  const { result } = renderHook(() => useHealthcheck())

  await waitFor(() => expect(result.current.isError).toBe(true))
})
