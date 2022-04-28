import React, { useEffect, useState } from 'react';
import { ResultProps } from '../types';

type Props = {
  results: ResultProps;
};

export const TitleBar: React.FC<Props> = ({ results }) => {
  const resultItems = results?.data?.items || [];
  const pagination = results?.pagination;

  const [resultScoreAverage, setResultScoreAverage] = useState(0);
  useEffect(() => {
    let sum = 0;
    resultItems.forEach((scene) => {
      sum += parseInt(scene.voteScore as string, 10);
    });
    // result.pagination.total wäre die Gesamtanzahl; aber hier würden wir nur die max-200 Ergebnisse für die Berechnung berücksichigen.
    const average = parseInt(`${sum / resultItems.length}`, 10);
    setResultScoreAverage(average);
  }, [resultItems]);

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
