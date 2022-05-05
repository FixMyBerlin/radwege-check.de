import React from 'react';
import { aggregationConfig, itemJsConfig } from '~/components/Scenes/constants';
import { TranslationMissing } from '~/components/TextHelper/TranslationMissing';
import { ResultProps } from '../types';
import { ButtonMultiChoice, HandleMultiChoice } from './ButtonMultiChoice';
import { ButtonSingleChoice, HandleSingleChoice } from './ButtonSingleChoice';
import { ButtonSingleChoiseDoesNotMatterOption } from './ButtonSingleChoiseDoesNotMatterOption';
import { checkBucketValueConsistency, checkDataConsistency } from './utils';

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
    <nav className="absolute inset-y-0 left-0 w-72 overflow-scroll bg-gray-100 p-4">
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

          checkDataConsistency({ aggregationKey });
          const { keyFromItemjsMissingInTranslations } =
            checkBucketValueConsistency({ aggregationKey, buckets });

          return (
            <div key={aggregationKey} className="mb-5">
              {!showAsIcons && (
                <h5
                  title={aggregationKey}
                  className="mb-1 text-base font-semibold"
                >
                  {aggregationConfig[aggregationKey]?.title || (
                    <TranslationMissing value={aggregationKey} />
                  )}
                </h5>
              )}

              <div className="flex w-full flex-row font-condensed">
                {sortedBuckets.map((bucketKey, index) => {
                  if (
                    doesNotMatterOption &&
                    bucketKey === 'doesNotMatterOption'
                  ) {
                    return (
                      <ButtonSingleChoiseDoesNotMatterOption
                        key="doesNotMatterOption"
                        buckets={buckets}
                        aggregationKey={aggregationKey}
                        handleClick={handleSingleChoice}
                      />
                    );
                  }

                  const bucket = results.data.aggregations[
                    aggregationKey
                  ].buckets.filter((b) => b.key === bucketKey)?.[0];

                  // Guard for `keyFromTranslationMissingInItemjs`
                  if (!bucket) return null;

                  const singleChoise =
                    itemJsConfig.aggregations[aggregationKey].conjunction;

                  if (singleChoise) {
                    return (
                      <ButtonSingleChoice
                        key={bucketKey}
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
                      key={bucketKey}
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

              {!!keyFromItemjsMissingInTranslations.length && (
                <div className="text-xs text-neutral-500">
                  Werte, die wir in den Daten bereinigen müssen:{' '}
                  {keyFromItemjsMissingInTranslations.map((v) => (
                    <code key={v} className="rounded-sm bg-red-100 px-1">
                      {v}
                    </code>
                  ))}
                </div>
              )}
            </div>
          );
        }
      )}
    </nav>
  );
};
