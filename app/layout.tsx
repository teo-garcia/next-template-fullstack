import '@/lib/styles/globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { GlobalProviders } from './components/global-providers/global-providers'
import { HealthStatus } from './components/health-status/health-status'
import { getCanonicalUrl, siteMetadata } from './lib/seo'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.url),
  openGraph: {
    description: siteMetadata.description,
    locale: 'en_US',
    siteName: siteMetadata.name,
    title: siteMetadata.name,
    type: 'website',
    url: getCanonicalUrl(),
  },
  title: {
    default: siteMetadata.shortName,
    template: `${siteMetadata.shortName} | %s`,
  },
  twitter: {
    card: 'summary',
    description: siteMetadata.description,
    title: siteMetadata.name,
  },
}

const geist = Geist({
  subsets: ['latin'],
})

const RootLayout = async (properties: React.PropsWithChildren) => {
  const { children } = properties
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={geist.className} suppressHydrationWarning>
        <GlobalProviders>
          <div className='min-h-screen'>
            <main id='main-content'>{children}</main>
          </div>
          <HealthStatus />
        </GlobalProviders>
      </body>
    </html>
  )
}

export default RootLayout
