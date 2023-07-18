import clsx from 'clsx'
import React from 'react'
import SpinnerIcon from '~/components/Spinner/assets/spinner-icon.svg'
import { useStore } from 'zustand'
import { useStoreSpinner } from '../ScenesPage/store'

type Props = {
  text: string
}

/* @desc Note: Wrapper needs to be 'relative'. */
export const SpinnerOrText: React.FC<Props> = ({ text }) => {
  const { showSpinner } = useStore(useStoreSpinner)

  const opacitySpinner = showSpinner ? 'opacity-100' : 'opacity-0'
  const opacityText = showSpinner ? 'opacity-0' : 'opacity-100'

  return (
    <>
      <SpinnerIcon
        aria-hidden
        className={clsx(
          'absolute transition-opacity duration-300',
          opacitySpinner,
          'animate-[spin_0.7s_linear_infinite]',
          'h-5 w-5 text-stone-800',
        )}
      />
      <span className={clsx('transition-opacity duration-300', opacityText)}>
        {text}
      </span>
    </>
  )
}
