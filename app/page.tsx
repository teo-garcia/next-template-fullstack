import type { Metadata } from 'next'

import { HomePage } from './components/home-page/home-page'
import { getCanonicalUrl, siteMetadata } from './lib/seo'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  description: siteMetadata.description,
  openGraph: {
    description: siteMetadata.description,
    title: siteMetadata.name,
    url: getCanonicalUrl(),
  },
  title: {
    absolute: `${siteMetadata.shortName} | Home`,
  },
  twitter: {
    card: 'summary',
    description: siteMetadata.description,
    title: siteMetadata.name,
  },
}

const Page = () => {
  return <HomePage />
}

export default Page
