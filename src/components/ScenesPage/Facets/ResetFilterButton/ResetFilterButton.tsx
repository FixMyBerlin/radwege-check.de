import classNames from 'classnames'
import React from 'react'
import { useStore } from 'zustand'
import { useStoreResetFilterEnabled } from '../../store/useStoreResetFilterEnabled'

type Props = {
  onClick: () => void
}

export const ResetFilterButton: React.FC<Props> = ({ onClick }) => {
  const { resetFilterEnabled } = useStore(useStoreResetFilterEnabled)

  return (
    <p className="mb-6">
      <button
        type="button"
        onClick={resetFilterEnabled ? onClick : undefined}
        className={classNames(
          resetFilterEnabled
            ? 'hover:bg-yellow-100'
            : 'cursor-not-allowed text-gray-500 decoration-gray-300',
          'underline'
        )}
        disabled={!resetFilterEnabled}
      >
        Filter zurücksetzen
      </button>
    </p>
  )
}
