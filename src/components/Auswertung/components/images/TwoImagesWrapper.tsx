import React from 'react'

type Props = { children: React.ReactNode }

export const TwoImagesWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative my-6 -mx-1 flex flex-col gap-3 md:-mx-20 md:my-12 md:flex-row md:gap-5">
      {children}
    </div>
  )
}
