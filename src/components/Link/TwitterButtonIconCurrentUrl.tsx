import clsx from 'clsx'
import React from 'react'
import { TwitterButton } from './TwitterButton'

type Props = {
  className: string
  onClick?: () => void
}

export const TwitterButtonIconCurrentUrl: React.FC<Props> = ({
  className,
  onClick,
}) => {
  return (
    <TwitterButton
      url={
        typeof window !== 'undefined' &&
        window.location.pathname + window.location.search
      }
      text=""
      hashtags="RadwegeCheck"
      classNameOverwrite={clsx(
        className,
        'flex rounded-full items-center justify-center hover:bg-gray-50 w-8 h-8 border border-gray-300 ',
      )}
      onClick={onClick}
    />
  )
}
