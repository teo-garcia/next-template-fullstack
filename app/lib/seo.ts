const publicUrl =
  typeof process === 'undefined'
    ? 'http://localhost:3000'
    : (process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000')

export const siteMetadata = {
  description:
    'Production-ready Next.js template with typed routes, theme support, health checks, tests, and Docker defaults.',
  name: 'Next Template Fullstack',
  shortName: 'RTN',
  url: publicUrl.replace(/\/$/, ''),
} as const

export const getCanonicalUrl = (path = '/') => {
  return new URL(path, siteMetadata.url).toString()
}
