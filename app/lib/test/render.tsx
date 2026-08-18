import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  render as tlRender,
  renderHook as tlRenderHook,
  type RenderHookOptions,
  type RenderOptions,
} from '@testing-library/react'
import { ThemeProvider } from 'better-themes/rsc'
import { useState } from 'react'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { gcTime: 0, retry: false },
    },
  })

// A fresh QueryClient per render; a shared one leaks cached queries between
// tests and makes ordering-dependent failures look like flakes.
const AllProviders = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(createTestQueryClient)

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen'>
          <main>{children}</main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => tlRender(ui, { wrapper: AllProviders, ...options })

const renderHookWithProviders = <Result, Properties>(
  hook: (initialProps: Properties) => Result,
  options?: Omit<RenderHookOptions<Properties>, 'wrapper'>
) => tlRenderHook(hook, { wrapper: AllProviders, ...options })

export { renderHookWithProviders as renderHook }
export { renderWithProviders as render }
export { screen, waitFor, within } from '@testing-library/react'
