import clsx from 'clsx'
import React from 'react'
import { useStore } from 'zustand'
import { useStoreSpinner } from '../ScenesPage/store'
import SpinnerIcon from './assets/spinner-icon.svg'

type Props = {
  className?: string
}

export const Spinner: React.FC<Props> = ({ className }) => {
  const { showSpinner } = useStore(useStoreSpinner)

  if (!showSpinner) return null

  // Code from https://tailwindcss.com/docs/animation#basic-usage
  return (
    <SpinnerIcon
      aria-hidden
      className={clsx(
        className,
        'animate-[spin_0.7s_linear_infinite]',
        'h-5 w-5 text-stone-800',
      )}
    />
  )
}
