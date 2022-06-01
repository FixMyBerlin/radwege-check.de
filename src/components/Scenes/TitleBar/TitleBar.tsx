import React, { useEffect, useState } from 'react';
import { Link } from '~/components/Link';
import { formatPercent } from '~/components/utils';
import { ResultProps } from '../types';
import {
  SearchOrderDropdown,
  SearchOrderDropdownProps,
} from './SearchOrderDropdown';

type Props = {
  results: ResultProps;
  mobileFacets?: React.ReactNode;
} & SearchOrderDropdownProps;

export const TitleBar: React.FC<Props> = ({
  results,
  searchOrder,
  setSearchOrder,
  mobileFacets,
}) => {
  const resultItems = results?.data?.items || [];
  const pagination = results?.pagination;

  const [resultScoreAverage, setResultScoreAverage] = useState(0);
  useEffect(() => {
    let sum = 0;
    resultItems.forEach((scene) => {
      sum += scene.voteScore;
    });
    // result.pagination.total wäre die Gesamtanzahl; aber hier würden wir nur die max-200 Ergebnisse für die Berechnung berücksichigen.
    const average = Math.round(sum / resultItems.length);
    setResultScoreAverage(average);
  }, [resultItems]);

  const total = pagination?.total || 0;
  const perPage = pagination?.per_page || 0;

  return (
    <section className="z-10 flex h-14 flex-none flex-row items-center justify-between bg-yellow-50 px-4 py-1 text-lg shadow-[0_0px_10px_0_rgba(0,_0,_0,_0.2)] lg:text-xl">
      <Link to="/" classNameOverwrite="h-8 lg:hidden">
        <img
          className="h-full"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </Link>

      {mobileFacets}
      <h1
        className="px-3 text-center font-bold leading-none lg:p-0 lg:text-left"
        title={
          total > perPage
            ? `Die ersten ${perPage} Ergebnisse werden angezeigt.`
            : ''
        }
      >
        {total || '-'} Ergebnisse
      </h1>
      <div>
        {/* TODO: Find a way to show the average for a given filter-set for > 200 results. */}
        {total <= perPage && resultScoreAverage && (
          <span className="ml-3 text-sm text-neutral-500">
            {' '}
            Ø Score {formatPercent(resultScoreAverage, { precision: 0 }) || '-'}
          </span>
        )}
        <SearchOrderDropdown
          searchOrder={searchOrder}
          setSearchOrder={setSearchOrder}
        />
      </div>
    </section>
  );
};
