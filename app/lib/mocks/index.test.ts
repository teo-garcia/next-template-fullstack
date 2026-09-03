import { expect, test, vi } from 'vitest'

const { startWorker } = vi.hoisted(() => ({
  startWorker: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('./browser', () => ({
  worker: { start: startWorker },
}))

import { setupMSWBrowser } from './index'

test('setupMSWBrowser starts one worker for concurrent callers', async () => {
  await Promise.all([setupMSWBrowser(), setupMSWBrowser()])

  expect(startWorker).toHaveBeenCalledOnce()
  expect(startWorker).toHaveBeenCalledWith({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
})
