import classNames from 'classnames';
import React from 'react';
import { formatPercent } from '~/components/utils';
import { HauptstrasseSceneProps } from '../../types';

type Props = {
  className?: string;
} & Pick<
  HauptstrasseSceneProps,
  'vote0Unsafe' | 'vote1RatherUnsafe' | 'vote2Save' | 'vote3VerySave'
>;

export const BarChart: React.FC<Props> = ({
  vote0Unsafe,
  vote1RatherUnsafe,
  vote2Save,
  vote3VerySave,
  className,
}) => {
  // We need to sum, otherwise a vote of 0 will break the chart.
  // We only want to guard against empty charts.
  if (!(vote0Unsafe + vote1RatherUnsafe + vote2Save + vote3VerySave))
    return null;

  const bars = [
    { key: 'vote0Unsafe', value: vote0Unsafe, color: '#c01d1d' },
    { key: 'vote1RatherUnsafe', value: vote1RatherUnsafe, color: '#f08141' },
    { key: 'vote2Save', value: vote2Save, color: '#abc759' },
    { key: 'vote3VerySave', value: vote3VerySave, color: '#45b834' },
  ];

  return (
    <div className={classNames(className, 'flex w-full flex-col')}>
      {bars.map(({ key, value, color }) => (
        <div
          key={key}
          title={formatPercent(value, {})}
          style={{
            height: `${value}%`,
            backgroundColor: color,
          }}
          className="w-full"
        >
          {' '}
        </div>
      ))}
    </div>
  );
};
