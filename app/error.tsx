'use client'

import { useEffect } from 'react'

import {
  RouteState,
  RouteStateButton,
} from './components/route-state/route-state'
import { siteMetadata } from './lib/seo'

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = (properties: ErrorProps) => {
  const { error, reset } = properties

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <title>{`${siteMetadata.shortName} | Something went wrong`}</title>
      <RouteState
        actions={<RouteStateButton onClick={reset}>Try again</RouteStateButton>}
        description='The current route failed to render. You can retry without leaving the page.'
        details={error.digest ? `Digest: ${error.digest}` : undefined}
        title='Something went wrong'
        variant='error'
      />
    </>
  )
}

export default ErrorPage
