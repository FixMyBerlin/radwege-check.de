import classNames from 'classnames'
import React from 'react'
import { trackEvent } from '../utils'
import { buttonStyles } from './Link'

type Props = { onClick?: () => void }

export const PrintButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className={classNames(buttonStyles, 'hidden shadow-md lg:inline-flex')}
      onClick={() => {
        window.print()
        trackEvent({ category: 'Print button click', action: 'Details Page' })
        if (onClick) onClick()
      }}
    >
      Drucken
    </button>
  )
}
