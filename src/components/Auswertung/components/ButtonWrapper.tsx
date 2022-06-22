import React from 'react'

type Props = { children: React.ReactNode }

export const ButtonWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center md:my-16">
      {children}
    </div>
  )
}
