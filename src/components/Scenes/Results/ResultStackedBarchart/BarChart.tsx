import classNames from 'classnames';
import React from 'react';
import { formatNumber } from '~/components/utils';

type Props = {
  // Those types are weird because our GraphQL results are not parsed.
  // But no problem, our helper `formatNumber` (…) will handle this.
  vote0Unsafe: string | number;
  vote1RatherUnsafe: string | number;
  vote2Save: string | number;
  vote3VerySave: string | number;
  className?: string;
};

export const BarChart: React.FC<Props> = ({
  vote0Unsafe,
  vote1RatherUnsafe,
  vote2Save,
  vote3VerySave,
  className,
}) => {
  if (!(vote0Unsafe && vote1RatherUnsafe && vote2Save && vote3VerySave))
    return null;

  return (
    <div className={classNames(className, 'flex w-full flex-col')}>
      <div
        title={`${vote0Unsafe}`}
        style={{
          height: formatNumber(vote0Unsafe, {
            unit: '%',
            delimiter: '.',
          }),
          backgroundColor: '#c01d1d',
        }}
        className="w-full"
      >
        {' '}
      </div>
      <div
        style={{
          height: formatNumber(vote1RatherUnsafe, {
            unit: '%',
            delimiter: '.',
          }),
          backgroundColor: '#f08141',
        }}
        className="w-full bg-orange-300"
      >
        {' '}
      </div>
      <div
        title={`${vote2Save}`}
        style={{
          height: formatNumber(vote2Save, {
            unit: '%',
            delimiter: '.',
          }),
          backgroundColor: '#abc759',
        }}
        className="w-full"
      >
        {' '}
      </div>
      <div
        title={`${vote3VerySave}`}
        style={{
          height: formatNumber(vote3VerySave, {
            unit: '%',
            delimiter: '.',
          }),
          backgroundColor: '#45b834',
        }}
        className="w-full"
      >
        {' '}
      </div>
    </div>
  );
};
