import { NuqsAdapter } from 'nuqs/adapters/react'
import React from 'react'

/**
 * Wraps interactive routes so nuqs can sync URL search params (replaces use-query-params).
 */
export const NuqsClientRoot = ({ children }: { children: React.ReactNode }) => {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
