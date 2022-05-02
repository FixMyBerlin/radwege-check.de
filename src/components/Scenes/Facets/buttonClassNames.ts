import classNames from 'classnames';

type Props = {
  firstElement: boolean;
  lastElement: boolean;
  uiSelected: boolean;
  uiCanpress: boolean;
};

export const buttonClassNames = ({
  firstElement,
  lastElement,
  uiSelected,
  uiCanpress,
}: Props) => {
  return classNames(
    'inline-flex h-12 w-full flex-col items-center justify-center border border-gray-300 bg-white p-1 text-sm font-medium leading-4',
    '[word-break:break-word] [hyphens:auto]',
    { 'rounded-l-md': firstElement },
    { '-ml-px': !firstElement },
    { 'rounded-r-md': lastElement },
    {
      'z-10 border-yellow-300 bg-yellow-50 shadow-inner INFO-uiSelected':
        uiSelected,
    },
    {
      'shadow-md INFO-!uiSelected': !uiSelected,
    },
    {
      'fokus:bg-yellow-100 text-gray-700 hover:bg-yellow-100 focus:z-50 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-300 INFO-uiCanpress':
        uiCanpress,
    },
    {
      'shadow-md cursor-default bg-neutral-100 text-neutral-600 INFO-!uiCanpress':
        !uiCanpress,
    }
  );
};
