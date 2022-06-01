import classNames from 'classnames';
import React from 'react';

type Props = {
  onClick: () => void;
};

export const ResetFilterButton: React.FC<Props> = ({ onClick }) => {
  return (
    <p className="mb-6">
      <button
        type="button"
        onClick={onClick}
        className={classNames(
          onClick
            ? 'hover:bg-yellow-100'
            : 'cursor-not-allowed text-gray-500 decoration-gray-300',
          'underline'
        )}
        disabled={!onClick}
      >
        Filter zurücksetzen
      </button>
    </p>
  );
};
