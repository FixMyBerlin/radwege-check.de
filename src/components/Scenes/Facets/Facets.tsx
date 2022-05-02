import classNames from 'classnames';
import React from 'react';
import { aggregationConfig, itemJsConfig } from '~/components/Scenes/constants';
import { TranslationMissing } from '~/components/TextHelper/TranslationMissing';
import { ResultProps } from '../types';
import { ButtonMultiChoice, HandleMultiChoice } from './ButtonMultiChoice';
import { ButtonSingleChoice, HandleSingleChoice } from './ButtonSingleChoice';
import { ButtonSingleChoiseDoesNotMatterOption } from './ButtonSingleChoiseDoesNotMatterOption';

type Props = {
  results: ResultProps;
  handleResetFilter: () => void;
  handleSingleChoice: HandleSingleChoice;
  handleMultiChoice: HandleMultiChoice;
};

export const Facets: React.FC<Props> = ({
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
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
          const { showAsIcons } = aggregationConfig[aggregationKey];
          const { doesNotMatterOption } = aggregationConfig[aggregationKey];

          return (
            <div key={aggregationKey} className={classNames('mb-5')}>
              {!showAsIcons && (
                <h5 title={aggregationKey} className="mb-1 text-sm font-bold">
                  {aggregationConfig[aggregationKey]?.title || (
                    <TranslationMissing value={aggregationKey} />
                  )}
                </h5>
              )}

              <div className={classNames('flex w-full flex-row')}>
                {doesNotMatterOption && (
                  <ButtonSingleChoiseDoesNotMatterOption
                    key="doesNotMatterOption"
                    buckets={buckets}
                    aggregationKey={aggregationKey}
                    handleClick={handleSingleChoice}
                  />
                )}
                {/* TODO: Rework to use the aggregationConfig order of bucket.keys as sort order */}
                {buckets
                  .sort((a, b) =>
                    // eslint-disable-next-line no-nested-ternary
                    a.key > b.key ? 1 : b.key > a.key ? -1 : 0
                  )
                  .map((bucket, index) => {
                    const singleChoise =
                      itemJsConfig.aggregations[aggregationKey].conjunction;

                    if (singleChoise) {
                      return (
                        <ButtonSingleChoice
                          key={bucket.key}
                          buckets={buckets}
                          bucket={bucket}
                          index={index}
                          aggregationKey={aggregationKey}
                          handleClick={handleSingleChoice}
                          paginationTotal={results?.pagination?.total}
                        />
                      );
                    }

                    return (
                      <ButtonMultiChoice
                        key={bucket.key}
                        buckets={buckets}
                        bucket={bucket}
                        index={index}
                        aggregationKey={aggregationKey}
                        handleClick={handleMultiChoice}
                        paginationTotal={results?.pagination?.total}
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
