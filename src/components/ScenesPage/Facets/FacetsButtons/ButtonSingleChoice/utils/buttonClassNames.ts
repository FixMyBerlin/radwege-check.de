import clsx from 'clsx'

type Props = {
  firstElement: boolean
  lastElement: boolean
  /** @docs Style the Button as pressed in. */
  uiSelected: boolean
  /** @docs Style the Button as clickable or grayed out. */
  uiCanpress: boolean
  showAsList: boolean
}

export const buttonClassNames = ({
  firstElement,
  lastElement,
  uiSelected,
  uiCanpress,
  showAsList,
}: Props) => {
  const labelClasses = clsx(
    'leading-4',
    {
      'flex w-full flex-row items-center justify-start gap-1 px-1 py-1':
        showAsList,
    },
    {
      'flex w-full flex-col items-center justify-start gap-1 px-1 py-1 text-center':
        !showAsList,
    },
    {
      'border border-transparent border-r-gray-300 last:border-r-transparent group-hover:border-gray-300 transition-colors':
        !showAsList,
    },
    'silbentrennung',
    { 'cursor-pointer hover:bg-yellow-50': uiCanpress },
    { 'cursor-not-allowed': !uiCanpress },
    { 'text-slate-500': !uiCanpress && uiSelected },
    { 'rounded-l-md': firstElement },
    { '-ml-px': !firstElement && !showAsList },
    { 'rounded-r-md': lastElement }
  )
  const inputClasses = clsx(
    'h-4 w-4',
    { 'mr-1': showAsList },
    {
      'cursor-pointer border-gray-300 text-brand-yellow focus:outline-none focus:ring-brand-light-yellow focus:ring-offset-0':
        uiCanpress,
    },
    { 'cursor-not-allowed': !uiCanpress },
    { 'border-gray-300 text-brand-yellow/50': !uiCanpress && uiSelected },
    {
      'border-gray-300 bg-white/30 text-brand-yellow/30':
        !uiCanpress && !uiSelected,
    }
  )
  return { labelClasses, inputClasses }
}
