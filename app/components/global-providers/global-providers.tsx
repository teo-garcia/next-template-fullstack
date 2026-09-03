'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'better-themes/rsc'
import { useEffect, useState } from 'react'

import { ThemeSwitch } from '@/components/theme-switch/theme-switch'
import { env } from '@/lib/env'
import { createQueryClient } from '@/lib/query-client'

export const GlobalProviders = (properties: React.PropsWithChildren) => {
  const { children } = properties
  const [queryClient] = useState(createQueryClient)

  useEffect(() => {
    if (!env.isDevelopment || typeof window === 'undefined') {
      return
    }

    import('../../lib/mocks').then(({ setupMSWBrowser }) => setupMSWBrowser())
  }, [])

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        <ThemeProviderContent>{children}</ThemeProviderContent>
        <ReactQueryDevtools buttonPosition='bottom-right' />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

const ThemeProviderContent = ({ children }: React.PropsWithChildren) => (
  <>
    {children}
    <ThemeSwitch />
  </>
)
