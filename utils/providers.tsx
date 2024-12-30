'use client'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
	children: React.ReactNode | React.ReactNode[]
}

export default function Providers({ children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
