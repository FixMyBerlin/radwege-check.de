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
  const buttonClasses = classNames(
    'flex w-full flex-col items-center justify-start border border-gray-300 p-1 text-sm font-medium leading-4',
    '[word-break:break-word] [hyphens:auto]',
    'flex flex-col',
    { 'rounded-l-md': firstElement },
    { '-ml-px': !firstElement },
    { 'rounded-r-md': lastElement },
    {
      'fokus:bg-yellow-100 hover:bg-yellow-100 focus:z-50 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-300':
        uiCanpress,
    },
    {
      'z-10 ': uiSelected,
    },
    {
      'bg-yellow-50 shadow-innerYellow': uiSelected && uiCanpress,
    },
    {
      'bg-white shadow-innerGray': uiSelected && !uiCanpress,
    },
    {
      'shadow-md bg-yellow-50 text-gray-700': !uiSelected && uiCanpress,
    },
    {
      'shadow-md bg-neutral-100 text-neutral-600': !uiSelected && !uiCanpress,
    }
  )
  const iconClasses = classNames(
    {
      'text-gray-900': uiSelected && uiCanpress,
    },
    {
      'text-gray-900': uiSelected && !uiCanpress,
    },
    {
      'text-gray-900/10': !uiSelected && uiCanpress,
    },
    {
      'text-gray-900/10': !uiSelected && !uiCanpress,
    }
  )
  return { buttonClasses, iconClasses }
}
