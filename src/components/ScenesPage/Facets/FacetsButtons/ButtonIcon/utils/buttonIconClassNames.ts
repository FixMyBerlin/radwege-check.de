import clsx from 'clsx'

type Props = {
  uiSelected: boolean
  uiCanpress: boolean
}

export const buttonIconClassNames = ({ uiSelected, uiCanpress }: Props) => {
  const buttonClasses = clsx(
    'h-8 grow border-r border-gray-300 last:border-r-0 justify-center inline-flex items-center text-xxs font-semibold uppercase font-medium leading-4 min-w-[2rem]',
    {
      'hover:bg-yellow-50': uiCanpress,
    },
    {
      'cursor-not-allowed': !uiCanpress,
    },
    {
      'border-b-2 border-b-brand-yellow': uiSelected,
    },
  )
  const iconClasses = clsx(
    {
      'cursor-pointer border-gray-300 text-gray-600': uiCanpress,
    },
    {
      'text-gray-600': !uiCanpress && uiSelected,
    },
    {
      'text-gray-200': !uiCanpress && !uiSelected,
    },
  )
  return { buttonClasses, iconClasses }
}
