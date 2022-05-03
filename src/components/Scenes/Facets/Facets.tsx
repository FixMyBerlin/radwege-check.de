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

          // We need a specific order for our Bucket values.
          // We use the order of key from our aggregationConfig for that.
          // However, for keys of type number that does not work, which is why we use a custom order via the `sortOrder` key.
          const sortedBuckets =
            aggregationConfig[aggregationKey]?.sortOrder ||
            Object.keys(aggregationConfig[aggregationKey].buckets);

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
                    const singleChoise =
                      itemJsConfig.aggregations[aggregationKey].conjunction;
                {sortedBuckets.map((bucketKey, index) => {

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
