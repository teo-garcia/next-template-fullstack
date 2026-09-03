import axe from 'axe-core'

import { render, screen } from '@/lib/test/render'

import { HealthStatus } from './health-status'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

const stubHealthyApi = () => {
  globalThis.fetch = (() =>
    Promise.resolve(
      Response.json({
        status: 'ok',
        timestamp: '2026-03-15T00:00:00.000Z',
        version: '0.0.0',
      })
    )) as typeof globalThis.fetch
}

const stubDegradedApi = () => {
  globalThis.fetch = (() =>
    Promise.resolve(
      Response.json({
        status: 'degraded',
        timestamp: '2026-03-15T00:00:00.000Z',
        version: '0.0.0',
      })
    )) as typeof globalThis.fetch
}

const stubUnreachableApi = () => {
  globalThis.fetch = (() =>
    Promise.resolve(new Response('', { status: 503 })) as ReturnType<
      typeof globalThis.fetch
    >) as typeof globalThis.fetch
}

test('HealthStatus renders the resolved health status', async () => {
  stubHealthyApi()

  render(<HealthStatus />)

  expect(await screen.findByText(/OK/i)).toBeTruthy()
})

test('HealthStatus reports a degraded API', async () => {
  stubDegradedApi()

  render(<HealthStatus />)

  expect(await screen.findByText(/degraded/i)).toBeTruthy()
})

test('HealthStatus reports an unreachable API', async () => {
  stubUnreachableApi()

  render(<HealthStatus />)

  expect(await screen.findByText(/unreachable/i)).toBeTruthy()
})

test('HealthStatus has no accessibility violations', async () => {
  stubHealthyApi()

  const { container } = render(<HealthStatus />)
  await screen.findByText(/OK/i)

  const results = await axe.run(container)

  expect(results.violations).toEqual([])
})
