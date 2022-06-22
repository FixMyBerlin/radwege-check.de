import React from 'react'

type Props = { children: React.ReactNode }

export const LogoWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-row items-center md:justify-between">
      {children}
    </div>
  )
}
