import React, { useEffect, useState } from 'react';
import { formatPercent } from '~/components/utils';
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

  const total = pagination?.total || 0;
  const perPage = pagination?.per_page || 0;

  return (
    <section className="absolute top-0 left-72 right-0 z-10 flex h-16 items-center bg-yellow-50 px-4 py-1 shadow-[0_0px_10px_0_rgba(0,_0,_0,_0.2)]">
      <h1 className="flex w-full items-center justify-between text-xl">
        <strong
          className="font-bold"
          title={
            total > perPage &&
            `Die ersten ${perPage} Ergebnisse werden angezeigt.`
          }
        >
          {total || '-'} Ergebnisse
        </strong>
        {/* TODO: Find a way to show the average for a given filter-set for > 200 results. */}
        {total <= perPage && resultScoreAverage && (
          <span className="ml-3 text-sm text-neutral-500">
            {' '}
            Ø Score {formatPercent(resultScoreAverage, { precision: 0 }) || '-'}
          </span>
        )}
      </h1>
    </section>
  );
};
