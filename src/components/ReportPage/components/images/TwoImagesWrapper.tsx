import React from 'react'

type Props = { children: React.ReactNode }

export const TwoImagesWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative -mx-1 my-6 flex flex-col gap-3 md:-mx-12 md:my-12 md:flex-row md:gap-5 lg:-mx-40">
      {children}
    </div>
  )
}
