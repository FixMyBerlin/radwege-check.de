import React from 'react';
import { formatNumber } from '~/components/utils';
import { ResultItemProps } from '../../types';

type Props = { scene: ResultItemProps };

export const BarChart: React.FC<Props> = ({ scene }) => {
  return (
    <div className="mb-1 flex w-full flex-col">
      <div
        title={`${scene.vote0Unsafe}`}
        style={{
          height: formatNumber(scene.vote0Unsafe, {
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
          height: formatNumber(scene.vote1RatherUnsafe, {
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
        title={`${scene.vote2Save}`}
        style={{
          height: formatNumber(scene.vote2Save, {
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
        title={`${scene.vote3VerySave}`}
        style={{
          height: formatNumber(scene.vote3VerySave, {
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
