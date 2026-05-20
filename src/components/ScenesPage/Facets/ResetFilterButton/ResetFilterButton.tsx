import clsx from 'clsx'
import React from 'react'

type Props = {
  onClick: () => void
  /** When false, the control is disabled (no active URL filter). */
  enabled: boolean
}

export const ResetFilterButton = ({ onClick, enabled }: Props) => {
  return (
    <p>
      <button
        type="button"
        onClick={enabled ? onClick : undefined}
        className={clsx(
          enabled
            ? 'cursor-pointer hover:text-yellow-800 hover:decoration-yellow-500 focus:text-yellow-800 focus:outline-none'
            : 'cursor-not-allowed text-gray-500 decoration-gray-300',
          'underline decoration-brand-yellow decoration-2',
        )}
        disabled={!enabled}
      >
        Filter zurücksetzen
      </button>
    </p>
  )
}
