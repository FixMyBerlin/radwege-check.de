import classNames from 'classnames';
import React from 'react';
import { aggregationConfig } from '~/components/Scenes/constants';
import { TranslationMissing } from '~/components/TextHelper/TranslationMissing';
import { ResultProps } from '../types';
import { Bucket, HandleFilterClick } from './Bucket';

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
          const display = buckets.length < 4 ? 'line' : 'grid';
          const { showAsIcons } = aggregationConfig[aggregationKey];
          const { doesNotMatterOption } = aggregationConfig[aggregationKey];

          return (
            <div key={aggregationKey} className={classNames('mb-5')}>
              {!showAsIcons && (
                <h5 title={aggregationKey} className="mb-2 text-sm font-bold">
                  {aggregationConfig[aggregationKey]?.title || (
                    <TranslationMissing value={aggregationKey} />
                  )}
                </h5>
              )}

              <div className={classNames('flex w-full flex-row')}>
                {doesNotMatterOption && (
                  <Bucket
                    key="doesNotMatterOption"
                    keyValue="doesNotMatterOption"
                    buckets={buckets}
                    bucket={null}
                    index={-1}
                    aggregationKey={aggregationKey}
                    handleFilterClick={handleFilterClick}
                    paginationTotal={results?.pagination?.total}
                    display={display}
                  />
                )}
                {buckets
                  .sort((a, b) =>
                    // eslint-disable-next-line no-nested-ternary
                    a.key > b.key ? 1 : b.key > a.key ? -1 : 0
                  )
                  .map((bucket, index) => {
                    return (
                      <Bucket
                        key={bucket.key}
                        keyValue={bucket.key}
                        buckets={buckets}
                        bucket={bucket}
                        index={index}
                        aggregationKey={aggregationKey}
                        handleFilterClick={handleFilterClick}
                        paginationTotal={results?.pagination?.total}
                        display={display}
                      />
                    );
                  })}
              </div>
            </div>
          );
        }
      )}
    </nav>
  );
};
