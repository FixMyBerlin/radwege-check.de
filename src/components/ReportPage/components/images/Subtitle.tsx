import React from 'react'

export const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <figcaption className="mt-1 px-2 text-sm text-gray-500">
      {children}
    </figcaption>
  )
}
