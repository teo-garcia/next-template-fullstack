'use client'

import { Zap } from 'lucide-react'

import { useHealthcheck } from '@/lib/hooks/use-healthcheck'

export function HomePage() {
  const healthQuery = useHealthcheck()

  return (
    <section className='flex h-screen flex-col items-center justify-center gap-y-16'>
      <Zap className='size-48 text-primary lg:size-56 xl:size-72' />
      {healthQuery.data ? (
        <p className='text-sm text-muted-foreground'>
          Health status: {healthQuery.data.status}
        </p>
      ) : null}
    </section>
  )
}
