import React from 'react';
import { ResultProps } from '../types';

type Props = {
  pagination: ResultProps['pagination'];
  resultScoreAverage: number;
};

export const TitleBar: React.FC<Props> = ({
  pagination,
  resultScoreAverage,
}) => {
  return (
    <div className="absolute top-0 left-80 right-0 h-8 bg-slate-300 px-4 py-1 ">
      <h2 className="flex justify-between">
        <span>
          <span className=" font-bold">
            Ergebnisse {pagination?.total || '-'}
          </span>
          <span
            className="text-sm text-neutral-500"
            title="Durchschnitt für die sichtbaren Ergebnisse (nicht für die Gesamt-Ergebnismenge)."
          >
            {' '}
            – Durchschnitt Score: {resultScoreAverage || '-'}
          </span>
        </span>

        {pagination?.total > 0 && (
          <span className="text-sm font-normal text-neutral-500">
            Die ersten {pagination?.per_page} Ergebnisse werden angezeigt.
          </span>
        )}
      </h2>
    </div>
  );
};
