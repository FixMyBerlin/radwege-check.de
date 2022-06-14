import classNames from 'classnames'

type Props = {
  firstElement: boolean
  lastElement: boolean
  /** @docs Style the Button as pressed in. */
  uiSelected: boolean
  /** @docs Style the Button as clickable or grayed out. */
  uiCanpress: boolean
}

export const buttonClassNames = ({
  firstElement,
  lastElement,
  uiSelected,
  uiCanpress,
}: Props) => {
  const labelClasses = classNames(
    'flex w-full flex-col items-center justify-start gap-1 px-1 py-1 text-center leading-4',
    'border border-transparent border-r-gray-300 last:border-r-transparent group-hover:border-gray-300 transition-colors',
    'silbentrennung',
    { 'cursor-pointer hover:bg-yellow-50': uiCanpress },
    { 'cursor-not-allowed': !uiCanpress },
    { 'rounded-l-md': firstElement },
    { '-ml-px': !firstElement },
    { 'rounded-r-md': lastElement }
  )
  const inputClasses = classNames(
    'h-4 w-4',
    {
      'cursor-pointer border-gray-300 text-brand-yellow focus:outline-none focus:ring-brand-light-yellow focus:ring-offset-0':
        uiCanpress,
    },
    {
      'cursor-not-allowed': !uiCanpress,
    },
    {
      'border-gray-300 text-brand-yellow': !uiCanpress && uiSelected,
    },
    {
      'border-gray-300 bg-white/30 text-brand-yellow/30':
        !uiCanpress && !uiSelected,
    }
  )
  return { labelClasses, inputClasses }
}
