import classNames from 'classnames'
import React from 'react'
import { buttonStyles } from './Link'

export const PrintButton: React.FC = () => {
  return (
    <button
      type="button"
      className={classNames(buttonStyles, 'hidden shadow-md lg:inline-flex')}
      onClick={() => window.print()}
    >
      Drucken
    </button>
  )
}
