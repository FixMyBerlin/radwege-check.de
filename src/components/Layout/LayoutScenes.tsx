import React from 'react'

type Props = {
  children: React.ReactNode
}

export const LayoutScenes: React.FC<Props> = ({ children }) => {
  return <main className="h-screen w-screen">{children}</main>
}
