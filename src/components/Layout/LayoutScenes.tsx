import React from 'react'
import { EnglishLanguageTeaser } from './EnglishLanguageTeaser'

type Props = {
  children: React.ReactNode
  showEnglishLanguageTeaser?: boolean
}

export const LayoutScenes: React.FC<Props> = ({
  showEnglishLanguageTeaser = true,
  children,
}) => {
  return (
    <>
      <main className="h-screen w-screen">{children}</main>
      {showEnglishLanguageTeaser && <EnglishLanguageTeaser positionBottom />}
    </>
  )
}
