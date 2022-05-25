import React from 'react';
import { aggregationConfig } from '../../constants';
import { ResultBucketProps, ResultProps } from '../../types';
import {
  ButtonMultiChoice,
  HandleMultiChoice,
} from '../ButtonMultiChoice/ButtonMultiChoice';
import {
  ButtonSingleChoice,
  HandleSingleChoice,
} from '../ButtonSingleChoice/ButtonSingleChoice';
import { ButtonSingleChoiceBoth } from '../ButtonSingleChoice/ButtonSingleChoiceBoth';
import { checkBucketValueConsistency, checkDataConsistency } from '../utils';

type Props = {
  aggregationKey: string;
  results: ResultProps;
  buckets: ResultBucketProps[];
  handleSingleChoice?: HandleSingleChoice;
  handleMultiChoice?: HandleMultiChoice;
};

export const FacetsButtons: React.FC<Props> = ({
  aggregationKey,
  results,
  buckets,
  handleSingleChoice,
  handleMultiChoice,
}) => {
  checkDataConsistency({ aggregationKey });
  const { keyFromItemjsMissingInTranslations } = checkBucketValueConsistency({
    aggregationKey,
    buckets,
  });

  // We need a specific order for our Bucket values.
  // We use the order of key from our aggregationConfig for that.
  // However, for keys of type number that does not work, which is why we use a custom order via the `sortOrder` key.
  const sortedBuckets =
    aggregationConfig[aggregationKey]?.sortOrder ||
    Object.keys(aggregationConfig[aggregationKey].buckets);

  return (
    <>
      <div className="flex w-full flex-row font-condensed">
        {sortedBuckets.map((bucketKey, index) => {
          if (bucketKey === 'bothButton') {
            return (
              <ButtonSingleChoiceBoth
                key="bothButton"
                bucketKey="bothButton"
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
            aggregationConfig[aggregationKey].choiceMode === 'single';
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
    </>
  );
};
