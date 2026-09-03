let workerStartPromise: Promise<void> | undefined

const startMSWBrowser = async () => {
  const { worker } = await import('./browser')
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}

export const setupMSWBrowser = () => {
  if (process.env.NODE_ENV === 'production') {
    return Promise.resolve()
  }

  workerStartPromise ??= startMSWBrowser().catch((error: unknown) => {
    workerStartPromise = undefined
    console.error('Failed to start MSW:', error)
  })

  return workerStartPromise
}
