import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { trackEvent } from '~/components/utils'
import { ShowTableProps } from '../../Results'

type Props = { visible: boolean } & ShowTableProps

export const HeadlineButton: React.FC<Props> = ({
  visible,
  showTable,
  setShowTable,
}) => {
  const handleClick = () => {
    trackEvent({
      category: 'Result',
      action: 'ShowMore Table',
      label: showTable ? 'close' : 'open',
    })
    setShowTable(!showTable)
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group mb-0.5 flex w-full items-center justify-between"
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
