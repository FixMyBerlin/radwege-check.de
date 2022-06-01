import classNames from 'classnames'
import React from 'react'
import { buttonStyles } from './Link'

export const PrintButton: React.FC = () => {
  return (
    <button
      type="button"
      className={classNames(buttonStyles, 'shadow-md')}
      onClick={() => window.print()}
    >
      Drucken
    </button>
  )
}
