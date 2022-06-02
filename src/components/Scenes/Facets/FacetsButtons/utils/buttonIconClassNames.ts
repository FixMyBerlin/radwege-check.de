import classNames from 'classnames'

type Props = {
  uiSelected: boolean
  uiCanpress: boolean
}

export const buttonIconClassNames = ({ uiSelected, uiCanpress }: Props) => {
  const buttonClasses = classNames(
    'h-8 grow px-1 border-r border-gray-300 border-dotted last:border-r-0 justify-center inline-flex items-center text-xxs font-semibold uppercase font-medium leading-4',
    {
      'hover:bg-yellow-50': uiCanpress,
    },
    {
      'bg-white/80': uiSelected,
    },
    {
      '': uiSelected && uiCanpress,
    },
    {
      '': uiSelected && !uiCanpress,
    },
    {
      '': !uiSelected && uiCanpress,
    },
    {
      '': !uiSelected && !uiCanpress,
    }
  )
  const iconClasses = classNames(
    {
      '': uiSelected && uiCanpress,
    },
    {
      'text-gray-300': uiSelected && !uiCanpress,
    },
    {
      '': !uiSelected && uiCanpress,
    },
    {
      'text-gray-300': !uiSelected && !uiCanpress,
    }
  )
  return { buttonClasses, iconClasses }
}
