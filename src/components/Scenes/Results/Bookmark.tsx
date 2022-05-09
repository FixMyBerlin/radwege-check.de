import classNames from 'classnames';
import React from 'react';

type Props = { active: boolean };

// Icon source: https://heroicons.com/ search "bookmark"
export const Bookmark: React.FC<Props> = ({ active }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1 -top-1.5 h-8 w-8 drop-shadow"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classNames({ 'fill-yellow-100': active })}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};
