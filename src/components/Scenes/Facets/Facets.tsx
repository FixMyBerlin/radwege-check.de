import classNames from 'classnames';
import React from 'react';
import { aggregationTranslations } from '~/components/Scenes/constants';
import { TranslationMissing } from '~/components/TranslationMissing/TranslationMissing';
import { ResultProps } from '../types';
import { Aggregation, HandleFilterClick } from './Aggregation';

type Props = {
  results: ResultProps;
  handleResetFilter: () => void;
  handleFilterClick: HandleFilterClick;
};

export const Facets: React.FC<Props> = ({
  results,
  handleResetFilter,
  handleFilterClick,
}) => {
  return (
    <nav className="absolute inset-y-0 left-0 w-80 overflow-scroll bg-gray-100 p-4">
      <p className="mb-6">
        <a href="#reset" onClick={handleResetFilter} className="underline">
          Filter zurücksetzen
        </a>
      </p>

      {Object.entries(results?.data?.aggregations || {}).map(
        ([aggregationKey, aggregation]) => {
          const { buckets } = aggregation;

          return (
            <div key={aggregationKey} className={classNames('mb-5')}>
              <h5 title={aggregationKey} className="mb-2 text-sm font-bold">
                {aggregationTranslations[aggregationKey]?.title || (
                  <TranslationMissing value={aggregationKey} />
                )}
              </h5>

              <span className="relative z-0 inline-flex rounded-md shadow-sm">
                {buckets
                  .sort((a, b) =>
                    // eslint-disable-next-line no-nested-ternary
                    a.key > b.key ? 1 : b.key > a.key ? -1 : 0
                  )
                  .map((bucket, index) => (
                    <Aggregation
                      buckets={buckets}
                      bucket={bucket}
                      index={index}
                      aggregationKey={aggregationKey}
                      handleFilterClick={handleFilterClick}
                      paginationTotal={results?.pagination?.total}
                    />
                  ))}
              </span>
            </div>
          );
        }
      )}
    </nav>
  );
};
