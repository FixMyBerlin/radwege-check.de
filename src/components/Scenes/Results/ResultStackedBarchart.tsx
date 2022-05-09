import React from 'react';
import { formatNumber, formatPercent } from '~/components/utils';
import { ResultItemProps } from '../types';

type Props = { scene: ResultItemProps };

export const ResultStackedBarchart: React.FC<Props> = ({ scene }) => {
  return (
    <div className="relative border-b  border-dotted text-xs">
      <div className="mb-1 flex h-16 w-full flex-col">
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
      <div
        className="absolute top-8 left-0 right-0 text-center text-2xl font-thin"
        title="Summe der Bewertungen für Gut und Sehr gut."
      >
        <strong>{formatPercent(scene.voteScore, { precision: 0 })}</strong>
      </div>
      {/* <div className="flex justify-between">
        <span>
          {formatNumber(scene.vote0Unsafe, {
            precision: 1,
            unit: '%',
          })}
        </span>
        <span className="text-neutral-300">・</span>
        <span>
          {formatNumber(scene.vote1RatherUnsafe, {
            precision: 1,
            unit: '%',
          })}
        </span>
        <span className="text-neutral-300">・</span>
        <span>
          {formatNumber(scene.vote2Save, { precision: 1, unit: '%' })}
        </span>
        <span className="text-neutral-300">・</span>
        <span>
          {formatNumber(scene.vote3VerySave, {
            precision: 1,
            unit: '%',
          })}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Mittelwert: {scene.voteMeans || '–'}</span>
        <span>
          Anzahl: {formatNumber(scene.voteCount, { precision: 0 }) || '–'}
        </span>
      </div> */}
    </div>
  );
};
