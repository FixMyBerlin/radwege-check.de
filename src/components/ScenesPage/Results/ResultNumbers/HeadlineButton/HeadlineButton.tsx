import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { ShowTableProps } from '../../Results'

type Props = { visible: boolean } & ShowTableProps

export const HeadlineButton: React.FC<Props> = ({
  visible,
  showTable,
  setShowTable,
}) => {
  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => setShowTable(!showTable)}
      className="group mb-0.5 flex items-center justify-between"
    >
      <h3 className="text-xxs font-semibold">
        Bewertung Subjektive Sicherheit
      </h3>
      {showTable ? (
        <span>
          <span className="sr-only">weniger Details</span>
          <MinusCircleIcon className="w-4 group-hover:text-yellow-500" />
        </span>
      ) : (
        <span>
          <span className="sr-only">mehr Details</span>
          <PlusCircleIcon className="w-4 group-hover:text-yellow-500" />
        </span>
      )}
    </button>
  )
}
